<template>
  <div class="h-full flex flex-col gap-12">
    <div v-if="isShowFunc" class="flex flex-row gap-12" ref="funBox">
      <div class="flex-auto">
        <!-- 占位内容 -->
        <slot name="function"></slot>
      </div>
      <!-- <div v-if="showReload">
          <a-tooltip title="刷新">
            <PButton
              type="default"
              :loading="loading"
              :icon="'SyncOutlined'"
              @click="reload"
            />
          </a-tooltip>
        </div> -->
    </div>
    <div class="flex-auto overflow-hidden" ref="tableBox" :style="{ height: tableHeight }">
      <el-table
        v-bind="$attrs"
        :data="dataSource"
        :border="true"
        header-cell-class-name="table-header"
        v-loading="loading"
        element-loading-background="rgba(255, 255, 255, 0.7)"
        scrollbar-always-on
        :height="tableHeight"
        :show-overflow-tooltip="true"
      >
        <template v-for="(item, index) in theColumns" :key="item.key">
          <!-- 序号 ||  -->
          <el-table-column v-bind="filterChild(item)" v-if="item.key == 'rowIndex'">
          </el-table-column>
          <!-- 操作 -->

          <el-table-column
            v-bind="filterChild(item)"
            v-else-if="item.key == 'rowAction'"
            v-slot="scope"
          >
            <slot name="operate" :row="scope.row" />
          </el-table-column>

          <el-table-column v-else v-bind="filterChild(item)" :prop="item.key">
            <template v-if="item?.children?.length">
              <el-table-column
                v-for="(childitem, index) in item?.children"
                v-bind="childitem"
                :prop="childitem.key"
                :show-overflow-tooltip="true"
              ></el-table-column>
            </template>
          </el-table-column>
        </template>

        <template #headerCell="{ title, column }">
          <div :class="{ 'ant-table-header-required': column.required }">
            {{ title }}
          </div>
        </template>
        <template #bodyCell="scope">
          <slot v-bind="scope" name="bodyCell" />
        </template>
        <template #summary="scope">
          <slot v-bind="scope" name="summary" />
        </template>
      </el-table>
    </div>
    <div ref="paginationBox" class="flex justify-end" v-if="isPagination">
      <el-pagination
        small
        background
        :currentPage="pagination.current"
        :pageSize="pagination.pageSize"
        :page-sizes="pageSizes"
        :layout="paginationLayout"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup name="ETable">
import {
  defineProps,
  defineEmits,
  ref,
  useAttrs,
  onMounted,
  watchEffect,
  onBeforeUnmount,
  nextTick,
  watch,
  useSlots,
} from "vue";
const attrs = useAttrs();
const slots = useSlots();

const paginationBox = ref(null);
const funBox = ref(null);
const tableHeight = ref(0);

const emits = defineEmits(["pagination-change"]);

const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  dataSource: {
    type: Array,
    default: () => [],
  },
  isPagination: {
    type: Boolean,
    default: false,
  },
  pagination: {
    type: Object,
    default: () => ({}),
  },
  loading: {
    type: Boolean,
    default: false,
  },
  queryHeight: {
    type: Number,
    default: 42,
  },
  paginationLayout: {
    type: String,
    default: "total,sizes, prev, pager, next",
  },
  pageSizes: {
    type: Array,
    default: () => [10, 20, 30, 40, 50, 100],
  },
  rowAction: {
    type: [Object, Boolean],
  },
  rowIndex: {
    type: [Object, Boolean],
  },
});
let theColumns = ref([]);

const filterChild = (item) => {
  const copyI = {
    ...item,
  };
  delete copyI.children;
  return copyI;
};

const isShowFunc = ref(slots.hasOwnProperty("function"));

const getTableHeight = () => {
  const funBoxHeight = isShowFunc.value ? funBox.value?.clientHeight + 12 : 0;
  const paginationHeight = props.isPagination ? paginationBox.value.clientHeight + 12 : 0;

  tableHeight.value = `calc(100vh - ${funBoxHeight + paginationHeight + props.queryHeight + 26}px)`;
};
// 分页功能
const handleSizeChange = (pageSize) => {
  emits("pagination-change", {
    field: "pageSize",
    value: pageSize,
  });
};
const handleCurrentChange = (currentPage) => {
  emits("pagination-change", {
    field: "current",
    value: currentPage,
  });
};

const getColumns = () => {
  // 递归循环，兼容嵌套表头
  const fn = (columns) => {
    if (!Array.isArray(columns)) return [];

    return columns
      .filter((column) => {
        if (typeof column.hideInTable === "function") return column.hideInTable();
        else return !column.hideInTable;
      })
      .map((column) => {
        let { type = "text" } = column;
        let align = "left";
        let width = 200;
        return {
          label: column.label,
          key: column.name,
          dataIndex: column.name,
          resizable: true, //支持拖拽
          width: column.width || width,
          sorter: column.sorter || false,
          align: column.align || align,
          fixed: column.fixed,
          children: fn(column.children),
          required: column.required || false,
        };
      });
  };
  // console.log(fn(props.columns));
  theColumns.value = fn(props.columns);

  if (typeof props.rowIndex === "object" || props.rowIndex) {
    const { label = "序号", key = "rowIndex", width = 50, summary } = props.rowIndex;
    theColumns.value.unshift({
      label,
      key,
      width,
      align: "center",
      fixed: "left",
      formatter: (_row, _column, _cellValue, index) => {
        const { current = 1, pageSize = 10 } = props.pagination;
        return (current - 1) * pageSize + index + 1;
      },
    });
  }
  if (typeof props.rowAction === "object" || props.rowAction) {
    let { label = "操作", key = "rowAction", width = 200 } = props.rowAction;
    let fixed = "right";
    let className = "";
    if (props.readonly) {
      className = "d-none";
      width = 0;
      fixed = null;
    }
    theColumns.value.push({
      label,
      key,
      width,
      fixed,
      className,
    });
  }
};

watch(
  () => props.queryHeight,
  (newVal) => {
    getTableHeight();
  }
);

onMounted(() => {
  getColumns();
  getTableHeight();
  //   getDataSource();
});

watchEffect(() => {
  getColumns();
  //   getDataSource();
});
</script>

<style lang="scss"></style>

<template>
  <div class="h-full flex flex-col gap-12">
    <div v-if="$slots.default" class="flex flex-row gap-12" ref="funBox">
      <div class="flex-auto">
        <!-- 占位内容 -->
        <slot></slot>
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
        :pagination="pagination"
        v-loading="loading"
        element-loading-background="rgba(255, 255, 255, 0.5)"
        scrollbar-always-on
        :height="tableHeight"
      >
        <el-table-column
          v-for="({ title, key, width, children, align }, index) in theColumns"
          :key="key"
          :prop="key"
          :label="title"
          :width="width"
          :align="align"
        >
          <template v-if="children.length">
            <el-table-column
              v-for="({ title, key, width, align }, index) in children"
              :key="key"
              :prop="key"
              :label="title"
              :width="width"
              :align="align"
            />
          </template>
        </el-table-column>
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
    <div ref="pagination" class="flex justify-end" v-if="isPagination">
      <el-pagination small background layout="prev, pager, next" :total="50" />
    </div>
  </div>
</template>

<script setup name="ETable">
import {
  defineProps,
  ref,
  useAttrs,
  onMounted,
  watchEffect,
  onBeforeUnmount,
  nextTick,
  watch,
} from "vue";
const aaa = useAttrs();
const pagination = ref(null);
const funBox = ref(null);
const tableHeight = ref(0);

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
});
let theColumns = ref([]);

watch(
  () => props.queryHeight,
  (newVal) => {
    getTableHeight();
  }
);

const getTableHeight = () => {
  console.log(pagination.value.clientHeight);
  console.log(funBox.value.clientHeight);
  const add = pagination.value.clientHeight + funBox.value.clientHeight + props.queryHeight;
  console.log(add);
  tableHeight.value = `calc(100vh - ${add + 50}px)`;
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
          title: column.label,
          key: column.name,
          dataIndex: column.name,
          resizable: true, //支持拖拽
          width: column.width || width,
          ellipsis: true,
          sorter: column.sorter || false,
          align: column.align || align,
          fixed: column.fixed,
          children: fn(column.children),
          required: column.required || false,
        };
      });
  };
  console.log(fn(props.columns));
  theColumns.value = fn(props.columns);

  if (typeof props.rowIndex === "object" || props.rowIndex) {
    const { title = "序号", key = "rowIndex", width = 50, summary } = props.rowIndex;
    theColumns.value.unshift({
      title,
      key,
      width,
      align: "center",
      fixed: "left",
      customRender: ({ index, record }) => {
        const { current = 1, pageSize = 10 } = pagination.value;
        if (record.summary) {
          return "合计";
        }
        return (current - 1) * pageSize + index + 1;
      },
    });
  }

  if (typeof props.rowAction === "object" || props.rowAction) {
    let { title = "操作", key = "rowAction", width = 200 } = props.rowAction;
    let fixed = "right";
    let className = "";
    if (props.readonly) {
      className = "d-none";
      width = 0;
      fixed = null;
    }
    theColumns.value.push({
      title,
      key,
      width,
      fixed,
      className,
    });
  }
};

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

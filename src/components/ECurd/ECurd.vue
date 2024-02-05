<template>
  <div class="h-full flex flex-col">
    <div v-if="queryColumns.length > 0">
      <!--         :show-setting="showSetting"
        @setting="onSetting" -->
      <EQuery
        v-bind="$attrs"
        :columns="queryColumns"
        :model="model"
        @getHeight="(e) => setQueryHeight(e)"
      >
        <template #bodyCell="scope">
          <slot v-bind="scope" name="queryCell" />
        </template>
      </EQuery>
    </div>
    <div class="flex-auto overflow-hidden">
      <ETable v-bind="$attrs" :columns="tableColumns" :queryHeight="queryHeight">
        <template v-if="$slots.default" #default>
          <slot />
        </template>
        <template #bodyCell="scope">
          <slot v-bind="scope" name="bodyCell" />
        </template>
      </ETable>
    </div>
  </div>
</template>

<script setup name="ECurd">
import { defineProps, ref, useAttrs, onMounted } from "vue";
import EQuery from "../EQuery";
import ETable from "../ETable";

const aaa = useAttrs();
// console.log(aaa, "attrs");
// 查询区高度
const queryHeight = ref(0);

const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  model: {
    type: Object,
    default: () => ({}),
  },
});
//
const setQueryHeight = (height) => {
  queryHeight.value = height;
};

// 获取表格列
const tableColumns = ref([]);
const getTableColumns = () => {
  tableColumns.value = props.columns.map((col) => col);
};

// 获取查询列
const queryColumns = ref([]);
const getQueryColumns = () => {
  queryColumns.value = props.columns
    .filter((col) => col.search)
    .map((col) => {
      return {
        ...col,
        label: col.label,
        name: col.name,
        type: col.type,
      };
    });
};

onMounted(() => {
  getQueryColumns();
  getTableColumns();
});
</script>

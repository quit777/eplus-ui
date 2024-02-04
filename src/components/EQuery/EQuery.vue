<template>
  <div class="flex flex-row" ref="formH">
    <el-form
      class="flex-auto"
      ref="form"
      :label-position="'left'"
      :label-width="labelWidth"
      :colon="false"
      :layout="'horizontal'"
      :model="model"
    >
      <el-row :gutter="12" :align="'middle'">
        <template v-for="(column, index) in columns" :key="index">
          <EFormItem
            v-bind="column"
            v-model="model[column.name]"
            :clearable="column.clearable ? true : false"
            v-if="visible(column)"
            v-show="canisee(index)"
          >
            <slot :name="'bodyCell'" :column="column" />
          </EFormItem>
        </template>
      </el-row>
    </el-form>
    <div class="flex flex-row pl-12">
      <el-tooltip content="搜索">
        <EButton type="primary" :loading="loading" icon="Search" @click="onSearch" />
      </el-tooltip>
      <el-tooltip content="重置">
        <EButton type="default" icon="Refresh" @click="onReset" />
      </el-tooltip>
      <template v-if="colNumber * rowNumber < columns.length">
        <EButton
          type="default"
          :icon="collapsed ? 'ArrowUpBold' : 'ArrowDownBold'"
          @click="onExpand"
        />
      </template>
    </div>
  </div>
</template>

<script setup name="EQuery">
import { defineProps, ref, defineExpose, defineEmits, useAttrs, nextTick, onMounted } from "vue";
import EFormItem from "../EFormItem";
import EButton from "../EButton";
const aa = useAttrs();
console.log(aa, "aa");

const emits = defineEmits(["expand", "search", "setting", "reset", "getHeight"]);
const collapsed = ref(false);
const colNumber = ref(3);
const rowNumber = ref(1);
const form = ref(null);
const formH = ref(null);

const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  model: {
    type: Object,
    default: () => ({}),
  },
  labelWidth: {
    type: String,
    default: "6em",
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
const resetFields = () => form.value.resetFields();
const validate = () => form.value.validate();

const visible = (column) => {
  if (typeof column.visible === "function") return column.visible();
  return true;
};
const canisee = (index) => {
  if (collapsed.value) return true;
  return index < colNumber.value * rowNumber.value;
};
const onSearch = () => {
  emits("search");
};
const onReset = () => {
  resetFields();
  emits("reset");
  emits("search");
};
const onExpand = () => {
  collapsed.value = !collapsed.value;
  getFormHeight();
  emits("expand", collapsed.value);
};

// 获取查询区高度传到父组件
const getFormHeight = () => {
  nextTick(() => {
    emits("getHeight", formH.value.clientHeight);
  });
};
onMounted(() => {
  getFormHeight();
});

defineExpose({ validate, resetFields });
</script>

<style lang="scss"></style>

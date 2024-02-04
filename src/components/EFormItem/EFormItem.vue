<template>
  <el-col :span="span">
    <el-form-item class="mb-12" :label="label" :name="name" :rules="rules" :prop="name">
      <slot>
        <el-input v-if="type === 'number'" />
        <EInput
          v-else
          v-bind="$attrs"
          :value="modelValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :clearable="clearable"
          :type="type"
          @update:value="(e) => updateValue(e)"
        />
      </slot>
    </el-form-item>
  </el-col>
</template>

<script setup name="EFormItem">
import { defineProps, ref, defineEmits, computed } from "vue";
import EInput from "../EInput";

const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: [String, Number, Array, Boolean],
  },
  type: {
    type: String,
  },
  label: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
  },
  rules: {
    type: [Array, Object],
  },
  disabled: {
    type: Boolean,
  },
  clearable: {
    type: Boolean,
  },

  spanNumber: {
    type: Number,
    default: 1,
  },
  colsNumber: {
    type: Number,
    default: 3,
  },
});
// 计算 单列的span值
const cell = computed(() => 24 / props.colsNumber);
// 根据 栅格占位数量 span
const span = computed(() => cell.value * props.spanNumber);

const updateValue = (value) => {
  emits("update:modelValue", value);
};
</script>

<style lang="scss"></style>

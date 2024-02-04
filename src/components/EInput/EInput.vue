<template>
  <el-input
    :modelValue="value"
    :placeholder="placeholder"
    :disabled="disabled"
    :clearable="clearable"
    @input="onChangeInput"
  />
</template>

<script setup name="EInput">
import { defineProps, ref, useAttrs, defineEmits } from "vue";
const inop = ref("");
const emits = defineEmits(["update:value", "change"]);
const props = defineProps({
  placeholder: {
    type: String,
    default: "请输入",
  },
  clearable: {
    type: Boolean,
  },
  disabled: {
    type: Boolean,
  },
  value: {
    type: [String, Number, Array, Boolean],
  },
});

const onChangeInput = (e) => {
  emits("update:value", e);
  emits("change", e);
};
</script>

<style lang="scss"></style>

<template>
  <el-button v-bind="$attrs" :type="type" :loading="loading">
    <template #default v-if="slots.default">
      <slot></slot>
    </template>
    <template #icon v-if="icon">
      <Search v-if="icon == 'Search'" />
      <Refresh v-if="icon == 'Refresh'" />
      <ArrowUp v-if="icon == 'ArrowUp'" />
      <ArrowDown v-if="icon == 'ArrowDown'" />
      <ArrowUpBold v-if="icon == 'ArrowUpBold'" />
      <ArrowDownBold v-if="icon == 'ArrowDownBold'" />
    </template>
  </el-button>
</template>

<script setup name="EButton">
import { defineProps, useAttrs, useSlots } from "vue";
import {
  Search,
  Refresh,
  ArrowUp,
  ArrowDown,
  ArrowUpBold,
  ArrowDownBold,
} from "@element-plus/icons-vue";

const aaa = useAttrs();
const slots = useSlots();

const props = defineProps({
  icon: {
    type: String,
  },
  type: {
    type: String,
    default: "primary",
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss"></style>

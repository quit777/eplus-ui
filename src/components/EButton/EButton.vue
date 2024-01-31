<template>
  <el-button v-bind="$attrs" :type="type">
    <template #default>
      <slot></slot>
    </template>
    <template #icon>
      <!-- <Search /> -->
    </template>

    <template #loading>
      <!-- <Search /> -->
    </template>
  </el-button>
</template>

<script setup name="EButton">
import { defineProps, ref, useAttrs } from "vue";
import { Search, Refresh, ArrowDownBold } from "@element-plus/icons-vue";

const aaa = useAttrs();
console.log(aaa, "attrs");

const props = defineProps({
  icon: {
    type: String,
  },
  type: {
    type: String,
    default: "primary",
  },
});
</script>

<style lang="scss"></style>

<template>
  <el-config-provider :locale="zhCn" size="small" v-bind="$attrs">
    <slot />
  </el-config-provider>
</template>

<script setup name="EConfigProvider">
import { defineProps } from "vue";
import zhCn from "element-plus/dist/locale/zh-cn.min.mjs";

defineProps({});
</script>

<style lang="scss"></style>

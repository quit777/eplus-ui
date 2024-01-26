<template>
  <el-button v-bind="$attrs" :type="type">
    <template #default>
      <slot></slot>
    </template>
  </el-button>
</template>

<script setup name="EButton">
import { defineProps, useAttrs } from "vue";
defineProps({
  value: {
    type: String,
  },
});
</script>

<style lang="scss"></style>

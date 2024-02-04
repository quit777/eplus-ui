<template></template>

<script setup name="">
import { defineProps, ref, useAttrs } from "vue";

const aaa = useAttrs();
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

<template>
  <div class="layout">
    <!-- v-if="queryColumns.length > 0" -->
    <div>
      <div>查询区</div>
      <div>查询区</div>
      <!-- <PQuery
        v-bind="$attrs"
        :columns="queryColumns"
        :show-setting="showSetting"
        @setting="onSetting"
      >
        <template #bodyCell="scope">
          <slot v-bind="scope" name="queryCell" />
        </template>
      </PQuery> -->
    </div>
    <div class="layout-table">
      表格
      <!-- <PTable v-bind="$attrs" :scroll="props.scroll" :columns="tableColumns">
        <template v-if="$slots.default" #default>
          <slot />
        </template>
        <template #bodyCell="scope">
          <slot v-bind="scope" name="bodyCell" />
        </template>
      </PTable> -->
    </div>
  </div>
</template>

<script setup name="ECurd">
import { defineProps, ref, useAttrs } from "vue";

const aaa = useAttrs();
console.log(aaa, "attrs");

const props = defineProps({});
</script>

<style scoped>
.layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: pink;
}
.layout-table {
  flex: 1 1 auto;
  overflow: hidden;
}
</style>

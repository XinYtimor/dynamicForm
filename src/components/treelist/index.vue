<template>
  <el-tree
    :expand-on-click-node="false"
    :data="props.optList"
    node-key="label"
    default-expand-all
  >
    <template #default="{ node, data }">
      <span class="custom-tree-node">
        <div><span> label </span><el-input v-model="data.label" /></div>
        <div><span> value </span><el-input v-model="data.value" /></div>
        <div v-if="data.isRoot">
          <el-button @click="addNode(data)">新增同级节点</el-button>
        </div>
        <div><el-button @click="addChildNode(data)">新增子节点</el-button></div>
      </span>
    </template>
  </el-tree>
</template>

<script setup>
import { reactive, ref } from "vue";
const props = defineProps({
  optList: Array,
});
const addNode = (node) => {
  console.log(node);
  if (node.isRoot) {
    props.optList.push({
      label: "label2",
      value: "value2",
      isRoot: true,
      children: [],
    });
  } else {
  }
};
const addChildNode = (node) => {
  node.children.push({
    label: "label2Child",
    value: "value2Child",
    children: [],
  });
};
</script>

<style scoped lang="less">
:deep(.el-tree-node__content) {
  height: 14vh;
  border: 1px solid #efefef;
}
</style>

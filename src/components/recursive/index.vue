<template>
  <!-- <div>
    <h1>childrenItem</h1>
  </div> -->
  <div v-for="childrenItem in optList">
    <!-- {{ childrenItem }} -->
    <div>
      <span>label</span>
      <el-input v-model="childrenItem.label" />
    </div>
    <div><span>value</span> <el-input v-model="childrenItem.value" /></div>
    <div v-if="childrenItem.children">
      <span>children</span>
      <recursiveCom :optList="childrenItem.children"></recursiveCom>
    </div>
  </div>
</template>

<script>
import { reactive, ref, defineComponent } from "vue";
export default defineComponent({
  name: "recursiveCom",
  props: {
    optList: {
      type: Array,
      require: true,
      default: () => {},
    },
  },
  setup() {},
});
</script>

<style scoped lang="less"></style>

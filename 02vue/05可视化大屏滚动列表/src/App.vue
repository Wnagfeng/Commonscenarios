<template>
  <div class="Wrapper">
    <div class="PanListWrapper">
      <PanList></PanList>
    </div>
  </div>
</template>

<script setup lang="ts">
import PanList from './components/PanList/index.vue'

</script>

<style scoped lang="less">
.Wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .PanListWrapper {
    width: 700px;
    height: 700px;
  }
}
</style>

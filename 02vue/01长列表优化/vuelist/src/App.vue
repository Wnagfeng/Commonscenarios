<template>
  <div id="app">
    <RecycleScroller :items="items" :itemSize="54" class="scroller" v-slot="{ item }">
      <ListItem :item="item" />
    </RecycleScroller>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ListItem from './components/ListItem.vue';
import { RecycleScroller } from 'vue-virtual-scroller';//第三方库
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';//第三方库样式

const items = ref([]);

for (let i = 0; i < 10000; i++) {
  items.value.push({
    id: i + 1,
    count: i + 1,
  });
}

</script>

<style>
#app {
  width: 100%;
  margin: 0 auto;
}

.scroller {
  width: 500px;
  margin: 0 auto;
  height: 500px;
}
</style>

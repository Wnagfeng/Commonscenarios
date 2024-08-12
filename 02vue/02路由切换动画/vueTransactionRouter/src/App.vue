<template>
  <div class="Appwrapper">
    <div class="content">
      <router-view v-slot="{ Component }">
        <transition :name="routerSwitchInfo">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>


<script setup>
import { computed } from 'vue';
import store from '../store';

const routerSwitchInfo = computed(() => store.routerSwitch.direction);
console.log(routerSwitchInfo.value);
</script>


<style scoped>
.Appwrapper {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

.content {
  width: 100%;
  height: 100%;
}

.right-leave-active {
  position: absolute;
  width: 100%;
  transition: 0.5s;
  transform: translateX(-50%);
  opacity: 0;
}

.right-enter {
  transform: translateX(50%);
  opacity: 0;
}

.right-enter-active {
  transition: 0.5s;
}

.left-leave-active {
  position: absolute;
  width: 100%;
  transition: 0.5s;
  transform: translateX(50%);
  opacity: 0;
}

.left-enter {
  transform: translateX(-50%);
  opacity: 0;
}

.left-enter-active {
  transition: 0.5s;
}
</style>

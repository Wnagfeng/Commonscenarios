<template>
  <!-- 滚动容器，监听 scroll 事件，在滚动时调用 setPool 方法 -->
  <div class="recycle-scroller-container" @scroll="setPool" ref="container">
    <!-- 滚动内容的外部包装，用于设置总高度，确保滚动条的正确显示 -->
    <div class="recycle-scroller-wrapper" :style="{ height: `${totalSize}px` }">
      <!-- 使用 v-for 指令循环渲染池中的项目 -->
      <div class="recycle-scroller-item" v-for="poolItem in pool" :key="poolItem.item[keyField]" :style="{
        transform: `translateY(${poolItem.position}px)`,
      }">
        <!-- 插槽，用于插入自定义内容，传递当前项的数据给插槽 -->
        <slot :item="poolItem.item"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect, onMounted } from 'vue';

// 定义组件的 props
const props = defineProps({
  items: {
    type: Array, // 项目列表数据的数组
    default: () => [],
  },
  itemSize: {
    type: Number, // 每个项目的固定高度
    default: 0,
  },
  keyField: {
    type: String, // 项目中用于唯一标识的字段名
    default: 'id',
  },
});

// 设置缓冲区的上下限，用于优化滚动时的渲染
const prev = 10; // 在当前视图外面上方多渲染的项目数量
const next = 10; // 在当前视图外面下方多渲染的项目数量
const pool = ref([]); // 当前渲染在视图中的项目池
const container = ref(null); // 滚动容器的 DOM 引用

// 计算属性，用于计算滚动内容的总高度
const totalSize = computed(() => props.items.length * props.itemSize);

// 更新项目池，确保只渲染在当前视图内及其缓冲区内的项目
const setPool = () => {
  if (!container.value) return; // 添加 null 检查
  const scrollTop = container.value.scrollTop; // 获取当前滚动位置
  const height = container.value.clientHeight; // 获取容器的可视高度
  let startIndex = Math.floor(scrollTop / props.itemSize); // 计算视图内第一个项目的索引
  let endIndex = Math.ceil((scrollTop + height) / props.itemSize); // 计算视图内最后一个项目的索引

  // 向前和向后扩展缓冲区
  startIndex -= prev;
  if (startIndex < 0) startIndex = 0; // 防止起始索引小于 0
  endIndex += next;

  // 计算起始位置的像素值
  const startPos = startIndex * props.itemSize;

  // 将项目池更新为新的渲染项目
  pool.value = props.items.slice(startIndex, endIndex).map((it, i) => ({
    item: it,
    position: startPos + i * props.itemSize, // 设置每个项目在页面上的垂直位置
  }));
};

// 在组件挂载时初始化项目池
onMounted(() => {
  setPool();
});

// 监听依赖变化并自动更新项目池
watchEffect(() => {
  setPool();
});
</script>

<style>
/* 滚动容器的样式，允许内容滚动 */
.recycle-scroller-container {
  overflow: auto;
}

/* 滚动内容的外部包装，设置为相对定位 */
.recycle-scroller-wrapper {
  position: relative;
}

/* 每个项目的样式，设置为绝对定位 */
.recycle-scroller-item {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
}
</style>

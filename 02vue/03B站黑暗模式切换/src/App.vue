<template>
  <!-- 使用动态类绑定，根据 isDark 的值决定是否应用 'dark' 类 -->
  <div :class="{ dark: isDark }" class="ChangeWrapper">
    <!-- 点击按钮时触发 toggleDark 方法 -->
    <button @click="toggleDark">Toggle Dark Mode</button>
    <!-- 显示欢迎信息 -->
    <h1>Welcome to Dark Mode Toggle</h1>
  </div>
</template>


<script setup lang="ts">
import { ref, nextTick } from 'vue'

// 创建一个响应式变量 isDark，用于控制暗模式的开关
const isDark = ref<boolean>(false)

// 切换暗模式和亮模式的函数
function toggleDark(event: MouseEvent) {
  // 获取点击位置的坐标
  const x = event.clientX
  const y = event.clientY

  // 计算从点击位置到窗口四个角的最大距离，作为圆形过渡效果的半径
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  )

  // 开始视图过渡
  const transition = document.startViewTransition(async () => {
    // 切换 isDark 的值，改变模式
    isDark.value = !isDark.value

    // 根据当前模式，添加或移除 'light' 类
    if (isDark.value == false) {
      document.documentElement.classList.add("light")
    } else {
      document.documentElement.classList.remove("light")
    }

    // 等待下一个 DOM 更新周期
    await nextTick()
  })

  // 在过渡准备好后执行动画效果
  transition.ready.then(() => {
    // 定义过渡效果的圆形路径
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    // 反转圆形路径，用于暗模式时的过渡效果
    const reverseClipPath = [...clipPath].reverse()

    // 根据当前模式执行相应的动画
    if (isDark.value) {
      console.log("黑色")
      document.documentElement.animate(
        {
          clipPath: reverseClipPath
        },
        {
          duration: 400, // 动画持续时间
          easing: 'ease-out', // 动画缓动函数
          pseudoElement: '::view-transition-old(root)' // 旧视图的伪元素
        },
      )
    } else {
      console.log("白色")
      document.documentElement.animate(
        {
          clipPath: clipPath
        },
        {
          duration: 400, // 动画持续时间
          easing: 'ease-out', // 动画缓动函数
          pseudoElement: '::view-transition-new(root)', // 新视图的伪元素
        },
      )
    }
  })
}
</script>


<style scoped lang="less">
.ChangeWrapper {
  width: 100vw;
  /* 设置宽度为视口宽度 */
  height: 100vh;
  /* 设置高度为视口高度 */
  display: flex;
  /* 使用 flexbox 布局 */
  align-items: center;
  /* 垂直居中对齐 */
  justify-content: center;
  /* 水平居中对齐 */
  transition: background-color 0.5s;
  /* 背景色渐变过渡 */
}

/* 暗模式下的样式 */
.dark {
  background-color: #000000;
  /* 背景色为黑色 */
  color: #fff;
  /* 文字颜色为白色 */
}

/* 亮模式下的样式 */
.light {
  background-color: #ffffff;
  /* 背景色为白色 */
  color: #000000;
  /* 文字颜色为黑色 */
}

/* 按钮样式 */
button {
  position: fixed;
  /* 固定位置 */
  top: 10px;
  /* 距离顶部 10px */
  right: 10px;
  /* 距离右边 10px */
  border-radius: 13px;
  padding: 10px 30px;
  background-color: rgb(151, 236, 153);
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>

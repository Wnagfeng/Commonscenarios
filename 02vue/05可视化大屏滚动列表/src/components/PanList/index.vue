<template>
    <div class="plan-list">
        <div class="title">区域销售大盘环比分析</div>
        <div class="planlistScore">
            <PanlList />

        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import PanlList from './cpns/PanlList.vue';

import { useAllUserDataStore } from '../../store/index'; // 引入 Pinia store

// 获取 Pinia store 实例
const AllUserDataStore = useAllUserDataStore();

// 定义更新数据函数
const updateData = () => {
    // 直接触发更新，而不是生成随机数据
    const newData = AllUserDataStore.getAllUserData();  // 假设这个函数获取当前的用户数据
    AllUserDataStore.setAllUserData(newData); // 直接更新数据
};

// 使用 onMounted 生命周期钩子来定时更新数据
onMounted(() => {
    // 每隔 3 秒触发一次更新
    setInterval(() => {
        updateData();
    }, 1000); // 每 3 秒更新一次
});
</script>

<style scoped lang="less">
.plan-list {
    width: 100%;
    height: 100%;
    background: rgb(55, 55, 55);
    padding: 20px 10px;
    color: #fff;
    box-sizing: border-box;

    .title {
        font-size: 26px;
        text-align: center;
    }

    .planlistScore {
        width: 100%;
        height: calc(100% - 40px);
        background: rgb(40, 40, 40);
        overflow: hidden;
    }
}
</style>

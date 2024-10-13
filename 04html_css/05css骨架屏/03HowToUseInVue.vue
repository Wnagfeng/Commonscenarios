<template>
    <div>
        <div v-if="loading" class="skeleton-container">
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-paragraph"></div>
            <div class="skeleton skeleton-paragraph"></div>
            <div class="skeleton skeleton-paragraph"></div>
            <div class="skeleton skeleton-paragraph"></div>
        </div>

        <div v-else class="content">
            <h1>真实内容的标题</h1>
            <p>这是一些真实的内容，展示在用户等待数据加载完毕后。</p>
            <p>你可以在这里放置任何你想展示的内容。</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: true
        };
    },
    mounted() {
        // 模拟数据加载过程
        setTimeout(() => {
            this.loading = false; // 加载完成
        }, 3000); // 3秒后完成加载
    }
};
</script>

<style>
.skeleton {
    background-color: #e0e0e0;
    border-radius: 4px;
    margin: 10px 0;
    animation: pulse 1.5s infinite;
}

@keyframes pulse {
    0% {
        background-color: #e0e0e0;
    }

    50% {
        background-color: #d0d0d0;
    }

    100% {
        background-color: #e0e0e0;
    }
}

.skeleton-title {
    width: 60%;
    height: 24px;
}

.skeleton-paragraph {
    width: 100%;
    height: 16px;
    margin: 5px 0;
}

.skeleton-container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    background: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.content {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    background: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}
</style>
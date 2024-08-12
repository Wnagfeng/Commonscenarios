<template>
    <div class="a">
        <div class="header">
            <router-link class="nav-link" to="/b">B</router-link>
            <router-link class="nav-link" to="/c">C</router-link>
        </div>
        <h1 class="title"> A Page </h1>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.a {
    color: red;
    background-color: rgb(213, 224, 125);
    width: 100%;
    height: 100%;
}

.header {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.nav-link {
    margin-top: 30px;
    display: block;
    width: 60px;
    height: 60px;
    text-decoration: none;
    font-size: 30px;
    color: black;
    font-weight: 870;
    border-radius: 50%;
    background-color: red;
    line-height: 60px;
    text-align: center;
    box-shadow: 0px 0px 10px 0px rgba(15, 15, 15, 0.7);
}

.title {
    text-align: center;
}
</style>

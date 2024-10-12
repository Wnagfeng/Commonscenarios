<template>
    <div class="AutoScrollTabel" :id="ID">
        <div class="header">
            <template v-for="(item, index) in Headerdata">
                <div class="headeritem" :style="{ width: `${AVERAGEWIDTH[index]}px` }">
                    {{ item }}
                </div>
            </template>
        </div>
        <div class="ColumLIst">
            <template v-for="(item, index) in CURRENTDATA" :key="item.Rowindex + '-' + index">
                <div class="itemWrapper"
                    :style="{ height: `${COLUMNHEIGHT[index]}px`, lineHeight: `${COLUMNHEIGHT[index]}px`, backgroundColor: item.Rowindex % 2 === 0 ? BGCOLOR2 : BGCOLOR1 }">
                    <template v-for="(iten, idx) in item.data" :key="item.Rowindex + '-' + idx">
                        <!-- 使用 Rowindex 和 idx 组合，确保每一项唯一 -->
                        <div class="item" :align="align[idx]" :style="{ width: `${COLUMNAVERAGEWIDTH[idx]}px` }"
                            v-html="iten"></div>
                    </template>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch, nextTick } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import cloneDeep from 'loadsh/cloneDeep'

import { storeToRefs } from 'pinia' // pinia
import { useAllUserDataStore } from '../../../store/index'; // pinia
const AllUserData = useAllUserDataStore() // pinia
const { Alluserdata } = storeToRefs(AllUserData) // pinia

import init from '../utils/init'
// CityData: 用于存储城市数据的二维数组，每行代表一条记录，每列代表不同的数据项
const CityData = ref([])

// columnIndex: 存储每行数据的索引列，通常用来表示行号或某种标识符
const columnIndex = ref([])

// Headerdata: 存储表格的表头数据，代表每列的标题
const Headerdata = ["城市订单量", "店铺数", "接单骑手人数", "新店铺数量", "人均订单量"]

// AVERAGEWIDTH: 存储表头每列的平均宽度
const AVERAGEWIDTH = ref([])

// COLUMNAVERAGEWIDTH: 存储每列的平均宽度，除了第一列的额外宽度（通常用于索引列）
const COLUMNAVERAGEWIDTH = ref([])

// columnNumber: 表示每列的数量或展示的列数，可能会影响表格的布局
const columnNumber = ref(10)

// AverageHeighT: 存储每行的平均高度，用于控制行高
const AverageHeighT = ref(0)

// COLUMNHEIGHT: 存储每行的高度，用于控制行的高度
const COLUMNHEIGHT = ref([])

// Datalenght: 存储数据的长度，即行数
const Datalenght = ref(0)

// CURRENTINDEX: 当前滚动到的索引位置，用于动画或分页等功能
const CURRENTINDEX = ref(0)

// CURRENTDATA: 存储当前显示的数据，用于表格的内容展示
const CURRENTDATA = ref([])

// ID: 每个表格的唯一标识符，使用 UUID 来确保唯一性
const ID = `BaseScorelist+${uuidv4()}`

// BGCOLOR1: 表格背景颜色 1，用于奇数行或默认背景色
const BGCOLOR1 = 'rgb(55,55,55)'

// BGCOLOR2: 表格背景颜色 2，用于偶数行或替代背景色
const BGCOLOR2 = 'rgb(44,44,44)'

// align: 表格每列的对齐方式，这里是全部居中
const align = ["center", "center", "center", "center", "center", "center"]

const { width, height } = init(ID)
// 生成 UUID 的函数
function generateUUID() {
    return uuidv4();
}
// 处理数据行，将数据转换为适合显示的格式
const Handeldata = () => {
    // 为每一行数据添加行索引
    CityData.value.map((item, index) => {
        item.unshift(columnIndex.value[index])
    })

    // 生成包含行数据和行索引的数组
    const data = CityData.value.map((item, index) => {
        return {
            data: item,
            Rowindex: index
        }
    })

    // 更新 CityData
    CityData.value = data
}

// 处理表头的宽度
const HandelHeaderAverageWidth = () => {
    const needAverage = Headerdata.length
    const currentWidth = 50
    // 计算表头的平均宽度
    const averagewidth = (width.value - currentWidth) / needAverage
    AVERAGEWIDTH.value = new Array(Headerdata.length)
    AVERAGEWIDTH.value.fill(averagewidth)
}
// 处理表格列的平均宽度（除了索引列）
const HandelColumnAverageWidth = () => {
    let needAverage = 5
    const averagewidth = (width.value - 40) / needAverage
    COLUMNAVERAGEWIDTH.value = new Array(5)
    COLUMNAVERAGEWIDTH.value.fill(averagewidth)
    COLUMNAVERAGEWIDTH.value.unshift(50)
}
// 处理每行的平均高度
const HandelAverageHeight = () => {
    const AverageHeight = height.value / columnNumber.value
    AverageHeighT.value = AverageHeight
    const TotalCount = 23
    COLUMNHEIGHT.value = new Array(TotalCount).fill(AverageHeight)
}
// 启动动画，控制表格内容的滚动
const StartAnimation = async () => {
    console.log("111")
    // 获取真实数据长度
    const alldataLenght = CityData.value.length;
    const MoveNumber = 1;
    const index = CURRENTINDEX.value;

    // 当数据长度小于需要移动的数量时，直接退出
    // if (alldataLenght <= MoveNumber) return;
    console.log("进入了动画函数 StartAnimation")

    const rowdata = cloneDeep(CityData.value);
    const rows = rowdata.slice(index); // 获取当前起始位置后的数据

    // 连接数据头尾，避免卡顿
    rows.push(...rowdata.slice(0, index));

    CURRENTDATA.value = rows;
    COLUMNHEIGHT.value = new Array(alldataLenght).fill(AverageHeighT.value);

    const awaitTime = 500;
    await new Promise(resolve => setTimeout(resolve, awaitTime));

    // 更新前几个行的高度为 0
    COLUMNHEIGHT.value.splice(0, MoveNumber, ...new Array(MoveNumber).fill(0));

    // 更新当前索引
    CURRENTINDEX.value += MoveNumber;
    const ISLAST = CURRENTINDEX.value - alldataLenght;
    if (ISLAST >= 0) {
        CURRENTINDEX.value = ISLAST; // 循环回到数据开始位置
    }

    await new Promise(resolve => setTimeout(resolve, 800 - awaitTime));
    await StartAnimation(); // 递归调用自身进行动画
    console.log("调用了动画函数 StartAnimation");
};

watch(() => Alluserdata.value, (NewData) => {
    Datalenght.value = NewData.length;
    CityData.value = [];  // 清空原有数据

    for (let i = 0; i < Datalenght.value; i++) {
        CityData.value[i] = [];
        // 生成列索引和内容
        if (i % 2 === 0) {
            columnIndex.value[i] = `<div style="width:100%; padding-left=5px; height:100%; display:flex; align-items:center; justify-content:center; background:rgb(44,44,44)">
            <div style="width:15px;height:15px;background:rgb(72,122,72);border-radius:50%;border:1px solid #fff;"/>
            </div>`;
        } else {
            columnIndex.value[i] = `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:rgb(44,44,44)">
            <div style="width:15px;height:15px;background:rgb(38,88,104);border-radius:50%;border:1px solid #fff;"/>
            </div>`;
        }
        // 生成数据行
        for (let i = 0; i < Datalenght.value; i++) {
            CityData.value[i] = [];

            // 根据行索引来决定前面点的背景颜色
            const pointBgColor = i % 2 === 0 ? 'rgb(44,44,44)' : 'rgb(55,55,55)'; // 偶数行和奇数行的背景颜色

            columnIndex.value[i] = `
        <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:${pointBgColor}">
            <div style="width:15px;height:15px;background:rgb(72,122,72);border-radius:50%;border:1px solid #fff;"></div>
        </div>`;

            // 生成数据行
            for (let j = 0; j < 5; j++) {
                let text = '';
                switch (j) {
                    case 0: text = NewData[i].order; break;
                    case 1: text = NewData[i].shop; break;
                    case 2: text = NewData[i].rider; break;
                    case 3: text = NewData[i].newShop; break;
                    case 4: text = NewData[i].avgOrder; break;
                }
                // 其他列的内容颜色保持不变
                if (j === 1 || j === 3) {
                    CityData.value[i].push(`<div style="color:rgb(178,209,126)">${text}</div>`);
                } else {
                    CityData.value[i].push(`<div>${text}</div>`);
                }
            }
        }

    }
    Handeldata();
});

onMounted(() => {

    StartAnimation()
    Handeldata()
    HandelHeaderAverageWidth()
    HandelColumnAverageWidth()
    HandelAverageHeight()
})

</script>

<style scoped lang="less">
.AutoScrollTabel {
    width: 100%;
    height: 100%;
    // margin: 30px;
    user-select: none;
    box-sizing: border-box;

    .header {
        display: flex;
        align-items: center;
        // justify-content: space-around;
        background-color: rgb(90, 90, 90);
        color: rgb(255, 255, 255);
        padding-left: 50px;

        .headeritem {
            font-size: 15px;
            padding: 10px 0;
            text-align: center;
        }

    }

    .ColumLIst {
        .itemWrapper {
            overflow: hidden;
            display: flex;
            font-size: 30px;
            align-items: center;
            transition: all 0.3s linear;

            .item {
                width: 100%;
                height: 100%;
                overflow: hidden;
                text-align: center;
                // align-items: center;
                font-size: 20px;
                // padding: 10px 0px;
            }
        }

    }
}
</style>

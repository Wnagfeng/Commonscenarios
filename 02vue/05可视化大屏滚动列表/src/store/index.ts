import { defineStore } from 'pinia'

// 定义 `UserData` 数据结构类型
interface UserData {
    order: string;  // 修改为 string 类型
    shop: string;   // 修改为 string 类型
    rider: string;  // 修改为 string 类型
    newShop: string; // 修改为 string 类型
    avgOrder: string; // 修改为 string 类型
    Rowindex?: number; // 添加 RowIndex 字段
}

// 定义 store
export const useAllUserDataStore = defineStore('AllUserData', {
    state: (): { Alluserdata: UserData[] } => ({
        Alluserdata: [
            { "order": "北京 -17%", "shop": "北京 -3%", "rider": "北京 +20%", "newShop": "北京 +14%", "avgOrder": "北京 -16%" },
            { "order": "上海 -19%", "shop": "上海 +12%", "rider": "上海 -15%", "newShop": "上海 +15%", "avgOrder": "上海 -21%" },
            { "order": "广州 +20%", "shop": "广州 -5%", "rider": "广州 +17%", "newShop": "广州 -15%", "avgOrder": "广州 +10%" },
            { "order": "深圳 -4%", "shop": "深圳 -23%", "rider": "深圳 -5%", "newShop": "深圳 +15%", "avgOrder": "深圳 -4%" },
            { "order": "南京 +10%", "shop": "南京 -6%", "rider": "南京 -7%", "newShop": "南京 -5%", "avgOrder": "南京 -22%" },
            { "order": "杭州 -3%", "shop": "杭州 +20%", "rider": "杭州 +16%", "newShop": "杭州 -11%", "avgOrder": "杭州 -17%" },
            { "order": "合肥 +8%", "shop": "合肥 +17%", "rider": "合肥 -23%", "newShop": "合肥 +6%", "avgOrder": "合肥 -11%" },
            { "order": "济南 -13%", "shop": "济南 -11%", "rider": "济南 +6%", "newShop": "济南 -7%", "avgOrder": "济南 +18%" },
            { "order": "太原 -11%", "shop": "太原 -10%", "rider": "太原 +18%", "newShop": "太原 -14%", "avgOrder": "太原 -2%" },
            { "order": "成都 +19%", "shop": "成都 -6%", "rider": "成都 +14%", "newShop": "成都 -19%", "avgOrder": "成都 +10%" },
            { "order": "重庆 -12%", "shop": "重庆 +12%", "rider": "重庆 +12%", "newShop": "重庆 +7%", "avgOrder": "重庆 -3%" },
            { "order": "苏州 +15%", "shop": "苏州 +18%", "rider": "苏州 -8%", "newShop": "苏州 -3%", "avgOrder": "苏州 +4%" },
            { "order": "无锡 -15%", "shop": "无锡 -19%", "rider": "无锡 -14%", "newShop": "无锡 +21%", "avgOrder": "无锡 -21%" },
            { "order": "常州 +12%", "shop": "常州 +10%", "rider": "常州 +5%", "newShop": "常州 -22%", "avgOrder": "常州 -13%" },
            { "order": "温州 -14%", "shop": "温州 -16%", "rider": "温州 -15%", "newShop": "温州 +14%", "avgOrder": "温州 +17%" },
            { "order": "哈尔滨 +5%", "shop": "哈尔滨 -18%", "rider": "哈尔滨 -18%", "newShop": "哈尔滨 -18%", "avgOrder": "哈尔滨 -20%" },
            { "order": "长春 +14%", "shop": "长春 -5%", "rider": "长春 -17%", "newShop": "长春 +18%", "avgOrder": "长春 +4%" },
            { "order": "大连 -4%", "shop": "大连 -15%", "rider": "大连 -22%", "newShop": "大连 +14%", "avgOrder": "大连 +14%" },
            { "order": "沈阳 -1%", "shop": "沈阳 -21%", "rider": "沈阳 -15%", "newShop": "沈阳 +24%", "avgOrder": "沈阳 +8%" },
            { "order": "拉萨 +18%", "shop": "拉萨 +5%", "rider": "拉萨 -6%", "newShop": "拉萨 -24%", "avgOrder": "拉萨 -10%" },
            { "order": "呼和浩特 +14%", "shop": "呼和浩特 -12%", "rider": "呼和浩特 +8%", "newShop": "呼和浩特 +9%", "avgOrder": "呼和浩特 -21%" },
            { "order": "武汉 -21%", "shop": "武汉 +13%", "rider": "武汉 -10%", "newShop": "武汉 -14%", "avgOrder": "武汉 +10%" },
            { "order": "南宁 -22%", "shop": "南宁 +23%", "rider": "南宁 -9%", "newShop": "南宁 +6%", "avgOrder": "南宁 -12%" }
        ] // 初始数据
    }),
    actions: {
        // 更新数据，并保持 RowIndex 一致
        setAllUserData(newData: UserData[]) {
            // 更新数据时可以保持 RowIndex
            this.Alluserdata = newData.map((item, index) => ({
                ...item,
                Rowindex: index + 1 // 给每一行加上递增的 RowIndex，从 1 开始
            }));
            console.log("Store updated");
        },
        // 添加新数据
        addData(data: UserData) {
            const newRowIndex = this.Alluserdata.length ? Math.max(...this.Alluserdata.map(item => item.Rowindex!)) + 1 : 1;
            this.Alluserdata.push({ ...data, Rowindex: newRowIndex });
        },

        getAllUserData() {
            return this.Alluserdata;
        }
    }
});

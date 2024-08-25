/**
 * title:过滤菜单项，保留特定的菜单项及其包含的子菜单项。
 * author: Joon
 * date:2024-08-05
 * @param {Array} menuList - 包含所有菜单项的数组，每个菜单项为一个对象。
 * @param {Array} menuIds - 需要保留的菜单项的 id 列表。
 * @returns {Array} 返回一个过滤后的菜单数组，仅包含指定 id 的菜单项及其有效的子菜单项。
 */
function filterMenu(menuList, menuIds) {
    return menuList.reduce((filteredMenu, menuItem) => {
        // 递归处理子菜单
        if (menuItem.children) {
            menuItem.children = filterMenu(menuItem.children, menuIds);
        }

        // 检查当前菜单项是否在保留列表中，或其是否有有效子菜单
        if (menuIds.includes(menuItem.id) || (menuItem.children && menuItem.children.length > 0)) {
            filteredMenu.push(menuItem);
        }

        return filteredMenu;
    }, []);
}

// 示例菜单列表
const menuList = [
    {
        id: 1, name: "Menu 1", children: [
            {
                id: 2, name: "Submenu 1-1", children: [
                    { id: 3, name: "Submenu 1-1-1" },
                    { id: 4, name: "Submenu 1-1-2" }
                ]
            },
            { id: 5, name: "Submenu 1-2" }
        ]
    },
    { id: 6, name: "Menu 2" }
];

// 需要保留的菜单项 id 列表
const menuIds = [1, 2, 4, 6];

// 过滤后的菜单
const filteredMenu = filterMenu(menuList, menuIds);

/**
 * 打印菜单及其子菜单的名称。
 * 
 * @param {Array} menu - 要打印的菜单数组。
 */
function printMenu(menu) {
    for (let item of menu) {
        console.log(item.name);
        if (item.children && item.children.length > 0) {
            printMenu(item.children);
        }
    }
}

// 打印过滤后的菜单项及其子菜单
printMenu(filteredMenu);

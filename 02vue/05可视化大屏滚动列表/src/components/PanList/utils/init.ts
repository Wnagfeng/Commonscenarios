import { ref, onMounted } from 'vue'

const init = (id: string) => {
    const width = ref<number>(0)
    const height = ref<number>(0)

    // 获取 dom
    onMounted(() => {
        const container = document.getElementById(id) as HTMLElement | null
        if (container) {
            const domwidth = container.clientWidth
            const domheight = container.clientHeight
            // 初始化宽高
            width.value = domwidth
            height.value = domheight
        }
    })

    return {
        width,
        height
    }
}

export default init

import { createRouter, createWebHistory } from 'vue-router';
import A from './views/a.vue';
import B from './views/b.vue';
import C from './views/c.vue';
import store from '../store';

const routes = [
    {
        path: '/',
        name: 'A',
        component: A,
        meta: { index: 0 }, // Add index for determining animation direction
    },
    {
        path: '/b',
        name: 'B',
        component: B,
        meta: { index: 1 }, // Add index for determining animation direction
    },
    {
        path: '/c',
        name: 'C',
        component: C,
        meta: { index: 2 }, // Add index for determining animation direction
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.length > 0 && from.matched.length > 0) {
        const fromIndex = from.matched[0].meta.index;
        const toIndex = to.matched[0].meta.index;
        const direction = fromIndex <= toIndex ? 'right' : 'left';
        store.routerSwitch.fromIndex = fromIndex;
        store.routerSwitch.toIndex = toIndex;
        store.routerSwitch.direction = direction;
    }
    next();
});

export default router;

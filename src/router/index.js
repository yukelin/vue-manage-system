import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            // redirect: '/dashboard'
            redirect: '/user_manage'

        },
        {
            path: '/',
            component: () => import('../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [

                {
                    path: '/dashboard',
                    component: () => import('../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/user_manage',
                    component: () => import('../components/page/UserManagement.vue'),
                    meta: { title: '用户' }
                },
                {
                    path: '/energy_log',
                    component: () => import('../components/page/EnergyLogManagement.vue'),
                    meta: { title: '用户能量记录' }
                },
                {
                    path: '/code_edit',
                    component: () => import('../components/page/CodeManagement.vue'),
                    meta: { title: '兑换码' }
                },
                {
                    path: '/dress',
                    component: () => import('../components/page/DressManagement.vue'),
                    meta: { title: '装扮管理' }
                },
                {
                    path: '/sapling',
                    component: () => import('../components/page/TreeManagement.vue'),
                    meta: { title: '树苗' }
                },
                {
                    path: '/tree_log',
                    component: () => import('../components/page/TreeLogManagement.vue'),
                    meta: { title: '种树记录' }
                },
                {
                    path: '/code_log',
                    component: () => import('../components/page/CodeLogManagement.vue'),
                    meta: { title: '兑换记录' }
                },
                {
                    path: '/work',
                    component: () => import('../components/page/WorkManagement.vue'),
                    meta: { title: '任务管理' }
                },
                {
                    path: '/action',
                    component: () => import('../components/page/ActionManagement.vue'),
                    meta: { title: '公告管理' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import('../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import('../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import('../components/page/403.vue'),
                    meta: { title: '403' }
                }

            ]
        },
        {
            path: '/login',
            component: () => import('../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});

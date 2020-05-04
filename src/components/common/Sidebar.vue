<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
                // {
                //     icon: 'el-icon-lx-home',
                //     index: 'dashboard',
                //     title: '系统首页'
                // },
                {
                    icon: 'el-icon-lx-people',
                    index: 'user',
                    title: '用户管理',

                    subs: [
                        {
                            index: 'user_manage',
                            title: '用户'
                        },
                        {
                            index: 'energy_log',
                            title: '用户能量记录'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-skin',
                    index: 'dress',
                    title: '装扮管理'
                },
                {
                    icon: 'el-icon-collection-tag',
                    index: 'tree',
                    title: '种树管理',
                    subs: [
                        {
                            index: 'sapling',
                            title: '树苗'
                        },
                        {
                            index: 'tree_log',
                            title: '种树记录'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-qrcode',
                    index: 'code',
                    title: '兑换码管理',
                    subs: [
                        {
                            index: 'code_edit',
                            title: '兑换码'
                        },
                        {
                            index: 'code_log',
                            title: '兑换记录'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-text',
                    index: 'work',
                    title: '任务管理'
                },
                {
                    icon: 'el-icon-lx-news',
                    index: 'action',
                    title: '公告管理'
                }
                // {
                //     icon: 'el-icon-lx-warn',
                //     index: '7',
                //     title: '错误处理',
                //     subs: [
                //         {
                //             index: 'permission',
                //             title: '权限测试'
                //         },
                //         {
                //             index: '404',
                //             title: '404页面'
                //         }
                //     ]
                // }
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>

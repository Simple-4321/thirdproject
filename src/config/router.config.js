// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout, PageView } from '@/layouts'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '读片会管理员系统' },
    redirect: 'meeting',
    children: [
      // list
      {
        path: '/meeting',
        name: 'meeting',
        component: PageView,
        redirect: '/meeting/Manage',
        meta: { title: '会议管理', icon: 'table', permission: ['table'] },
        children: [
          {
            path: '/meeting/Manage',
            name: 'MettingManage',
            component: RouteView,
            hideChildrenInMenu: true,
            redirect: '/meeting/Manage/list',
            meta: { title: '会议管理', keepAlive: false, permission: ['table'] },
            children: [
              {
                path: '/meeting/Manage/list',
                name: 'MettingManageList',
                hidden: true,
                component: () => import('@/views/list'),
                meta: { title: '会议列表', keepAlive: false, permission: ['table'] }
              },
              {
                path: '/meeting/Manage/add',
                name: 'MettingAdd',
                hidden: true,
                component: () => import('@/views/list/component/Edit'),
                meta: { title: '添加会议', keepAlive: true, permission: ['table'] }
              },
              {
                path: '/meeting/Manage/edit/:id',
                name: 'MettingEdit',
                hidden: true,
                component: () => import('@/views/list/component/Edit'),
                meta: { title: '会议编辑', keepAlive: true, permission: ['table'] }
              },
              {
                path: '/meeting/Manage/Detail/:id',
                name: 'MettingInfo',
                hidden: true,
                component: () => import('@/views/list/component/Info'),
                meta: { title: '会议详情', keepAlive: true, permission: ['table'] }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]

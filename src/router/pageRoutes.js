import BlankRouter from './BlankRouter.vue'
export default [
  {
    path: '/linktop2',
    name: 'linktop2',
    component: BlankRouter,
    meta: { menuName: "领效2.0" },
    children: [
      {
        path: '/linktop2/genCode',
        name: 'linktop2-genCode',
        // (genVueSFC.[hash].js)
        component: () => import('@/pages/genVueSFC/index.vue'),
        meta: { menuName: "代码生成" },
      },
      {
        path: '/linktop2/about',
        name: 'linktop2-about',
        component: () => import('@/pages/AboutView.vue'),
        meta: { menuName: "更多" },
      }
    ]
  }
]
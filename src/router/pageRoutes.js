export default [
  {
    path: '/genCode',
    name: 'genCode',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../pages/MainView.vue'),
    meta: { menuName: "代码生成" }
  }
]
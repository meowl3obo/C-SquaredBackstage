import { RouteRecordRaw } from 'vue-router'
import Product from "@/views/Product.vue";

export const product: RouteRecordRaw = {
  path: "/product",
  component: Product,
  children: [
    {
      path: "create",
      component: () => import("@/views/product/Create.vue")
    }
  ],
  meta: {
    title: "C-Squared 管理後台 - 產品管理"
  }
}
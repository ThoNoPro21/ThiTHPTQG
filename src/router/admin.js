const admin = [
    {
        path: "/admin",
        component: () => import("../layouts/admin.vue"),
        children: [
            //-------Router User------------------
            {
                path: "users",
                name: "admin-users",
                component: () => import("../pages/admin/users/index.vue"),

            },
            {
                path: "users/create",
                name: "admin-users-create",
                component: () => import("../pages/admin/users/create.vue"),

            }, 
            {
                path: "users/edit/:id",
                name: "admin-users-edit",
                component: () => import("../pages/admin/users/edit.vue"),

            },
            {
                path: "users/delete/:id",
                name: "admin-users-delete",
                component: () => import("../pages/admin/users/delete.vue"),
            },

            //------------Router Roles------------
            {
                path: "roles",
                name: "admin-roles",
                component: () => import("../pages/admin/roles/index.vue"),
            },
            {
                path: "roles/create",
                name: "admin-roles-create",
                component: () => import("../pages/admin/roles/create.vue"),
            },
            {
                path: "roles/edit/:id",
                name: "admin-roles-edit",
                component: () => import("../pages/admin/roles/edit.vue"),
            },
            {
                path: "roles/delete/:id",
                name: "admin-roles-delete",
                component: () => import("../pages/admin/roles/delete.vue"),
            },

            //--------------Router Category-----------------------
            {
                path: "category",
                name: "admin-category",
                component: () => import("../pages/admin/category/index.vue"),
            },
            {
                path: "category/create",
                name: "admin-category-create",
                component: () => import("../pages/admin/category/create.vue"),
            },
            {
                path: "category/edit/:id",
                name: "admin-category-edit",
                component: () => import("../pages/admin/category/edit.vue"),
            },
            {
                path: "category/delete/:id",
                name: "admin-category-delete",
                component: () => import("../pages/admin/category/delete.vue"),
            },

            //--------------Router theloai-------------------------------

            {
                path: "theloai",
                name: "admin-theloai",
                component: () => import("../pages/admin/theloai/index.vue"),
            },
            {
                path: "theloai/create",
                name: "admin-theloai-create",
                component: () => import("../pages/admin/theloai/create.vue"),
            },
            {
                path: "theloai/edit/:id",
                name: "admin-theloai-edit",
                component: () => import("../pages/admin/theloai/edit.vue"),
            },
            {
                path: "theloai/delete/:id",
                name: "admin-theloai-delete",
                component: () => import("../pages/admin/theloai/delete.vue"),
            },

            //--------------Router product--------------------------------
            {
                path: "product-main",
                name: "admin-product-main",
                component: () => import("../pages/admin/product/main.vue"),
            },
            {
                path: "product-main/product",
                name: "admin-product",
                component: () => import("../pages/admin/product/index.vue"),
            },
            {
                path: "product/create",
                name: "admin-product-create",
                component: () => import("../pages/admin/product/create.vue"),
            },
            {
                path: "product/edit/:id",
                name: "admin-product-edit",
                component: () => import("../pages/admin/product/edit.vue"),
            },
            {
                path: "product/delete/:id",
                name: "admin-product-delete",
                component: () => import("../pages/admin/product/delete.vue"),
            },
            //------------------------route thuonghieu-----------------
            {
                path: "thuonghieu",
                name: "admin-thuonghieu",
                component: () => import("../pages/admin/other/thuonghieu.vue"),
            },
            {
                path: "thuonghieu/create",
                name: "admin-thuonghieu-create",
                component: () => import("../pages/admin/other/create-thuonghieu.vue"),
            },
            {
                path: "thuonghieu/edit/:id",
                name: "admin-thuonghieu-edit",
                component: () => import("../pages/admin/other/edit.vue"),
            },
            {
                path: "thuonghieu/delete/:id",
                name: "admin-thuonghieu-delete",
                component: () => import("../pages/admin/other/delete.vue"),
            },
            //----------------------
            {
                path: "chovanchuyen",
                name: "admin-chovanchuyen",
                component: () => import("../pages/admin/chovanchuyen/index.vue"),
            },
            {
                path: "donhang",
                name: "admin-donhang",
                component: () => import("../pages/admin/donhang/index.vue"),
            },
            {
                path: "home",
                name: "admin-home",
                component: () => import("../pages/admin/home/index.vue"),
            },
        ],
    }
]
export default admin;
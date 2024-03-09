<template>
    <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline" >
        
        <a-menu-item key="admin-home">
            <router-link :to="{ name:'admin-home'}">
                <span><i class="fa-solid fa-house me-1"></i>Trang chủ</span>
            </router-link>
        </a-menu-item>

        <a-menu-item key="admin-category">
            <router-link :to="{name:'admin-category'}">
                <span><i class="fa-solid fa-layer-group me-1"></i>Danh mục</span>
            </router-link>
        </a-menu-item>

        <a-menu-item key="admin-theloai">
            <router-link :to="{name:'admin-theloai'}">
                <span><i class="fa-solid fa-map me-1"></i>Thể loại</span>
            </router-link>
        </a-menu-item>

        <a-menu-item key="admin-product-main">
            <router-link :to="{name:'admin-product-main'}">
                <span><i class="fa-solid fa-book-open me-1"></i>Sản phẩm</span>
            </router-link>
        </a-menu-item>

        <a-menu-item key="admin-chovanchuyen">
            <router-link :to="{name:'admin-chovanchuyen'}">
                <span><i class="fa-solid fa-clock-rotate-left me-1"></i>Chờ vận chuyển</span>
            </router-link>
        </a-menu-item>

        <a-menu-item key="admin-donhang">
            <router-link :to="{name:'admin-donhang'}">
                <span><i class="fa-solid fa-cart-shopping me-1"></i>Đơn hàng</span>
            </router-link>
        </a-menu-item>

        <a-menu-item key="admin-users">
            <router-link :to="{name:'admin-users'}">
                <span><i class="fa-solid fa-user me-1"></i>Tài khoản</span>
            </router-link>
        </a-menu-item>

        <a-menu-item key="admin-roles">
            <router-link :to="{name:'admin-roles'}">
                <span><i class="fa-solid fa-user-tag me-1"></i>Vai trò</span>
            </router-link>
        </a-menu-item>
       
    </a-menu>
</template>

<script>
import { defineComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useMenu } from '../stores/menu.js';
export default defineComponent({
    setup() {
       const store=useMenu()
       const { selectedKeys,openKeys}=store
       
       return { ...storeToRefs(store) }
    }, 
    components:{
   
    }
});
</script>

<style></style>
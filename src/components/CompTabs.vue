<template>
    <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="horizontal" >
        <a-menu-item key="admin-product">
            <router-link :to="{ name:'admin-product'}">
                <span>Sản Phẩm</span>
            </router-link>
        </a-menu-item>
        <a-menu-item key="admin-thuonghieu">
            <router-link :to="{ name:'admin-thuonghieu'}">
                <span>Thương Hiệu</span>
            </router-link>
        </a-menu-item>
        <a-menu-item key="3" >
            <router-link :to="{ name:'admin-thuonghieu'}">
                <span>DÒNG CPU</span>
            </router-link>
            
        </a-menu-item>

        <a-menu-item key="4" >
            <router-link :to="{ name:'admin-thuonghieu'}">
                <span>DÒNG GPU</span>
            </router-link>
            
        </a-menu-item>

        <a-menu-item key="5" >
            <router-link :to="{ name:'admin-thuonghieu'}">
                <span>LOẠI RAM</span>
            </router-link>
          
        </a-menu-item>

        <a-menu-item key="6" tab="LOẠI ROM">
            <router-link :to="{ name:'admin-thuonghieu'}">
                <span> LOẠI ROM</span>
            </router-link>
           
        </a-menu-item>
        <a-menu-item key="7" >
            <router-link :to="{ name:'admin-thuonghieu'}">
                <span> KIỂU KẾT NỐI</span>
            </router-link>
           
        </a-menu-item>
       
    </a-menu>
</template>

<script>
import { defineComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useTabs } from '../stores/tabs.js';
export default defineComponent({
    setup() {
       const store=useTabs()
       const { selectedKeys,openKeys }=store
       
       return { ...storeToRefs(store) }
    }, 
    components:{
   
    }
});
</script>

<style></style>
<template>
    <div class="container-fluid">
        <div class="row align-items-center d-position-fixed" style="background-color: aqua; padding: 1rem;color: black;">
            <div class="col-1 d-flex d-sm-none align-items-center justify-content-center">
                <span @click="showDrawer()"><i class="fa-solid fa-align-justify"></i></span>
            </div>

            <div class="col-10 col-sm-9 d-flex align-items-center justify-content-center justify-content-sm-start">
                <img src="../assets/logo.png" width="34" height="32" style="border-radius: 50%;" class="ms-3 me-3">
                <span class="d-none d-sm-flex " style="font-size: 1rem;">T-Shop</span>
            </div>

            <div class="col-sm-3 d-none d-sm-flex  align-items-center justify-content-center">
                <span style="font-size: 1rem;">Admin</span>
            </div>

            <div class="col-1 d-flex d-sm-none align-items-center justify-content-center">
                <span>X</span>
            </div>
            <a-drawer v-model:visible="visible" title="Danh mục" placement="left" width="220px">
                <CompTheMenu />
            </a-drawer>
        </div>
    </div>
</template>

<script>

import { defineComponent, ref } from 'vue';
import CompTheMenu from './CompTheMenu.vue';
export default defineComponent({
    setup() {
        const visible = ref(false);
        const showDrawer = () => {
            visible.value = true;
        };
        return {
            visible,
            showDrawer,
        };
    },
    components: {
        CompTheMenu,
        
    }
});
</script>

<style></style>
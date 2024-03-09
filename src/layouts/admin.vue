<template>
    <CompTheHeader />
    <div class="container-fluid">
        <div class="row" style="margin-top: 20px;">
            <div class="col-sm-3 d-none d-sm-flex">
                <a-list bordered style="width: 100%;">
                    <template #header>
                        <div><b>BẢNG ĐIỀU KHIỂN</b></div>
                    </template>
                    <CompTheMenu />
                </a-list>
            </div>

            <div class="col-sm-9">
                <router-view></router-view>

            </div>
        </div>
    </div>
</template>

<script>
import CompTheHeader from '../components/CompTheHeader.vue'
import CompTheMenu from '../components/CompTheMenu.vue';
export default {
    components: {
        CompTheHeader,
        CompTheMenu
    }
};

</script>

<style></style>
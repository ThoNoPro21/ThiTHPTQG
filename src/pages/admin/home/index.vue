<template>
    Đây la trang chủ
</template>

<script>
import { useMenu } from '../../../stores/menu.js';
export default {
    setup() {
        const store = useMenu()
        store.selectedKeys=['admin-home']
    }
};
</script>

<style></style>
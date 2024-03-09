<template>
    Đây la trang đơn hàng
</template>

<script>
import { useMenu } from '../../../stores/menu.js';
export default {
    setup() {
        const store = useMenu()
        store.selectedKeys=['admin-donhang']
    }
};
</script>

<style></style>
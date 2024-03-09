<template>
    Đây la trang chờ vận chuyển
</template>
<script>
import { useMenu } from '../../../stores/menu.js';
export default {
    setup() {
        const store = useMenu()
        store.selectedKeys=['admin-chovanchuyen']
    }
};
</script>

<style></style>

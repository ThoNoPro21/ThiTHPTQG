<template>
    <div class="row">
        <a-list bordered style="width: 100%;">
        <template #header>
            <CompTabs />
        </template>
    </a-list>
    <router-view></router-view>
    </div>

</template>

<script>
import CompTabs from '../../../components/CompTabs.vue'
import { defineComponent, ref } from 'vue';
import { useTabs } from '../../../stores/tabs.js';
export default defineComponent({
    setup() {
        const store = useTabs()
        store.selectedKeys = ['admin-product']
    },
    components: {
        CompTabs
    }
});
</script>

<style></style>
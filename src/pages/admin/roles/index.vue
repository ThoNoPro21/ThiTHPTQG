<template>
    <a-list bordered style="width: 100%;">
        <template #header>
            <div><b>VAI TRÒ</b></div>
        </template>

        <div class="row">
            <div class="col-12 ">
                <a-table :columns="columns" :data-source="rules" :scroll="{ x: 576, y: 200 }"
                    @resizeColumn="handleResizeColumn">

                    <template #bodyCell="{ column, index, record }">

                        <template v-if="column.key === 'stt'">
                            <a>
                                {{ index + 1 }}
                            </a>
                        </template>

                        <template v-if="column.key === 'roles'">
                            <a-tag v-if="record.id == 1" color="green">{{ record.name }}</a-tag>
                            <a-tag v-else-if="record.id == 2" color="cyan">{{ record.name }}</a-tag>
                            <a-tag v-else-if="record.id == 3" color="purple">{{ record.name }}</a-tag>
                            <a-tag v-else-if="record.id == 4" color="pink">{{ record.name }}</a-tag>
                            <a-tag v-else color="orange">{{ record.name }}</a-tag>
                        </template>

                        <template v-if="column.key === 'action'">
                            <a-space :size="16">
                                <router-link :to="{ name: 'admin-roles-edit', params: { id: record.id } }">
                                    <i class="fa-solid fa-pen-to-square" style="cursor: pointer;"></i>
                                </router-link>

                                <router-link :to="{ name: 'admin-roles-delete', params: { id: record.id } }">
                                    <a-button @click="showConfirm" class="me-2">
                                        <i class="fa-solid fa-trash-can" style="cursor: pointer;"></i>
                                    </a-button>
                                </router-link>

                            </a-space>
                        </template>

                    </template>
                </a-table>
            </div>
        </div>

        <router-link :to="{ name: 'admin-roles-create' }">
            <a-button type="primary"><i class="fa-solid fa-plus me-1"></i>Tạo mới vai trò</a-button>
        </router-link>

    </a-list>
</template>

<script>
import { useMenu } from '../../../stores/menu.js';
import { defineComponent, ref } from 'vue';
import { Modal } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';

export default defineComponent({
    setup() {
        const store = useMenu()
        store.selectedKeys = ['admin-roles']

        const router = useRouter();
        const route = useRoute();
        const rules = ref([]);

        const columns = ref([
            {
                title: 'STT',
                key: 'stt',
                width: '60px',
            },
            {
                title: 'ID',
                key: 'id',
                dataIndex: 'id',
                width: '60px',
            },
            {
                title: 'Tên vai trò',
                key: 'roles',
                dataIndex: 'name',
                width: 200,
                minWidth: 100,
                resizable: true,
            },
            {
                title: 'Chỉnh sửa',
                key: 'action',
                fixed: 'right',
                width: 70,
                maxWidth: 200,
                resizable: true,
            }
        ])

        //call API lấy Rules
        const getRules = () => {
            axios.get('http://127.0.0.1:8000/api/roles/')
                .then((response) => {
                    rules.value = response.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        getRules();

        //Modal thoát
        const showConfirm = () => {
            Modal.confirm({
                title: 'Bạn chắc chắn muốn xóa Vai trò này ?',
                content: "Khi bạn nhấn 'OK' mọi dữ liệu sẽ được xóa !",
                onOk() {
                    return new Promise((resolve) => {
                        setTimeout(resolve, 2000);
                    })
                        .then(() =>
                            axios.delete('http://127.0.0.1:8000/api/roles/delete/' + `${route.params.id}`)
                                .then((response) => {

                                    router.push({ name: 'admin-roles' },
                                        message.success('Xóa thành công !', 3));
                                })
                                .catch((error) => {
                                    console.log(error);
                                })
                        )
                },
                onCancel() {
                    return new Promise((resolve) => {
                        setTimeout(resolve, 2000);
                    })
                        .then(() => router.push({ name: 'admin-roles' },
                            message.success('Hủy thành công !', 3),
                        ))
                }
            });
        };

        return {
            columns,
            rules,
            handleResizeColumn: (w, col) => {
                col.width = w;
            },
            showConfirm,
            router,
            route
        }
    }
});
</script>

<style></style>
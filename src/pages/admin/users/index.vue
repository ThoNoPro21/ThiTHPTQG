<template>
    <a-list bordered style="width: 100%;">
        <template #header>
            <div><b>TÀI KHOẢN</b></div>
        </template>
        
        <div class="row">
            <div class="col-12 ">
                <a-table :columns="columns" :data-source="users" :scroll="{ x: 576, y: 200 }"
                    @resizeColumn="handleResizeColumn">

                    <template #bodyCell="{ column, index, record }">

                        <template v-if="column.key === 'stt'">
                            <a>
                                {{ index + 1 }}
                            </a>
                        </template>

                        <template v-if="column.key === 'status'">
                            <a-tag v-if="record.status_id == 1" color="success">{{ record.status }}</a-tag>
                            <a-tag v-if="record.status_id == 2" color="error">{{ record.status }}</a-tag>
                        </template>

                        <template v-if="column.key === 'deparment'">
                            <a-tag v-if="record.deparment_id == 1" color="green">{{ record.deparment }}</a-tag>
                            <a-tag v-if="record.deparment_id == 2" color="cyan">{{ record.deparment }}</a-tag>
                            <a-tag v-if="record.deparment_id == 3" color="purple">{{ record.deparment }}</a-tag>
                            <a-tag v-if="record.deparment_id == 4" color="pink">{{ record.deparment }}</a-tag>
                        </template>

                        <template v-if="column.key === 'action'">
                            <a-space :size="16">
                                <router-link :to="{ name: 'admin-users-edit', params: { id: record.id } }">
                                    <i class="fa-solid fa-pen-to-square" style="cursor: pointer;"></i>
                                </router-link>

                                <router-link :to="{ name: 'admin-users-delete', params: { id: record.id } }">
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

        <router-link :to="{ name: 'admin-users-create' }">
            <a-button type="primary"><i class="fa-solid fa-plus me-1"></i>Tạo mới tài khoản</a-button>
        </router-link>

    </a-list>
</template>


<script>
import { useMenu } from '../../../stores/menu.js';
import { defineComponent, ref } from 'vue';
import { message } from 'ant-design-vue';
import { Modal } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default defineComponent({
    setup() {
        const store = useMenu()
        store.selectedKeys = ['admin-users']

        const router = useRouter();
        const route = useRoute();
        const users = ref([]);

        const columns = ref([
            {
                title: 'STT',
                key: 'stt',
                responsive: ['sm'],
                width: '60px',
            },
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                width: '60px',
            },
            {
                title: 'Tài khoản',
                dataIndex: 'name',
                key: 'name',
                width: '100px',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                width: 200,
                minWidth: 100,
                resizable: true,
            },
            {
                title: 'Vai trò',
                key: 'deparment',
                dataIndex: 'deparment',
                width: '100px',
            },
            {
                title: 'Tình trạng',
                dataIndex: 'status',
                key: 'status',
                width: '100px',
            },
            {
                title: 'Chỉnh sửa',
                key: 'action',
                fixed: 'right',
                width: '100px',
            },
        ]);

        const getUsers = () => {
            axios
                .get('http://127.0.0.1:8000/api/users/')
                .then((response) => {
                    users.value = response.data
                })
                .catch((err) => {
                    console.log(err)
                })
        };

        getUsers()

         //Modal thoát
         const showConfirm = () => {
            Modal.confirm({
                title: 'Bạn chắc chắn muốn xóa người dùng này ?',
                content: "Khi bạn nhấn 'OK' mọi dữ liệu sẽ được xóa !",
                onOk() {
                    return new Promise((resolve) => {
                        setTimeout(resolve, 2000);
                    })
                    .then(() => 
                        axios.delete('http://127.0.0.1:8000/api/users/delete/'+`${route.params.id}`)
                        .then((response) =>{
                            router.push({ name: 'admin-users' },
                            message.success('Xóa thành công !', 3));
                        })
                        .catch((error)=>{
                            console.log(error);
                        })
                    )
                },
                onCancel() { 
                    return new Promise((resolve) => {
                        setTimeout(resolve, 2000);
                    })
                    .then(() => router.push({ name: 'admin-users' },
                                message.success('Hủy thành công !', 3),
                                ))
                }
            });
        };


        return {
            users,
            columns,
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

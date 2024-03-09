<template>
    <a-list bordered style="width: 100%;">
        <template #header>
            <div><b>THỂ LOẠI</b></div>
        </template>
        <div class="row">
            <div class="col-12 ">
                <a-table :columns="columns" :data-source="theloai" :scroll="{ x: 576, y: 200 }"
                    @resizeColumn="handleResizeColumn">

                    <template #bodyCell="{ column, index, record }">

                        <template v-if="column.key === 'stt'">
                            <a>
                                {{ index + 1 }}
                            </a>
                        </template>

                        <template v-if="column.key === 'category'">
                            <a-tag v-if="record.id_danhmuc == 1" color="green">{{ record.name_danhmuc }}</a-tag>
                            <a-tag v-else-if="record.id_danhmuc == 7" color="cyan">{{ record.name_danhmuc }}</a-tag>
                            <a-tag v-else-if="record.id_danhmuc == 8" color="purple">{{ record.name_danhmuc }}</a-tag>
                            <a-tag v-else color="orange">{{ record.name_danhmuc }}</a-tag>
                        </template>

                        <template v-if="column.key === 'action'">
                            <a-space :size="16">
                                <router-link :to="{ name: 'admin-theloai-edit', params: { id: record.value } }">
                                    <i class="fa-solid fa-pen-to-square" style="cursor: pointer;"></i>
                                </router-link>

                                <router-link :to="{ name: 'admin-theloai-delete', params: { id: record.value } }">
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

        <router-link :to="{ name: 'admin-theloai-create' }">
            <a-button type="primary"><i class="fa-solid fa-plus me-1"></i>Tạo mới thể loại</a-button>
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
        store.selectedKeys = ['admin-theloai']

        const router = useRouter();
        const route = useRoute();
        const theloai = ref([]);

        const columns = ref([
            {
                title: 'STT',
                key: 'stt',
                width: '60px',
            },
            {
                title: 'ID',
                key: 'id',
                dataIndex: 'value',
                width: '60px',
            },
            {
                title: 'Tên thể loại',
                key: 'theloai',
                dataIndex: 'label',
                width: 200,
                minWidth: 100,
                resizable: true,
            },
            {
                title: 'Thuộc danh mục',
                key: 'category',
                dataIndex: 'name_danhmuc',
                width: 200,
                minWidth: 100,
                resizable: true,
            },
            {
                title: 'Chỉnh sửa',
                key: 'action',
                fixed: 'right',
                width: 100,
                maxWidth: 200,
                resizable: true,
            }
        ])

        //call API lấy Cats
        const getCats = () => {
            axios.get('http://127.0.0.1:8000/api/theloai/')
                .then((response) => {
                    theloai.value = response.data.theloai;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        getCats();

        //Modal xóa
        const showConfirm = () => {
            Modal.confirm({
                title: 'Bạn chắc chắn muốn xóa Vai trò này ?',
                content: "Khi bạn nhấn 'OK' mọi dữ liệu sẽ được xóa !",
                onOk() {
                    return new Promise((resolve) => {
                        setTimeout(resolve, 2000);
                    })
                        .then(() =>
                            axios.delete('http://127.0.0.1:8000/api/theloai/delete/' + `${route.params.id}`)
                                .then((response) => {
                                    router.push({ name: 'admin-theloai' },
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
                        .then(() => router.push({ name: 'admin-theloai' },
                            message.success('Hủy thành công !', 3),
                        ))
                }
            });
        };

        return {
            columns,
            theloai,
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
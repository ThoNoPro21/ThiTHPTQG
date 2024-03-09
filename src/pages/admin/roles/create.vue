<template>
    <a-list bordered style="width: 100%;">
        <template #header>
            <div><b>TẠO MỚI VAI TRÒ</b></div>
        </template>

        <div class="row ">

            <div class="col-12">
                <a-form :model="formState" name="basic"
                    :label-col="{ xs: { span: 24 }, sm: { span: 12 }, md: { span: 8 }, lg: { span: 8 } }"
                    :wrapper-col="{ xs: { span: 24 }, sm: { span: 12 }, md: { span: 12 }, lg: { span: 12 } }"
                    autocomplete="off" @finish="showConfirmSubmit" @finishFailed="onFinishFailed" style="margin-top: 20px;">
                    <div class="row" style="margin: 10px;">
                        <a-form-item label="Tên vai trò" name="role"
                            :rules="[{ required: true, message: 'Vui lòng nhập tên vai trò !' }, { type: 'string', min: 3, max: 99, message: 'Tối thiểu 3 kí tự' }]">
                            <a-input v-model:value.trim="formState.role" allow-clear />
                        </a-form-item>
                    </div>
                    <div class="row" style="margin: 10px;">
                        <a-form-item
                            :wrapper-col="{ xs: { span: 24 }, sm: { span: 12, offset: 12 }, md: { span: 12, offset: 8 }, lg: { span: 12, offset: 8 } }"
                            name="">
                            <a-checkbox v-model:checked="formState.check_roles">Hiện tất cả vai trò hiện có</a-checkbox>
                        </a-form-item>
                    </div>
                    <div class="row" style="margin: 10px;">
                        <a-form-item
                            :wrapper-col="{ xs: { span: 24 }, sm: { span: 12, offset: 12 }, md: { span: 12, offset: 8 }, lg: { span: 12, offset: 8 } }"
                            name="">
                            <a-button @click="showConfirm" class="me-2">Hủy</a-button>
                            <a-button type="primary" html-type="submit">Lưu</a-button>
                        </a-form-item>
                    </div>
                    <a-list size="small" :data-source="roles" v-if="formState.check_roles"
                        style="width: 200px;margin: auto;">
                        <template #renderItem="{ item }">
                            <a-list-item>{{ item.name }}</a-list-item>
                        </template>
                    </a-list>

                </a-form>
            </div>
        </div>
    </a-list>
</template>
<script>
import { useMenu } from '../../../stores/menu.js';
import { Modal } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { defineComponent, reactive, ref } from 'vue';
export default defineComponent({
    setup() {
        const store = useMenu()
        store.selectedKeys = ['admin-roles']

        const router = useRouter();
        const roles = ref([])
        const formState = reactive({
            role: '',
            check_roles: false,
        })

        //Call API roles
        const getRoles = () => {
            axios.get('http://127.0.0.1:8000/api/roles/')
                .then((response) => {
                    roles.value = response.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        getRoles();

        //Modal thoát
        const showConfirm = () => {
            Modal.confirm({
                title: 'Bạn chắc chắn muốn hủy bỏ ?',
                content: "Khi bạn nhấn 'OK' mọi dữ liệu sẽ không được lưu !",
                onOk() {
                    return new Promise((resolve) => {
                        setTimeout(resolve, 2000);
                    })
                        .then(() => router.push({ name: 'admin-roles' },
                            message.success('Hủy thành công !', 3),
                        ))
                },
                onCancel() { },

            });
        };

        //Modal submit
        const showConfirmSubmit = () => {
            Modal.confirm({
                title: 'Bạn chắc chắn muốn tạo mới ?',
                content: "Khi bạn nhấn 'OK' mọi dữ liệu sẽ được lưu !",
                onOk() {
                    return new Promise((resolve) => {
                        setTimeout(resolve, 2000);
                    })
                        .then(() => axios.post('http://127.0.0.1:8000/api/roles/create', formState)
                            .then((response) => {
                                if (response.status == 200) {
                                    message.success('Tạo mới thành công !', 5);
                                    router.push({ name: 'admin-roles' })
                                }
                            })
                            .catch((error) => { console.log(error) })
                        )

                },
                onCancel() { },

            });
        };

        const onFinishFailed = (error) => {
            console.error
        }

        return {
            formState,
            showConfirmSubmit,
            onFinishFailed,
            roles,
            showConfirm,
            router

        }
    }
});
</script>
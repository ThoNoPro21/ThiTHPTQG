<template>
    <a-list bordered style="width: 100%; ">
        <template #header>
            <div><b>TẠO MỚI TÀI KHOẢN</b></div>
        </template>

        <div class="row ">
            <div class="col-12 col-sm-3 d-flex d-sm-flex justify-content-center align-items-center">
                <a-avatar shape="square" :size="128" class="mt-2">
                    <i class="fa-solid fa-user"></i>
                </a-avatar>

            </div>

            <div class="col-12 col-sm-9 mt-3">
                <a-form :model="formState" :rules="rules" ref="formRef" name="basic"
                    :label-col="{ xs: { span: 24 }, sm: { span: 12 }, md: { span: 8 }, lg: { span: 8 } }"
                    :wrapper-col="{ xs: { span: 24 }, sm: { span: 12 }, md: { span: 12 }, lg: { span: 12 } }"
                    autocomplete="off" @finish="showConfirmSubmit" @finishFailed="onFinishFailed" style="margin-top: 20px;">
                    <div class="row mb-sm-3 " style="margin: -20px 10px;">
                        <a-form-item label="Tình trạng" name="status_id">
                            <a-select v-model:value="formState.status_id" :options="user_status"
                                placeholder="Chọn tình trạng">

                            </a-select>
                        </a-form-item>
                    </div>

                    <div class="row mb-sm-3 " style="margin: -20px 10px;">
                        <a-form-item label="Tài khoản" name="name">
                            <a-input v-model:value.trim="formState.name" allow-clear />
                            <span v-if="errors.name" style="height: auto;" class="text-danger">{{ errors.name[0] }}</span>
                        </a-form-item>
                    </div>

                    <div class="row mb-sm-3" style="margin: -20px 10px;">
                        <a-form-item label="Email" name="email">
                            <a-input v-model:value.trim="formState.email" allow-clear />
                            <span v-if="errors.email" style="height: auto;" class="text-danger">{{ errors.email[0] }}</span>
                        </a-form-item>
                    </div>

                    <div class="row mb-sm-3" style="margin: -20px 10px;">
                        <a-form-item label="Mật khẩu" name="password">
                            <a-input-password v-model:value.trim="formState.password" allow-clear />
                        </a-form-item>
                    </div>

                    <div class="row mb-sm-3" style="margin: -20px 10px;">
                        <a-form-item label="Xác nhận mật khẩu" name="password_confirmation">
                            <a-input-password v-model:value.trim="formState.password_confirmation" allow-clear />
                        </a-form-item>
                    </div>

                    <div class="row mb-sm-3" style="margin: -20px 10px;">
                        <a-form-item label="Vai trò" name="deparment_id">
                            <a-select v-model:value="formState.deparment_id" :options="deparment"
                                placeholder="Chọn vai trò">

                            </a-select>
                        </a-form-item>
                    </div>

                    <div class="row " style="margin: 20px 10px;">
                        <a-form-item
                            :wrapper-col="{ xs: { span: 24 }, sm: { span: 12, offset: 12 }, md: { span: 12, offset: 8 }, lg: { span: 12, offset: 8 } }">
                            <a-button @click="showConfirm" class="me-2">Hủy</a-button>
                            <a-button type="primary" html-type="submit">Lưu</a-button>
                        </a-form-item>
                    </div>
                </a-form>
            </div>
        </div>
    </a-list>
</template>
<script >
import { useMenu } from '../../../stores/menu.js';
import axios from 'axios';
import { Modal } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { defineComponent, reactive, ref } from 'vue';
export default defineComponent({
    setup() {
        const store = useMenu()
        store.selectedKeys = ['admin-users']

        const formRef = ref();

        const errors = ref({});
        const deparment = ref([]);
        const user_status = ref([]);

        const router = useRouter();
        const formState = reactive({
            status_id: [],
            deparment_id: [],
            name: '',
            email: '',
            password: '',
            password_confirmation: ''
        });

        //xử lý password
        let validatePass = (_rule, value) => {
            if (value === '') {
                return Promise.reject('Vui lòng nhập mật khẩu')
            }
            else if (value.length < 6) {
                return Promise.reject('Mật khẩu phải từ 6 kí tự trở lên !')
            }
            else if (formState.password_confirmation !== '') {
                formRef.value.validateFields('password_confirmation');
            }
            return Promise.resolve();
        };

        //xử lý password_confirmation
        let validateCheckPass = (_rule, value) => {
            if (value === '') {
                return Promise.reject('Vui lòng nhập mật khẩu')
            }
            if (value !== formState.password) {
                return Promise.reject("Mật khẩu không khớp");
            } else {
                return Promise.resolve();
            }
        };

        //xử lý massage khi có lỗi
        const rules = {
            status_id: [{
                required: true,
                message: 'Vui lòng chọn tình trạng!'
            }
            ],
            name: [{
                required: true,
                message: 'Vui lòng nhập tên tài khoản!',
            },
            {
                type: 'string', min: 6, max: 99,
                message: 'Tài khoản phải từ 6 ký tự trở lên !',
            }
            ],
            email: [{
                required: true,
                message: 'Vui lòng nhập email!'
            },

            {
                type: 'email',
                message: 'Định dạng phải là 1 email !'
            }
            ],
            password: [{
                required: true,
                validator: validatePass
            }
            ],
            password_confirmation: [{
                required: true,
                validator: validateCheckPass,
            },

            ],
            deparment_id: [{
                required: true,
                message: 'Vui lòng chọn vai trò!'
            }
            ]
        };

        //call API vai trò và tình trạng
        const getUserCreate = () => {
            axios.get("http://127.0.0.1:8000/api/users/create")
                .then((response) => {
                    user_status.value = response.data.user_status;
                    deparment.value = response.data.deparment;

                })
                .catch((error) => {
                    console.log(error);
                });
        }

        getUserCreate()

      
        //Modal thoát
        const showConfirm = () => {
            Modal.confirm({
                title: 'Bạn chắc chắn muốn hủy bỏ ?',
                content: "Khi bạn nhấn 'OK' mọi dữ liệu sẽ không được lưu !",
                onOk() {
                    return new Promise((resolve) => {
                        setTimeout(resolve, 2000);
                    })
                        .then(() => router.push({ name: 'admin-users' },
                            message.success('Hủy thành công !', 3),
                        ))
                },
                onCancel() { },

            });
        };

        //Modal Submit
        //Gửi request Tạo User mới
        const showConfirmSubmit = () => {
            Modal.confirm({
                title: 'Bạn chắc chắn muốn tạo mới ?',
                content: "Khi bạn nhấn 'OK' mọi dữ liệu sẽ được lưu !",
                onOk() {
                    return new Promise((resolve) => {
                        setTimeout(resolve, 2000);
                    })
                        .then(() => axios.post('http://127.0.0.1:8000/api/users/createUser', formState)
                            .then((response) => {
                                if (response.status == 200) {
                                    message.success('Tạo mới thành công !', 5);
                                    router.push({ name: 'admin-users' })
                                }
                            })
                            .catch((error) => {
                                console.log(error)
                                errors.value = error.response.data.errors;
                            })
                        )

                },
                onCancel() { },

            });
        };

        const onFinishFailed = errorInfo => {
        };

        return {
            formState,
            showConfirmSubmit,
            onFinishFailed,
            formRef,
            rules,
            getUserCreate,
            deparment,
            user_status,
            errors,
            router,
            showConfirm

        };
    },
});
</script>
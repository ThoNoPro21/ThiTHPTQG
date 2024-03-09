<template>
    <a-list bordered style="width: 100%;">
        <template #header>
            <div><b>TẠO MỚI THƯƠNG HIỆU</b></div>
        </template>

        <div class="row ">

            <div class="col-12">
                <a-form :model="formState" name="basic"
                    :label-col="{ xs: { span: 24 }, sm: { span: 12 }, md: { span: 8 }, lg: { span: 8 } }"
                    :wrapper-col="{ xs: { span: 24 }, sm: { span: 12 }, md: { span: 12 }, lg: { span: 12 } }"
                    autocomplete="off" @finish="showConfirmSubmit" @finishFailed="onFinishFailed" style="margin-top: 20px;">
                    <div class="row col-sm-10" style="margin: 10px;">
                        <div class="col-6">
                            <a-form-item label="Tên thương hiệu" name="thuonghieu"
                                :rules="[{ required: true, message: 'Vui lòng nhập tên thuonghieu!' }, { type: 'string', min: 2, max: 99, message: 'Tối thiểu 2 kí tự' }, { whitespace: true, message: 'Không được để trống !' }]">
                                <a-input v-model:value="formState.thuonghieu" allow-clear />
                            </a-form-item>
                        </div>

                        <div class="col-6">
                            <a-form-item label="Danh mục" name="danhmuc_id"
                                :rules="[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]">
                                <a-select v-model:value="formState.danhmuc_id" :options="category"
                                    placeholder="Chọn danh mục">

                                </a-select>
                            </a-form-item>
                        </div>

                    </div>


                    <div class="row" style="margin: 10px;">
                        <a-form-item
                            :wrapper-col="{ xs: { span: 24 }, sm: { span: 12, offset: 12 }, md: { span: 12, offset: 8 }, lg: { span: 12, offset: 8 } }"
                            name="">
                            <a-button @click="showConfirm" class="me-2">Hủy</a-button>
                            <a-button type="primary" html-type="submit">Lưu</a-button>
                        </a-form-item>
                    </div>

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
        store.selectedKeys = ['admin-product']

        const router = useRouter();
        const category = ref([]);
        const formState = reactive({
            thuonghieu: '',
            danhmuc_id:''

        })

        //Call API Category
        const getCats = () => {
            axios.get('http://127.0.0.1:8000/api/category/')
                .then((response) => {
                    category.value = response.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        getCats();

        //Modal thoát
        const showConfirm = () => {
            Modal.confirm({
                title: 'Bạn chắc chắn muốn hủy bỏ ?',
                content: "Khi bạn nhấn 'OK' mọi dữ liệu sẽ không được lưu !",
                onOk() {
                    return new Promise((resolve) => {
                        setTimeout(resolve, 2000);
                    })
                        .then(() => router.push({ name: 'admin-product' },
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
                        .then(() => axios.post('http://127.0.0.1:8000/api/thuonghieu/create', formState)
                            .then((response) => {
                                if (response.status == 200) {
                                    if(response.data.resolve){
                                        router.push({ name: 'admin-product' },
                                        message.success(response.data.resolve, 5));
                                    }
                                    if(response.data.reject){
                                        message.warning(response.data.reject, 5);
                                    }
                                    
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
            onFinishFailed,
            category,
            showConfirm,
            router,
            showConfirmSubmit

        }
    }
});
</script>
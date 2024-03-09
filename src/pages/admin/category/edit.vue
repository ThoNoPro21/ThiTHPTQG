<template>
    <a-list bordered style="width: 100%;">
        <template #header>
            <div><b>CHỈNH SỬA DANH MỤC</b></div>
        </template>

        <div class="row ">

            <div class="col-12">
                <a-form :model="formState" name="basic"
                    :label-col="{ xs: { span: 24 }, sm: { span: 12 }, md: { span: 8 }, lg: { span: 8 } }"
                    :scroll="{ x: 576 }"
                    :wrapper-col="{ xs: { span: 24 }, sm: { span: 12 }, md: { span: 12 }, lg: { span: 12 } }"
                    autocomplete="off" @finish="showConfirmSubmit" @finishFailed="onFinishFailed" style="margin-top: 20px;">

                    <div class="row" style="margin: 10px;">
                        <a-form-item label="Tên danh mục" name="cat"
                            :rules="[{ required: true, message: 'Vui lòng nhập tên danh mục !' }, { type: 'string', min: 2, max: 99, message: 'Tối thiểu 2 kí tự' }, { whitespace: true, message: 'Không được để trống !' }]">
                            <a-input v-model:value="formState.cat" allow-clear />
                        </a-form-item>
                    </div>

                    <div class="row" style="margin: 10px;">
                        <a-form-item
                            :wrapper-col="{ xs: { span: 24 }, sm: { span: 12, offset: 12 }, md: { span: 12, offset: 8 }, lg: { span: 12, offset: 8 } }"
                            name="">
                            <a-checkbox v-model:checked="formState.check_cats">Hiện tất cả danh mục hiện có !</a-checkbox>
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

                    <a-list size="small" :data-source="cats" v-if="formState.check_cats" style="width: 200px;margin: auto;">
                        <template #renderItem="{ item }">
                            <a-list-item>{{ item.name_danhmuc }}</a-list-item>
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
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import { defineComponent, reactive, ref } from 'vue';
export default defineComponent({
    setup() {
        const store = useMenu()
        store.selectedKeys = ['admin-category']

        const router = useRouter();
        const route = useRoute();
        const cats = ref([])
        const formState = reactive({
            cat: '',
            check_cats: false,
            cats: ''
        })

        //Call API Cats
        const getCats = () => {
            axios.get('http://127.0.0.1:8000/api/category/edit/' + `${route.params.id}`)
                .then((response) => {
                    formState.cat = response.data[0].name_danhmuc;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        getCats();

        //Call API Cats
        const getAllCats = () => {
            axios.get('http://127.0.0.1:8000/api/category/')
                .then((response) => {
                    cats.value = response.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        getAllCats();

        //Modal thoát
        const showConfirm = () => {
            Modal.confirm({
                title: 'Bạn chắc chắn muốn hủy bỏ ?',
                content: "Khi bạn nhấn 'OK' mọi dữ liệu sẽ không được lưu !",
                onOk() {
                    return new Promise((resolve) => {
                        setTimeout(resolve, 2000);
                    })
                        .then(() => router.push({ name: 'admin-category' },
                            message.success('Hủy thành công !', 3),
                        ))
                },
                onCancel() { },

            });
        };

        //Modal submit
        const showConfirmSubmit = () => {
            Modal.confirm({
                title: 'Bạn chắc chắn muốn sửa đổi ?',
                content: "Khi bạn nhấn 'OK' mọi dữ liệu sẽ được lưu !",
                onOk() {
                    return new Promise((resolve) => {
                        setTimeout(resolve, 2000);
                    })
                .then(() => axios.put('http://127.0.0.1:8000/api/category/edit/' + `${route.params.id}`, formState)
                .then((response) => {
                                if (response.status == 200) {
                                    if(response.data.resolve){
                                        router.push({ name: 'admin-category' },
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
    cats,
    showConfirm,
    router,
    route,
    showConfirmSubmit

}
    }
});
</script>
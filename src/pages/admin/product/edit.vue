<template>
    <a-list bordered style="width: 100%; ">
        <template #header>
            <div><b>TẠO MỚI SẢN PHẨM</b></div>
        </template>

        <div class="row ">
            <div class="col-12">
                <a-form :model="formState" :rules="rules" name="basic" enctype="multipart/form-data"
                    :label-col="{ xs: { span: 24 }, sm: { span: 12 }, md: { span: 8 }, lg: { span: 8 } }"
                    :wrapper-col="{ xs: { span: 24 }, sm: { span: 12 }, md: { span: 12 }, lg: { span: 12 } }"
                    autocomplete="off" @finish="showConfirmSubmit" @finishFailed="onFinishFailed" style="margin-top: 20px;">
                    <div class="row">
                        <div class="col-6">
                            <div class="row mt-sm-3 " style="margin: -20px 10px;">
                                <a-form-item label="Tên sản phẩm" name="name">
                                    <a-input v-model:value="formState.name" allow-clear />
                                </a-form-item>
                            </div>

                            <div class="row mt-sm-3 " style="margin: -20px 10px;">
                                <a-form-item label="Giá bán" name="price">
                                    <a-input-number v-model:value="formState.price" style="width: 100%;" :min="0"
                                        :formatter="value => ` ${formState.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                        :parser="value => value.replace(/\$\s?|(,*)/g, '')" />
                                </a-form-item>
                            </div>

                            <div class="row mt-sm-3 " style="margin: -20px 10px;">
                                <a-form-item label="Giá sale" name="price_sale">
                                    <a-input-number v-model:value="formState.price_sale" style="width: 100%;" :min="0"
                                        :formatter="value => ` ${formState.price_sale}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                        :parser="value => value.replace(/\$\s?|(,*)/g, '')" />
                                </a-form-item>
                            </div>

                            <div class="row mt-sm-3 " style="margin: -20px 10px;">
                                <a-form-item label="Số lượng" name="soluong">
                                    <a-input-number v-model:value="formState.soluong" style="width: 100%;" :min="0"
                                        :formatter="value => ` ${formState.soluong}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                        :parser="value => value.replace(/\$\s?|(,*)/g, '')" />
                                </a-form-item>
                            </div>

                            <div class="row mt-sm-3 " style="margin: -20px 10px;">
                                <a-form-item label="Thể loại" name="theloai_id">
                                    <a-select v-model:value="formState.theloai_id" :options="theloai_products" show-search
                                        :filter-option="filterOption" placeholder="Chọn thể loại">

                                    </a-select>
                                </a-form-item>
                            </div>
                        </div>

                        <div class="col-6">
                            <div class="row mt-sm-3 " style="margin: -20px 10px;">
                                <a-form-item label="Danh mục" name="danhmuc_id">
                                    <a-select v-model:value="formState.danhmuc_id" :options="danhmuc_products"
                                        placeholder="Chọn danh mục">

                                    </a-select>
                                </a-form-item>
                            </div>

                            <div class="row mt-sm-3 " style="margin: -20px 10px;">
                                <a-form-item label="Khuyến mãi" name="khuyenmai">
                                    <a-select v-model:value="formState.khuyenmai" :options="khuyenmai_products"
                                        placeholder="Chọn mã khuyến mãi">

                                    </a-select>
                                </a-form-item>
                            </div>

                            <div class="row mt-sm-3 " style="margin: -20px 10px;">
                                <a-form-item label="Nổi bật" name="noibat">
                                    <a-select v-model:value="formState.noibat" :options="noibat_products"
                                        placeholder="Chọn nổi bật">

                                    </a-select>
                                </a-form-item>
                            </div>

                            <div class="row mt-sm-3 " style="margin: -20px 10px;">
                                <a-form-item label="Loại ảnh">
                                    <a-radio-group v-model:value="check_radio" @change="radio">
                                        <a-radio value="1">Link</a-radio>
                                        <a-radio value="2">Chọn từ tệp</a-radio>
                                    </a-radio-group>
                                </a-form-item>
                            </div>

                            <div class="row mt-sm-3 " style="margin: -20px 10px;" v-if="check_radio === '1'">
                                <a-form-item label="Ảnh" name="image1">
                                    <a-input v-model:value="formState.image1" allow-clear />
                                </a-form-item>
                            </div>

                            <div class="row mt-sm-3 " style="margin: -20px 10px;" v-if="check_radio === '1'">
                                <a-form-item v-for="(img, index) in formState.images1" :key="index" label='Ảnh mô tả'
                                    :name="['images1', index, 'value']" :rules="{
                                            required: true,
                                            message: 'Nhập link ảnh cho sản phẩm !',
                                        }">
                                    <a-input v-model:value="img.value" placeholder="Nhập link ảnh" />
                                    <i class="fa-solid fa-delete-left" @click="removeImage(img)"></i>
                                </a-form-item>

                                <a-form-item>
                                    <a-button type="dashed" style="width: 60%" @click="addImage">
                                        Thêm ảnh mô tả
                                    </a-button>
                                </a-form-item>
                            </div>

                            <div class="row mt-sm-3 " style="margin: -20px 10px;" v-if="check_radio === '2'">

                                <div class="col-sm-4">
                                    <label style="float:right" for="">Ảnh :</label>
                                </div>
                                <div class="col-sm-8">
                                    <input type="file" v-on:change="onImageChange1" class="form-control">
                                </div>
                                <span v-if="errFile" class="text-danger d-flex justify-content-center">{{ errFile[0]
                                }}</span>
                                 <span v-else class="text-danger d-flex justify-content-center"></span>
                            </div>

                            <div class="row mt-sm-3 pt-sm-2" style="margin: -20px 10px;" v-if="check_radio === '2'">
                                <div class="col-sm-4">
                                    <label style="float:right" for="">Ảnh mô tả :</label>
                                </div>
                                <div class="col-sm-8">
                                    <input type="file" v-on:change="onImageChange2" class="form-control" multiple>
                                </div>
                                <span v-if="errFiless" class="text-danger d-flex justify-content-center">{{ errFiless[0]
                                }}</span>
                                <span v-else class="text-danger d-flex justify-content-center"></span>
                            </div>

                        </div>
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
import { InputNumber, Modal } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
    setup() {
        const store = useMenu();
        store.selectedKeys = ["admin-product"];

        const errFile=ref();
        const errFiless=ref();
        const check_radio = ref('1');
        const noibat_products = ref([]);
        const theloai_products = ref([]);
        const danhmuc_products = ref([]);
        const khuyenmai_products = ref([]);
        const router = useRouter();
        const formState = reactive({
            name: "",
            price: "",
            price_sale: "",
            soluong: "",
            theloai_id: "",
            danhmuc_id: "",
            khuyenmai: "",
            noibat: "",
            image: "",
            images: [],
            image1: "",
            images1: [],
            
        });

        //ckeckbox radio khi chọn kiểu ảnh
        const radio = () => {
            if (check_radio.value == 1) {
                formState.image = ''
                formState.images = []
            }
            else if (check_radio.value == 2) {
                formState.image1 = ''
                formState.images1 = []
            }
        }

        //add item ảnh mô tả
        const addImage = () => {
            formState.images1.push({ value: '' });
        }

        //delete item ảnh mô tả
        const removeImage = item => {
            let index = formState.images1.indexOf(item);
            if (index !== -1) {
                formState.images1.splice(index, 1);
            }
        };

        //Xử lý file khi đổi ảnh
        const onImageChange1 = (e) => {
            if (check_radio.value == 2) {
                formState.image = e.target.files[0];
            }
            else if (check_radio.value == 1) {
                formState.image = ''
            }
         
        };

        //Xử lý file khi đổi ảnh
        const onImageChange2 = (e) => {
            if (check_radio.value == 2) {
                let file = e.target.files;
                for (let i = 0; i < file.length; i++) {
                    formState.images.push(file[i]);
                }
            } else if (check_radio.value == 1) {
                formState.images = ''
            }
        };

        //Xử lý Seach select
        const filterOption = (input, option) => {
            return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };
        //xử lý massage khi có lỗi
        const rules = {
            name: [{
                required: true,
                message: "Vui lòng nhập tên sản phẩm!",
            }, {
                type: "string",
                min: 6,
                max: 99,
                message: "Tài khoản phải từ 6 ký tự trở lên !",
            }, {
                whitespace: true,
                message: "Không được để trống !",
            }
            ],
            price: [{
                required: true,
                message: "Vui lòng nhập giá bán!",

            },
            

            ],
            price_sale: [{
                required: true,
                message: "Vui lòng nhập giá sale!",
            },

            ],
            soluong: [{
                required: true,
                message: "Vui lòng nhập số lượng sản phẩm!",
            }
            ],
            theloai_id: [{
                required: true,
                message: "Vui lòng nhập thể loại sản phẩm!",
            },
            ],
            danhmuc_id: [{
                required: true,
                message: "Vui lòng nhập danh mục sản phẩm!",
            },
            ],
            noibat: [{
                required: true,
                message: "Vui lòng chọn nổi bật cho sản phẩm!",
            },
            ],
            image1: [{
                required: true,
                message: "Vui lòng chọn ảnh cho sản phẩm!",
            }],


        };

        //call API the loai va danh muc
        const getProductID = () => {
            axios.get("http://127.0.0.1:8000/api/product/")
                .then((response) => {
                    theloai_products.value = response.data.theloai;
                    danhmuc_products.value = response.data.danhmuc;
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getProductID();

        //call API noi bat
        const getNoibat = () => {
            axios.get("http://127.0.0.1:8000/api/noibat/")
                .then((response) => {
                    noibat_products.value = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getNoibat();

        //Modal thoát
        const showConfirm = () => {
            Modal.confirm({
                title: "Bạn chắc chắn muốn hủy bỏ ?",
                content: "Khi bạn nhấn 'OK' mọi dữ liệu sẽ không được lưu !",
                onOk() {
                    return new Promise((resolve) => {
                        setTimeout(resolve, 2000);
                    })
                        .then(() => router.push({ name: "admin-product" }, message.success("Hủy thành công !", 3)));
                },
                onCancel() { },
            });
        };
        //Modal Submit
        //Gửi request Tạo product mới
        const showConfirmSubmit = () => {
            Modal.confirm({
                title: 'Bạn chắc chắn muốn xóa người dùng này ?',
                content: "Khi bạn nhấn 'OK' mọi dữ liệu sẽ được xóa !",
                onOk() {
                    return new Promise((resolve) => {
                        setTimeout(resolve, 2000);
                    })
                    .then(()=>
                    {
                        let data = new FormData();
                        data.append('name', formState.name)
                        data.append('price', formState.price)
                        data.append('price_sale', formState.price_sale)
                        data.append('soluong', formState.soluong)
                        data.append('theloai_id', formState.theloai_id)
                        data.append('danhmuc_id', formState.danhmuc_id)
                        data.append('khuyenmai', formState.khuyenmai)
                        data.append('check_radio', check_radio.value)
                        data.append('noibat', formState.noibat)
                        data.append('image1', formState.image1)
                        data.append('file', formState.image)

                        for (let i = 0; i < formState.images1.length; i++) {
                            if (!formState.images1.length) {
                                return false;
                            }
                            data.append('images1[]', formState.images1[i].value)
                        }


                        for (let i = 0; i < formState.images.length; i++) {
                            if (!formState.images.length) {
                                return false;
                            }
                            data.append('filess[]', formState.images[i])
                        }
                        axios.post("http://127.0.0.1:8000/api/product/create", data, {
                            headers: {
                                'content-type': 'multipart/form-data'
                            }
                        })
                        .then((response) => {
                            if (response.status == 200) {
                                router.push({ name: "admin-product" },
                                message.success("Tạo mới thành công !", 5));
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                            if(error){
                                if(error.response.data.errors){
                                    if(error.response.data.errors.file){
                                        errFile.value=error.response.data.errors.file;
                                    }
                                    else {
                                        errFile.value='';
                                    }
                                    
                                }else {
                                    errFile.value='';
                                }
                                if(error.response.data.errors){
                                    if(error.response.data.errors.filess){
                                        errFiless.value=error.response.data.errors.filess;
                                    }
                                    else{
                                        errFiless.value='';
                                    }
                                }else{
                                    errFiless.value='';
                                }
                            }
                        })
                    })
                },
                onCancel() { 
                }
                    
            });
        };


        const onFinishFailed = errorInfo => {
        };
        return {
            formState,
            showConfirmSubmit,
            onFinishFailed,
            theloai_products,
            danhmuc_products,
            noibat_products,
            khuyenmai_products,
            router,
            showConfirm,
            rules,
            filterOption,
            addImage,
            removeImage,
            check_radio,
            onImageChange1,
            onImageChange2,
            radio,
            errFile,
            errFiless
            

        };
    },
    components: { InputNumber }
});
</script>
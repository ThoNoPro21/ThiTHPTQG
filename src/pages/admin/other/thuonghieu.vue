<template>
	<div class="row">
		<div class="col-12">
			<a-table :columns="columnOther" :data-source="thuonghieu" :scroll="{ x: 576, y: 200 }"
				@resizeColumn="handleResizeColumn">

				<template #bodyCell="{ column, index, record }">

					<template v-if="column.key === 'stt'">
						<a>
							{{ index + 1 }}
						</a>
					</template>

					<template v-if="column.key === 'action'">
						<a-space :size="16">
							<router-link :to="{ name: 'admin-thuonghieu-edit', params: { id: record.value } }">
								<i class="fa-solid fa-pen-to-square" style="cursor: pointer;"></i>
							</router-link>

							<router-link :to="{ name: 'admin-thuonghieu-delete', params: { id: record.value } }">
								<a-button @click="showConfirmThuongHieu" class="me-2">
									<i class="fa-solid fa-trash-can" style="cursor: pointer;"></i>
								</a-button>
							</router-link>
						</a-space>
					</template>
				</template>

			</a-table>
		</div>
	</div>

	<router-link :to="{ name: 'admin-thuonghieu-create' }">
		<a-button type="primary"><i class="fa-solid fa-plus me-1"></i>Tạo mới thương hiệu</a-button>
	</router-link>
</template>

<script>
import { useTabs } from '../../../stores/tabs.js';
import { defineComponent, ref } from 'vue';
import { message } from 'ant-design-vue';
import { Modal } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import axios from 'axios';
export default defineComponent({
	setup(){
		const store = useTabs()
        store.selectedKeys = ['admin-thuonghieu']

		const router = useRouter();
        const route = useRoute();
		const thuonghieu = ref([]);
		const columnOther=ref([
            {
                title: 'STT',
                key: 'stt',
                responsive: ['sm'],
                width: '60px',
            },
            {
                title: 'ID',
                dataIndex: 'value',
                key: 'id',
                width: '60px',
            },
            {
                title: 'Tên thương hiệu',
                dataIndex: 'label',
                key: 'name',
                width: '60px',
            },
            {
                title: 'Thuộc danh mục',
                dataIndex: 'name_danhmuc',
                key: 'name',
                width: '60px',
            }, {
                title: 'Chỉnh sửa',
                key: 'action',
                fixed: 'right',
                width: '100px',
            },
        ])
		const getThuongHieu = () => {
            axios
                .get('http://127.0.0.1:8000/api/thuonghieu/')
                .then((response) => {
                   thuonghieu.value = response.data
                })
                .catch((err) => {
                    console.log(err)
                })
        };
		getThuongHieu();
		
        return {
          
            handleResizeColumn: (w, col) => {
                col.width = w;
            },
        
            router,
            route,
            
            thuonghieu,
            columnOther,
             
        }
	}

});
</script>

<style></style>
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTabs = defineStore('tabsId', {
	state:()=>({
		selectedKeys:['admin-product'],
		openKeys:[],
	}),
	actions:{
		onselectedKeys(data){
			this.selectedKeys=data
		},
		onOpenKeys(data) {
			this.openKeys=data
		}
	}
})

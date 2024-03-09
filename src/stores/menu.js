import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMenu = defineStore('menuId', {
	state:()=>({
		selectedKeys:['admin-home'],
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

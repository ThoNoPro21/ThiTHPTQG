import { createRouter, createWebHistory } from 'vue-router'
import admin from './admin.js'

const router = createRouter({
	history: createWebHistory(),
	routes:
		[
			...admin
		]

})

export default router
// import.meta.env.BASE_URL
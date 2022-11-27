import {createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
    history: createWebHashHistory(), 
    routes: [
		{
			path: '',
			redirect: '/main'
		},
		{
			name: 'main',
			path: '/main',
			component: () => import('@/views/MainView')
		},
		{
			name: 'device',
			path: '/device',
			component: () => import('@/views/DeviceView')
		},
		{
			name: 'video',
			path: '/video',
			component: () => import('@/views/TabVideo')
		}
	]
})
export default router
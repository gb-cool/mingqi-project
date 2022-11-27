const {
	defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
	transpileDependencies: true,
	publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
	configureWebpack: {
		devServer: {
			proxy: {
				"/api-device": {
					target: 'http://10.12.3.102:32076',
					changeOrigin: true,
					ws: false,
					pathRewrite: {
						"^/api-device": ""
					}
				},
				"/api-JoySuch": {
					target: 'http://10.12.67.17:9999',
					changeOrigin: true,
					ws: false,
					pathRewrite: {
						"^/api-JoySuch": ""
					}
				},
				"/api-Seekey": {
					target: 'http://10.12.67.17:46000',
					changeOrigin: true,
					ws: false,
					pathRewrite: {
						"^/api-Seekey": ""
					}
				}
			}
		}
	},
	chainWebpack: config => {
		config
			.plugin('html')
			.tap(args => {
				args[0].title = '长寿微粉智能制造三维可视化平台'
				return args
			})
	}
})

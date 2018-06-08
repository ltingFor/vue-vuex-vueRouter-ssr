// const docsLoader = require.resolve('./doc-loader')

module.exports=(isDev)=>{
	return {
		preserveWhitepace:true,
		//使用extract-text-webpack-plugin插件，设置此配置项，强制将vue中的css也打包到css中，css没有热加载
		//可以使用vue-style-loader
		//注意属性拼写要正确，否则失效
		//postCss是可以在全局声明postcss.config.js读取的，不用在这里单独设置
		extractCSS:!isDev,
		cssModules:{
			localIdentName:isDev?'[path]-[name]-[hash:base64:5]':'[hash:base64:5]',
			camelCase:true
		},
		// postCss:{}
		// vue文件里面的样式的热重载是由vue-style-loader提供的，
		// 所以此配置设置为false只对template或者script有效，而css无效
		// hotReload:false, //根据环境变量生成

		//可以自定义loader
		/*loaders:{
			'docs':docsLoader
		}*/
	}
}
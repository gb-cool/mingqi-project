<template>
	<router-view></router-view>
</template>

<script>
	
</script>

<style lang="less">
	@import "./assets/css/html-font-size.less";
	body,
	p,
	ul,
	li,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin: 0px;
		padding: 0px;
	}
	html {
		height: 100%;
	}
	body{
		overflow: hidden;
		height: 100%;
		overflow-x: hidden;
	}
	ul {
		list-style: none;
	}
	#app {
		height: 100%;
		font-family: 'Alibaba PuHuiTi', 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		overflow: auto;
	}
</style>

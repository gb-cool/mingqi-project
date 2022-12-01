<!-- 环境饼状图组件 -->
<template>
	<div ref="chart" class="ModulePieChart"></div>
</template>

<script>
	import { ref, onMounted, watch} from 'vue'
	import * as echarts from 'echarts'
	export default {
		name: 'ModulePieChart',
		props:['name', 'value', 'color', 'barWidth'],
		setup(props){
			let data = {name: props.name, value: props.value, barWidth:props.barWidth};
			const chart = ref()
			let myChart = null
			onMounted(() => {
				myChart = echarts.init(chart.value)
				myChart.setOption(getBallCharts(data, props.color))
				// 自适应
				window.addEventListener("resize", function () {
				    myChart.resize();
				})
			})
			// 监听饼图线宽，变化时更新
			watch(() => props.barWidth, (newValue, oldValue) => {
				if(myChart!=null){
					data.barWidth = newValue
					myChart.setOption(getBallCharts(data, props.color))
				}
			})
			watch(() => props.value, (newValue, oldValue) => {
				if(myChart!=null){
					data.value = newValue
					myChart.setOption(getBallCharts(data, props.color))
				}
			})
			watch(() => props.color, (newValue, oldValue) => {
				if(myChart!=null){
					myChart.setOption(getBallCharts(data, props.color))
				}
			})
			/**
			 * @param {Object} datalist	// 饼图数据
			 * @param {Object} color	// 颜色
			 * 返回饼图参数
			 */
			function getBallCharts(datalist, color) {
			    return {
					angleAxis: {
						clockwise: false, // 刻度增长是否按顺时针，默认顺时针(true)。
						axisLine: {
						  show: false
						},
						axisLabel: {
						  show: false
						},
						splitLine: {
						  show: false
						},
						axisTick: {
						  show: false
						},
						min: 0,
						max: 100, //一圈的刻度值
						startAngle: 0 //初始角度
					},
					radiusAxis: {
						type: 'category',
						data: ['1', '2', '3', '4'], // 极坐标径向轴中的类目，这边有几个数，
						// 就代表径向轴分了几份，和series中的data对应，这样就可以撑开圆环
						z: 10,
						axisLine: {
						  show: false
						},
						axisTick: {
						  show: false
						},
						axisLabel: {
						  show: false
						},
					},
					polar: {
						radius: '100%', //图形大小
					},
					series: [{
						type: 'bar',
						barWidth: datalist.barWidth,
						data: [0, 0, 0, 100],
						coordinateSystem: 'polar',
						name: 'A',
						roundCap: true,
						stack: 'a',
						itemStyle: {
							normal: {
								color: "rgba(255, 255, 255, 0.2)",
							}
						},
					}, {
						type: 'bar',
						data: [0, 0, 0, data.value], // 前面的0，累计还是0，这样径向轴上的对应的分区总数就是0，不会显示圆环
						coordinateSystem: 'polar',
						name: 'B',
						stack: 'a',
						roundCap: true,
						itemStyle: {
							normal: {
								color: color,
							}
						}
					}]
				}
			}
			// 返回数据
			return {
				chart
			}
		}
	}
</script>

<style scoped>
	.ModulePieChart{
		width: 100%;
		height:100%;
	}
	.chart{
		width: 100%;
		height: 100%
		/* height: calc(100% - 75px); */
	}
	p{
		font-size: 1rem;
		text-align: center;
		margin-top: 25px;
		height: 50px;
		line-height: 50px;
	}
</style>
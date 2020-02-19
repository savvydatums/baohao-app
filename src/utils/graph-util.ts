import * as ChartDataLabels from 'chartjs-plugin-datalabels';

export const createBarChartOptions = (data) => {

	return {
		type: 'bar',
		data: {
			labels: data.labels,
			datasets: [{
				data: data.data,
				backgroundColor: data.colors
			}]
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true,
						fontColor: '#fff'
					},
					gridLines: {
						display: false
					},
					barPercentage: 0.7
				}],
				xAxes: [{
					gridLines: {
						display: false
					},
					ticks: {
						beginAtZero: true,
						fontColor: '#fff',
						autoSkip: false
					}
				}]
			},
			gridLines: {
				offsetGridLines: true
			},
			maintainAspectRatio: false,
			onClick: data.callback,
			legend: { display: false }
		}
	}
}

// Recruit Interest Chart 
export const createInterestChartOptions = (data) => {
	console.assert(data.labels && data.data && data.colors)

	return {
		type: 'pie',
		data: {
			labels: data.labels,
			datasets: [{
				data: data.data,
				backgroundColor: data.colors,
				datalabels: {
					color: '#grey'
				}
			}]
		},
		plugins: [ChartDataLabels],
		options: {
			responsive: true,
			maintainAspectRatio: true,
			legend: {
				usePointStyle: true,
				display: false
			},
			layout: {
				padding: {
					top: 20,
					bottom: 30
				}
			},
			plugins: {
				datalabels: {
					formatter: function(value, context) {
						return context.chart.data.labels[context.dataIndex] + ' ' + value + '%';
					},
					anchor: 'center',
					offset: 40,
					align: 'end'
				}
			}
		}
	}
}

// Recruit bar CategoryChart
export const createCategoryChartOptions = (data) => {

	return {
		type: 'bar',
		data: {
			labels: data.labels,
			datasets: [{
				data: data.data,
				backgroundColor: data.colors
			}]
		},
		options: {
			scales: {
				yAxes: [{
					gridLines: {
						display: false
					}
				}],
				xAxes: [{
					gridLines: {
						display: false
					},
				}]
			},
			legend: { display: false }
		}
	}
}
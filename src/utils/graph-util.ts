
export const createBarChartOptions = (data) => {
	//console.assert(data.labels && data.data && data.colors)

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

export const createPieChartOptions = (data) => {
	console.assert(data.labels && data.data && data.colors)

	return {
		type: 'pie',
		data: {
			labels: data.labels,
			datasets: [{
				data: data.data,
				backgroundColor: data.colors
			}]
		}
		// options: {
		// 	scales: {
		// 		yAxes: [{
		// 			ticks: {
		// 				beginAtZero: true,
		// 				fontColor: '#fff'
		// 			},
		// 			gridLines: {
		// 				display: false
		// 			},
		// 			barPercentage: 0.7
		// 		}],
		// 		xAxes: [{
		// 			gridLines: {
		// 				display: false
		// 			},
		// 			ticks: {
		// 				beginAtZero: true,
		// 				fontColor: '#fff',
		// 				autoSkip: false
		// 			}
		// 		}]
		// 	},
		// 	gridLines: {
		// 		offsetGridLines: true
		// 	},
		// 	maintainAspectRatio: false,
		// 	legend: { display: false }
		// }
	}
}
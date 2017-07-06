$(document).ready(function(){
	$.ajax({
		url: "http://localhost/iv/data.php",
		method: "GET",
		success: function(data) {
			console.log(data);
			var year = [];
			var number = [];

			for(var i in data) {
				year.push("year " + data[i].year);
				number.push(data[i].number);
			}

			var chartdata = {
				labels: year,
				datasets : [
					{
						label: 'number',
						backgroundColor: 'rgba(200, 200, 200, 0.75)',
						borderColor: 'rgba(200, 200, 200, 0.75)',
						hoverBackgroundColor: 'rgba(200, 200, 200, 1)',
						hoverBorderColor: 'rgba(200, 200, 200, 1)',
						data: number
					}
				]
			};

			var ctx = $("#mycanvas");

			var barGraph = new Chart(ctx, {
				type: 'bar',
				data: chartdata
			});
		},
		error: function(data) {
			console.log(data);
		}
	});
});
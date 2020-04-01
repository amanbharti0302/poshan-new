$(document).ready(function(){
  const uuid=$("#uuuid").val();
  $.post("/dashboard/monitor/heightChildGraph",{uuid:uuid},function(data,status){
    console.log(data);
    if(data!="nodata")
    {
      const obj=JSON.parse(data);
      const arr=[];
      arr.push(['Date','Height'])
      for(var i=0;i<obj.date.length;i++)
      {
        const h=parseInt(obj.height[i]);
        const item=[obj.date[i],h];
        arr.push(item);
      }
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable(arr);

        // var options = {
        //   title: 'Statistics of mid-day meals',
        //   curveType: 'function',
        //   legend: { position: 'bottom' }
        // };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart1'));

        chart.draw(data);
      }
    }
  });
  $.post("/dashboard/monitor/weightChildGraph",{uuid:uuid},function(data,status){
    console.log(data);
    if(data!="nodata")
    {
      const obj=JSON.parse(data);
      const arr=[];
      arr.push(['Date','Weight'])
      for(var i=0;i<obj.date.length;i++)
      {
        const w=parseInt(obj.weight[i]);
        const item=[obj.date[i],w];
        arr.push(item);
      }
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable(arr);

        // var options = {
        //   title: 'Statistics of mid-day meals',
        //   curveType: 'function',
        //   legend: { position: 'bottom' }
        // };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart2'));

        chart.draw(data);
      }
    }
  });
});

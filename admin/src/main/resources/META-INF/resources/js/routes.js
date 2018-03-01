
function getRoutes(j4p, camelId) {
  var mbean = "org.apache.camel:context="+camelId+",type=routes,name=*";
  console.log(mbean);
  j4p.request(
    {"type":"read","mbean":mbean},
    {
	method:"post",
	success: function(response) {
		$("#routes").html("");
		Object.entries(response.value).forEach(([key, value]) => {
			$("#routes").append(buildRouteRow(value));
		});
        }, 
        error: function(response) {
		console.log("Jolokia request failed: " + response.error);
        } 
  });
}

function start(route) {
	routeOp(myId, route, "start");
}

function stop(route) {
	routeOp(myId, route, "stop");
}

function routeOp(camelId, route, op) {
  j4p.execute('org.apache.camel:context='+camelId+',type=routes,name="'+route+'"', op+"()", {});
  getRoutes(j4p, camelId);
}

function df(s) {
	var d = new Date(s);
	return d.toLocaleDateString('en-GB', {"day":"2-digit","minute":"2-digit","hour":"2-digit","month":"2-digit","year":"2-digit"});
}

function buildRouteRow(route) {
	var description = route.Description;
	var a = "<a href='"+route.RouteId+"'>"+route.RouteId+"</a>";
	if(description != null) {
		a += " "+description;
	}
    var s = "<tr><td>"+a+"</td>";
    if(route.State == "Started") {
        s += "<td class='Started'> Started </td>";    	
        s += "<td><input type='button' onClick='stop("+'"'+route.RouteId+'"'+")' value='Stop'></td>";
        s += "<td>(stop first)</td>";
    }
    else {
        s += "<td class='Stopped'> Stopped </td>";    	
        s += "<td><input type='button' onClick='start("+'"'+route.RouteId+'"'+")' value='Start'></td>";    	
        s += "<td><a>remove</a></td>";
    }
    s += "<td>"+route.ExchangesCompleted+" / "+route.ExchangesFailed+" / "+route.ExchangesInflight+"</td>";
    s += "<td>"+route.MinProcessingTime+" / "+route.MeanProcessingTime+" / "+route.MaxProcessingTime+"</td>";
    s += "<td>"+df(route.FirstExchangeCompletedTimestamp)+" / "+df(route.LastExchangeCompletedTimestamp)+"</td>";
    s += "<td>"+route.Load01+" / "+route.Load05+" / "+route.Load15+"</td>";
    s += "</tr>";
    return s;
}
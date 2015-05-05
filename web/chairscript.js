var origin = "http://shell.storm.pm:38003"

$(document).ready(function (event) {
    document.getElementsByClassName("actuateChair")[0].onclick = actuateHandler;
    document.getElementsByClassName("refreshSettings")[0].onclick = refreshHandler;
});

function actuateHandler () {
    var macaddr = document.getElementsByClassName("macaddr")[0];
    var backh = document.getElementsByClassName("backh")[0];
    var bottomh = document.getElementsByClassName("bottomh")[0];
    var backf = document.getElementsByClassName("backf")[0];
    var bottomf = document.getElementsByClassName("bottomf")[0];
    var req = {
	macaddr: macaddr.value,
	backh: backh.value,
	bottomh: bottomh.value,
	backf: backf.value,
	bottomf: bottomf.value
    }
    $.ajax(origin + "/act", {
	contentType: "text/json",
	data: JSON.stringify(req),
	method: "POST",
	error: function (jqXHR, textStatus, errorThrown) {
	    alert("The settings could not be effected: " + textStatus);
	}
    });
}

function refreshHandler () {
    var macaddr = document.getElementsByClassName("macaddr")[0];
    $.ajax(origin + "/upd", {
	contentType: "text",
	data: macaddr.value,
	dataType: "text",
	method: "POST",
	error: function (jqXHR, textStatus, errorThrown) {
	    alert("The settings could not be refreshed: " + textStatus);
	},
	success: function (data, textStatus, jqXHR) {
	    x = data;
	    console.log(data);
	}
    });
}

var origin = "http://shell.storm.pm:37999"

$(document).ready(function (event) {
    document.getElementsByClassName("actuateChair")[0].onclick = actuateHandler;
    document.getElementsByClassName("refreshSettings")[0].onclick = refreshHandler;
});

function getElements() {
    var macaddr = document.getElementsByClassName("macaddr")[0];
    var backh = document.getElementsByClassName("backh")[0];
    var bottomh = document.getElementsByClassName("bottomh")[0];
    var backf = document.getElementsByClassName("backf")[0];
    var bottomf = document.getElementsByClassName("bottomf")[0];
    return [macaddr, backh, bottomh, backf, bottomf];
}

function actuateHandler () {
    var macaddr, backh, bottomh, backf, bottomf;
    var elems = getElements();
    macaddr = elems[0];
    backh = elems[1];
    bottomh = elems[2];
    backf = elems[3];
    bottomf = elems[4];
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
	    $(".errorMessage").text("Settings could not be effected. Double-check that the Chair ID is valid.");
	}
    });
    $(".errorMessage").text("");
}

function refreshHandler () {
    var macaddr, backh, bottomh, backf, bottomf;
    var elems = getElements();
    macaddr = elems[0];
    backh = elems[1];
    bottomh = elems[2];
    backf = elems[3];
    bottomf = elems[4];
    $.ajax(origin + "/upd", {
	contentType: "text",
	data: macaddr.value,
	dataType: "text",
	method: "POST",
	error: function (jqXHR, textStatus, errorThrown) {
	    $(".errorMessage").text("Settings could not be refreshed. Double-check that the Chair ID is valid.");	},
	success: function (data, textStatus, jqXHR) {
	    var doc = JSON.parse(data);
	    backh.value = doc.backh;
	    bottomh.value = doc.bottomh;
	    backf.value = doc.backf;
	    bottomf.value = doc.bottomf;
	}
    });
}

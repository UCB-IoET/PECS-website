document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementsByClassName("actuateChair")[0].onclick = buttonHandler;
});

function buttonHandler () {
    var backh = document.getElementsByClassName("backh")[0];
    var bottomh = document.getElementsByClassName("bottomh")[0];
    var backf = document.getElementsByClassName("backf")[0];
    var bottomf = document.getElementsByClassName("bottomf")[0];
    console.log(backh.value);
    console.log(bottomh.value);
    console.log(backf.value);
    console.log(bottomf.value);
}

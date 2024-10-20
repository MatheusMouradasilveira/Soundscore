var modal = document.getElementById('modalRegister');
var btn = document.getElementById("register-modal");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
    modal.classList.add("visivel");
}

span.onclick = function () {
    modal.classList.remove("visivel");
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.classList.remove("visivel");
    }
}
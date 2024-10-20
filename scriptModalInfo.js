var modal = document.getElementById('modalInfo');
var btn = document.getElementById("info-modal");

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

document.getElementById('leave-button').addEventListener('click', function() {
    window.location.href = '../index.html';
});
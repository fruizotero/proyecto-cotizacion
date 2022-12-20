const d = document;

d.addEventListener("DOMContentLoaded", e => {

    let data = localStorage.getItem("data");
    data = JSON.parse(data);

    console.log(data);

});
let centerDiv = document.getElementById("center-div");
let windowWidth = window.innerWidth;
let divWidth = centerDiv.offsetWidth;
centerDiv.style.left = (windowWidth - divWidth) / 2 + "px";
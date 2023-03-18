/* Show the body after the page is fully loaded */
window.onload = function() {
    document.body.style.display = "block";
};

// ***************** about page javascript **************************
const homeButton = document.getElementById("homeButton");
homeButton.addEventListener("click", goBackHome);
//*************************************************************


// go back to home page
function goBackHome() {
    window.location.href = "/home.html";
}
/* Show the body after the page is fully loaded */
window.onload = function() {
    document.body.style.display = "block";
};

// ***************** home page javascript **************************
const beginButtonV2 = document.getElementById("begin-version2-button")
// const settingsButton = document.getElementById("settings-button")
const aboutButton = document.getElementById("about-button")
const feedbackButton = document.getElementById("about-feedback")

beginButtonV2.addEventListener("click", function () {
    window.location.href = "/gameplay-v.2.html";
})

aboutButton.addEventListener("click", function (){
    window.location.href = "/about.html"
})

feedbackButton.addEventListener("click", function() {
    window.location.href = "/feedback.html"
})
//  *************************************************************
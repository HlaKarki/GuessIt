/* Show the body after the page is fully loaded */
window.onload = function() {
    document.body.style.display = "block";
};

//***************** settings page javascript **************************
const allowed_attempts = document.getElementById("allowed-attempts-number");
const word_lengthId = document.getElementById("word-length-number")
const settingDoneButton = document.getElementById("settings-done-button")

settingDoneButton.addEventListener("click", function() {
    // store user customized settings in browser storage //
    localStorage.setItem("attempts", allowed_attempts.value)
    attempt_setting = allowed_attempts.value

    localStorage.setItem("word-length", word_lengthId.value)
    word_length = word_lengthId.value

    goBackHome();
})
//*************************************************************


// go back to home page
function goBackHome() {
    window.location.href = "/home.html";
}
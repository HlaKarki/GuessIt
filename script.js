var buttons = document.getElementsByClassName("input");

var user_input_container = document.querySelector(".user-input")
var user_input_A = user_input_container.querySelectorAll("label")
console.log(user_input_A[0].textContent)

if(!buttons.length){
    console.log("No buttons found with class name 'input'")
}else{
    for (var i = 0; i < buttons.length; i++) {
        // write code for random words here
        buttons[i].textContent = "h"


        buttons[i].addEventListener("click", function() {
            // Code to run when any button is clicked
            var h = this.textContent
            console.log("a button was clicked:", this.textContent)
            // for (var j = 0; j < user_input_A.length; j++) {
            //     if (user_input_A[j].textContent == "_") {
            //         user_input_A[j].textContent = h
            //         break;
            //     }
            //
            // }
        });
    }
}
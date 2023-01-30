var currentUrl = window.location.href;
//***************** settings page js **************************
if (currentUrl.indexOf("/settings.html")!=-1) {
    var allowed_attempts = document.getElementById("allowed-attempts-number")
    allowed_attempts.addEventListener("input", function(){
        console.log(allowed_attempts.value)
        localStorage.setItem("attempts", allowed_attempts.value)
    })

    var word_length = document.getElementById("word-length-number")

    localStorage.setItem("word-length", word_length)
}



//*************************************************************

//***************** gameplay page js **************************
else if (currentUrl.indexOf("/about.html")!=1) {
    var buttons = document.getElementsByClassName("input");
    var gameplay_attempts_left = document.getElementById("gameplay-attempts-left")
    var user_input_container = document.querySelector(".user-input")
    var user_input_A = user_input_container.querySelectorAll("label")

    var guess = document.getElementById("guessit")
    var erase = document.getElementById("erase")
    var guessedWord = ""

    var attempts_left = localStorage.getItem("attempts");
    var boo = localStorage.getItem("word-length")
    gameplay_attempts_left.textContent = "Attempts left: " + attempts_left

    if(!buttons.length){
        console.log("No buttons found with class name 'input'")
    }else{


        for (let i = 0; i < buttons.length; i++) {
            // write code for random words here
            buttons[i].textContent = "h"


            buttons[i].addEventListener("click", function() {
                // Code to run when any button is clicked
                var h = this.textContent
                console.log("a button was clicked:", this.textContent)
                for (var j = 0; j < user_input_A.length; j++) {
                    if (user_input_A[j].textContent == "_") {
                        user_input_A[j].textContent = h
                        break;
                    }

                }
            });
        }
    }

    guess.addEventListener("click", function (){
        attempts_left = (parseInt(attempts_left)-1).toString()
        gameplay_attempts_left.textContent = "Attempts left: " + attempts_left
        if(attempts_left == 0) {
            alert("You have used all the attempts!")
        }
        for (var j = 0; j < user_input_A.length; j++) {
            if (user_input_A[j].textContent == "_") {
                alert("Please select all the letters of the word first")
                break;
            }
            guessedWord += user_input_A[j].textContent
        }
        console.log(guessedWord)
    })

    erase.addEventListener("click", function (){
        for (var j = user_input_A.length-1; j > -1; j--) {
            if (user_input_A[j].textContent !== "_") {
                user_input_A[j].textContent = "_"
                break;
            }
        }
    })
}



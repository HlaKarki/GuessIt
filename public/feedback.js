/* Show the body after the page is fully loaded */
window.onload = function() {
    document.body.style.display = "block";
};

//***************** feedback page javascript **************************

// load the feedbacks in the JSON file when window is loaded
window.addEventListener('load', function () {
    fetchFeedbacks()
})

// ********** variable declaration *************
const newFeedbackFormButton = document.getElementById("feedback-new-form");
const modalBackdrop = document.getElementById("modal-backdrop");
const feedbackForm = document.querySelector('.feedback-form');
const submitButton = document.getElementById("feedback-submit");
const homeButton = document.getElementById("feedback-home-button");
const feedbackCloseButton = document.getElementById("feedback-close");
// *********************************************

if (window.location.href.includes("feedback")) {
    homeButton.addEventListener("click", goBackHome);

    // display the form when the button is clicked
    newFeedbackFormButton.addEventListener("click", function(){
        modalBackdrop.classList.remove("hidden");
        feedbackForm.classList.remove('hidden');
    })

    // when submit button is clicked, add the new feedback to the JSON file
    submitButton.addEventListener("click", function() {
        addNewFeedback(modalBackdrop, feedbackForm, true);
    })

    // when close button is clicked, hide the form
    feedbackCloseButton.addEventListener("click", function() {
        modalBackdrop.classList.add("hidden");
        feedbackForm.classList.add('hidden');
    })

// ************************************************************************
}


// getting all the feedbacks from the JSON file
async function fetchFeedbacks(){
    if (!window.location.href.includes("feedback")) { return }

    const feedbacks = document.getElementById("feedback-feedbacks");
    // first remove all the feedbacks that may be in the DOM
    while (feedbacks.firstChild) {
        feedbacks.removeChild(feedbacks.firstChild);
    }

    // get call to server to provide with the feedback data
    await fetch("/getData", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            // Loop through each feedback item and create an element for it
            data.forEach(feedback => {
                const feedbackItem = document.createElement("div");
                feedbackItem.classList.add("feedback-item");
                feedbackItem.classList.add("feedback-box"); // Add feedback-box class

                const name = document.createElement("h2");
                name.textContent = feedback.name;
                feedbackItem.appendChild(name);

                const currentFeedback = document.createElement("p");
                currentFeedback.textContent = feedback.feedback;
                feedbackItem.appendChild(currentFeedback);

                const timestamp = document.createElement("span");
                timestamp.classList.add("timestamp");
                timestamp.textContent = timeAgo(feedback.time)
                feedbackItem.appendChild(timestamp);

                // feedbacks.appendChild(feedbackItem);
                feedbacks.insertBefore(feedbackItem, feedbacks.firstChild);
            })
        })
        .catch(error => console.error(error));
}

// add the user input feedback data to the JSON file
async function addNewFeedback(modalBackdrop, feedbackForm, fetchFeeds) {
    const feedbackName = document.getElementById("feedback-name");
    const feedback = document.getElementById("feedback-feedback");
    const timeNow = new Date().toISOString();

    // post call to server with name, feedback and time data
    await fetch('/addFeedback', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: feedbackName.value,
            feedback: feedback.value,
            time: timeNow
        })
    })
        .then(response => {
            // hide the form again when done
            if (response.status === 200) {
                modalBackdrop.classList.add("hidden");
                feedbackForm.classList.add('hidden');
                alert("Your feedback has been submitted successfully");

                feedbackName.value = "";
                feedback.value = "";
                if (fetchFeeds) {fetchFeedbacks();}
            }
            else {
                alert("There was an error submitting your feedback. Please try again later.")
            }
        })
}

// formats the time data to time elapsed since format
function timeAgo(timestamp) {
    const now = new Date();
    const seconds = Math.floor((now - new Date(timestamp)) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
        return interval + " year" + (interval === 1 ? "" : "s") + " ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return interval + " month" + (interval === 1 ? "" : "s") + " ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return interval + " day" + (interval === 1 ? "" : "s") + " ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return interval + " hour" + (interval === 1 ? "" : "s") + " ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return interval + " minute" + (interval === 1 ? "" : "s") + " ago";
    }
    return "Just now";
}

// go back to home page
function goBackHome() {
    window.location.href = "/home.html";
}

export { addNewFeedback };
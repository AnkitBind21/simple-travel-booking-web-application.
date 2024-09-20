const signInBtn = document.getElementById("signIn");
const signUpBtn = document.getElementById("signUp");
const fistForm = document.getElementById("form1");
const secondForm = document.getElementById("form2");
const container = document.querySelector(".container");

// Switch to Sign In form
signInBtn.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});

// Switch to Sign Up form
signUpBtn.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

// Prevent default form submission
fistForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Handle sign-up logic here if needed
    alert("Sign Up form submitted");
});

secondForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Redirect to booking page on successful sign-in
    goToBookingPage();
});

// Redirect function
function goToBookingPage() {
    // Here you could also check credentials before redirecting
    window.location.href = 'index.html'; // Redirect to the flight booking homepage
}

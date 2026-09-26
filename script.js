// FixMitra JavaScript

// Find a Service button
const serviceButton = document.querySelector("#home button");

serviceButton.addEventListener("click", function () {
    document.querySelector("#services").scrollIntoView({
        behavior: "smooth"
    });
});


// Get Started button
const contactButton = document.querySelector("#contact button");

contactButton.addEventListener("click", function () {
    alert("Welcome to FixMitra! Your service journey starts here.");
});


// Service cards
const serviceCards = document.querySelectorAll("#services div");

serviceCards.forEach(function (card) {

    card.addEventListener("click", function () {

        const serviceName = card.querySelector("h3").textContent;

        alert(
            "You selected " +
            serviceName +
            ". We will help you find a professional."
        );

    });

});

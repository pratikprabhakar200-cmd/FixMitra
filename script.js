function searchService() {

    const service = document.getElementById("serviceSearch").value;
    const location = document.getElementById("location").value;

    if (service === "") {
        alert("Please enter the service you need.");
        return;
    }

    if (location === "") {
        alert("Please select your location.");
        return;
    }

    alert(
        "Searching for " +
        service +
        " services in " +
        location +
        "..."
    );
}


function startService() {

    document.getElementById("services").scrollIntoView({
        behavior: "smooth"
    });

}


document.querySelector(".login-btn").addEventListener("click", function () {

    alert("Login and Sign Up feature will be available soon.");

});

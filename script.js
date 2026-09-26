/* =========================
   SEARCH SERVICE
========================= */

function searchService() {

    const service =
        document.getElementById("serviceSearch").value.trim();

    const location =
        document.getElementById("location").value;


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


/* =========================
   GET STARTED
========================= */

function startService() {

    document
        .getElementById("services")
        .scrollIntoView({

            behavior: "smooth"

        });

}


/* =========================
   LOGIN / SIGN UP
========================= */

function openLogin() {

    const loginWindow =
        document.createElement("div");

    loginWindow.className = "login-overlay";


    loginWindow.innerHTML = `

        <div class="login-box">

            <button
                class="close-login"
                onclick="closeLogin()"
            >
                ×
            </button>


            <h2>Welcome to FixMitra</h2>

            <p class="login-subtitle">
                Login or create your account
            </p>


            <input
                type="text"
                id="loginName"
                placeholder="Enter your name"
            >


            <input
                type="tel"
                id="loginPhone"
                placeholder="Enter mobile number"
            >


            <button
                class="login-submit"
                onclick="submitLogin()"
            >
                Continue
            </button>


            <p class="login-note">
                By continuing, you agree to FixMitra
                Terms & Privacy Policy.
            </p>

        </div>

    `;


    document.body.appendChild(loginWindow);

}


/* =========================
   CLOSE LOGIN
========================= */

function closeLogin() {

    const loginWindow =
        document.querySelector(".login-overlay");


    if (loginWindow) {

        loginWindow.remove();

    }

}


/* =========================
   LOGIN SUBMIT
========================= */

function submitLogin() {

    const name =
        document.getElementById("loginName").value.trim();

    const phone =
        document.getElementById("loginPhone").value.trim();


    if (name === "") {

        alert("Please enter your name.");

        return;

    }


    if (phone === "") {

        alert("Please enter your mobile number.");

        return;

    }


    if (phone.length !== 10) {

        alert(
            "Please enter a valid 10-digit mobile number."
        );

        return;

    }


    alert(
        "Welcome " +
        name +
        "! Your FixMitra account request has been received."
    );


    closeLogin();

}


/* =========================
   LOGIN BUTTON
========================= */

const loginButton =
    document.querySelector(".login-btn");


if (loginButton) {

    loginButton.addEventListener(
        "click",
        openLogin
    );

}

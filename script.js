/* =========================
   SEARCH SERVICE
========================= */

function searchService() {

    const service =
        document.getElementById("serviceSearch")
        .value
        .trim();

    const location =
        document.getElementById("location")
        .value;


    if (service === "") {

        alert(
            "Please enter the service you need."
        );

        return;
    }


    if (location === "") {

        alert(
            "Please select your location."
        );

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
   OPEN PROBLEM FORM
========================= */

function openProblemForm(serviceName) {

    const overlay =
        document.getElementById(
            "problemOverlay"
        );

    const serviceInput =
        document.getElementById(
            "problemService"
        );


    serviceInput.value = serviceName;


    overlay.style.display = "flex";


    document.body.style.overflow =
        "hidden";

}



/* =========================
   CLOSE PROBLEM FORM
========================= */

function closeProblemForm() {

    const overlay =
        document.getElementById(
            "problemOverlay"
        );


    overlay.style.display = "none";


    document.body.style.overflow =
        "auto";

}



/* =========================
   SUBMIT PROBLEM
========================= */

function submitProblem(event) {

    event.preventDefault();


    const service =
        document.getElementById(
            "problemService"
        ).value.trim();


    const name =
        document.getElementById(
            "problemName"
        ).value.trim();


    const phone =
        document.getElementById(
            "problemPhone"
        ).value.trim();


    const location =
        document.getElementById(
            "problemLocation"
        ).value;


    const description =
        document.getElementById(
            "problemDescription"
        ).value.trim();


    const photo =
        document.getElementById(
            "problemPhoto"
        );



    /* =========================
       VALIDATION
    ========================= */

    if (name === "") {

        alert(
            "Please enter your name."
        );

        return;

    }



    if (phone === "") {

        alert(
            "Please enter your mobile number."
        );

        return;

    }



    if (!/^[0-9]{10}$/.test(phone)) {

        alert(
            "Please enter a valid 10-digit mobile number."
        );

        return;

    }



    if (location === "") {

        alert(
            "Please select your location."
        );

        return;

    }



    if (description === "") {

        alert(
            "Please describe your problem."
        );

        return;

    }



    /* =========================
       PHOTO MESSAGE
    ========================= */

    let photoMessage =
        "No photo attached.";


    if (
        photo.files &&
        photo.files.length > 0
    ) {

        photoMessage =
            "Photo attached.";

    }



    /* =========================
       SUCCESS MESSAGE
    ========================= */

    alert(
        "Service request submitted successfully!\n\n" +

        "Service: " +
        service +
        "\n" +

        "Name: " +
        name +
        "\n" +

        "Location: " +
        location +
        "\n\n" +

        photoMessage
    );



    /* =========================
       RESET FORM
    ========================= */

    document
        .getElementById("problemForm")
        .reset();


    document
        .getElementById("problemService")
        .value = "";


    closeProblemForm();

}



/* =========================
   LOGIN / SIGN UP
========================= */

function openLogin() {

    const existingLogin =
        document.querySelector(
            ".login-overlay"
        );


    if (existingLogin) {

        return;

    }


    const loginWindow =
        document.createElement("div");


    loginWindow.className =
        "login-overlay";


    loginWindow.innerHTML = `

        <div class="login-box">

            <button
                class="close-login"
                type="button"
                onclick="closeLogin()"
            >
                ×
            </button>


            <h2>
                Welcome to FixMitra
            </h2>


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
                maxlength="10"
            >


            <button
                class="login-submit"
                type="button"
                onclick="submitLogin()"
            >
                Continue
            </button>


            <p class="login-note">
                By continuing, you agree to
                FixMitra Terms & Privacy Policy.
            </p>

        </div>

    `;


    document.body.appendChild(
        loginWindow
    );


    document.body.style.overflow =
        "hidden";

}



/* =========================
   CLOSE LOGIN
========================= */

function closeLogin() {

    const loginWindow =
        document.querySelector(
            ".login-overlay"
        );


    if (loginWindow) {

        loginWindow.remove();

    }


    document.body.style.overflow =
        "auto";

}



/* =========================
   LOGIN SUBMIT
========================= */

function submitLogin() {

    const name =
        document.getElementById(
            "loginName"
        ).value.trim();


    const phone =
        document.getElementById(
            "loginPhone"
        ).value.trim();



    if (name === "") {

        alert(
            "Please enter your name."
        );

        return;

    }



    if (phone === "") {

        alert(
            "Please enter your mobile number."
        );

        return;

    }



    if (!/^[0-9]{10}$/.test(phone)) {

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
    document.querySelector(
        ".login-btn"
    );


if (loginButton) {

    loginButton.addEventListener(
        "click",
        openLogin
    );

}



/* =========================
   CLOSE PROBLEM POPUP
   BY CLICKING OUTSIDE
========================= */

const problemOverlay =
    document.getElementById(
        "problemOverlay"
    );


if (problemOverlay) {

    problemOverlay.addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                problemOverlay
            ) {

                closeProblemForm();

            }

        }
    );

}

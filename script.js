/* =====================================================
   FIXMITRA JAVASCRIPT
===================================================== */


/* =====================================================
   SEARCH SERVICE
===================================================== */

function searchService() {

    const location =
        document.getElementById("location").value;

    const service =
        document.getElementById("serviceSearch").value.trim();


    if (location === "") {

        alert("Please select your location.");

        return;
    }


    if (service === "") {

        alert("Please enter the service you need.");

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



/* =====================================================
   GET STARTED
===================================================== */

function startService() {

    document.getElementById("services")
        .scrollIntoView({
            behavior: "smooth"
        });

}



/* =====================================================
   CUSTOMER PROBLEM FORM
===================================================== */

function openProblemForm(serviceName) {

    const overlay =
        document.getElementById("problemOverlay");

    const serviceInput =
        document.getElementById("problemService");


    serviceInput.value = serviceName;

    overlay.classList.add("active");

    document.body.style.overflow = "hidden";
}



function closeProblemForm() {

    document
        .getElementById("problemOverlay")
        .classList.remove("active");

    document.body.style.overflow = "auto";
}



function submitProblem(event) {

    event.preventDefault();


    const service =
        document.getElementById("problemService").value;

    const name =
        document.getElementById("problemName").value.trim();

    const phone =
        document.getElementById("problemPhone").value.trim();

    const location =
        document.getElementById("problemLocation").value;

    const address =
        document.getElementById("problemAddress").value.trim();

    const description =
        document.getElementById("problemDescription").value.trim();


    if (name === "") {

        alert("Please enter your name.");

        return;
    }


    if (!/^[0-9]{10}$/.test(phone)) {

        alert("Please enter a valid 10 digit mobile number.");

        return;
    }


    if (location === "") {

        alert("Please select your location.");

        return;
    }


    if (address === "") {

        alert("Please enter your address.");

        return;
    }


    if (description === "") {

        alert("Please describe your problem.");

        return;
    }


    alert(
        "Problem submitted successfully! ✓\n\n" +

        "Service: " + service +
        "\nName: " + name +
        "\nMobile: " + phone +
        "\nLocation: " + location +

        "\n\nFixMitra will connect you with a service professional."
    );


    document
        .getElementById("problemForm")
        .reset();


    closeProblemForm();

}



/* =====================================================
   MITRA REGISTRATION
===================================================== */

let mobileVerified = false;

let emailVerified = false;

let mobileOTP = "";

let emailOTP = "";



function openMitraForm() {

    document
        .getElementById("mitraOverlay")
        .classList.add("active");

    document.body.style.overflow = "hidden";

}



function closeMitraForm() {

    document
        .getElementById("mitraOverlay")
        .classList.remove("active");

    document.body.style.overflow = "auto";

}



/* =====================================================
   MOBILE OTP
===================================================== */

function sendMobileOTP() {

    const mobile =
        document
            .getElementById("mitraMobile")
            .value
            .trim();


    if (!/^[0-9]{10}$/.test(mobile)) {

        alert(
            "Please enter a valid 10 digit mobile number."
        );

        return;
    }


    /*
       DEMO OTP
       Real SMS OTP will be connected with backend later.
    */

    mobileOTP = "123456";


    document
        .getElementById("mobileStatus")
        .textContent =
        "Demo OTP sent. Enter 123456";


    alert(
        "Demo Mobile OTP: 123456"
    );

}



function verifyMobileOTP() {

    const enteredOTP =
        document
            .getElementById("mobileOTP")
            .value
            .trim();


    if (enteredOTP === "") {

        alert("Please enter the mobile OTP.");

        return;
    }


    if (enteredOTP === mobileOTP && mobileOTP !== "") {

        mobileVerified = true;


        document
            .getElementById("mobileStatus")
            .textContent =
            "✓ Mobile number verified";


        document
            .getElementById("mobileStatus")
            .style.color =
            "#087449";

    } else {

        mobileVerified = false;


        document
            .getElementById("mobileStatus")
            .textContent =
            "✕ Incorrect OTP";


        document
            .getElementById("mobileStatus")
            .style.color =
            "#d92d20";
    }

}



/* =====================================================
   EMAIL VERIFICATION
===================================================== */

function sendEmailOTP() {

    const email =
        document
            .getElementById("mitraEmail")
            .value
            .trim();


    if (email === "") {

        alert("Please enter your email address.");

        return;
    }


    if (!email.includes("@")) {

        alert("Please enter a valid email address.");

        return;
    }


    /*
       DEMO EMAIL CODE
       Real email verification will be connected later.
    */

    emailOTP = "654321";


    document
        .getElementById("emailStatus")
        .textContent =
        "Demo verification code sent. Enter 654321";


    alert(
        "Demo Email Verification Code: 654321"
    );

}



function verifyEmailOTP() {

    const enteredOTP =
        document
            .getElementById("emailOTP")
            .value
            .trim();


    if (enteredOTP === "") {

        alert(
            "Please enter the email verification code."
        );

        return;
    }


    if (enteredOTP === emailOTP && emailOTP !== "") {

        emailVerified = true;


        document
            .getElementById("emailStatus")
            .textContent =
            "✓ Email verified";


        document
            .getElementById("emailStatus")
            .style.color =
            "#087449";

    } else {

        emailVerified = false;


        document
            .getElementById("emailStatus")
            .textContent =
            "✕ Incorrect verification code";


        document
            .getElementById("emailStatus")
            .style.color =
            "#d92d20";
    }

}



/* =====================================================
   MITRA SUBMIT
===================================================== */

function submitMitra(event) {

    event.preventDefault();


    const ownerName =
        document
            .getElementById("ownerName")
            .value
            .trim();


    const businessName =
        document
            .getElementById("businessName")
            .value
            .trim();


    const mobile =
        document
            .getElementById("mitraMobile")
            .value
            .trim();


    const email =
        document
            .getElementById("mitraEmail")
            .value
            .trim();


    const service =
        document
            .getElementById("mitraService")
            .value;


    const location =
        document
            .getElementById("mitraLocation")
            .value;


    const address =
        document
            .getElementById("mitraAddress")
            .value
            .trim();


    const experience =
        document
            .getElementById("mitraExperience")
            .value;


    const password =
        document
            .getElementById("mitraPassword")
            .value;


    const terms =
        document
            .getElementById("mitraTerms")
            .checked;



    /* MOBILE CHECK */

    if (!/^[0-9]{10}$/.test(mobile)) {

        alert(
            "Please enter a valid 10 digit mobile number."
        );

        return;
    }



    /* MOBILE VERIFICATION */

    if (!mobileVerified) {

        alert(
            "Please verify your mobile number first."
        );

        return;
    }



    /* EMAIL VERIFICATION */

    if (!emailVerified) {

        alert(
            "Please verify your email first."
        );

        return;
    }



    /* REQUIRED DATA */

    if (
        ownerName === "" ||
        businessName === "" ||
        email === "" ||
        service === "" ||
        location === "" ||
        address === "" ||
        experience === "" ||
        password === ""
    ) {

        alert(
            "Please complete all required fields."
        );

        return;
    }



    /* PASSWORD */

    if (password.length < 6) {

        alert(
            "Password must be at least 6 characters."
        );

        return;
    }



    /* TERMS */

    if (!terms) {

        alert(
            "Please accept the terms and conditions."
        );

        return;
    }



    /* SUCCESS */

    alert(
        "🎉 Registration Submitted Successfully!\n\n" +

        "Business: " +
        businessName +

        "\nService: " +
        service +

        "\nLocation: " +
        location +

        "\n\nStatus: PENDING\n\n" +

        "Your shop registration will be reviewed by FixMitra Admin."
    );



    document
        .getElementById("mitraForm")
        .reset();


    mobileVerified = false;

    emailVerified = false;

    mobileOTP = "";

    emailOTP = "";


    document
        .getElementById("mobileStatus")
        .textContent = "";


    document
        .getElementById("emailStatus")
        .textContent = "";


    closeMitraForm();

}



/* =====================================================
   LOGIN
===================================================== */

function openLogin() {

    document
        .getElementById("loginOverlay")
        .classList.add("active");

    document.body.style.overflow = "hidden";

}



function closeLogin() {

    document
        .getElementById("loginOverlay")
        .classList.remove("active");

    document.body.style.overflow = "auto";

}



function submitLogin(event) {

    event.preventDefault();


    const mobile =
        document
            .getElementById("loginMobile")
            .value
            .trim();


    const password =
        document
            .getElementById("loginPassword")
            .value;


    if (!/^[0-9]{10}$/.test(mobile)) {

        alert(
            "Please enter a valid 10 digit mobile number."
        );

        return;
    }


    if (password.length < 6) {

        alert(
            "Password must be at least 6 characters."
        );

        return;
    }


    alert(
        "Welcome to FixMitra! ✓\n\n" +
        "Login demo completed successfully."
    );


    document
        .getElementById("loginForm")
        .reset();


    closeLogin();

}



/* =====================================================
   CLOSE POPUPS WHEN CLICKING OUTSIDE
===================================================== */

document.addEventListener(
    "click",
    function(event) {

        const problemOverlay =
            document.getElementById("problemOverlay");

        const mitraOverlay =
            document.getElementById("mitraOverlay");

        const loginOverlay =
            document.getElementById("loginOverlay");


        if (
            event.target === problemOverlay
        ) {

            closeProblemForm();

        }


        if (
            event.target === mitraOverlay
        ) {

            closeMitraForm();

        }


        if (
            event.target === loginOverlay
        ) {

            closeLogin();

        }

    }
);

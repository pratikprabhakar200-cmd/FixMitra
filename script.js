// ==========================================
// FIXMITRA JAVASCRIPT
// ==========================================



// ==========================================
// CUSTOMER SEARCH
// ==========================================

function searchService() {

    const service =
        document
            .getElementById("serviceSearch")
            .value
            .trim();


    const location =
        document
            .getElementById("location")
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



// ==========================================
// GET STARTED / SERVICES
// ==========================================

function startService() {

    document
        .getElementById("services")
        .scrollIntoView({
            behavior: "smooth"
        });

}



// ==========================================
// CUSTOMER PROBLEM FORM
// ==========================================

function openProblemForm(serviceName) {

    document
        .getElementById("problemService")
        .value = serviceName;


    document
        .getElementById("problemOverlay")
        .style.display = "flex";


    document.body.style.overflow = "hidden";

}



function closeProblemForm() {

    document
        .getElementById("problemOverlay")
        .style.display = "none";


    document.body.style.overflow = "auto";

}



function submitProblem(event) {

    event.preventDefault();


    const service =
        document
            .getElementById("problemService")
            .value;


    const name =
        document
            .getElementById("problemName")
            .value
            .trim();


    const phone =
        document
            .getElementById("problemPhone")
            .value
            .trim();


    const location =
        document
            .getElementById("problemLocation")
            .value;


    const address =
        document
            .getElementById("problemAddress")
            .value
            .trim();


    const description =
        document
            .getElementById("problemDescription")
            .value
            .trim();


    const photo =
        document
            .getElementById("problemPhoto")
            .files.length;



    if (name === "") {

        alert(
            "Please enter your name."
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


    if (address === "") {

        alert(
            "Please enter your full address."
        );

        return;
    }


    if (description === "") {

        alert(
            "Please describe your problem."
        );

        return;
    }



    let photoMessage =
        "No photo uploaded.";


    if (photo > 0) {

        photoMessage =
            "Photo attached.";

    }



    alert(

        "Service request submitted!\n\n" +

        "Service: " +
        service +

        "\nName: " +
        name +

        "\nLocation: " +
        location +

        "\nAddress: " +
        address +

        "\nProblem: " +
        description +

        "\n\n" +

        photoMessage

    );


    document
        .getElementById("problemForm")
        .reset();


    closeProblemForm();

}



// ==========================================
// MITRA REGISTRATION
// ==========================================

let mobileVerified = false;

let emailVerified = false;

let mobileOTP = "";

let emailOTP = "";



// ==========================================
// OPEN MITRA FORM
// ==========================================

function openMitraForm() {

    document
        .getElementById("mitraOverlay")
        .style.display = "flex";


    document.body.style.overflow = "hidden";

}



// ==========================================
// CLOSE MITRA FORM
// ==========================================

function closeMitraForm() {

    document
        .getElementById("mitraOverlay")
        .style.display = "none";


    document.body.style.overflow = "auto";

}



// ==========================================
// SEND MOBILE OTP
// ==========================================

function sendMobileOTP() {

    const mobile =
        document
            .getElementById("mobile")
            .value
            .trim();


    if (!/^[0-9]{10}$/.test(mobile)) {

        alert(
            "Please enter a valid 10-digit mobile number."
        );

        return;
    }


    mobileOTP = "123456";

    mobileVerified = false;


    alert(
        "Demo Mobile OTP sent.\n\n" +
        "Testing OTP: 123456"
    );

}



// ==========================================
// VERIFY MOBILE OTP
// ==========================================

function verifyMobileOTP() {

    const otp =
        document
            .getElementById("mobileOTP")
            .value
            .trim();


    if (otp === mobileOTP && otp !== "") {

        mobileVerified = true;


        alert(
            "Mobile number verified successfully! ✓"
        );

    } else {

        mobileVerified = false;


        alert(
            "Invalid mobile OTP."
        );

    }

}



// ==========================================
// SEND EMAIL VERIFICATION
// ==========================================

function sendEmailOTP() {

    const email =
        document
            .getElementById("email")
            .value
            .trim();


    if (email === "") {

        alert(
            "Please enter your email address."
        );

        return;
    }


    emailOTP = "654321";

    emailVerified = false;


    alert(
        "Demo Email verification code sent.\n\n" +
        "Testing code: 654321"
    );

}



// ==========================================
// VERIFY EMAIL
// ==========================================

function verifyEmailOTP() {

    const otp =
        document
            .getElementById("emailOTP")
            .value
            .trim();


    if (otp === emailOTP && otp !== "") {

        emailVerified = true;


        alert(
            "Email verified successfully! ✓"
        );

    } else {

        emailVerified = false;


        alert(
            "Invalid email verification code."
        );

    }

}



// ==========================================
// MITRA FORM SUBMIT
// ==========================================

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
            .getElementById("mobile")
            .value
            .trim();


    const email =
        document
            .getElementById("email")
            .value
            .trim();


    const service =
        document
            .getElementById("service")
            .value;


    const location =
        document
            .getElementById("location")
            .value;


    const address =
        document
            .getElementById("address")
            .value
            .trim();


    const experience =
        document
            .getElementById("experience")
            .value;


    const shopPhoto =
        document
            .getElementById("shopPhoto")
            .files.length;


    const password =
        document
            .getElementById("password")
            .value;


    const terms =
        document
            .getElementById("terms")
            .checked;



    if (ownerName === "") {

        alert(
            "Please enter owner name."
        );

        return;
    }


    if (businessName === "") {

        alert(
            "Please enter business/shop name."
        );

        return;
    }


    if (!/^[0-9]{10}$/.test(mobile)) {

        alert(
            "Please enter a valid 10-digit mobile number."
        );

        return;
    }


    if (!mobileVerified) {

        alert(
            "Please verify your mobile number first."
        );

        return;
    }


    if (email === "") {

        alert(
            "Please enter your email."
        );

        return;
    }


    if (!emailVerified) {

        alert(
            "Please verify your email first."
        );

        return;
    }


    if (service === "") {

        alert(
            "Please select your service."
        );

        return;
    }


    if (location === "") {

        alert(
            "Please select your location."
        );

        return;
    }


    if (address === "") {

        alert(
            "Please enter your full address."
        );

        return;
    }


    if (experience === "") {

        alert(
            "Please select your experience."
        );

        return;
    }


    if (shopPhoto === 0) {

        alert(
            "Please upload your shop photo."
        );

        return;
    }


    if (password.length < 6) {

        alert(
            "Password must be at least 6 characters."
        );

        return;
    }


    if (!terms) {

        alert(
            "Please accept the terms and conditions."
        );

        return;
    }



    alert(

        "Mitra registration submitted successfully! ✓\n\n" +

        "Business: " +
        businessName +

        "\nService: " +
        service +

        "\nLocation: " +
        location +

        "\n\nStatus: PENDING\n\n" +

        "Your registration will be reviewed by FixMitra Admin."

    );



    document
        .getElementById("mitraForm")
        .reset();


    mobileVerified = false;

    emailVerified = false;

    mobileOTP = "";

    emailOTP = "";

    closeMitraForm();

}



// ==========================================
// LOGIN
// ==========================================

function openLogin() {

    document
        .getElementById("loginOverlay")
        .style.display = "flex";


    document.body.style.overflow = "hidden";

}



function closeLogin() {

    document
        .getElementById("loginOverlay")
        .style.display = "none";


    document.body.style.overflow = "auto";

}



function submitLogin(event) {

    event.preventDefault();


    const name =
        document
            .getElementById("loginName")
            .value
            .trim();


    const phone =
        document
            .getElementById("loginPhone")
            .value
            .trim();


    if (name === "") {

        alert(
            "Please enter your name."
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


    document
        .getElementById("loginForm")
        .reset();


    closeLogin();

}



// ==========================================
// CLOSE MITRA POPUP BY CLICKING OUTSIDE
// ==========================================

document
    .getElementById("mitraOverlay")
    .addEventListener(
        "click",
        function(event) {

            if (
                event.target === this
            ) {

                closeMitraForm();

            }

        }
    );



// ==========================================
// CLOSE CUSTOMER POPUP BY CLICKING OUTSIDE
// ==========================================

document
    .getElementById("problemOverlay")
    .addEventListener(
        "click",
        function(event) {

            if (
                event.target === this
            ) {

                closeProblemForm();

            }

        }
    );



// ==========================================
// CLOSE LOGIN POPUP BY CLICKING OUTSIDE
// ==========================================

document
    .getElementById("loginOverlay")
    .addEventListener(
        "click",
        function(event) {

            if (
                event.target === this
            ) {

                closeLogin();

            }

        }
    );

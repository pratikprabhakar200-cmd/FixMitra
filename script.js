// ======================================
// FIXMITRA MITRA REGISTRATION
// JAVASCRIPT
// ======================================


// Mobile verification status

let mobileVerified = false;


// Email verification status

let emailVerified = false;


// Demo OTP values

let mobileOTP = "";
let emailOTP = "";



// ======================================
// SEND MOBILE OTP
// ======================================

function sendMobileOTP() {

    const mobile =
        document.getElementById("mobile").value.trim();


    if (mobile === "") {

        alert(
            "Please enter your mobile number."
        );

        return;
    }


    if (!/^[0-9]{10}$/.test(mobile)) {

        alert(
            "Please enter a valid 10-digit mobile number."
        );

        return;
    }


    // Demo OTP

    mobileOTP = "123456";


    mobileVerified = false;


    alert(
        "Demo Mobile OTP sent.\n\n" +
        "For testing use OTP: 123456"
    );

}



// ======================================
// VERIFY MOBILE OTP
// ======================================

function verifyMobileOTP() {

    const enteredOTP =
        document.getElementById("mobileOTP").value.trim();


    if (enteredOTP === "") {

        alert(
            "Please enter the mobile OTP."
        );

        return;
    }


    if (enteredOTP === mobileOTP) {

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



// ======================================
// SEND EMAIL VERIFICATION
// ======================================

function sendEmailOTP() {

    const email =
        document.getElementById("email").value.trim();


    if (email === "") {

        alert(
            "Please enter your email address."
        );

        return;
    }


    // Demo email OTP

    emailOTP = "654321";


    emailVerified = false;


    alert(
        "Demo Email Verification Code sent.\n\n" +
        "For testing use code: 654321"
    );

}



// ======================================
// VERIFY EMAIL
// ======================================

function verifyEmailOTP() {

    const enteredOTP =
        document.getElementById("emailOTP").value.trim();


    if (enteredOTP === "") {

        alert(
            "Please enter the email verification code."
        );

        return;
    }


    if (enteredOTP === emailOTP) {

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



// ======================================
// MITRA REGISTRATION
// ======================================

document
    .getElementById("mitraForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            // Get form values

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



            // ==================================
            // BASIC VALIDATION
            // ==================================


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



            // ==================================
            // REGISTRATION SUCCESS
            // ==================================


            alert(

                "Registration submitted successfully! ✓\n\n" +

                "Business: " +
                businessName +

                "\nService: " +
                service +

                "\nLocation: " +
                location +

                "\n\n" +

                "Status: PENDING\n\n" +

                "Your registration will be reviewed by FixMitra Admin."

            );



            // Reset form

            document
                .getElementById("mitraForm")
                .reset();


            mobileVerified = false;

            emailVerified = false;

            mobileOTP = "";

            emailOTP = "";

        });

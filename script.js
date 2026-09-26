/* ================= FIXMITRA JAVASCRIPT ================= */


/* ================= SEARCH SERVICE ================= */

function searchService() {

    const location = document.getElementById("locationSelect").value;

    const service = document.getElementById("serviceSearch").value.trim();


    if (location === "" && service === "") {

        alert("Please select a location or enter a service.");

        return;
    }


    if (service !== "") {

        openProblemForm(service);

        return;
    }


    alert(
        "Services are available in " +
        location +
        ". Please select a service to continue."
    );
}



/* ================= CUSTOMER PROBLEM FORM ================= */

function openProblemForm(service = "") {

    const modal = document.getElementById("problemModal");

    const serviceSelect =
        document.getElementById("problemService");


    modal.classList.add("show");

    document.body.style.overflow = "hidden";


    if (service !== "") {

        serviceSelect.value = service;

    } else {

        serviceSelect.value = "";

    }

}


function closeProblemForm() {

    document
        .getElementById("problemModal")
        .classList.remove("show");

    document.body.style.overflow = "";

}


document
    .getElementById("problemForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document.getElementById("customerName").value.trim();

        const mobile =
            document.getElementById("customerMobile").value.trim();

        const service =
            document.getElementById("problemService").value;


        if (name === "" || mobile === "" || service === "") {

            alert("Please fill all required fields.");

            return;
        }


        if (!/^[0-9]{10}$/.test(mobile)) {

            alert("Please enter a valid 10 digit mobile number.");

            return;
        }


        alert(
            "Thank you " +
            name +
            "!\n\n" +
            "Your " +
            service +
            " service request has been submitted.\n\n" +
            "Our team will contact you soon."
        );


        this.reset();

        closeProblemForm();

    });



/* ================= MITRA REGISTRATION ================= */

let mobileVerified = false;

let emailVerified = false;


function openMitraForm() {

    document
        .getElementById("mitraModal")
        .classList.add("show");

    document.body.style.overflow = "hidden";

}


function closeMitraForm() {

    document
        .getElementById("mitraModal")
        .classList.remove("show");

    document.body.style.overflow = "";

}


/* ================= MOBILE OTP ================= */

function sendMobileOTP() {

    const mobile =
        document.getElementById("mitraMobile").value.trim();

    const status =
        document.getElementById("mobileStatus");


    if (!/^[0-9]{10}$/.test(mobile)) {

        alert("Please enter a valid 10 digit mobile number.");

        return;
    }


    status.innerText =
        "OTP sent successfully. Demo OTP: 123456";

    alert(
        "Demo OTP sent to " +
        mobile +
        "\n\nOTP: 123456"
    );

}


function verifyMobileOTP() {

    const otp =
        document.getElementById("mobileOTP").value.trim();

    const status =
        document.getElementById("mobileStatus");


    if (otp === "123456") {

        mobileVerified = true;

        status.innerText =
            "✓ Mobile number verified successfully.";

        status.style.color = "#149447";

    } else {

        mobileVerified = false;

        status.innerText =
            "✕ Incorrect OTP. Please try again.";

        status.style.color = "#d9363e";

    }

}


/* ================= EMAIL OTP ================= */

function sendEmailOTP() {

    const email =
        document.getElementById("mitraEmail").value.trim();

    const status =
        document.getElementById("emailStatus");


    if (email === "") {

        alert("Please enter your email address.");

        return;
    }


    status.innerText =
        "OTP sent successfully. Demo OTP: 654321";

    alert(
        "Demo OTP sent to " +
        email +
        "\n\nOTP: 654321"
    );

}


function verifyEmailOTP() {

    const otp =
        document.getElementById("emailOTP").value.trim();

    const status =
        document.getElementById("emailStatus");


    if (otp === "654321") {

        emailVerified = true;

        status.innerText =
            "✓ Email verified successfully.";

        status.style.color = "#149447";

    } else {

        emailVerified = false;

        status.innerText =
            "✕ Incorrect OTP. Please try again.";

        status.style.color = "#d9363e";

    }

}


/* ================= MITRA FORM SUBMIT ================= */

document
    .getElementById("mitraForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const ownerName =
            document.getElementById("ownerName").value.trim();


        const mobile =
            document.getElementById("mitraMobile").value.trim();


        const email =
            document.getElementById("mitraEmail").value.trim();


        if (!/^[0-9]{10}$/.test(mobile)) {

            alert("Please enter a valid 10 digit mobile number.");

            return;
        }


        if (!mobileVerified) {

            alert(
                "Please verify your mobile number first."
            );

            return;
        }


        if (!emailVerified) {

            alert(
                "Please verify your email address first."
            );

            return;
        }


        const terms =
            document.getElementById("mitraTerms").checked;


        if (!terms) {

            alert(
                "Please confirm that the information provided is correct."
            );

            return;
        }


        alert(
            "Registration submitted successfully!\n\n" +
            "Welcome " +
            ownerName +
            "!\n\n" +
            "Your Mitra registration is currently PENDING.\n" +
            "Admin will review your details."
        );


        this.reset();

        mobileVerified = false;

        emailVerified = false;


        document.getElementById("mobileStatus").innerText =
            "Demo OTP: 123456";

        document.getElementById("emailStatus").innerText =
            "Demo OTP: 654321";


        document.getElementById("mobileStatus").style.color =
            "#68778c";

        document.getElementById("emailStatus").style.color =
            "#68778c";


        closeMitraForm();

    });



/* ================= OUTSIDE CLICK ================= */

document
    .getElementById("problemModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            closeProblemForm();

        }

    });


document
    .getElementById("mitraModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            closeMitraForm();

        }

    });


/* ================= ESC KEY ================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeProblemForm();

        closeMitraForm();

    }

});

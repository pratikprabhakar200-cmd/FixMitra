// ================================
// MITRA REGISTRATION
// ================================


function openMitraForm() {

    const overlay =
        document.getElementById("mitraOverlay");

    overlay.style.display = "flex";

    document.body.style.overflow = "hidden";

}



function closeMitraForm() {

    const overlay =
        document.getElementById("mitraOverlay");

    overlay.style.display = "none";

    document.body.style.overflow = "auto";

}



// ================================
// SUBMIT MITRA REGISTRATION
// ================================


function submitMitra(event) {

    event.preventDefault();


    // GET FORM VALUES

    const ownerName =
        document.getElementById(
            "ownerName"
        ).value.trim();


    const businessName =
        document.getElementById(
            "businessName"
        ).value.trim();


    const phone =
        document.getElementById(
            "mitraPhone"
        ).value.trim();


    const email =
        document.getElementById(
            "mitraEmail"
        ).value.trim();


    const service =
        document.getElementById(
            "mitraService"
        ).value;


    const location =
        document.getElementById(
            "mitraLocation"
        ).value;


    const address =
        document.getElementById(
            "mitraAddress"
        ).value.trim();


    const experience =
        document.getElementById(
            "mitraExperience"
        ).value;


    const password =
        document.getElementById(
            "mitraPassword"
        ).value;


    const terms =
        document.getElementById(
            "mitraTerms"
        ).checked;



    // ================================
    // VALIDATION
    // ================================


    if (ownerName === "") {

        alert(
            "Please enter owner name."
        );

        return;
    }



    if (businessName === "") {

        alert(
            "Please enter business name."
        );

        return;
    }



    if (phone === "") {

        alert(
            "Please enter mobile number."
        );

        return;
    }



    if (!/^[0-9]{10}$/.test(phone)) {

        alert(
            "Please enter a valid 10-digit mobile number."
        );

        return;
    }



    if (email === "") {

        alert(
            "Please enter your email."
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
            "Please enter your business address."
        );

        return;
    }



    if (experience === "") {

        alert(
            "Please select your experience."
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



    // ================================
    // SUCCESS MESSAGE
    // ================================


    alert(
        "Mitra registration successful!\n\n" +

        "Business: " +
        businessName +

        "\nService: " +
        service +

        "\nLocation: " +
        location +

        "\n\nWelcome to FixMitra!"
    );



    // RESET FORM

    document.getElementById(
        "mitraForm"
    ).reset();


    closeMitraForm();

}



// ================================
// CLOSE POPUP BY CLICKING OUTSIDE
// ================================


document
    .getElementById("mitraOverlay")
    .addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                this
            ) {

                closeMitraForm();

            }

        }
    );

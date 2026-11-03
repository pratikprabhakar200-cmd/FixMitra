/* =========================================================
   FIXMITRA - CUSTOMER + MITRA SYSTEM
   Updated version
   ========================================================= */

const VEHICLE_RATES = {
    Petrol: 10,
    Diesel: 9,
    CNG: 7
};

const INSPECTION_CHARGE = 199;

const SERVICE_AREAS = {
    Aurangabad: [
        "Aurangabad",
        "Daudnagar",
        "Barun",
        "Nabinagar",
        "Obra",
        "Rafiganj",
        "Deo",
        "Madanpur"
    ],

    Gaya: [
        "Gaya",
        "Bodh Gaya",
        "Manpur",
        "Sherghati",
        "Tekari",
        "Wazirganj",
        "Belaganj",
        "Dobhi"
    ]
};

const SERVICES = [
    "Electrician",
    "Plumber",
    "AC Repair",
    "RO Service",
    "Carpenter",
    "Cleaning",
    "Home Repair",
    "Computer Repair",
    "Appliance Repair",
    "Painter",
    "TV Repair",
    "Fan Repair",
    "Jio Fiber Repair",
    "Airtel Fiber Repair"
];

let mobileVerified = false;
let emailVerified = false;

let userLatitude = null;
let userLongitude = null;

function byId(id) {
    return document.getElementById(id);
}

/* =========================================================
   MODAL FUNCTIONS
   ========================================================= */

function showModal(id) {
    const element = byId(id);

    if (element) {
        element.classList.add("show");
    }
}

function hideModal(id) {
    const element = byId(id);

    if (element) {
        element.classList.remove("show");
    }
}

/* =========================================================
   SERVICE SEARCH
   ========================================================= */

function searchService() {

    const location = byId("locationSelect")?.value || "";

    const service =
        byId("serviceSearch")?.value.trim() || "";

    if (!location) {
        alert("Please select your location first.");
        return;
    }

    if (!service) {
        alert("Please enter the service you need.");
        return;
    }

    const matchedService = SERVICES.find(
        item => item.toLowerCase() === service.toLowerCase()
    );

    if (!matchedService) {
        alert("Please select a valid FixMitra service.");
        return;
    }

    openProblemForm(matchedService);

    const customerLocation = byId("customerLocation");

    if (customerLocation) {
        customerLocation.value = location;
    }

    updateChargePreview();
}

/* =========================================================
   CUSTOMER BOOKING FORM
   ========================================================= */

function openProblemForm(service = "") {

    showModal("problemModal");

    const select = byId("problemService");

    if (select && service) {

        const option = [...select.options].find(
            item =>
                item.text.trim().toLowerCase() ===
                service.toLowerCase()
        );

        if (option) {
            select.value = option.value;
        }
    }

    setMinimumBookingDate();

    updateChargePreview();
}

function closeProblemForm() {
    hideModal("problemModal");
}

/* =========================================================
   MITRA REGISTRATION FORM
   ========================================================= */

function openMitraForm() {
    showModal("mitraModal");
}

function closeMitraForm() {
    hideModal("mitraModal");
}

/* =========================================================
   DATE VALIDATION
   ========================================================= */

function setMinimumBookingDate() {

    const input = byId("bookingDate");

    if (!input) return;

    const now = new Date();

    const localDate = new Date(
        now.getTime() -
        now.getTimezoneOffset() * 60000
    );

    input.min = localDate.toISOString().slice(0, 10);

    if (!input.value) {
        input.value = input.min;
    }
}

/* =========================================================
   VEHICLE TYPE
   ========================================================= */

function getSelectedVehicle() {

    const service =
        byId("problemService")?.value || "";

    const vehicleMap = {

        "Electrician": "Petrol",
        "Plumber": "CNG",
        "AC Repair": "Diesel",
        "RO Service": "CNG",
        "Carpenter": "Diesel",
        "Cleaning": "CNG",
        "Home Repair": "Petrol",
        "Computer Repair": "Petrol",
        "Appliance Repair": "Diesel",
        "Painter": "CNG",
        "TV Repair": "Petrol",
        "Fan Repair": "Petrol",
        "Jio Fiber Repair": "Petrol",
        "Airtel Fiber Repair": "Petrol"
    };

    return vehicleMap[service] || "Petrol";
}

/* =========================================================
   VISIT CHARGE PREVIEW
   No fake distance calculation
   ========================================================= */

function updateChargePreview() {

    const location =
        byId("customerLocation")?.value || "";

    if (byId("vehicleRate")) {
        byId("vehicleRate").textContent =
            "Vehicle will be assigned by engineer";
    }

    if (byId("distanceValue")) {
        byId("distanceValue").textContent =
            "After engineer assignment";
    }

    if (byId("visitCharge")) {
        byId("visitCharge").textContent =
            "Calculated after assignment";
    }

    if (byId("estimatedTotal")) {

        byId("estimatedTotal").textContent = location
            ? `Inspection charge ₹${INSPECTION_CHARGE} + actual visit charge`
            : "Select your location first";
    }
}

/* =========================================================
   CUSTOMER GPS LOCATION
   ========================================================= */

function useMyLocation() {

    const status = byId("locationStatus");

    if (!navigator.geolocation) {

        if (status) {
            status.textContent =
                "Location is not supported by this browser.";
        }

        return;
    }

    if (status) {
        status.textContent = "Detecting your location...";
    }

    navigator.geolocation.getCurrentPosition(

        position => {

            userLatitude = position.coords.latitude;

            userLongitude = position.coords.longitude;

            if (status) {

                status.textContent =
                    "Location detected successfully.";
            }
        },

        error => {

            const messages = {

                1: "Location permission denied.",
                2: "Location is currently unavailable.",
                3: "Location request timed out."
            };

            if (status) {

                status.textContent =
                    messages[error.code] ||
                    "Unable to detect location.";
            }
        },

        {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 60000
        }
    );
}

/* =========================================================
   BOOKING ID
   ========================================================= */

function createBookingId() {

    const stamp = Date.now()
        .toString()
        .slice(-8);

    const random = Math.floor(
        100 + Math.random() * 900
    );

    return `FM-${stamp}-${random}`;
}

/* =========================================================
   LOCAL BOOKING STORAGE
   Temporary until Firebase integration
   ========================================================= */

function saveBooking(booking) {

    localStorage.setItem(
        "fixmitraLatestBooking",
        JSON.stringify(booking)
    );
}

function getBooking() {

    try {

        return JSON.parse(
            localStorage.getItem("fixmitraLatestBooking")
        ) || null;

    } catch (error) {

        console.error(error);

        return null;
    }
}

/* =========================================================
   CUSTOMER BOOKING SUBMISSION
   ========================================================= */

const problemForm = byId("problemForm");

if (problemForm) {

    problemForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const name =
                byId("customerName").value.trim();

            const mobile =
                byId("customerMobile").value.trim();

            const service =
                byId("problemService").value;

            const location =
                byId("customerLocation").value;

            const address =
                byId("customerAddress").value.trim();

            const problem =
                byId("customerProblem").value.trim();

            const date =
                byId("bookingDate").value;

            const time =
                byId("bookingTime").value;

            if (
                !name ||
                !mobile ||
                !service ||
                !location ||
                !address ||
                !problem ||
                !date ||
                !time
            ) {

                alert("Please fill all required fields.");

                return;
            }

            if (!/^\d{10}$/.test(mobile)) {

                alert(
                    "Please enter a valid 10-digit mobile number."
                );

                return;
            }

            const today = new Date();

            today.setHours(0, 0, 0, 0);

            const selectedDate =
                new Date(`${date}T00:00:00`);

            if (selectedDate < today) {

                alert(
                    "Please select today or a future date."
                );

                return;
            }

            const bookingId = createBookingId();

            const booking = {

                id: bookingId,

                name: name,

                mobile: mobile,

                service: service,

                location: location,

                address: address,

                problem: problem,

                date: date,

                time: time,

                vehicle: null,

                rate: null,

                distance: null,

                visitCharge: null,

                inspectionCharge: INSPECTION_CHARGE,

                total: null,

                latitude: userLatitude,

                longitude: userLongitude,

                engineerId: null,

                engineerName: null,

                engineerLatitude: null,

                engineerLongitude: null,

                status:
                    "Booking Received - Engineer Assignment Pending",

                createdAt: new Date().toISOString()
            };

            saveBooking(booking);

            problemForm.reset();

            if (byId("locationStatus")) {

                byId("locationStatus").textContent =
                    "Location not detected";
            }

            userLatitude = null;

            userLongitude = null;

            closeProblemForm();

            showBookingConfirmation(booking);
        }
    );
}

/* =========================================================
   BOOKING CONFIRMATION
   ========================================================= */

function showBookingConfirmation(booking) {

    const content = byId("confirmationContent");

    if (!content) return;

    content.innerHTML = `

        <div class="success-box">

            <div class="success-icon">✓</div>

            <h3>Booking Received</h3>

            <p>
                Your FixMitra service request has been saved.
            </p>

        </div>

        <div class="booking-summary">

            <div>
                <span>Booking ID</span>
                <strong>${escapeHtml(booking.id)}</strong>
            </div>

            <div>
                <span>Service</span>
                <strong>${escapeHtml(booking.service)}</strong>
            </div>

            <div>
                <span>Location</span>
                <strong>${escapeHtml(booking.location)}</strong>
            </div>

            <div>
                <span>Date & Time</span>
                <strong>
                    ${formatDate(booking.date)}
                    •
                    ${escapeHtml(booking.time)}
                </strong>
            </div>

            <div>
                <span>Inspection Charge</span>
                <strong>₹${INSPECTION_CHARGE}</strong>
            </div>

            <div>
                <span>Visit Charge</span>
                <strong>After Engineer Assignment</strong>
            </div>

        </div>

        <p class="muted-note">
            Actual road distance and visit charge will be
            calculated after the engineer accepts your booking.
            Repair and parts charges will be discussed after
            inspection and your approval.
        </p>

        <div class="tracker-actions">

            <button
                class="btn btn-primary full-btn"
                onclick="
                    openBookingTracker();
                    closeConfirmationModal();
                "
            >
                📍 Track My Booking
            </button>

            <button
                class="btn btn-outline full-btn"
                onclick="closeConfirmationModal()"
            >
                Close
            </button>

        </div>
    `;

    showModal("confirmationModal");
}

/* =========================================================
   BOOKING TRACKER
   ========================================================= */

function openBookingTracker() {

    const booking = getBooking();

    const box = byId("trackerContent");

    if (!box) return;

    if (!booking) {

        box.innerHTML = `

            <div class="empty-tracker">

                <div>📋</div>

                <h3>No booking found</h3>

                <p>
                    Please create a FixMitra booking first.
                </p>

                <button
                    class="btn btn-primary"
                    onclick="
                        closeBookingTracker();
                        openProblemForm();
                    "
                >
                    Create Booking
                </button>

            </div>
        `;

        showModal("trackerModal");

        return;
    }

    const mapsUrl = buildGoogleMapsUrl(booking);

    box.innerHTML = `

        <div class="tracking-status">

            <span class="status-dot"></span>

            <strong>
                ${escapeHtml(booking.status)}
            </strong>

        </div>

        <div class="booking-summary">

            <div>
                <span>Booking ID</span>
                <strong>${escapeHtml(booking.id)}</strong>
            </div>

            <div>
                <span>Service</span>
                <strong>${escapeHtml(booking.service)}</strong>
            </div>

            <div>
                <span>Location</span>
                <strong>${escapeHtml(booking.location)}</strong>
            </div>

            <div>
                <span>Visit Date</span>
                <strong>${formatDate(booking.date)}</strong>
            </div>

            <div>
                <span>Visit Time</span>
                <strong>${escapeHtml(booking.time)}</strong>
            </div>

            <div>
                <span>Inspection Charge</span>
                <strong>₹${INSPECTION_CHARGE}</strong>
            </div>

            <div>
                <span>Visit Charge</span>
                <strong>
                    ${booking.visitCharge === null
                        ? "Pending"
                        : "₹" + booking.visitCharge}
                </strong>
            </div>

        </div>

        <div class="tracking-timeline">

            <div class="timeline-item active">
                <b>1</b>
                <span>Booking received</span>
            </div>

            <div class="timeline-item">
                <b>2</b>
                <span>Engineer assignment</span>
            </div>

            <div class="timeline-item">
                <b>3</b>
                <span>Engineer accepted</span>
            </div>

            <div class="timeline-item">
                <b>4</b>
                <span>Engineer on the way</span>
            </div>

            <div class="timeline-item">
                <b>5</b>
                <span>Engineer arrived</span>
            </div>

            <div class="timeline-item">
                <b>6</b>
                <span>Inspection and approval</span>
            </div>

            <div class="timeline-item">
                <b>7</b>
                <span>Repair completed</span>
            </div>

        </div>

        <div class="tracker-actions">

            <a
                class="btn btn-primary full-btn"
                href="${mapsUrl}"
                target="_blank"
                rel="noopener"
            >
                🗺️ Open Address in Google Maps
            </a>

            <button
                class="btn btn-outline full-btn"
                onclick="cancelLatestBooking()"
            >
                Cancel Booking
            </button>

        </div>

        <p class="muted-note">
            Live engineer tracking will be activated after
            Firebase and engineer assignment integration.
        </p>
    `;

    showModal("trackerModal");
}

/* =========================================================
   GOOGLE MAPS ADDRESS LINK
   ========================================================= */

function buildGoogleMapsUrl(booking) {

    if (
        booking.latitude !== null &&
        booking.longitude !== null
    ) {

        return (
            "https://www.google.com/maps/search/?api=1&query=" +
            booking.latitude +
            "," +
            booking.longitude
        );
    }

    const destination = encodeURIComponent(
        `${booking.address}, ${booking.location}, Bihar, India`
    );

    return (
        "https://www.google.com/maps/search/?api=1&query=" +
        destination
    );
}

/* =========================================================
   CANCEL BOOKING
   ========================================================= */

function cancelLatestBooking() {

    const booking = getBooking();

    if (!booking) return;

    if (
        !confirm(
            `Cancel booking ${booking.id}?`
        )
    ) {
        return;
    }

    booking.status = "Cancelled by Customer";

    saveBooking(booking);

    alert("Booking cancelled.");

    openBookingTracker();
}

function closeBookingTracker() {
    hideModal("trackerModal");
}

function closeConfirmationModal() {
    hideModal("confirmationModal");
}

/* =========================================================
   MITRA OTP - DEMO ONLY
   Real OTP service will be integrated separately
   ========================================================= */

function sendMobileOTP() {

    const mobile =
        byId("mitraMobile")?.value.trim() || "";

    if (!/^\d{10}$/.test(mobile)) {

        alert(
            "Enter a valid 10-digit mobile number first."
        );

        return;
    }

    const status = byId("mobileStatus");

    if (status) {

        status.textContent =
            "Demo OTP sent: 123456";
    }

    alert(
        "Demo OTP: 123456. Real SMS verification is not connected yet."
    );
}

function verifyMobileOTP() {

    const otp =
        byId("mobileOTP")?.value.trim();

    if (otp === "123456") {

        mobileVerified = true;

        byId("mobileStatus").textContent =
            "✓ Mobile verified (Demo)";

        byId("mobileStatus").style.color =
            "#14804a";

    } else {

        mobileVerified = false;

        alert("Invalid demo OTP. Use 123456.");
    }
}

function sendEmailOTP() {

    const email =
        byId("mitraEmail")?.value.trim() || "";

    if (!email || !email.includes("@")) {

        alert("Enter a valid email address first.");

        return;
    }

    const status = byId("emailStatus");

    if (status) {

        status.textContent =
            "Demo OTP sent: 654321";
    }

    alert(
        "Demo OTP: 654321. Real email verification is not connected yet."
    );
}

function verifyEmailOTP() {

    const otp =
        byId("emailOTP")?.value.trim();

    if (otp === "654321") {

        emailVerified = true;

        byId("emailStatus").textContent =
            "✓ Email verified (Demo)";

        byId("emailStatus").style.color =
            "#14804a";

    } else {

        emailVerified = false;

        alert("Invalid demo OTP. Use 654321.");
    }
}

/* =========================================================
   MITRA REGISTRATION
   Temporary local storage until Firebase integration
   ========================================================= */

const mitraForm = byId("mitraForm");

if (mitraForm) {

    mitraForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            if (!mobileVerified) {

                alert(
                    "Please verify the mobile number first."
                );

                return;
            }

            if (!emailVerified) {

                alert(
                    "Please verify the email first."
                );

                return;
            }

            if (!byId("mitraTerms").checked) {

                alert(
                    "Please accept the confirmation checkbox."
                );

                return;
            }

            const registration = {

                id:
                    `MITRA-${Date.now().toString().slice(-7)}`,

                owner:
                    byId("ownerName").value.trim(),

                business:
                    byId("businessName").value.trim(),

                mobile:
                    byId("mitraMobile").value.trim(),

                email:
                    byId("mitraEmail").value.trim(),

                service:
                    byId("mitraService").value,

                location:
                    byId("mitraLocation").value,

                address:
                    byId("mitraAddress").value.trim(),

                experience:
                    byId("mitraExperience").value,

                status: "PENDING",

                createdAt:
                    new Date().toISOString()
            };

            const existing = JSON.parse(
                localStorage.getItem("fixmitraMitraRegistrations") ||
                "[]"
            );

            existing.push(registration);

            localStorage.setItem(
                "fixmitraMitraRegistrations",
                JSON.stringify(existing)
            );

            alert(
                `Registration submitted. Your Mitra ID is ${registration.id}. Status: PENDING.`
            );

            mitraForm.reset();

            mobileVerified = false;

            emailVerified = false;

            if (byId("mobileStatus")) {
                byId("mobileStatus").textContent =
                    "Mobile OTP not verified";
            }

            if (byId("emailStatus")) {
                byId("emailStatus").textContent =
                    "Email OTP not verified";
            }

            closeMitraForm();
        }
    );
}

/* =========================================================
   DATE FORMAT
   ========================================================= */

function formatDate(dateString) {

    if (!dateString) return "-";

    const date = new Date(
        `${dateString}T00:00:00`
    );

    if (Number.isNaN(date.getTime())) {
        return dateString;
    }

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}

/* =========================================================
   HTML SAFETY
   ========================================================= */

function escapeHtml(value) {

    return String(value ?? "")

        .replaceAll("&", "&amp;")

        .replaceAll("<", "&lt;")

        .replaceAll(">", "&gt;")

        .replaceAll('"', "&quot;")

        .replaceAll("'", "&#039;");
}

/* =========================================================
   MODAL BACKDROP
   ========================================================= */

window.addEventListener(
    "click",
    function (event) {

        [
            "problemModal",
            "mitraModal",
            "trackerModal",
            "confirmationModal"
        ].forEach(id => {

            const modal = byId(id);

            if (
                modal &&
                event.target === modal
            ) {

                modal.classList.remove("show");
            }
        });
    }
);

/* =========================================================
   ESCAPE KEY
   ========================================================= */

window.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Escape") return;

        [
            "problemModal",
            "mitraModal",
            "trackerModal",
            "confirmationModal"
        ].forEach(hideModal);
    }
);

/* =========================================================
   CHARGE PREVIEW LISTENERS
   ========================================================= */

[
    "problemService",
    "customerLocation"
].forEach(id => {

    const element = byId(id);

    if (element) {

        element.addEventListener(
            "change",
            updateChargePreview
        );
    }
});

/* =========================================================
   GLOBAL FUNCTIONS FOR HTML BUTTONS
   ========================================================= */

window.searchService = searchService;

window.openProblemForm = openProblemForm;

window.closeProblemForm = closeProblemForm;

window.openMitraForm = openMitraForm;

window.closeMitraForm = closeMitraForm;

window.sendMobileOTP = sendMobileOTP;

window.verifyMobileOTP = verifyMobileOTP;

window.sendEmailOTP = sendEmailOTP;

window.verifyEmailOTP = verifyEmailOTP;

window.useMyLocation = useMyLocation;

window.openBookingTracker = openBookingTracker;

window.closeBookingTracker = closeBookingTracker;

window.closeConfirmationModal =
    closeConfirmationModal;

window.cancelLatestBooking =
    cancelLatestBooking;

/* =========================================================
   INITIALIZATION
   ========================================================= */

setMinimumBookingDate();

updateChargePreview();

console.log("FixMitra script loaded successfully.");

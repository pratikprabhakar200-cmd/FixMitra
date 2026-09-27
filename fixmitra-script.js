/* =========================================================
   FIXMITRA - CUSTOMER + MITRA FRONTEND
   ========================================================= */

const VEHICLE_RATES = {
    Petrol: 10,
    Diesel: 9,
    CNG: 7
};

const CITY_DISTANCE = {
    Gurugram: 8,
    Delhi: 8,
    Noida: 10,
    Faridabad: 10
};

let mobileVerified = false;
let emailVerified = false;
let userLatitude = null;
let userLongitude = null;

function byId(id) {
    return document.getElementById(id);
}

function showModal(id) {
    const el = byId(id);
    if (el) el.classList.add('show');
}

function hideModal(id) {
    const el = byId(id);
    if (el) el.classList.remove('show');
}

function searchService() {
    const location = byId('locationSelect')?.value || '';
    const service = byId('serviceSearch')?.value.trim() || '';

    if (!location) {
        alert('Please select your location first.');
        return;
    }

    if (!service) {
        alert('Please enter the service you need.');
        return;
    }

    openProblemForm(service);
    const customerLocation = byId('customerLocation');
    if (customerLocation) customerLocation.value = location;
}

function openProblemForm(service = '') {
    showModal('problemModal');
    const select = byId('problemService');
    if (select && service) {
        const option = [...select.options].find(o => o.text.toLowerCase() === service.toLowerCase());
        if (option) select.value = option.value;
    }
    setMinimumBookingDate();
    updateChargePreview();
}

function closeProblemForm() {
    hideModal('problemModal');
}

function openMitraForm() {
    showModal('mitraModal');
}

function closeMitraForm() {
    hideModal('mitraModal');
}

function setMinimumBookingDate() {
    const input = byId('bookingDate');
    if (!input) return;
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    input.min = local.toISOString().slice(0, 10);
    if (!input.value) input.value = input.min;
}

function getSelectedVehicle() {
    const service = byId('problemService')?.value || '';
    // Vehicle type is assigned as a simple operational default for the MVP.
    // It can later come from the engineer profile/database.
    const map = {
        Electrician: 'Petrol',
        Plumber: 'CNG',
        'AC Repair': 'Diesel',
        'RO Service': 'CNG',
        Carpenter: 'Diesel',
        Cleaning: 'CNG',
        'Home Repair': 'Petrol',
        'Computer Repair': 'Petrol',
        'Appliance Repair': 'Diesel',
        Painter: 'CNG'
    };
    return map[service] || 'Petrol';
}

function updateChargePreview() {
    const location = byId('customerLocation')?.value || '';
    const vehicle = getSelectedVehicle();
    const distance = CITY_DISTANCE[location] || 0;
    const rate = VEHICLE_RATES[vehicle] || 0;
    const visit = Math.round(distance * rate);

    if (byId('vehicleRate')) byId('vehicleRate').textContent = location ? `${vehicle} • ₹${rate}/km` : 'Select location';
    if (byId('distanceValue')) byId('distanceValue').textContent = location ? `${distance} km*` : '--';
    if (byId('visitCharge')) byId('visitCharge').textContent = `₹${visit}`;
    if (byId('estimatedTotal')) byId('estimatedTotal').textContent = `₹${visit + 199}`;
}

function useMyLocation() {
    const status = byId('locationStatus');
    if (!navigator.geolocation) {
        if (status) status.textContent = 'Geolocation is not supported by this browser.';
        return;
    }

    if (status) status.textContent = 'Detecting your location...';

    navigator.geolocation.getCurrentPosition(
        position => {
            userLatitude = position.coords.latitude;
            userLongitude = position.coords.longitude;
            if (status) status.textContent = `Location detected: ${userLatitude.toFixed(5)}, ${userLongitude.toFixed(5)}`;
        },
        error => {
            const messages = {
                1: 'Location permission was denied.',
                2: 'Location is currently unavailable.',
                3: 'Location request timed out.'
            };
            if (status) status.textContent = messages[error.code] || 'Unable to detect location.';
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
}

function createBookingId() {
    const stamp = Date.now().toString().slice(-8);
    const random = Math.floor(100 + Math.random() * 900);
    return `FM-${stamp}-${random}`;
}

function saveBooking(booking) {
    localStorage.setItem('fixmitraLatestBooking', JSON.stringify(booking));
}

function getBooking() {
    try {
        return JSON.parse(localStorage.getItem('fixmitraLatestBooking')) || null;
    } catch {
        return null;
    }
}

function getBookingDistance(location) {
    return CITY_DISTANCE[location] || 8;
}

const problemForm = byId('problemForm');
if (problemForm) {
    problemForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = byId('customerName').value.trim();
        const mobile = byId('customerMobile').value.trim();
        const service = byId('problemService').value;
        const location = byId('customerLocation').value;
        const address = byId('customerAddress').value.trim();
        const problem = byId('customerProblem').value.trim();
        const date = byId('bookingDate').value;
        const time = byId('bookingTime').value;

        if (!name || !service || !location || !address || !problem || !date || !time) {
            alert('Please fill all required fields.');
            return;
        }

        if (!/^\d{10}$/.test(mobile)) {
            alert('Please enter a valid 10-digit mobile number.');
            return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selected = new Date(`${date}T00:00:00`);
        if (selected < today) {
            alert('Please select today or a future date.');
            return;
        }

        const vehicle = getSelectedVehicle();
        const distance = getBookingDistance(location);
        const rate = VEHICLE_RATES[vehicle];
        const visitCharge = Math.round(distance * rate);
        const inspectionCharge = 199;
        const total = visitCharge + inspectionCharge;
        const bookingId = createBookingId();

        const booking = {
            id: bookingId,
            name,
            mobile,
            service,
            location,
            address,
            problem,
            date,
            time,
            vehicle,
            rate,
            distance,
            visitCharge,
            inspectionCharge,
            total,
            latitude: userLatitude,
            longitude: userLongitude,
            status: 'Booking Confirmed - Engineer Assignment Pending',
            createdAt: new Date().toISOString()
        };

        saveBooking(booking);

        problemForm.reset();
        if (byId('locationStatus')) byId('locationStatus').textContent = 'Location not detected';
        userLatitude = null;
        userLongitude = null;
        closeProblemForm();
        showBookingConfirmation(booking);
    });
}

function showBookingConfirmation(booking) {
    const html = `
        <div class="success-box">
            <div class="success-icon">✓</div>
            <h3>Booking Confirmed</h3>
            <p>Your FixMitra request has been saved successfully.</p>
        </div>
        <div class="booking-summary">
            <div><span>Booking ID</span><strong>${escapeHtml(booking.id)}</strong></div>
            <div><span>Service</span><strong>${escapeHtml(booking.service)}</strong></div>
            <div><span>Date & Time</span><strong>${formatDate(booking.date)} • ${escapeHtml(booking.time)}</strong></div>
            <div><span>Visit Charge</span><strong>₹${booking.visitCharge}</strong></div>
            <div><span>Inspection</span><strong>₹199</strong></div>
            <div><span>Estimated Total</span><strong>₹${booking.total}</strong></div>
        </div>
        <p class="muted-note">The final travel distance and visit charge will be confirmed after engineer assignment.</p>
        <div class="tracker-actions">
            <button class="btn btn-primary full-btn" onclick="openBookingTracker(); closeConfirmationModal();">📍 Track My Booking</button>
            <button class="btn btn-outline full-btn" onclick="closeConfirmationModal()">Close</button>
        </div>`;

    byId('confirmationContent').innerHTML = html;
    showModal('confirmationModal');
}

function openBookingTracker() {
    const booking = getBooking();
    const box = byId('trackerContent');
    if (!box) return;

    if (!booking) {
        box.innerHTML = `
            <div class="empty-tracker">
                <div>📋</div>
                <h3>No booking found</h3>
                <p>Please create a FixMitra service booking first.</p>
                <button class="btn btn-primary" onclick="closeBookingTracker(); openProblemForm();">Create Booking</button>
            </div>`;
        showModal('trackerModal');
        return;
    }

    const mapsUrl = buildGoogleMapsUrl(booking);
    box.innerHTML = `
        <div class="tracking-status">
            <span class="status-dot"></span>
            <strong>${escapeHtml(booking.status)}</strong>
        </div>
        <div class="booking-summary">
            <div><span>Booking ID</span><strong>${escapeHtml(booking.id)}</strong></div>
            <div><span>Service</span><strong>${escapeHtml(booking.service)}</strong></div>
            <div><span>Visit</span><strong>${formatDate(booking.date)} • ${escapeHtml(booking.time)}</strong></div>
            <div><span>Location</span><strong>${escapeHtml(booking.location)}</strong></div>
            <div><span>Estimated Distance</span><strong>${booking.distance} km</strong></div>
            <div><span>Estimated Total</span><strong>₹${booking.total}</strong></div>
        </div>
        <div class="tracking-timeline">
            <div class="timeline-item active"><b>1</b><span>Booking received</span></div>
            <div class="timeline-item"><b>2</b><span>Engineer assignment</span></div>
            <div class="timeline-item"><b>3</b><span>Engineer on the way</span></div>
            <div class="timeline-item"><b>4</b><span>Engineer arrived</span></div>
            <div class="timeline-item"><b>5</b><span>Inspection & customer approval</span></div>
            <div class="timeline-item"><b>6</b><span>Repair completed</span></div>
        </div>
        <div class="tracker-actions">
            <a class="btn btn-primary full-btn" href="${mapsUrl}" target="_blank" rel="noopener">🗺️ Open Address in Google Maps</a>
            <button class="btn btn-outline full-btn" onclick="cancelLatestBooking()">Cancel Booking</button>
        </div>
        <p class="muted-note">Live engineer tracking becomes active after an engineer is assigned and accepts the job. This frontend stores the current booking in this browser.</p>`;

    showModal('trackerModal');
}

function buildGoogleMapsUrl(booking) {
    const destination = encodeURIComponent(`${booking.address}, ${booking.location}, India`);
    if (booking.latitude && booking.longitude) {
        return `https://www.google.com/maps/dir/?api=1&destination=${booking.latitude},${booking.longitude}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${destination}`;
}

function cancelLatestBooking() {
    const booking = getBooking();
    if (!booking) return;
    if (!confirm(`Cancel booking ${booking.id}?`)) return;
    booking.status = 'Cancelled by Customer';
    saveBooking(booking);
    alert('Booking cancelled successfully.');
    openBookingTracker();
}

function closeBookingTracker() {
    hideModal('trackerModal');
}

function closeConfirmationModal() {
    hideModal('confirmationModal');
}

function sendMobileOTP() {
    const mobile = byId('mitraMobile')?.value.trim() || '';
    if (!/^\d{10}$/.test(mobile)) {
        alert('Enter a valid 10-digit mobile number first.');
        return;
    }
    byId('mobileStatus').textContent = 'Demo OTP sent: 123456';
}

function verifyMobileOTP() {
    const otp = byId('mobileOTP')?.value.trim();
    if (otp === '123456') {
        mobileVerified = true;
        byId('mobileStatus').textContent = '✓ Mobile verified';
        byId('mobileStatus').style.color = '#14804a';
    } else {
        mobileVerified = false;
        alert('Invalid demo OTP. Use 123456.');
    }
}

function sendEmailOTP() {
    const email = byId('mitraEmail')?.value.trim() || '';
    if (!email || !email.includes('@')) {
        alert('Enter a valid email address first.');
        return;
    }
    byId('emailStatus').textContent = 'Demo OTP sent: 654321';
}

function verifyEmailOTP() {
    const otp = byId('emailOTP')?.value.trim();
    if (otp === '654321') {
        emailVerified = true;
        byId('emailStatus').textContent = '✓ Email verified';
        byId('emailStatus').style.color = '#14804a';
    } else {
        emailVerified = false;
        alert('Invalid demo OTP. Use 654321.');
    }
}

const mitraForm = byId('mitraForm');
if (mitraForm) {
    mitraForm.addEventListener('submit', function (event) {
        event.preventDefault();

        if (!mobileVerified) {
            alert('Please verify the mobile number first.');
            return;
        }
        if (!emailVerified) {
            alert('Please verify the email first.');
            return;
        }
        if (!byId('mitraTerms').checked) {
            alert('Please accept the confirmation checkbox.');
            return;
        }

        const registration = {
            id: `MITRA-${Date.now().toString().slice(-7)}`,
            owner: byId('ownerName').value.trim(),
            business: byId('businessName').value.trim(),
            mobile: byId('mitraMobile').value.trim(),
            email: byId('mitraEmail').value.trim(),
            service: byId('mitraService').value,
            location: byId('mitraLocation').value,
            address: byId('mitraAddress').value.trim(),
            experience: byId('mitraExperience').value,
            status: 'PENDING'
        };

        localStorage.setItem('fixmitraMitraRegistration', JSON.stringify(registration));
        alert(`Registration submitted successfully. Your Mitra ID is ${registration.id}. Status: PENDING.`);
        mitraForm.reset();
        mobileVerified = false;
        emailVerified = false;
        byId('mobileStatus').textContent = 'Demo OTP: 123456';
        byId('emailStatus').textContent = 'Demo OTP: 654321';
        closeMitraForm();
    });
}

function formatDate(dateString) {
    if (!dateString) return '-';
    const d = new Date(`${dateString}T00:00:00`);
    if (Number.isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function escapeHtml(value) {
    return String(value ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

// Modal behavior
window.addEventListener('click', function (event) {
    ['problemModal', 'mitraModal', 'trackerModal', 'confirmationModal'].forEach(id => {
        const modal = byId(id);
        if (modal && event.target === modal) modal.classList.remove('show');
    });
});

window.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    ['problemModal', 'mitraModal', 'trackerModal', 'confirmationModal'].forEach(hideModal);
});

// Charge preview listeners
['problemService', 'customerLocation'].forEach(id => {
    const el = byId(id);
    if (el) el.addEventListener('change', updateChargePreview);
});

// Make functions available to existing inline HTML buttons.
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
window.closeConfirmationModal = closeConfirmationModal;
window.cancelLatestBooking = cancelLatestBooking;

setMinimumBookingDate();

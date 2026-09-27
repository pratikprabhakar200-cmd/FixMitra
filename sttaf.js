// ========================================
// FixMitra Staff Dashboard
// ========================================


// Logout
function logoutStaff() {
    const confirmLogout = confirm("Are you sure you want to logout?");

    if (confirmLogout) {
        alert("Staff logout successful.");
        window.location.href = "index.html";
    }
}


// Refresh Jobs
function refreshJobs() {
    alert("Jobs refreshed successfully.");
}


// Customer Details
function viewCustomer() {
    alert(
        "Customer Details\n\n" +
        "Name: Rahul Kumar\n" +
        "Mobile: 98XXXXXX10\n" +
        "Location: Delhi"
    );
}


// Navigation
function openNavigation() {

    const destination = "Delhi";

    const mapUrl =
        "https://www.google.com/maps/dir/?api=1&destination=" +
        encodeURIComponent(destination);

    window.open(mapUrl, "_blank");
}


// Start Visit
function startVisit() {

    const confirmVisit =
        confirm("Start this customer visit?");

    if (confirmVisit) {

        alert(
            "Visit Started!\n\n" +
            "Please proceed to the customer location."
        );
    }
}


// Start Inspection
function startInspection() {

    alert(
        "Inspection Started.\n\n" +
        "You can now inspect the customer's RO."
    );
}


// Inspection Report
function openReport() {

    alert(
        "Inspection Report\n\n" +
        "Report section will be connected to the database later."
    );
}


// Add Parts
function addParts() {

    const part =
        prompt("Enter Part Name:");

    if (part) {

        const price =
            prompt("Enter Part Price:");

        if (price) {

            alert(
                "Part Added\n\n" +
                "Part: " + part +
                "\nPrice: ₹" + price
            );
        }
    }
}


// Repair Charges
function addRepairCharges() {

    const charge =
        prompt("Enter Additional Repair Charge:");

    if (charge) {

        alert(
            "Repair Charge Added\n\n" +
            "Amount: ₹" + charge
        );
    }
}


// Send Estimate
function sendEstimate() {

    alert(
        "Estimate sent to customer.\n\n" +
        "Customer approval is now pending."
    );
}


// Customer Approval
function checkApproval() {

    alert(
        "Customer Approval Status\n\n" +
        "Status: Pending"
    );
}


// Start Repair
function startRepair() {

    const approval =
        confirm(
            "Has the customer approved the estimate?"
        );

    if (approval) {

        alert(
            "Repair Started.\n\n" +
            "You can now proceed with the approved repair."
        );

    } else {

        alert(
            "Repair cannot be started until customer approval."
        );
    }
}


// Complete Job
function completeJob() {

    const confirmComplete =
        confirm(
            "Are you sure you want to mark this job as completed?"
        );

    if (confirmComplete) {

        alert(
            "Job Completed Successfully! ✅"
        );
    }
}


// Start Tracking
function startTracking() {

    alert(
        "Tracking Started.\n\n" +
        "Live engineer tracking will be connected in the next stage."
    );
}

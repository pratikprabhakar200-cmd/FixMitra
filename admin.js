/* =========================================
   FIXMITRA ADMIN PANEL
   admin.js
   ========================================= */

// =========================================
// DEMO CUSTOMER PROBLEMS
// =========================================

let problems = [
    {
        id: "P001",
        name: "Rahul Kumar",
        mobile: "9876543210",
        service: "RO Service",
        location: "Gurugram",
        address: "Sector 37, Gurugram",
        problem: "RO water is not coming properly.",
        status: "NEW",
        date: "26 Sep 2026"
    },

    {
        id: "P002",
        name: "Amit Sharma",
        mobile: "9876501234",
        service: "Electrician",
        location: "Gurugram",
        address: "Sector 15, Gurugram",
        problem: "Fan is not working.",
        status: "NEW",
        date: "26 Sep 2026"
    },

    {
        id: "P003",
        name: "Sandeep",
        mobile: "9876512345",
        service: "AC Repair",
        location: "Delhi",
        address: "Dwarka, Delhi",
        problem: "AC is not cooling.",
        status: "COMPLETED",
        date: "25 Sep 2026"
    }
];


// =========================================
// DEMO MITRA REQUESTS
// =========================================

let mitras = [
    {
        id: "M001",
        owner: "Rakesh Kumar",
        business: "RK RO Service",
        mobile: "9876543211",
        email: "rkro@example.com",
        service: "RO Service",
        location: "Gurugram",
        address: "Sector 10, Gurugram",
        experience: "5 Years",
        status: "PENDING"
    },

    {
        id: "M002",
        owner: "Suresh Kumar",
        business: "Suresh Electric Works",
        mobile: "9876543212",
        email: "suresh@example.com",
        service: "Electrician",
        location: "Delhi",
        address: "Dwarka, Delhi",
        experience: "7 Years",
        status: "APPROVED"
    },

    {
        id: "M003",
        owner: "Rajesh",
        business: "Rajesh AC Service",
        mobile: "9876543213",
        email: "rajesh@example.com",
        service: "AC Repair",
        location: "Noida",
        address: "Sector 18, Noida",
        experience: "4 Years",
        status: "PENDING"
    }
];


// =========================================
// SHOW ADMIN SECTION
// =========================================

function showSection(sectionName, title) {

    const sections = document.querySelectorAll(".section");

    sections.forEach(section => {
        section.classList.remove("active");
    });

    const selectedSection = document.getElementById(sectionName);

    if (selectedSection) {
        selectedSection.classList.add("active");
    }

    const pageTitle = document.getElementById("pageTitle");

    if (pageTitle) {
        pageTitle.textContent = title;
    }

    const menuButtons = document.querySelectorAll(".sidebar-menu button");

    menuButtons.forEach(button => {
        button.classList.remove("active");
    });

    if (event && event.target) {
        event.target.classList.add("active");
    }

    loadAdminData();
}


// =========================================
// UPDATE DASHBOARD STATS
// =========================================

function updateStats() {

    const totalProblems = problems.length;

    const newProblems = problems.filter(
        problem => problem.status === "NEW"
    ).length;

    const mitraRequests = mitras.length;

    const pendingMitras = mitras.filter(
        mitra => mitra.status === "PENDING"
    ).length;

    const totalElement = document.getElementById("totalProblems");
    const newElement = document.getElementById("newProblems");
    const requestElement = document.getElementById("mitraRequests");
    const pendingElement = document.getElementById("pendingMitras");

    if (totalElement) {
        totalElement.textContent = totalProblems;
    }

    if (newElement) {
        newElement.textContent = newProblems;
    }

    if (requestElement) {
        requestElement.textContent = mitraRequests;
    }

    if (pendingElement) {
        pendingElement.textContent = pendingMitras;
    }
}


// =========================================
// STATUS CLASS
// =========================================

function getStatusClass(status) {

    return status.toLowerCase();
}


// =========================================
// LOAD CUSTOMER PROBLEM TABLE
// =========================================

function loadProblemTable() {

    const tableBody = document.getElementById("problemTableBody");

    if (!tableBody) {
        return;
    }

    tableBody.innerHTML = "";

    if (problems.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="7">
                    <div class="empty-state">
                        <div class="empty-icon">📋</div>
                        <h3>No Customer Problems</h3>
                        <p>No customer problem has been received yet.</p>
                    </div>
                </td>
            </tr>
        `;

        return;
    }

    problems.forEach(problem => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${problem.id}</td>

            <td>
                <strong>${problem.name}</strong>
            </td>

            <td>${problem.mobile}</td>

            <td>${problem.service}</td>

            <td>${problem.location}</td>

            <td>
                <span class="status ${getStatusClass(problem.status)}">
                    ${problem.status}
                </span>
            </td>

            <td>
                <button
                    class="btn btn-view"
                    onclick="viewProblem('${problem.id}')">
                    View
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}


// =========================================
// LOAD MITRA TABLE
// =========================================

function loadMitraTable() {

    const tableBody = document.getElementById("mitraTableBody");

    if (!tableBody) {
        return;
    }

    tableBody.innerHTML = "";

    if (mitras.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="7">
                    <div class="empty-state">
                        <div class="empty-icon">🏪</div>
                        <h3>No Mitra Requests</h3>
                        <p>No Mitra registration request has been received.</p>
                    </div>
                </td>
            </tr>
        `;

        return;
    }

    mitras.forEach(mitra => {

        const row = document.createElement("tr");

        let actionButtons = `
            <button
                class="btn btn-view"
                onclick="viewMitra('${mitra.id}')">
                View
            </button>
        `;

        if (mitra.status === "PENDING") {

            actionButtons += `
                <button
                    class="btn btn-approve"
                    onclick="approveMitra('${mitra.id}')">
                    Approve
                </button>

                <button
                    class="btn btn-reject"
                    onclick="rejectMitra('${mitra.id}')">
                    Reject
                </button>
            `;
        }

        row.innerHTML = `
            <td>${mitra.id}</td>

            <td>
                <strong>${mitra.owner}</strong>
            </td>

            <td>${mitra.business}</td>

            <td>${mitra.mobile}</td>

            <td>${mitra.service}</td>

            <td>${mitra.location}</td>

            <td>
                <span class="status ${getStatusClass(mitra.status)}">
                    ${mitra.status}
                </span>
            </td>

            <td>
                ${actionButtons}
            </td>
        `;

        tableBody.appendChild(row);
    });
}


// =========================================
// LOAD APPROVED MITRAS
// =========================================

function loadApprovedTable() {

    const tableBody = document.getElementById("approvedMitraTableBody");

    if (!tableBody) {
        return;
    }

    tableBody.innerHTML = "";

    const approvedMitras = mitras.filter(
        mitra => mitra.status === "APPROVED"
    );

    if (approvedMitras.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="6">
                    <div class="empty-state">
                        <div class="empty-icon">🏪</div>
                        <h3>No Approved Mitras</h3>
                        <p>No Mitra has been approved yet.</p>
                    </div>
                </td>
            </tr>
        `;

        return;
    }

    approvedMitras.forEach(mitra => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${mitra.id}</td>

            <td>
                <strong>${mitra.owner}</strong>
            </td>

            <td>${mitra.business}</td>

            <td>${mitra.mobile}</td>

            <td>${mitra.service}</td>

            <td>${mitra.location}</td>

            <td>
                <span class="status approved">
                    APPROVED
                </span>
            </td>

            <td>
                <button
                    class="btn btn-view"
                    onclick="viewMitra('${mitra.id}')">
                    View
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}


// =========================================
// RECENT CUSTOMER PROBLEMS
// =========================================

function loadRecentProblems() {

    const container = document.getElementById("recentProblems");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    const recentProblems = problems.slice(0, 5);

    recentProblems.forEach(problem => {

        const item = document.createElement("div");

        item.style.padding = "12px 0";
        item.style.borderBottom = "1px solid #e2e8f0";

        item.innerHTML = `
            <div style="display:flex;justify-content:space-between;gap:10px;">
                <div>
                    <strong>${problem.name}</strong>
                    <p style="font-size:12px;color:#64748b;margin-top:4px;">
                        ${problem.service} • ${problem.location}
                    </p>
                </div>

                <span class="status ${getStatusClass(problem.status)}">
                    ${problem.status}
                </span>
            </div>
        `;

        container.appendChild(item);
    });
}


// =========================================
// RECENT MITRA REQUESTS
// =========================================

function loadRecentMitras() {

    const container = document.getElementById("recentMitras");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    const recentMitras = mitras.slice(0, 5);

    recentMitras.forEach(mitra => {

        const item = document.createElement("div");

        item.style.padding = "12px 0";
        item.style.borderBottom = "1px solid #e2e8f0";

        item.innerHTML = `
            <div style="display:flex;justify-content:space-between;gap:10px;">
                <div>
                    <strong>${mitra.business}</strong>

                    <p style="font-size:12px;color:#64748b;margin-top:4px;">
                        ${mitra.owner} • ${mitra.service}
                    </p>
                </div>

                <span class="status ${getStatusClass(mitra.status)}">
                    ${mitra.status}
                </span>
            </div>
        `;

        container.appendChild(item);
    });
}


// =========================================
// VIEW CUSTOMER PROBLEM
// =========================================

function viewProblem(id) {

    const problem = problems.find(
        item => item.id === id
    );

    if (!problem) {
        return;
    }

    const modal = document.getElementById("detailsModal");
    const modalContent = document.getElementById("detailsContent");

    if (!modal || !modalContent) {
        return;
    }

    modalContent.innerHTML = `

        <div class="modal-header">

            <h2>Customer Problem</h2>

            <button
                class="close-modal"
                onclick="closeDetails()">
                ×
            </button>

        </div>

        <div class="details-grid">

            <div class="detail-item">
                <label>Problem ID</label>
                <strong>${problem.id}</strong>
            </div>

            <div class="detail-item">
                <label>Date</label>
                <strong>${problem.date}</strong>
            </div>

            <div class="detail-item">
                <label>Customer Name</label>
                <strong>${problem.name}</strong>
            </div>

            <div class="detail-item">
                <label>Mobile</label>
                <strong>${problem.mobile}</strong>
            </div>

            <div class="detail-item">
                <label>Service</label>
                <strong>${problem.service}</strong>
            </div>

            <div class="detail-item">
                <label>Location</label>
                <strong>${problem.location}</strong>
            </div>

            <div class="detail-item full">
                <label>Address</label>
                <strong>${problem.address}</strong>
            </div>

            <div class="detail-item full">
                <label>Problem</label>
                <strong>${problem.problem}</strong>
            </div>

            <div class="detail-item">
                <label>Status</label>
                <strong>
                    <span class="status ${getStatusClass(problem.status)}">
                        ${problem.status}
                    </span>
                </strong>
            </div>

        </div>
    `;

    modal.classList.add("show");
}


// =========================================
// VIEW MITRA
// =========================================

function viewMitra(id) {

    const mitra = mitras.find(
        item => item.id === id
    );

    if (!mitra) {
        return;
    }

    const modal = document.getElementById("detailsModal");
    const modalContent = document.getElementById("detailsContent");

    if (!modal || !modalContent) {
        return;
    }

    modalContent.innerHTML = `

        <div class="modal-header">

            <h2>Mitra Details</h2>

            <button
                class="close-modal"
                onclick="closeDetails()">
                ×
            </button>

        </div>

        <div class="details-grid">

            <div class="detail-item">
                <label>Mitra ID</label>
                <strong>${mitra.id}</strong>
            </div>

            <div class="detail-item">
                <label>Status</label>
                <strong>
                    <span class="status ${getStatusClass(mitra.status)}">
                        ${mitra.status}
                    </span>
                </strong>
            </div>

            <div class="detail-item">
                <label>Owner Name</label>
                <strong>${mitra.owner}</strong>
            </div>

            <div class="detail-item">
                <label>Business Name</label>
                <strong>${mitra.business}</strong>
            </div>

            <div class="detail-item">
                <label>Mobile</label>
                <strong>${mitra.mobile}</strong>
            </div>

            <div class="detail-item">
                <label>Email</label>
                <strong>${mitra.email}</strong>
            </div>

            <div class="detail-item">
                <label>Service</label>
                <strong>${mitra.service}</strong>
            </div>

            <div class="detail-item">
                <label>Location</label>
                <strong>${mitra.location}</strong>
            </div>

            <div class="detail-item">
                <label>Experience</label>
                <strong>${mitra.experience}</strong>
            </div>

            <div class="detail-item full">
                <label>Address</label>
                <strong>${mitra.address}</strong>
            </div>

        </div>
    `;

    modal.classList.add("show");
}


// =========================================
// APPROVE MITRA
// =========================================

function approveMitra(id) {

    const mitra = mitras.find(
        item => item.id === id
    );

    if (!mitra) {
        return;
    }

    const confirmApproval = confirm(
        `Approve ${mitra.business}?`
    );

    if (!confirmApproval) {
        return;
    }

    mitra.status = "APPROVED";

    loadAdminData();

    alert(
        `${mitra.business} has been approved successfully.`
    );
}


// =========================================
// REJECT MITRA
// =========================================

function rejectMitra(id) {

    const mitra = mitras.find(
        item => item.id === id
    );

    if (!mitra) {
        return;
    }

    const confirmReject = confirm(
        `Reject ${mitra.business}?`
    );

    if (!confirmReject) {
        return;
    }

    mitra.status = "REJECTED";

    loadAdminData();

    alert(
        `${mitra.business} has been rejected.`
    );
}


// =========================================
// CLOSE DETAILS MODAL
// =========================================

function closeDetails() {

    const modal = document.getElementById("detailsModal");

    if (modal) {
        modal.classList.remove("show");
    }
}


// =========================================
// ADMIN LOGOUT
// =========================================

function adminLogout() {

    const logout = confirm(
        "Are you sure you want to logout?"
    );

    if (!logout) {
        return;
    }

    alert("Admin logout demo completed.");

    window.location.href = "index.html";
}


// =========================================
// LOAD ALL ADMIN DATA
// =========================================

function loadAdminData() {

    updateStats();

    loadProblemTable();

    loadMitraTable();

    loadApprovedTable();

    loadRecentProblems();

    loadRecentMitras();
}


// =========================================
// CLOSE MODAL WHEN CLICKING OUTSIDE
// =========================================

window.addEventListener("click", function(event) {

    const modal = document.getElementById("detailsModal");

    if (event.target === modal) {
        closeDetails();
    }

});


// =========================================
// ESCAPE KEY
// =========================================

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeDetails();
    }

});


// =========================================
// INITIAL LOAD
// =========================================

document.addEventListener("DOMContentLoaded", function() {

    loadAdminData();

});

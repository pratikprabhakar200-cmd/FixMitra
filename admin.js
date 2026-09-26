/* =========================================
   FIXMITRA ADMIN PANEL - FINAL
========================================= */


/* =========================================
   DEMO CUSTOMER DATA
========================================= */

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
        status: "IN_PROGRESS",
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
    },

    {
        id: "P004",
        name: "Vikas",
        mobile: "9876511111",
        service: "Plumber",
        location: "Noida",
        address: "Sector 18, Noida",
        problem: "Water leakage in kitchen.",
        status: "NEW",
        date: "25 Sep 2026"
    },

    {
        id: "P005",
        name: "Rohit",
        mobile: "9876522222",
        service: "Carpenter",
        location: "Gurugram",
        address: "Sector 10, Gurugram",
        problem: "Door repair required.",
        status: "IN_PROGRESS",
        date: "24 Sep 2026"
    }

];


/* =========================================
   DEMO MITRA DATA
========================================= */

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
    },

    {
        id: "M004",
        owner: "Manoj",
        business: "Manoj Plumbing",
        mobile: "9876543214",
        email: "manoj@example.com",
        service: "Plumber",
        location: "Gurugram",
        address: "Sector 21, Gurugram",
        experience: "6 Years",
        status: "REJECTED"
    }

];


/* =========================================
   SECTION NAVIGATION
========================================= */

function showSection(sectionName, title, button) {

    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active");
    });

    const selected =
        document.getElementById(sectionName);

    if (selected) {
        selected.classList.add("active");
    }

    document.getElementById("pageTitle").textContent = title;

    document.querySelectorAll(".sidebar-menu button")
        .forEach(btn => btn.classList.remove("active"));

    if (button) {
        button.classList.add("active");
    }

    loadAdminData();
}


/* =========================================
   DATE
========================================= */

function loadDate() {

    const dateElement =
        document.getElementById("currentDate");

    if (!dateElement) return;

    const now = new Date();

    dateElement.textContent =
        now.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
}


/* =========================================
   STATUS CLASS
========================================= */

function statusClass(status) {

    return status.toLowerCase();

}


/* =========================================
   UPDATE STATS
========================================= */

function updateStats() {

    const total =
        problems.length;

    const newProblems =
        problems.filter(p => p.status === "NEW").length;

    const inProgress =
        problems.filter(p => p.status === "IN_PROGRESS").length;

    const completed =
        problems.filter(p => p.status === "COMPLETED").length;

    const pending =
        mitras.filter(m => m.status === "PENDING").length;

    const approved =
        mitras.filter(m => m.status === "APPROVED").length;

    const rejected =
        mitras.filter(m => m.status === "REJECTED").length;


    setText("totalProblems", total);
    setText("newProblems", newProblems);
    setText("inProgressProblems", inProgress);
    setText("completedProblems", completed);

    setText("mitraRequests", mitras.length);
    setText("pendingMitras", pending);
    setText("approvedMitras", approved);
    setText("rejectedMitras", rejected);


    setText("reportTotalProblems", total);
    setText("reportNewProblems", newProblems);
    setText("reportProgressProblems", inProgress);
    setText("reportCompletedProblems", completed);

    setText("reportMitraTotal", mitras.length);
    setText("reportMitraPending", pending);
    setText("reportMitraApproved", approved);
    setText("reportMitraRejected", rejected);

}


function setText(id, value) {

    const element =
        document.getElementById(id);

    if (element) {
        element.textContent = value;
    }

}


/* =========================================
   CUSTOMER TABLE
========================================= */

function loadProblemTable() {

    const body =
        document.getElementById("problemTableBody");

    if (!body) return;

    body.innerHTML = "";

    problems.forEach(problem => {

        const row =
            document.createElement("tr");

        row.innerHTML = `

            <td>${problem.id}</td>

            <td>
                <strong>${problem.name}</strong>
            </td>

            <td>${problem.mobile}</td>

            <td>${problem.service}</td>

            <td>${problem.location}</td>

            <td>
                <span class="status ${statusClass(problem.status)}">
                    ${problem.status.replace("_", " ")}
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

        body.appendChild(row);

    });

}


/* =========================================
   MITRA TABLE
========================================= */

function loadMitraTable() {

    const body =
        document.getElementById("mitraTableBody");

    if (!body) return;

    body.innerHTML = "";

    mitras.forEach(mitra => {

        let actions = `

            <button
                class="btn btn-view"
                onclick="viewMitra('${mitra.id}')">
                View
            </button>

        `;

        if (mitra.status === "PENDING") {

            actions += `

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

        const row =
            document.createElement("tr");

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

                <span class="status ${statusClass(mitra.status)}">
                    ${mitra.status}
                </span>

            </td>

            <td>
                ${actions}
            </td>

        `;

        body.appendChild(row);

    });

}


/* =========================================
   APPROVED MITRA TABLE
========================================= */

function loadApprovedTable() {

    const body =
        document.getElementById("approvedMitraTableBody");

    if (!body) return;

    body.innerHTML = "";

    const approved =
        mitras.filter(
            m => m.status === "APPROVED"
        );

    approved.forEach(mitra => {

        const row =
            document.createElement("tr");

        row.innerHTML = `

            <td>${mitra.id}</td>

            <td>${mitra.owner}</td>

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

        body.appendChild(row);

    });

}


/* =========================================
   RECENT PROBLEMS
========================================= */

function loadRecentProblems() {

    const container =
        document.getElementById("recentProblems");

    if (!container) return;

    container.innerHTML = "";

    problems.slice(0, 5).forEach(problem => {

        const item =
            document.createElement("div");

        item.className = "recent-item";

        item.innerHTML = `

            <div>

                <strong>
                    ${problem.name}
                </strong>

                <p>
                    ${problem.service}
                    •
                    ${problem.location}
                </p>

            </div>

            <span class="status ${statusClass(problem.status)}">
                ${problem.status.replace("_", " ")}
            </span>

        `;

        container.appendChild(item);

    });

}


/* =========================================
   RECENT MITRAS
========================================= */

function loadRecentMitras() {

    const container =
        document.getElementById("recentMitras");

    if (!container) return;

    container.innerHTML = "";

    mitras.slice(0, 5).forEach(mitra => {

        const item =
            document.createElement("div");

        item.className = "recent-item";

        item.innerHTML = `

            <div>

                <strong>
                    ${mitra.business}
                </strong>

                <p>
                    ${mitra.owner}
                    •
                    ${mitra.service}
                </p>

            </div>

            <span class="status ${statusClass(mitra.status)}">
                ${mitra.status}
            </span>

        `;

        container.appendChild(item);

    });

}


/* =========================================
   STATUS LIST
========================================= */

function openStatusList(type) {

    const modal =
        document.getElementById("statusModal");

    const title =
        document.getElementById("statusModalTitle");

    const subtitle =
        document.getElementById("statusModalSubtitle");

    const content =
        document.getElementById("statusListContent");


    let list = [];
    let isMitra = false;


    if (type === "ALL_PROBLEMS") {

        title.textContent =
            "📋 All Customer Problems";

        subtitle.textContent =
            "Complete customer request list";

        list = problems;

    }

    else if (type === "NEW") {

        title.textContent =
            "🆕 New Problems";

        subtitle.textContent =
            "Customer requests waiting for action";

        list =
            problems.filter(
                p => p.status === "NEW"
            );

    }

    else if (type === "IN_PROGRESS") {

        title.textContent =
            "🔧 In Progress Problems";

        subtitle.textContent =
            "Requests currently being handled";

        list =
            problems.filter(
                p => p.status === "IN_PROGRESS"
            );

    }

    else if (type === "COMPLETED") {

        title.textContent =
            "✅ Completed Problems";

        subtitle.textContent =
            "Completed customer requests";

        list =
            problems.filter(
                p => p.status === "COMPLETED"
            );

    }

    else {

        isMitra = true;

        if (type === "MITRA_ALL") {

            title.textContent =
                "🏪 All Mitra Requests";

            subtitle.textContent =
                "All service provider registrations";

            list = mitras;

        }

        else if (type === "MITRA_PENDING") {

            title.textContent =
                "⏳ Pending Mitras";

            subtitle.textContent =
                "Mitra registrations waiting for approval";

            list =
                mitras.filter(
                    m => m.status === "PENDING"
                );

        }

        else if (type === "MITRA_APPROVED") {

            title.textContent =
                "🟢 Approved Mitras";

            subtitle.textContent =
                "Approved service providers";

            list =
                mitras.filter(
                    m => m.status === "APPROVED"
                );

        }

        else if (type === "MITRA_REJECTED") {

            title.textContent =
                "❌ Rejected Mitras";

            subtitle.textContent =
                "Rejected service provider registrations";

            list =
                mitras.filter(
                    m => m.status === "REJECTED"
                );

        }

    }


    if (list.length === 0) {

        content.innerHTML = `

            <div style="text-align:center;padding:40px;">

                <div style="font-size:40px;">
                    📭
                </div>

                <h3>
                    No Data Found
                </h3>

                <p style="color:#64748b;margin-top:5px;">
                    There are no records in this category.
                </p>

            </div>

        `;

    }

    else {

        content.innerHTML =
            isMitra
                ? createMitraListTable(list)
                : createProblemListTable(list);

    }


    modal.classList.add("show");

}


/* =========================================
   PROBLEM LIST TABLE
========================================= */

function createProblemListTable(list) {

    let html = `

        <table>

            <thead>

                <tr>

                    <th>ID</th>
                    <th>Customer</th>
                    <th>Mobile</th>
                    <th>Service</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Action</th>

                </tr>

            </thead>

            <tbody>

    `;


    list.forEach(problem => {

        html += `

            <tr>

                <td>${problem.id}</td>

                <td>${problem.name}</td>

                <td>${problem.mobile}</td>

                <td>${problem.service}</td>

                <td>${problem.location}</td>

                <td>

                    <span class="status ${statusClass(problem.status)}">
                        ${problem.status.replace("_"," ")}
                    </span>

                </td>

                <td>

                    <button
                        class="btn btn-view"
                        onclick="viewProblem('${problem.id}')">
                        View Full Data
                    </button>

                </td>

            </tr>

        `;

    });


    html += `

            </tbody>

        </table>

    `;

    return html;

}


/* =========================================
   MITRA LIST TABLE
========================================= */

function createMitraListTable(list) {

    let html = `

        <table>

            <thead>

                <tr>

                    <th>ID</th>
                    <th>Owner</th>
                    <th>Business</th>
                    <th>Mobile</th>
                    <th>Service</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Action</th>

                </tr>

            </thead>

            <tbody>

    `;


    list.forEach(mitra => {

        html += `

            <tr>

                <td>${mitra.id}</td>

                <td>${mitra.owner}</td>

                <td>${mitra.business}</td>

                <td>${mitra.mobile}</td>

                <td>${mitra.service}</td>

                <td>${mitra.location}</td>

                <td>

                    <span class="status ${statusClass(mitra.status)}">
                        ${mitra.status}
                    </span>

                </td>

                <td>

                    <button
                        class="btn btn-view"
                        onclick="viewMitra('${mitra.id}')">
                        View Full Data
                    </button>

                </td>

            </tr>

        `;

    });


    html += `

            </tbody>

        </table>

    `;

    return html;

}


/* =========================================
   VIEW CUSTOMER
========================================= */

function viewProblem(id) {

    const problem =
        problems.find(
            p => p.id === id
        );

    if (!problem) return;

    const modal =
        document.getElementById("detailsModal");

    const content =
        document.getElementById("detailsContent");


    content.innerHTML = `

        <div class="modal-header">

            <div>

                <h2>
                    📋 Customer Details
                </h2>

                <p>
                    Problem ID: ${problem.id}
                </p>

            </div>

            <button
                class="close-modal"
                onclick="closeDetails()">
                ×
            </button>

        </div>


        <div class="details-grid">

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

            <div class="detail-item">
                <label>Date</label>
                <strong>${problem.date}</strong>
            </div>

            <div class="detail-item">
                <label>Status</label>

                <strong>

                    <span class="status ${statusClass(problem.status)}">
                        ${problem.status.replace("_"," ")}
                    </span>

                </strong>

            </div>

            <div class="detail-item full">

                <label>Address</label>

                <strong>
                    ${problem.address}
                </strong>

            </div>

            <div class="detail-item full">

                <label>Problem Description</label>

                <strong>
                    ${problem.problem}
                </strong>

            </div>

        </div>

    `;


    modal.classList.add("show");

}


/* =========================================
   VIEW MITRA
========================================= */

function viewMitra(id) {

    const mitra =
        mitras.find(
            m => m.id === id
        );

    if (!mitra) return;

    const modal =
        document.getElementById("detailsModal");

    const content =
        document.getElementById("detailsContent");


    content.innerHTML = `

        <div class="modal-header">

            <div>

                <h2>
                    🏪 Mitra Details
                </h2>

                <p>
                    Mitra ID: ${mitra.id}
                </p>

            </div>

            <button
                class="close-modal"
                onclick="closeDetails()">
                ×
            </button>

        </div>


        <div class="details-grid">

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

            <div class="detail-item">
                <label>Status</label>

                <strong>

                    <span class="status ${statusClass(mitra.status)}">
                        ${mitra.status}
                    </span>

                </strong>

            </div>

            <div class="detail-item full">

                <label>Business Address</label>

                <strong>
                    ${mitra.address}
                </strong>

            </div>

        </div>

    `;


    modal.classList.add("show");

}


/* =========================================
   APPROVE MITRA
========================================= */

function approveMitra(id) {

    const mitra =
        mitras.find(
            m => m.id === id
        );

    if (!mitra) return;

    if (
        !confirm(
            `Approve ${mitra.business}?`
        )
    ) return;

    mitra.status = "APPROVED";

    loadAdminData();

    alert(
        `${mitra.business} approved successfully.`
    );

}


/* =========================================
   REJECT MITRA
========================================= */

function rejectMitra(id) {

    const mitra =
        mitras.find(
            m => m.id === id
        );

    if (!mitra) return;

    if (
        !confirm(
            `Reject ${mitra.business}?`
        )
    ) return;

    mitra.status = "REJECTED";

    loadAdminData();

    alert(
        `${mitra.business} rejected.`
    );

}


/* =========================================
   CLOSE MODALS
========================================= */

function closeDetails() {

    document
        .getElementById("detailsModal")
        .classList.remove("show");

}


function closeStatusList() {

    document
        .getElementById("statusModal")
        .classList.remove("show");

}


function closeReport() {

    document
        .getElementById("reportModal")
        .classList.remove("show");

}


/* =========================================
   SERVICE SUMMARY
========================================= */

function loadServiceSummary() {

    const container =
        document.getElementById("serviceSummary");

    if (!container) return;

    const data = {};

    problems.forEach(problem => {

        if (!data[problem.service]) {
            data[problem.service] = 0;
        }

        data[problem.service]++;

    });


    const max =
        Math.max(...Object.values(data), 1);

    container.innerHTML = "";


    Object.entries(data).forEach(
        ([service, count]) => {

            const percentage =
                (count / max) * 100;

            container.innerHTML += `

                <div class="summary-row">

                    <div class="summary-name">
                        ${service}
                    </div>

                    <div class="summary-bar-box">

                        <div
                            class="summary-bar"
                            style="width:${percentage}%">
                        </div>

                    </div>

                    <div class="summary-count">
                        ${count}
                    </div>

                </div>

            `;

        }
    );

}


/* =========================================
   LOCATION SUMMARY
========================================= */

function loadLocationSummary() {

    const container =
        document.getElementById("locationSummary");

    if (!container) return;

    const data = {};

    problems.forEach(problem => {

        if (!data[problem.location]) {
            data[problem.location] = 0;
        }

        data[problem.location]++;

    });


    const max =
        Math.max(...Object.values(data), 1);

    container.innerHTML = "";


    Object.entries(data).forEach(
        ([location, count]) => {

            const percentage =
                (count / max) * 100;

            container.innerHTML += `

                <div class="summary-row">

                    <div class="summary-name">
                        ${location}
                    </div>

                    <div class="summary-bar-box">

                        <div
                            class="summary-bar"
                            style="width:${percentage}%">
                        </div>

                    </div>

                    <div class="summary-count">
                        ${count}
                    </div>

                </div>

            `;

        }
    );

}


/* =========================================
   FULL REPORT
========================================= */

function viewFullReport() {

    const total =
        problems.length;

    const newCount =
        problems.filter(
            p => p.status === "NEW"
        ).length;

    const progress =
        problems.filter(
            p => p.status === "IN_PROGRESS"
        ).length;

    const completed =
        problems.filter(
            p => p.status === "COMPLETED"
        ).length;


    const pending =
        mitras.filter(
            m => m.status === "PENDING"
        ).length;

    const approved =
        mitras.filter(
            m => m.status === "APPROVED"
        ).length;

    const rejected =
        mitras.filter(
            m => m.status === "REJECTED"
        ).length;


    const content =
        document.getElementById(
            "fullReportContent"
        );


    content.innerHTML = `

        <div class="report-grid">

            <div class="report-card">
                <span>📋</span>
                <strong>${total}</strong>
                <p>Total Problems</p>
            </div>

            <div class="report-card">
                <span>🆕</span>
                <strong>${newCount}</strong>
                <p>New</p>
            </div>

            <div class="report-card">
                <span>🔧</span>
                <strong>${progress}</strong>
                <p>In Progress</p>
            </div>

            <div class="report-card">
                <span>✅</span>
                <strong>${completed}</strong>
                <p>Completed</p>
            </div>

            <div class="report-card">
                <span>🏪</span>
                <strong>${mitras.length}</strong>
                <p>Mitra Requests</p>
            </div>

            <div class="report-card">
                <span>⏳</span>
                <strong>${pending}</strong>
                <p>Pending Mitras</p>
            </div>

            <div class="report-card">
                <span>🟢</span>
                <strong>${approved}</strong>
                <p>Approved Mitras</p>
            </div>

            <div class="report-card">
                <span>❌</span>
                <strong>${rejected}</strong>
                <p>Rejected Mitras</p>
            </div>

        </div>


        <div class="panel">

            <h3>
                Customer Problems
            </h3>

            <p style="margin-top:10px;">
                Total: ${total}
                |
                New: ${newCount}
                |
                In Progress: ${progress}
                |
                Completed: ${completed}
            </p>

        </div>


        <div class="panel">

            <h3>
                Mitra Status
            </h3>

            <p style="margin-top:10px;">
                Total: ${mitras.length}
                |
                Pending: ${pending}
                |
                Approved: ${approved}
                |
                Rejected: ${rejected}
            </p>

        </div>

    `;


    document
        .getElementById("reportModal")
        .classList.add("show");

}


/* =========================================
   DOWNLOAD PPT
========================================= */

function downloadPPT() {

    if (typeof pptxgen === "undefined") {

        alert(
            "PPT generator is not available. Please check your internet connection."
        );

        return;

    }


    const pptx =
        new pptxgen();


    pptx.layout = "LAYOUT_WIDE";

    pptx.author = "FixMitra";

    pptx.subject =
        "FixMitra Status Report";

    pptx.title =
        "FixMitra Status Report";

    pptx.company =
        "FixMitra";


    const total =
        problems.length;

    const newCount =
        problems.filter(
            p => p.status === "NEW"
        ).length;

    const progress =
        problems.filter(
            p => p.status === "IN_PROGRESS"
        ).length;

    const completed =
        problems.filter(
            p => p.status === "COMPLETED"
        ).length;

    const pending =
        mitras.filter(
            m => m.status === "PENDING"
        ).length;

    const approved =
        mitras.filter(
            m => m.status === "APPROVED"
        ).length;

    const rejected =
        mitras.filter(
            m => m.status === "REJECTED"
        ).length;


    /* TITLE SLIDE */

    let slide =
        pptx.addSlide();

    slide.background = {
        color: "0F172A"
    };


    slide.addText(
        "FixMitra",
        {
            x: 0.7,
            y: 1.3,
            w: 11,
            h: 0.7,
            fontSize: 34,
            bold: true,
            color: "FFFFFF"
        }
    );


    slide.addText(
        "Service Marketplace Status Report",
        {
            x: 0.7,
            y: 2.2,
            w: 11,
            h: 0.5,
            fontSize: 22,
            color: "CBD5E1"
        }
    );


    slide.addText(
        new Date().toLocaleDateString("en-IN"),
        {
            x: 0.7,
            y: 3.1,
            w: 5,
            h: 0.4,
            fontSize: 16,
            color: "94A3B8"
        }
    );


    /* CUSTOMER SLIDE */

    slide =
        pptx.addSlide();


    slide.addText(
        "Customer Problems",
        {
            x: 0.5,
            y: 0.4,
            w: 12,
            h: 0.5,
            fontSize: 26,
            bold: true
        }
    );


    slide.addText(
        `Total Problems: ${total}`,
        {
            x: 0.7,
            y: 1.3,
            w: 5,
            h: 0.5,
            fontSize: 22,
            bold: true
        }
    );


    slide.addText(
        `New: ${newCount}\nIn Progress: ${progress}\nCompleted: ${completed}`,
        {
            x: 0.7,
            y: 2.1,
            w: 5,
            h: 1.5,
            fontSize: 20,
            breakLine: false
        }
    );


    /* MITRA SLIDE */

    slide =
        pptx.addSlide();


    slide.addText(
        "Mitra Status",
        {
            x: 0.5,
            y: 0.4,
            w: 12,
            h: 0.5,
            fontSize: 26,
            bold: true
        }
    );


    slide.addText(
        `Total Mitra Requests: ${mitras.length}`,
        {
            x: 0.7,
            y: 1.3,
            w: 6,
            h: 0.5,
            fontSize: 22,
            bold: true
        }
    );


    slide.addText(
        `Pending: ${pending}\nApproved: ${approved}\nRejected: ${rejected}`,
        {
            x: 0.7,
            y: 2.1,
            w: 5,
            h: 1.5,
            fontSize: 20
        }
    );


    /* DATA TABLE SLIDE */

    slide =
        pptx.addSlide();


    slide.addText(
        "Customer Request Details",
        {
            x: 0.5,
            y: 0.3,
            w: 12,
            h: 0.5,
            fontSize: 24,
            bold: true
        }
    );


    const rows = [

        [
            "ID",
            "Customer",
            "Service",
            "Location",
            "Status"
        ]

    ];


    problems.forEach(problem => {

        rows.push([

            problem.id,
            problem.name,
            problem.service,
            problem.location,
            problem.status

        ]);

    });


    slide.addTable(
        rows,
        {
            x: 0.4,
            y: 1.0,
            w: 12.2,
            h: 5.5,
            fontSize: 12,
            border: {
                type: "solid",
                color: "CCCCCC"
            },
            fill: "F8FAFC",
            color: "1E293B"
        }
    );


    pptx.writeFile({
        fileName:
            "FixMitra-Status-Report.pptx"
    });

}


/* =========================================
   ADMIN LOGOUT
========================================= */

function adminLogout() {

    if (
        confirm(
            "Are you sure you want to logout?"
        )
    ) {

        alert(
            "Admin logout demo completed."
        );

        window.location.href =
            "index.html";

    }

}


/* =========================================
   LOAD EVERYTHING
========================================= */

function loadAdminData() {

    updateStats();

    loadProblemTable();

    loadMitraTable();

    loadApprovedTable();

    loadRecentProblems();

    loadRecentMitras();

    loadServiceSummary();

    loadLocationSummary();

    loadDate();

}


/* =========================================
   CLOSE MODALS ON OUTSIDE CLICK
========================================= */

window.addEventListener(
    "click",
    function(event) {

        const details =
            document.getElementById(
                "detailsModal"
            );

        const status =
            document.getElementById(
                "statusModal"
            );

        const report =
            document.getElementById(
                "reportModal"
            );


        if (event.target === details) {
            closeDetails();
        }

        if (event.target === status) {
            closeStatusList();
        }

        if (event.target === report) {
            closeReport();
        }

    }
);


/* =========================================
   ESCAPE
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeDetails();

            closeStatusList();

            closeReport();

        }

    }
);


/* =========================================
   INITIAL LOAD
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadAdminData();

    }
);

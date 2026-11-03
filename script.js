
/* =========================================================
   FIXMITRA - REAL EMAIL OTP
   Cloudflare Worker + Resend
   ========================================================= */

const FIXMITRA_OTP_API =
    "https://fixmitra-email-otp.pratikprabhakar200.workers.dev";

async function sendEmailOTP() {

    const email =
        byId("mitraEmail")?.value.trim().toLowerCase() || "";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    emailVerified = false;

    const status = byId("emailStatus");

    if (status) {
        status.textContent = "Sending real OTP...";
        status.style.color = "#555";
    }

    try {

        const response = await fetch(
            FIXMITRA_OTP_API + "/send-otp",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(
                result.detail || result.message || "OTP sending failed"
            );
        }

        if (status) {
            status.textContent =
                "OTP sent. Please check your email.";
            status.style.color = "#14804a";
        }

        alert("OTP sent successfully. Please check your email.");

    } catch (error) {

        console.error("Email OTP error:", error);

        if (status) {
            status.textContent = "OTP could not be sent.";
            status.style.color = "#d32f2f";
        }

        alert("Email OTP Error: " + error.message);
    }
}

async function verifyEmailOTP() {

    const email =
        byId("mitraEmail")?.value.trim().toLowerCase() || "";

    const otp =
        byId("emailOTP")?.value.trim() || "";

    if (!email || !otp) {
        alert("Enter your email and OTP first.");
        return;
    }

    try {

        const response = await fetch(
            FIXMITRA_OTP_API + "/verify-otp",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    otp: otp
                })
            }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(
                result.message || "Invalid or expired OTP"
            );
        }

        emailVerified = true;

        const status = byId("emailStatus");

        if (status) {
            status.textContent = "✓ Email verified successfully";
            status.style.color = "#14804a";
        }

        alert("Email verified successfully!");

    } catch (error) {

        emailVerified = false;

        console.error("Email verification error:", error);

        alert("Verification failed: " + error.message);
    }
}

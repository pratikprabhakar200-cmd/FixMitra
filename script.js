/* FixMitra script.js — Firebase compat SDK required before this file */
"use strict";
const firebaseConfig = {
  apiKey: "AIzaSyB9ji8FJkyWp4Y4VnSknjKk5uWMpvuaPfE",
  authDomain: "fixmitra-a94a4.firebaseapp.com",
  databaseURL: "https://fixmitra-a94a4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fixmitra-a94a4",
  storageBucket: "fixmitra-a94a4.firebasestorage.app",
  messagingSenderId: "886786796836",
  appId: "1:886786796836:web:6a0f9425f0d91a108c17b1"
};
const FIXMITRA_OTP_API = "https://fixmitra-email-otp.pratikprabhakar200.workers.dev";
const INSPECTION_CHARGE = 199;
let emailVerified = false, confirmationResult = null, recaptchaVerifier = null;
let customerCoords = null;
const byId = id => document.getElementById(id);
const val = id => (byId(id)?.value || "").trim();
const setText = (id, t) => { if (byId(id)) byId(id).textContent = t; };
const show = id => { if (byId(id)) byId(id).style.display = "flex"; };
const hide = id => { if (byId(id)) byId(id).style.display = "none"; };
const safe = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const key = s => String(s || "").replace(/[.#$\[\]/]/g, "_");

if (window.firebase && !firebase.apps.length) firebase.initializeApp(firebaseConfig);
const auth = window.firebase ? firebase.auth() : null;
const db = window.firebase ? firebase.database() : null;
const storage = window.firebase ? firebase.storage() : null;

function openProblemForm(service="") { if (byId("problemService")) byId("problemService").value=service; show("problemModal"); }
function closeProblemForm() { hide("problemModal"); }
function openMitraForm() { show("mitraModal"); }
function closeMitraForm() { hide("mitraModal"); }
function closeBookingTracker() { hide("trackerModal"); }
function closeConfirmationModal() { hide("confirmationModal"); }

function searchService() {
  const q=val("serviceSearch").toLowerCase();
  document.querySelectorAll(".service-card,[data-service-card]").forEach(el => {
    el.style.display = (!q || el.innerText.toLowerCase().includes(q)) ? "" : "none";
  });
  const loc=val("locationSelect").toLowerCase();
  if (loc && !["aurangabad","gaya"].includes(loc)) alert("Filhaal service area Aurangabad aur Gaya, Bihar hai.");
}
function useMyLocation() {
  if (!navigator.geolocation) return alert("Browser location support nahi karta.");
  setText("locationStatus","Location mil rahi hai...");
  navigator.geolocation.getCurrentPosition(p=>{
    customerCoords={latitude:p.coords.latitude,longitude:p.coords.longitude};
    setText("locationStatus","Location captured successfully.");
    if (byId("customerAddress") && !val("customerAddress")) byId("customerAddress").value=`${customerCoords.latitude}, ${customerCoords.longitude}`;
    updateVisitCharge();
  },e=>setText("locationStatus","Location error: "+e.message),{enableHighAccuracy:true,timeout:15000});
}
function updateVisitCharge() {
  setText("vehicleRate","Distance/fuel rate engineer assignment ke baad confirm hoga");
  setText("distanceValue","Pending");
  setText("visitCharge","₹199 inspection charge");
  setText("estimatedTotal","Repair/parts amount inspection aur customer approval ke baad");
}
async function ensureUser() { if(!auth.currentUser) await auth.signInAnonymously(); return auth.currentUser; }
async function uploadPhoto(file,folder,uid) {
  if(!file) return "";
  if(!file.type.startsWith("image/")) throw Error("Sirf image upload karein.");
  if(file.size>5*1024*1024) throw Error("Photo 5 MB se chhoti honi chahiye.");
  const ref=storage.ref(`${folder}/${uid}/${Date.now()}_${key(file.name)}`);
  const snap=await ref.put(file); return snap.ref.getDownloadURL();
}
async function submitCustomerBooking(e) {
  e?.preventDefault();
  try {
    const service=val("problemService"), name=val("customerName"), mobile=val("customerMobile").replace(/\s/g,"");
    const district=val("customerLocation"), date=val("bookingDate"), time=val("bookingTime"), address=val("customerAddress");
    if(!service||!name||! /^[+]?[0-9]{10,13}$/.test(mobile)||!district||!date||!time||!address)
      return alert("Service, naam, sahi mobile, district, date, time aur address bharein.");
    const user=await ensureUser(), photo=byId("customerPhoto")?.files?.[0]||null;
    const photoUrl=await uploadPhoto(photo,"customerPhotos",user.uid);
    const id="FM"+Date.now().toString().slice(-9);
    const record={bookingId:id,service,customerName:name,customerMobile:mobile,district,date,time,address,
      problem:val("customerProblem"),photoUrl,coordinates:customerCoords||null,inspectionCharge:INSPECTION_CHARGE,
      status:"Booking received",createdAt:firebase.database.ServerValue.TIMESTAMP};
    await db.ref(`bookings/${user.uid}/${id}`).set(record);
    await db.ref(`publicBookingLookup/${key(mobile)}/${id}`).set({bookingId:id,service,date,time,status:record.status});
    if(byId("confirmationContent")) byId("confirmationContent").innerHTML=
      `<h3>Booking successful!</h3><p>Booking ID: <b>${safe(id)}</b></p><p>${safe(service)}</p><p>Inspection charge: ₹199</p><p>Repair/parts amount inspection aur approval ke baad.</p>`;
    hide("problemModal"); show("confirmationModal"); byId("problemForm")?.reset();
  } catch(err) { console.error(err); alert("Booking save nahi hui: "+err.message); }
}
function openBookingTracker() {
  const phone=prompt("Booking ke samay diya gaya mobile number daalein:");
  if(!phone) return;
  db.ref(`publicBookingLookup/${key(phone.replace(/\s/g,""))}`).limitToLast(10).once("value")
    .then(s=>{let a=[];s.forEach(c=>a.push(c.val())); byId("trackerContent").innerHTML=a.length?
      a.reverse().map(x=>`<p><b>${safe(x.bookingId)}</b> — ${safe(x.service)}<br>${safe(x.status)}<br>${safe(x.date)} ${safe(x.time)}</p>`).join(""):"<p>Booking nahi mili.</p>";show("trackerModal");})
    .catch(e=>alert("Tracker error: "+e.message));
}
async function sendMobileOTP() {
  let p=val("mitraMobile").replace(/\s/g,""); if(!p.startsWith("+")) p="+91"+p;
  if(!/^\+[1-9][0-9]{9,14}$/.test(p)) return alert("Valid mobile number daalein.");
  try {
    if(!recaptchaVerifier) { recaptchaVerifier=new firebase.auth.RecaptchaVerifier("recaptcha-container",{size:"invisible"}); await recaptchaVerifier.render(); }
    confirmationResult=await auth.signInWithPhoneNumber(p,recaptchaVerifier);
    setText("mobileStatus","OTP SMS se bhej diya gaya hai."); alert("Mobile OTP sent.");
  } catch(e) { console.error(e); setText("mobileStatus","OTP nahi bheja gaya."); alert("Mobile OTP error: "+e.message); }
}
async function verifyMobileOTP() {
  const otp=val("mobileOTP"); if(!confirmationResult||!/^[0-9]{6}$/.test(otp)) return alert("Pehle OTP bhejein, phir 6 digit OTP daalein.");
  try { await confirmationResult.confirm(otp); setText("mobileStatus","✓ Mobile verified"); alert("Mobile verified."); }
  catch(e) { alert("OTP verify nahi hua: "+e.message); }
}
async function sendEmailOTP() {
  const email=val("mitraEmail").toLowerCase(); if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert("Valid email daalein.");
  emailVerified=false; setText("emailStatus","OTP bheja ja raha hai...");
  try { const r=await fetch(FIXMITRA_OTP_API+"/send-otp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email})});
    const x=await r.json(); if(!r.ok||!x.success) throw Error(x.detail||x.message||"OTP failed");
    setText("emailStatus","OTP email par bhej diya gaya hai."); alert("Email OTP sent. Inbox/spam check karein.");
  } catch(e) { setText("emailStatus","Email OTP nahi bheja gaya."); alert("Email OTP error: "+e.message); }
}
async function verifyEmailOTP() {
  const email=val("mitraEmail").toLowerCase(), otp=val("emailOTP"); if(!email||!otp) return alert("Email aur OTP daalein.");
  try { const r=await fetch(FIXMITRA_OTP_API+"/verify-otp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,otp})});
    const x=await r.json(); if(!r.ok||!x.success) throw Error(x.message||"Invalid/expired OTP");
    emailVerified=true; setText("emailStatus","✓ Email verified"); alert("Email verified.");
  } catch(e) { emailVerified=false; alert("Email verify failed: "+e.message); }
}
async function submitMitraRegistration(e) {
  e?.preventDefault();
  try {
    if(!auth.currentUser||auth.currentUser.isAnonymous||!auth.currentUser.phoneNumber) return alert("Pehle Mobile OTP verify karein.");
    if(!emailVerified) return alert("Pehle Email OTP verify karein.");
    if(!byId("mitraTerms")?.checked) return alert("Terms accept karein.");
    const fields=["ownerName","businessName","mitraEmail","mitraService","mitraLocation","mitraAddress"];
    if(fields.some(id=>!val(id))) return alert("Mitra ki saari zaroori details bharein.");
    const uid=auth.currentUser.uid, photo=byId("shopPhoto")?.files?.[0]||null;
    const photoUrl=await uploadPhoto(photo,"mitraPhotos",uid);
    const profile={uid,ownerName:val("ownerName"),businessName:val("businessName"),mobile:auth.currentUser.phoneNumber,
      email:val("mitraEmail").toLowerCase(),service:val("mitraService"),district:val("mitraLocation"),
      address:val("mitraAddress"),experience:val("mitraExperience"),photoUrl,status:"Pending admin approval",
      createdAt:firebase.database.ServerValue.TIMESTAMP};
    await db.ref(`mitras/${uid}`).set(profile);
    if(byId("confirmationContent")) byId("confirmationContent").textContent="Mitra registration received. Admin approval ke baad activate hoga.";
    hide("mitraModal"); show("confirmationModal"); byId("mitraForm")?.reset();
  } catch(e) { console.error(e); alert("Mitra registration failed: "+e.message); }
}
document.addEventListener("DOMContentLoaded",()=>{
  byId("problemForm")?.addEventListener("submit",submitCustomerBooking);
  byId("mitraForm")?.addEventListener("submit",submitMitraRegistration);
  ["serviceSearch","locationSelect"].forEach(id=>byId(id)?.addEventListener("input",searchService));
  if(byId("bookingDate")) byId("bookingDate").min=new Date().toISOString().slice(0,10);
  updateVisitCharge();
});

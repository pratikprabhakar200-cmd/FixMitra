FIXMITRA SETUP
1) Replace existing script.js with this package's script.js. Keep style.css unchanged.
2) In index.html, load these scripts BEFORE script.js:
<script src="https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.14.1/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.14.1/firebase-database-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.14.1/firebase-storage-compat.js"></script>
3) Add <div id="recaptcha-container"></div> before script.js.
4) Keep <script src="script.js"></script> as the last script.
5) Paste database-rules.json in Firebase Realtime Database > Rules.
6) Paste storage-rules.txt in Firebase Storage > Rules.

Important:
- Code assumes the IDs from the previously shared HTML.
- Google Maps road distance/current fuel rates are not calculated; they need a configured origin and secure Maps Routes backend.
- Phone OTP requires Phone provider, authorized GitHub Pages domain, HTTPS, reCAPTCHA and available SMS quota.
- The email OTP flag is client-side only; production verification needs trusted backend enforcement.
- Admin-wide access needs secure custom claims/backend. Never make database rules public.
- Never store passwords in Realtime Database.
- The phone lookup index is a basic starter implementation; production should use a rate-limited backend to prevent enumeration.

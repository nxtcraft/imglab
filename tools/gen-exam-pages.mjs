// Exam upload-rule pages under /imglab/exam/<exam>/. Every number here was checked against the
// official notice on 28 Nov 2026 (see `source` on each page). Re-check when a new notice is published.
// Run: node imagecraft/tools/gen-exam-pages.mjs  (then nxtcraft.github.io/tools/section-bar.py)
import fs from 'fs'; import path from 'path';
const ROOT = process.env.HOME + '/vscode-code';
const SITE = 'https://nxtcraft.github.io';
const CHECKED = '28 November 2026';
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

const EXAMS = [
  {
    slug: 'ibps-po', name: 'IBPS PO', full: 'IBPS PO 2026 (CRP PO/MT-XVI)',
    title: 'IBPS PO 2026 Photo, Signature, Thumb & Declaration Size — Official Rules',
    desc: 'IBPS PO 2026 upload sizes from the official notice: photo 200×230 px 20–50 KB, signature 140×60 px 10–20 KB, thumb 240×240 px, declaration 800×400 px. Resize free.',
    sub: 'Every file IBPS asks for in the PO/MT-XVI application, with the exact size, and a free resizer that keeps your files on your device.',
    rows: [
      ['Photograph', 'JPG/JPEG', '200 × 230 px (preferred)', '20–50 KB', 'Caps, hats and dark glasses are not allowed; religious headwear is fine if it does not cover the face. A <strong>live photo</strong> is also captured by webcam or phone during registration.'],
      ['Signature', 'JPG/JPEG', '140 × 60 px (preferred)', '10–20 KB', 'Black ink on white paper. Not in CAPITAL letters. Must match the signature you give at the exam.'],
      ['Left thumb impression', 'JPG/JPEG', '240 × 240 px at 200 DPI (3 × 3 cm)', '20–50 KB', 'Black or blue ink on white paper. No left thumb? Use the right thumb (or the notice\'s other options) and say which you used.'],
      ['Handwritten declaration', 'JPG/JPEG', '800 × 400 px at 200 DPI (10 × 5 cm)', '50–100 KB', 'In English, in your own handwriting, black ink on white paper, not in CAPITAL letters.'],
      ['10th certificate (and Clause J(ix) certificate if applicable)', 'PDF', 'A4 page', 'Up to 500 KB', 'Must be clear and readable.'],
    ],
    extra: `<h2>The Handwritten Declaration Text</h2>
<p>Write this in English, in your own handwriting, then scan or photograph it:</p>
<div class="highlight">"I, _______ (Name of the candidate), hereby declare that all the information submitted by me in the application form is correct, true and valid. I will present the supporting documents as and when required."</div>
<p>If it is written by someone else or in another language, the application is treated as invalid.</p>
<h2>Live Photo During Registration</h2>
<p>As well as the uploaded photo, IBPS asks you to capture a live photo with a webcam, or with your phone through a QR code shown on the form. Sit against a light, preferably white background with good light, look straight at the camera, and do not wear a cap, coloured glasses or a mask.</p>
<h2>Scanning Settings</h2>
<ul><li>Scanner resolution at least 200 DPI, set to true colour.</li><li>Crop close to the edge of the photo, signature, thumb impression or declaration.</li><li>Save as JPG/JPEG. If a file is too large, lower the DPI or colours while scanning, or use the resizer below.</li></ul>`,
    tool: [['Photo', 'ibps-po', 'photo'], ['Signature', 'ibps-po', 'signature']],
    otherTools: `For the thumb impression and the declaration, use <a href="/imglab/resize/">Resize Image</a> with the sizes above, then check the KB. For the certificate PDF, use <a href="/pdflab/compress/500kb/">Compress PDF to 500 KB</a>.`,
    source: 'IBPS notification CRP PO/MT-XVI (Vacancies of 2027-28), dated 30 June 2026, Annexure III "Guidelines for scanning and upload of documents"',
    sourceUrl: 'https://www.ibps.in/wp-content/uploads/Detailed-Notification_CRP-PO-XVI_Final_V1_30.06.2026.pdf',
    note: 'IBPS Clerk, SO and RRB notices have their own annexures. The sizes are often similar, but check the notice for your exam.',
    faqs: [
      ['What is the photo size for IBPS PO 2026?', 'A JPG/JPEG of 200 × 230 pixels (preferred) and 20 KB to 50 KB, per the CRP PO/MT-XVI notice. You also capture a live photo by webcam or phone during registration.'],
      ['What is the signature size for IBPS PO 2026?', '140 × 60 pixels (preferred) and 10 KB to 20 KB, JPG/JPEG, signed in black ink on white paper and not in capital letters.'],
      ['My signature file is below 10 KB. What do I do?', 'Portals reject files below the minimum. The NxtCraft exam resizer raises the file to the minimum automatically without changing the picture, so it uploads correctly.'],
      ['What are the left thumb and declaration sizes?', 'Left thumb impression: 240 × 240 px at 200 DPI, 20–50 KB. Handwritten declaration: 800 × 400 px at 200 DPI, 50–100 KB. Both JPG/JPEG.'],
    ],
  },
  {
    slug: 'ssc', name: 'SSC', full: 'SSC CGL 2026',
    title: 'SSC CGL 2026 Photo & Signature Rules — Live Photo, Signature 10–20 KB',
    desc: 'SSC CGL 2026 takes a live photo in the form (no photo upload). Signature: JPG 10–20 KB, about 6 × 2 cm. Official rules and a free signature resizer.',
    sub: 'What changed in the 2026 SSC application: the photo is taken live, and only the signature is uploaded. Here are the official rules.',
    rows: [
      ['Photograph', 'Live capture', 'Taken in the form by webcam or phone', 'No file to upload', 'You do not need an existing photo. Photographing an old photo gets the application rejected.'],
      ['Signature', 'JPG/JPEG', 'About 6.0 cm wide × 2.0 cm high', '10–20 KB', 'Blurred or tiny ("miniature") signatures are rejected.'],
    ],
    extra: `<h2>How to Take the Live Photo</h2>
<ul><li>Find a place with good light and a plain background.</li><li>Keep the camera at eye level and look straight ahead.</li><li>Keep your whole face inside the frame shown on screen, neither too close nor too far.</li><li>Do not wear a cap, mask or glasses/spectacles.</li><li>If your webcam does not work, scan the QR code on the Upload Documents page to capture the photo with your phone.</li></ul>
<div class="highlight">Poor-quality, tiny, blurred or side-facing photos are rejected. Do not take a picture of an existing photograph; such applications are rejected.</div>
<h2>Signature Size: 6 cm or 4 cm?</h2>
<p>Paragraph 9.6 of the notice gives the signature as about <strong>6.0 cm wide × 2.0 cm high</strong>, while the online-application annexure mentions about 4.0 cm wide. The file size, <strong>10–20 KB in JPG</strong>, is the same in both places. Our preset makes a wide 300 × 100 px signature that fits the 10–20 KB range.</p>
<h2>Aadhaar Authentication</h2>
<p>The notice says applications submitted with Aadhaar-based authentication will not be rejected on the ground that the photo or signature does not meet the standards.</p>`,
    tool: [['Signature', 'ssc', 'signature']],
    otherTools: 'Need a passport-size photo for something else? Use the <a href="/imglab/passport/">Passport Photo maker</a>.',
    source: 'SSC notice for the Combined Graduate Level Examination 2026 (published 21 May 2026), paragraphs 9.4–9.6 and Annexure IV',
    sourceUrl: 'https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_cgl_2025.pdf',
    note: 'This page follows the CGL 2026 notice. Other SSC exams publish their own notices; check yours for any difference.',
    faqs: [
      ['Do I need to upload a photo for SSC CGL 2026?', 'No. The 2026 form captures a live photo through your webcam or phone. You do not need an existing photograph, and photographing an old photo leads to rejection.'],
      ['What is the SSC CGL 2026 signature size?', 'A JPG/JPEG of 10 KB to 20 KB, about 6.0 cm wide and 2.0 cm high (paragraph 9.6 of the notice).'],
      ['Can I wear glasses for the SSC live photo?', 'No. The notice says not to wear a cap, mask or glasses/spectacles while capturing the photo.'],
      ['My webcam is not working. What can I do?', 'Use the QR code on the Upload Documents page to capture the live photo with your phone.'],
    ],
  },
  {
    slug: 'upsc', name: 'UPSC', full: 'UPSC (2026 notices)',
    title: 'UPSC Photo & Signature Size 2026 — 20–200 KB Photo, 20–100 KB Signature',
    desc: 'UPSC photo and signature rules from the 2026 notices: JPG photo 20–200 KB, signature 20–100 KB, 350–1000 px, sign three times. Free resizer, no upload.',
    sub: 'The photo and signature limits in UPSC\'s 2026 examination notices, and a free resizer that keeps your files on your device.',
    rows: [
      ['Photograph', 'JPG/JPEG', '350 × 350 px minimum to 1000 × 1000 px maximum (UPSC online FAQ)', '20–200 KB', 'Follow the photo rules in your exam\'s notice.'],
      ['Signature', 'JPG/JPEG', 'Not fixed in the notice; 400 × 400 px fits three signatures', '20–100 KB', 'Sign three times, one below the other, on plain white paper in black ink, then scan the sheet.'],
    ],
    extra: `<h2>Older Notices Said 300 KB</h2>
<p>Several UPSC notices from 2022 to 2025 allowed up to 300 KB per file. The 2026 notices (CAPF (AC) 2026, Combined Medical Services 2026) set the photo at <strong>20–200 KB</strong> and the signature at <strong>20–100 KB</strong>. Use the limits printed in the notice for your own exam, since UPSC states them in each one.</p>
<h2>Making the Files</h2>
<ul><li>Scan or photograph the photo and the signature sheet in good light.</li><li>Save as JPG. UPSC's online FAQ suggests tools such as MS Paint or IrfanView; our resizer below does the same in the browser.</li><li>Keep both files above 20 KB: the portal rejects files below the minimum too.</li></ul>`,
    tool: [['Photo', 'upsc', 'photo'], ['Signature', 'upsc', 'signature']],
    otherTools: 'Need to shrink a certificate PDF? Use <a href="/pdflab/compress/">Compress PDF</a>.',
    source: 'UPSC examination notices for CAPF (AC) Examination 2026 and Combined Medical Services Examination 2026, and the UPSC online application FAQ (upsconline.gov.in)',
    sourceUrl: 'https://upsconline.gov.in/upsc/OTRP/candidate/faq.php',
    note: 'Each UPSC exam has its own notice. Check the photo and signature section of the notice for the exam you are applying to.',
    faqs: [
      ['What is the UPSC photo size in 2026?', 'In the 2026 notices (CAPF (AC), CMS), the photo must be a JPG of 20 KB to 200 KB. UPSC\'s online FAQ gives 350 × 350 px minimum and 1000 × 1000 px maximum.'],
      ['What is the UPSC signature size in 2026?', 'A JPG of 20 KB to 100 KB in the 2026 notices. The CAPF 2026 notice asks you to sign three times, one below the other, on white paper in black ink.'],
      ['Is the UPSC limit 300 KB?', 'Some older notices (2022–2025) allowed 300 KB. The 2026 notices lowered it to 200 KB for the photo and 100 KB for the signature. Follow the notice for your exam.'],
      ['Is it safe to resize my photo here?', 'Yes. The resizer runs in your browser and never uploads your photo.'],
    ],
  },
];

const CSS = `*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#faf5ff;--card:#fff;--text:#1e1b4b;--muted:#6b7280;--body:#374151;--line:#e9d5ff;--soft:#f5f3ff;--accent:#7c3aed;--hl:#ede9fe}
[data-theme="dark"]{--bg:#0f0d1a;--card:#1c1830;--text:#ede9fe;--muted:#a1a1aa;--body:#d4d4d8;--line:#3b3363;--soft:#1c1830;--hl:#2e1065}
body{background:var(--bg);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:1.7}
.top{background:var(--accent);color:#fff;padding:.75rem 1.25rem;display:flex;align-items:center;gap:1rem;flex-wrap:wrap}.brand{font-weight:800;text-decoration:none;color:#fff}.nav-links a{color:rgba(255,255,255,.9);font-size:.85rem;text-decoration:none;margin-left:1rem}
main{max-width:860px;margin:0 auto;padding:1.5rem 16px 2rem}.breadcrumb{font-size:.8rem;color:var(--muted);margin-bottom:1.25rem}.breadcrumb a{color:var(--muted);text-decoration:none}
h1{font-size:1.6rem;font-weight:800;margin-bottom:.5rem;line-height:1.3}.sub{color:var(--muted);margin-bottom:1.25rem}h2{font-size:1.2rem;font-weight:700;margin:2rem 0 .75rem}
p{margin-bottom:1rem;color:var(--body)}ul{padding-left:1.4rem;margin-bottom:1rem}li{margin-bottom:.4rem;color:var(--body)}a{color:var(--accent)}
.tw{overflow-x:auto;margin-bottom:1rem}table{width:100%;border-collapse:collapse;font-size:.88rem;background:var(--card)}th,td{padding:.55rem .65rem;border:1px solid var(--line);text-align:left;vertical-align:top}th{background:var(--soft)}td:first-child{font-weight:700}
.highlight{background:var(--hl);border-left:3px solid var(--accent);padding:.75rem 1rem;border-radius:0 8px 8px 0;margin-bottom:1rem;color:var(--body)}
.cta{background:var(--accent);border-radius:12px;padding:1.1rem;text-align:center;margin:1.25rem 0}.cta p{color:#fff;margin-bottom:.6rem}.btn{display:inline-block;background:#fff;color:#6d28d9;padding:.6rem 1.2rem;border-radius:8px;font-weight:700;text-decoration:none;margin:.2rem}
.src{font-size:.85rem;color:var(--muted);background:var(--card);border:1px solid var(--line);border-radius:10px;padding:.75rem 1rem;margin:1rem 0}
.chips{display:flex;flex-wrap:wrap;gap:.45rem;margin:.5rem 0 1rem}.chips a{padding:.3rem .8rem;border-radius:20px;background:var(--card);border:1px solid var(--line);color:var(--body);font-size:.84rem;font-weight:600;text-decoration:none}.chips a.cur{background:var(--accent);color:#fff;border-color:var(--accent)}
.faq-item{border-bottom:1px solid var(--line);padding:.9rem 0}.faq-q{font-weight:700;margin-bottom:.3rem}
@media (max-width:640px){.tw table,.tw tbody,.tw tr,.tw td{display:block;width:100%}.tw tr:first-child{display:none}.tw tr{border:1px solid var(--line);border-radius:10px;margin-bottom:.6rem;background:var(--card);overflow:hidden}.tw td{border:0;border-bottom:1px solid var(--line);padding:.45rem .7rem}.tw td:last-child{border-bottom:0}.tw td:first-child{background:var(--soft)}.tw td:not(:first-child)::before{content:attr(data-l) ': ';font-weight:700;color:var(--muted);font-size:.8rem}}
footer{text-align:center;padding:2rem 16px;color:var(--muted);font-size:.8rem;border-top:1px solid var(--line);margin-top:2.5rem}`;

let n = 0;
for (const E of EXAMS) {
  const url = `/imglab/exam/${E.slug}/`;
  const crumbs = [['Home', '/'], ['ImgLab', '/imglab/'], ['Exam Photo & Signature', '/imglab/exam/'], [E.name, url]];
  const ld = [
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs.map(([nm, u], i) => ({ '@type': 'ListItem', position: i + 1, name: nm, item: SITE + u })) },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: E.faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
  ].map(o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n');
  const chips = EXAMS.map(x => x === E ? `<a class="cur">${x.name}</a>` : `<a href="/imglab/exam/${x.slug}/">${x.name}</a>`).join('') + '<a href="/imglab/exam/">All exams (resizer)</a>';
  const L = ['Document', 'Format', 'Dimensions', 'File size', 'Rules'];
  const table = `<div class="tw"><table><tr>${L.map(h => `<th>${h}</th>`).join('')}</tr>${E.rows.map(r => `<tr>${r.map((c, i) => `<td data-l="${L[i]}">${c}</td>`).join('')}</tr>`).join('')}</table></div>`;
  const btns = E.tool.map(([lab, id, type]) => `<a class="btn" href="/imglab/exam/?exam=${id}&type=${type}">Resize ${lab} →</a>`).join('');
  const body = `<div class="chips">${chips}</div>
<h2>${E.full}: Upload Sizes at a Glance</h2>
${table}
<div class="src"><strong>Source:</strong> <a href="${E.sourceUrl}" rel="nofollow noopener" target="_blank">${esc(E.source)}</a>. Checked on ${CHECKED}. ${E.note}</div>
<div class="cta"><p>Make files that fit, with the minimum and maximum KB already set. Nothing is uploaded.</p>${btns}</div>
${E.extra}
<h2>Other Files</h2>
<p>${E.otherTools}</p>
<h2>Why Uploads Get Rejected</h2>
<ul><li><strong>Too large:</strong> phone photos are 2–5 MB; the limit is a few KB.</li><li><strong>Too small:</strong> files under the minimum (for example below 10 KB or 20 KB) are rejected as well. Our resizer raises the size to the minimum without changing the picture.</li><li><strong>Wrong format:</strong> save as JPG/JPEG unless the notice says otherwise.</li><li><strong>Unclear image:</strong> blurred, dark or tiny images and signatures are rejected.</li></ul>`;
  const html = `<!DOCTYPE html>
<html lang="en-IN">
<head>
<script>!function(){try{var t=localStorage.getItem('nc_theme')||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t)}catch(e){}}()</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-R9EW10BJGW"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-R9EW10BJGW');</script>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(E.title)}</title>
<meta name="description" content="${esc(E.desc)}">
<link rel="canonical" href="${SITE}${url}">
<meta property="og:title" content="${esc(E.title)}"><meta property="og:description" content="${esc(E.desc)}"><meta property="og:type" content="article"><meta property="og:url" content="${SITE}${url}"><meta property="og:image" content="${SITE}/og-image.png"><meta name="twitter:card" content="summary_large_image">
${ld}
<style>${CSS}</style>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9027849237070207" crossorigin="anonymous"></script>
</head>
<body>
<div class="top"><a class="brand" href="/imglab/">ImgLab</a><div class="nav-links"><a href="/imglab/exam/">Exam photo resizer</a><a href="/documents/">Document tools</a></div></div>
<main>
<div class="breadcrumb">${crumbs.map(([nm, u], i) => i < crumbs.length - 1 ? `<a href="${u}">${esc(nm)}</a>` : esc(nm)).join(' › ')}</div>
<h1>${esc(E.title.split(' — ')[0])}</h1>
<p class="sub">${E.sub}</p>
${body}
<h2>Frequently Asked Questions</h2>
${E.faqs.map(([q, a]) => `<div class="faq-item"><div class="faq-q">${esc(q)}</div><p>${esc(a)}</p></div>`).join('\n')}
</main>
<footer><p>© 2026 <a href="/">NxtCraft</a> — Free Online Tools. Not affiliated with IBPS, SSC or UPSC; the official notice is the final authority. <a href="/about/">About</a> · <a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a> · <a href="/contact/">Contact</a></p></footer>
<script src="/assets/nc-theme.js" defer></script>
</body></html>
`;
  const f = path.join(ROOT, 'imagecraft', 'exam', E.slug, 'index.html');
  fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html); n++;
}
console.log('exam pages written', n);

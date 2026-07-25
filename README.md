# Portfolio — Mahathir Shahreza

Portfolio statis (HTML/CSS/JS murni, tanpa framework, tanpa backend, tanpa AI API),
dengan UX terinspirasi Fastfolio.io: landing page dengan search bar besar +
quick action cards, yang bertransisi menjadi halaman chat AI Assistant.

Fitur "AI Portfolio Assistant" adalah simulasi berbasis keyword-matching lokal
(vanilla JS, FLIP animation untuk transisi search bar) — bukan panggilan ke AI/API eksternal,
tidak butuh koneksi internet untuk menjawab.

## Alur (flow)

1. **Landing** — avatar besar, nama, role, search bar "Ask me anything...", dan 9 quick action card.
2. **Klik quick action / ketik pertanyaan** → hero mengecil & fade out, search bar bermigrasi
   (animasi FLIP) ke bagian bawah sebagai composer chat, topbar kecil muncul di atas.
3. **Chat page** → bubble pertanyaan user → typing indicator → bubble jawaban → card hasil
   (project/skill/sertifikat/dll) muncul satu per satu dengan stagger animation.
4. Riwayat chat tetap ada selama halaman belum di-refresh, termasuk saat kembali ke
   beranda (klik nama di topbar) lalu bertanya lagi. Tombol "Clear chat" mengosongkan riwayat.

## Menjalankan lokal

Cukup buka `index.html` langsung di browser, atau jalankan local server (opsional, agar path relatif lebih stabil):

```bash
npx serve .
# atau
python3 -m http.server 8080
```

## Struktur folder

```
portfolio/
├── index.html              # struktur landing + chat view
├── css/style.css            # design tokens, hero, chat bubble, card styling
├── js/
│   ├── portfolio-data.js    # EDIT DATA PORTFOLIO DI SINI
│   └── script.js            # morph animation, chat logic, keyword matching
└── assets/
    ├── images/
    ├── projects/
    ├── certificate/
    └── cv/
```

## Cara edit konten

Buka `js/portfolio-data.js`. Semua teks (profil, skill, pengalaman, project,
sertifikat, course, kontak) ada di situ dalam bentuk object/array yang mudah diubah.
Tidak perlu sentuh `index.html` atau `script.js` untuk update data biasa.

Untuk menambah/mengubah jawaban AI Assistant, edit object `portfolioKnowledge`
di file yang sama — tambahkan `keywords` baru atau kategori baru (jangan lupa
tambahkan entry yang sesuai di `quickActions` kalau ingin muncul sebagai card
di landing page juga).

## Menambahkan file kamu

1. `assets/cv/Mahathir-Shahreza-CV.pdf` — resume (nama file harus persis sama)
2. `assets/certificate/*.pdf` — sesuai nama di `certificates` (portfolio-data.js)
3. `assets/projects/*.png` — screenshot project (opsional, lihat README di folder itu)

## Deploy

**GitHub Pages**
1. Push folder ini ke repo GitHub.
2. Settings → Pages → Source: `main` branch, folder `/root`.

**Netlify**
1. Drag & drop folder ini ke Netlify (netlify.com/drop), atau
2. `netlify deploy` via Netlify CLI.

**Vercel**
```bash
npx vercel
```
Tidak perlu build command — ini pure static site.

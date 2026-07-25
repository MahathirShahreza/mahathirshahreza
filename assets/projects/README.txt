Taruh screenshot/thumbnail project di sini, misalnya:
- spk-saw.png
- pengaduan.png
- fp-growth.png

Path gambar sudah didefinisikan di js/portfolio-data.js (field "image"),
tapi saat ini kartu project di halaman masih memakai placeholder teks.
Kalau mau menampilkan gambar asli, ganti isi .project-thumb di js/script.js
(fungsi renderProjects) dengan tag <img src="${p.image}" alt="${p.title}">.

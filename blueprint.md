# Blueprint: Gembitz KKL (Study Tour Interactive Portal)

## 1. Profil Projek
Gembitz KKL adalah platform web portal dan jurnal perjalanan interaktif yang dirancang untuk mendokumentasikan kegiatan Kuliah Kerja Lapangan (KKL) / Study Tour secara modern, presisi, dan informatif. Platform ini berfokus pada pengalaman visual interaktif melalui *Bento Grid Layout*, jadwal kegiatan (*Itinerary Timeline*), peta destinasi interaktif (Leaflet.js), serta dokumentasi materi pembelajaran bagi peserta didik dan publik.

---

## 2. Struktur Halaman & Komponen

### Landing Page (`/` - Single Page Application)
1. **Header & Navbar:**
   * Logo & Nama Projek (*Gembitz KKL*).
   * Navigasi cepat (*smooth scroll* ke section: Ringkasan, Jadwal, Peta, Edukasi, Galeri, Tim).

2. **Hero Section (Bento Grid Layout):**
   * *Main Highlight Card:* Banner utama judul KKL, tanggal pelaksanaan, dan deskripsi latar belakang studi.
   * *Stat Cards:* Statistik jumlah destinasi edukasi, total jarak perjalanan (km), jumlah peserta didik, dan jumlah rombongan bus.

3. **Itinerary Timeline Section:**
   * Urutan jadwal kegiatan harian (Hari 1 s.d. Hari Selesai).
   * Filter interaktif berdasarkan hari kegiatan.
   * Rincian slot waktu, lokasi, dan ikon jenis aktivitas.

4. **Interactive Map Section (Leaflet.js):**
   * Peta spasial interaktif yang menampilkan marker titik koordinat lokasi destinasi edukasi.
   * *Popup Card:* Informasi singkat dan foto destinasi saat marker peta diklik.

5. **Educational Insights & Journal:**
   * Kartu ringkasan materi pembelajaran dan hasil observasi lapangan dari tiap destinasi KKL.

6. **Documentation Gallery:**
   * Grid galeri foto kegiatan dan *highlight* momen kelompok.

7. **Student Reflections / Testimonials:**
   * Kartu kutipan kesan, pesan, dan refleksi singkat dari peserta KKL.

8. **Footer:**
   * Hak cipta *Gembitz KKL*, informasi tim penyusun, dan tautan sosial media/kampus.

---

## 3. Fitur Utama & Interaktivitas
1. **Full Static Data Driven:** Seluruh data destinasi, jadwal, dan jurnal disimpan di file JavaScript data lokal (`src/data/studyTourData.js`), memudahkan pembaruan konten tanpa butuh server/database.
2. **Dynamic Spatial Mapping:** Peta Leaflet.js yang merender titik lokasi secara otomatis berdasarkan array koordinat data lokal.
3. **Interactive Timeline Filter:** Fitur menyaring jadwal harian secara interaktif di sisi *client* (frontend).
4. **Responsive Bento Grid:** Tampilan responsif modern yang menyesuaikan otomatis dari layar smartphone hingga monitor desktop.

---

## 4. Aturan Teknis & Stack

### Stack Teknologi
* **Frontend Framework:** Vue 3 (Composition API `<script setup>`).
* **Build Tool:** Vite.
* **UI Styling:** Tailwind CSS.
* **Icons:** Lucide Icons (`lucide-vue-next`).
* **Map Engine:** Leaflet.js (`leaflet`).

### Aturan Pengembangan
* **Architecture:** Full Frontend (Single Page Application), **tanpa Backend dan tanpa Database**.
* **Konfigurasi Environment:** Pengaturan global (seperti titik koordinat awal peta dan nama event) dibaca dari file `.env`; file `.env` **dilarang di-commit** ke Git repository (masukkan ke `.gitignore`).
* **Manajemen Gambar:** Menggunakan URL gambar eksternal yang valid (Unsplash/Placeholder API) atau file lokal di folder `public/assets/`. **Dilarang** membuat fitur unggah/unggah gambar (*image upload*).
# Sistem Rekomendasi Tempat Wisata Ramah Disabilitas dengan Metode MOORA

Proyek ini adalah sistem rekomendasi berbasis web yang membantu pengguna, terutama wisatawan dengan disabilitas, untuk menemukan tempat wisata ramah disabilitas di Kabupaten Banyuwangi. Sistem ini menggunakan **metode MOORA** (Multi-Objective Optimization on the basis of Ratio Analysis) untuk memberikan rekomendasi berdasarkan kriteria tertentu seperti **aksesibilitas**, **rating**, **harga**, dan **jarak**.

## Fitur Utama

- **Sistem Rekomendasi:** Rekomendasi tempat wisata berdasarkan kriteria aksesibilitas seperti jalan khusus difabel, toilet khusus, parkir khusus difabel, dan ramp.
- **Penerapan Metode MOORA:** Algoritma MOORA digunakan untuk memprioritaskan dan meranking tempat wisata berdasarkan kriteria yang dipilih pengguna.
- **Antarmuka Pengguna yang Mudah:** Website dirancang dengan antarmuka yang ramah pengguna menggunakan **Next.js** dan **Tailwind CSS**.
- **API Backend:** Backend menggunakan **Node.js** dengan database **MariaDB** untuk menyimpan data tempat wisata, aksesibilitas, dan kriteria lainnya.


## Teknologi yang Digunakan

- **Backend:**
  - Node.js
  - TypeORM
  - MariaDB
  - Express.js

- **Frontend:**
  - Next.js
  - Tailwind CSS
  - React.js



## Struktur Proyek

Proyek ini dibagi menjadi dua bagian utama:
1. **Back-end**
2. **Front-end**

## Persiapan Proyek

**Pastikan** Anda telah menjalankan perintah berikut di kedua folder `back-end` dan `front-end` **sebelum memulai proyek**:
```bash
npm install
```

## Migrasi Database

Untuk melakukan migrasi database di backend, jalankan perintah berikut:

```bash
npm migration:run
```


export const studyTourData = {
  destinations: [
    {
      id: 1,
      title: "Candi Kuning & Danau Beratan",
      location: "Bedugul, Tabanan, Bali",
      description:
        "Pura ikonik nan magis yang berdiri di tengah danau dataran tinggi Bedugul dengan udara sejuk pegunungan dan panorama perbukitan berkabut.",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1600&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Pantai Pandawa",
      location: "Kutuh, Kuta Selatan, Bali",
      description:
        "Pantai pasir putih tersembunyi di balik dinding tebing kapur megah berpahatkan patung ksatria Panca Pandawa, menyuguhkan deburan ombak dan pementasan seni tradisi.",
      image:
        "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1600&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Pantai Kuta",
      location: "Badung, Bali",
      description:
        "Garis pantai legendaris Pulau Dewata dengan panorama matahari terbenam emas, ombak selancar kelas dunia, serta denyut kehidupan pesisir yang dinamis.",
      image:
        "https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?q=80&w=1600&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Pantai Jimbaran",
      location: "Kuta Selatan, Bali",
      description:
        "Kawasan pesisir tenang teluk Jimbaran yang termasyhur untuk menikmati jamuan makan malam kuliner laut di tepi pantai bertemaram lilin senja.",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop"
    }
  ],

  // Data Jadwal 5 Hari dengan tumpukan foto (photo stack) per hari
  itineraryTimeline: [
    {
      dayLabel: "Hari 1",
      date: "18 Agustus",
      places: ["PT. Victoria Care Indonesia"],
      photos: [
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop"
      ]
    },
    {
      dayLabel: "Hari 2",
      date: "19 Agustus",
      places: [
        "Joger",
        "Candi Kuning Ulun Danu Beratan",
        "Belanja Oleh-Oleh Khas Bali di Dewata",
        "Menyaksikan Devdan Show"
      ],
      photos: [
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop"
      ]
    },
    {
      dayLabel: "Hari 3",
      date: "20 Agustus",
      places: [
        "Balai Diklat Industri Denpasar",
        "Pantai Kuta",
        "Pantai Pandawa",
        "Menyaksikan Tari Kecak di Pantai Pandawa",
        'Dinner di Cafe "Tepi Pantai" di Jimbaran'
      ],
      photos: [
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop"
      ]
    },
    {
      dayLabel: "Hari 4",
      date: "21 Agustus",
      places: ["Belanja Oleh-Oleh Khas Bali di Karang Kurnia"],
      photos: [
        "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=600&auto=format&fit=crop"
      ]
    },
    {
      dayLabel: "Hari 5",
      date: "22 Agustus",
      places: ["Kembali ke Semarang"],
      photos: [
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=600&auto=format&fit=crop"
      ]
    }
  ],

  // Koordinat Rute Perjalanan KKL Semarang -> Bali Beserta Titik Destinasi
  mapRoute: {
    startPoint: {
      name: "Titik Awal: Kampus Semarang",
      coords: [-6.9932, 110.4203],
      day: "Hari 1"
    },
    destinations: [
      {
        id: "victoria",
        name: "PT. Victoria Care Indonesia",
        day: "Hari 1",
        coords: [-6.9745, 110.3274],
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400&auto=format&fit=crop"
      },
      {
        id: "surabaya_transit",
        name: "Jalur Tol Trans Jawa (Transit)",
        coords: [-7.3195, 112.7278],
        isWaypoint: true
      },
      {
        id: "ketapang_transit",
        name: "Pelabuhan Ketapang (Penyeberangan)",
        coords: [-8.1492, 114.3986],
        isWaypoint: true
      },
      {
        id: "gilimanuk_transit",
        name: "Pelabuhan Gilimanuk (Bali)",
        coords: [-8.1633, 114.4372],
        isWaypoint: true
      },
      {
        id: "joger",
        name: "Pabrik Kata-Kata Joger",
        day: "Hari 2",
        coords: [-8.3512, 115.1951],
        image: "https://images.unsplash.com/photo-1528164344705-475426879c0d?q=80&w=400&auto=format&fit=crop"
      },
      {
        id: "ulundanu",
        name: "Candi Kuning Ulun Danu Beratan",
        day: "Hari 2",
        coords: [-8.2753, 115.1668],
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=400&auto=format&fit=crop"
      },
      {
        id: "dewata",
        name: "Pusat Oleh-Oleh Dewata",
        day: "Hari 2",
        coords: [-8.6705, 115.2126],
        image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=400&auto=format&fit=crop"
      },
      {
        id: "devdan",
        name: "Devdan Show (Nusa Dua)",
        day: "Hari 2",
        coords: [-8.8021, 115.2319],
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop"
      },
      {
        id: "bdi",
        name: "Balai Diklat Industri Denpasar",
        day: "Hari 3",
        coords: [-8.6416, 115.2533],
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=400&auto=format&fit=crop"
      },
      {
        id: "kuta",
        name: "Pantai Kuta",
        day: "Hari 3",
        coords: [-8.7185, 115.1686],
        image: "https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?q=80&w=400&auto=format&fit=crop"
      },
      {
        id: "pandawa",
        name: "Pantai Pandawa & Tari Kecak",
        day: "Hari 3",
        coords: [-8.8451, 115.1866],
        image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=400&auto=format&fit=crop"
      },
      {
        id: "jimbaran",
        name: 'Cafe "Tepi Pantai" Jimbaran',
        day: "Hari 3",
        coords: [-8.7725, 115.1684],
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop"
      },
      {
        id: "karangkurnia",
        name: "Oleh-Oleh Karang Kurnia",
        day: "Hari 4",
        coords: [-8.6651, 115.1903],
        image: "https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=400&auto=format&fit=crop"
      },
      {
        id: "semarang_return",
        name: "Kembali ke Semarang (Hari 5)",
        day: "Hari 5",
        coords: [-6.9932, 110.4203],
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=400&auto=format&fit=crop"
      }
    ]
  },

  // Edukasi Destinasi KKL (Simple Card: Foto + Nama Destinasi)
  educationalDestinations: [
    {
      id: "edu-victoria",
      title: "PT. Victoria Care Indonesia",
      tagline: "Industri Manufaktur & Supply Chain Modern",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
      content:
        "PT. Victoria Care Indonesia merupakan perusahaan manufaktur terkemuka yang memproduksi produk perawatan tubuh dan kosmetik berstandar internasional. Dalam kunjungan studi ini, mahasiswa mengamati langsung implementasi teknologi otomasi konveyor, sensor kendali mutu optik, pengemasan otomatis berkecepatan tinggi, serta sistem Enterprise Resource Planning (ERP) yang mengintegrasikan alur bahan baku hingga distribusi logistik skala nasional."
    },
    {
      id: "edu-joger",
      title: "Pabrik Kata-Kata Joger",
      tagline: "Kreativitas Branding & Kearifan Lokal",
      image: "https://images.unsplash.com/photo-1528164344705-475426879c0d?q=80&w=800&auto=format&fit=crop",
      content:
        "Joger dikenal sebagai ikon cenderamata Bali yang berhasil membangun identitas brand legendaris melalui kekuatan copywriting humor, orisinalitas, dan kejujuran pesan. Pembelajaran yang diperoleh mencakup strategi pemasaran non-konvensional, manajemen eksklusivitas gerai tunggal, serta sinergi antara bisnis kreatif modern dan nilai-nilai kearifan lokal Bali yang menjunjung tinggi etika dan keunikan produk."
    },
    {
      id: "edu-bdi",
      title: "Balai Diklat Industri Denpasar",
      tagline: "Inkubator Animasi, Game & Konten Digital",
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop",
      content:
        "Balai Diklat Industri (BDI) Denpasar merupakan pusat inkubasi dan standarisasi kompetensi talenta digital di bawah Kementerian Perindustrian. Fokus materi studi mencakup pipeline produksi animasi 3D profesional, arsitektur render farm berdaya komputasi tinggi, alur pengembangan software multimedia dan game indie, serta ekosistem inkubasi startup teknologi kreatif di Indonesia."
    },
    {
      id: "edu-devdan",
      title: "Devdan Show & Budaya Bali",
      tagline: "Pentas Seni Teatrikal & Multimedia Panggung",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
      content:
        "Devdan Show dan pertunjukan sakral Tari Kecak Pantai Pandawa menyajikan perpaduan spektakuler antara warisan budaya tradisional kepulauan Nusantara dan teknologi panggung kontemporer. Mahasiswa mempelajari integrasi sistem audio spasial, tata pencahayaan cerdas DMX, panggung hidrolik bergerak, serta strategi pengelolaan pertunjukan seni berbasis pariwisata bertaraf internasional."
    }
  ],

  // 6. Documentation Gallery (Layout 7 Foto Asimetris)
  galleryPhotos: [
    {
      id: "g1",
      title: "Pura Ulun Danu Beratan & Candi Kuning",
      location: "Danau Beratan, Bedugul, Bali",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "g2",
      title: "Pentas Teatrikal Devdan Show",
      location: "Nusa Dua Theatre, Bali",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "g3",
      title: "Pesisir Pasir Putih & Tebing Karang Pandawa",
      location: "Pantai Pandawa, Kutuh, Bali",
      image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "g4",
      title: "Kunjungan Lab Digital BDI Denpasar",
      location: "Balai Diklat Industri Denpasar",
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1400&auto=format&fit=crop"
    },
    {
      id: "g5",
      title: "Sunset Keemasan Pantai Kuta",
      location: "Pantai Kuta, Badung, Bali",
      image: "https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "g6",
      title: "Dinner Tepi Laut Teluk Jimbaran",
      location: "Pantai Jimbaran, Bali",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "g7",
      title: "Pusat Kreativitas & Oleh-Oleh Joger",
      location: "Joger, Luwus Bedugul, Bali",
      image: "https://images.unsplash.com/photo-1528164344705-475426879c0d?q=80&w=1200&auto=format&fit=crop"
    }
  ],

  // 7. Team (10 Anggota: Avatar Bulat, Nama, NPM)
  teamMembers: [
    {
      id: "m1",
      name: "Ismi Adiiba Azkia",
      npm: "24670028",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "m2",
      name: "Robiatul Adawiyyah",
      npm: "24670075",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "m3",
      name: "Rizal Fany Triyanto",
      npm: "24670022",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "m4",
      name: "Alwan Naufal Zaki",
      npm: "24670023",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "m5",
      name: "Radhitya Ananda Putra",
      npm: "24670063",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "m6",
      name: "Muhammad Angga Fidarul M.",
      npm: "24670064",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "m7",
      name: "Arya Eka Nugraha",
      npm: "24670084",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "m8",
      name: "Muhammad Ilham Febrianto",
      npm: "24670085",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "m9",
      name: "Tino Widiansyah",
      npm: "24670132",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "m10",
      name: "Janatha Zhafran Indra Purnama",
      npm: "24670114",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop"
    }
  ],

  // Profil & Video Dokumentasi Kelompok KKL (ala Video Profil UPGRIS Informatika)
  profileVideo: {
    badge: "VIDEO DOKUMENTASI KELOMPOK",
    title: "Profil & Kilas Balik",
    titleEm: "KKL Informatika Kelompok 7",
    lead: "Dokumentasi perjalanan Kuliah Kerja Lapangan (KKL) Informatika 2026 ke Bali. Menelusuri integrasi industri manufaktur modern, balai riset digital BDI Denpasar, serta pelestarian warisan budaya nusantara.",
    videoUrl: "https://www.youtube-nocookie.com/embed/AKV6ml2E34w?si=M-6iiMIlYWJj9jEj",
    thumbnail: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop",
    videoTitle: "Video Profil & Dokumentasi KKL Informatika Kelompok 7",
    highlights: [
      { label: "Durasi Perjalanan", value: "5 Hari 4 Malam" },
      { label: "Total Anggota", value: "10 Mahasiswa" },
      { label: "Fokus Studi", value: "Industri & Budaya" },
      { label: "Rute Eksplorasi", value: "Semarang → Bali" }
    ]
  },

  // Bagian Komentar & Refleksi Mahasiswa (Format Card Testimoni Ala UPGRIS Informatika)
  studentReflections: [
    {
      id: "r1",
      name: "Ismi Adiiba Azkia",
      role: "Mahasiswa Informatika / 24670028",
      initials: "RP",
      color: "#3b82f6",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
      quote: "-",
      rating: 5
    },
    {
      id: "r2",
      name: "Muhammad Angga Fidarul Muflih",
      role: "Mahasiswa Informatika / 24670064",
      initials: "AL",
      color: "#ec4899",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop",
      quote: "KKL ke Bali jadi pengalaman yang seru dan berkesan. Banyak hal baru yang didapat, mulai dari kunjungan industri, mengenal budaya Bali, sampai jalan-jalan dan menikmati waktu bareng teman-teman.",
      rating: 5
    },
    {
      id: "r3",
      name: "Robiatul Adawiyyah",
      role: "Mahasiswa Informatika / 24670075",
      initials: "BW",
      color: "#8b5cf6",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
      quote: "-",
      rating: 5
    },
    {
      id: "r4",
      name: "Rizal Fany Triyanto",
      role: "Mahasiswa Informatika / 24670022",
      initials: "CD",
      color: "#06b6d4",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
      quote: "-",
      rating: 5
    },
    {
      id: "r5",
      name: "Alwan Naufal Zaki",
      role: "Mahasiswa Informatika / 24670023",
      initials: "DA",
      color: "#f59e0b",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
      quote: "-",
      rating: 5
    },
    {
      id: "r6",
      name: "Radhitya Ananda Putra",
      role: "Mahasiswa Informatika / 24670063",
      initials: "GR",
      color: "#10b981",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=400&auto=format&fit=crop",
      quote: "-",
      rating: 5
    },
    {
      id: "r7",
      name: "Arya Eka Nugraha",
      role: "Mahasiswa Informatika / 24670084",
      initials: "GR",
      color: "#10b981",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=400&auto=format&fit=crop",
      quote: "-",
      rating: 5
    },
    {
      id: "r8",
      name: "Muhammad Ilham Febrianto",
      role: "Mahasiswa Informatika / 24670085",
      initials: "GR",
      color: "#10b981",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=400&auto=format&fit=crop",
      quote: "-",
      rating: 5
    },
    {
      id: "r9",
      name: "Tino Widiansyah",
      role: "Mahasiswa Informatika / 24670132",
      initials: "GR",
      color: "#10b981",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=400&auto=format&fit=crop",
      quote: "-",
      rating: 5
    },
    {
      id: "r10",
      name: "Janatha Zhafran Indra Purnama",
      role: "Mahasiswa Informatika / 24670114",
      initials: "GR",
      color: "#10b981",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=400&auto=format&fit=crop",
      quote: "-",
      rating: 5
    }
  ]
}


<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowUp, MapPin, Compass, Calendar, BookOpen, Image, Users, ExternalLink } from 'lucide-vue-next'
import { studyTourData } from '../data/studyTourData'

const destinations = studyTourData.destinations
const showBackToTop = ref(false)

const navLinks = [
  { name: 'Ringkasan Destinasi', href: '#ringkasan' },
  { name: 'Jadwal Itinerary', href: '#jadwal' },
  { name: 'Peta Rute Interaktif', href: '#peta' },
  { name: 'Edukasi & Jurnal KKL', href: '#edukasi' },
  { name: 'Galeri Dokumentasi', href: '#galeri' },
  { name: 'Profil Kelompok', href: '#profil' },
  { name: 'Tim & Komentar', href: '#tim' }
]

const handleScroll = () => {
  const scrollPosition = window.scrollY + window.innerHeight
  const pageHeight = document.documentElement.scrollHeight
  showBackToTop.value = scrollPosition >= pageHeight - 600
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="relative">
    <!-- Footer Berstruktur Lengkap: Menu, Destinasi, dan Info Budaya Bali -->
    <footer class="w-full bg-[#141b2a] border-t border-slate-700/40 pt-16 pb-12 px-6 sm:px-8 lg:px-12 text-slate-300">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
        
        <!-- Kolom 1: Brand & Profil Singkat KKL (5 Col) -->
        <div class="md:col-span-5 space-y-5">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-white/10 p-1.5 flex items-center justify-center ring-1 ring-white/15 shadow-lg">
              <img src="/logo-informatika-upgris.webp" alt="Informatika UPGRIS" class="w-full h-full object-contain" />
            </div>
            <div>
              <span class="text-base font-extrabold text-white tracking-wider block uppercase">KELOMPOK 7</span>
              <span class="text-xs text-amber-400 font-medium">KKL Informatika UPGRIS • Bali Edition 2026</span>
            </div>
          </div>

          <p class="text-xs sm:text-sm text-slate-400 font-light leading-relaxed max-w-sm">
            Portal dokumentasi dan jurnal digital Kuliah Kerja Lapangan (KKL) Program Studi Informatika ke industri teknologi modern dan warisan budaya Pulau Bali.
          </p>

          <!-- 3 Logo Kolaborasi Resmi: UPGRIS, Informatika UPGRIS, UPGRI Tour and Travel -->
          <div class="pt-2">
            <p class="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400 mb-2.5">
              Didukung & Diselenggarakan Oleh:
            </p>
            <div class="flex flex-wrap items-center gap-3">
              <!-- Logo 1: Universitas PGRI Semarang (UPGRIS) -->
              <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-amber-400/40 hover:bg-white/10 transition-all duration-300 group">
                <img src="/logo-upgris.png" alt="Logo UPGRIS" class="w-7 h-7 object-contain group-hover:scale-105 transition-transform" />
                <div class="flex flex-col">
                  <span class="text-[11px] font-bold text-white leading-tight">UPGRIS</span>
                  <span class="text-[8px] text-slate-400 leading-tight">Universitas PGRI Semarang</span>
                </div>
              </div>

              <!-- Logo 2: Informatika UPGRIS -->
              <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-amber-400/40 hover:bg-white/10 transition-all duration-300 group">
                <img src="/logo-informatika-upgris.webp" alt="Logo Informatika UPGRIS" class="w-7 h-7 object-contain group-hover:scale-105 transition-transform" />
                <div class="flex flex-col">
                  <span class="text-[11px] font-bold text-amber-400 leading-tight">Informatika</span>
                  <span class="text-[8px] text-slate-400 leading-tight">Fakultas Teknik & Informatika</span>
                </div>
              </div>

              <!-- Logo 3: UPGRI Tour and Travel -->
              <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-amber-400/40 hover:bg-white/10 transition-all duration-300 group">
                <div class="w-7 h-7 rounded-md bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs shadow-sm group-hover:scale-105 transition-transform">
                  <Compass class="w-4 h-4 text-slate-950" />
                </div>
                <div class="flex flex-col">
                  <span class="text-[11px] font-bold text-white leading-tight">UPGRI Tour & Travel</span>
                  <span class="text-[8px] text-amber-400 leading-tight">Official Travel Partner</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Kolom 2: Navigasi Menu Web (3 Col) -->
        <div class="md:col-span-3 space-y-3">
          <h4 class="text-xs font-bold uppercase tracking-[0.2em] text-white">
            Navigasi Menu
          </h4>
          <ul class="space-y-2 text-xs">
            <li v-for="nav in navLinks" :key="nav.name">
              <a
                :href="nav.href"
                class="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-2 group"
              >
                <span class="text-amber-400/40 group-hover:text-amber-400 transition-colors">›</span>
                <span>{{ nav.name }}</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Kolom 3: Tautan Destinasi KKL (4 Col) -->
        <div class="md:col-span-4 space-y-3">
          <h4 class="text-xs font-bold uppercase tracking-[0.2em] text-white">
            Destinasi KKL Bali
          </h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <a
              v-for="dest in destinations"
              :key="dest.id"
              href="#jadwal"
              class="text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 truncate group"
              :title="dest.title"
            >
              <MapPin class="w-3 h-3 text-amber-400 shrink-0" />
              <span class="truncate">{{ dest.title }}</span>
            </a>
          </div>
        </div>

      </div>

      <!-- Baris Bawah: Copyright & Attributions -->
      <div class="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>&copy; 2026 Kelompok 7 & KKL Informatika. All rights reserved.</p>
        <p class="text-[11px]">Dibuat untuk dokumentasi edukasi & budaya mahasiswa.</p>
      </div>
    </footer>

    <!-- Floating Arrow Button: Muncul di Pojok Kanan Bawah saat di Bagian Bawah Layar -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      leave-active-class="transition duration-200 ease-in"
      enter-from-class="opacity-0 translate-y-4 scale-75"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-4 scale-75"
    >
      <button
        v-if="showBackToTop"
        @click="scrollToTop"
        type="button"
        class="fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-2xl hover:shadow-amber-400/50 transition-all duration-300 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-300 group"
        aria-label="Kembali ke atas"
      >
        <ArrowUp class="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </transition>
  </div>
</template>

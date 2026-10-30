<script setup>
import { studyTourData } from '../data/studyTourData'

const timeline = studyTourData.itineraryTimeline
</script>

<template>
  <section
    id="jadwal"
    class="relative w-full py-24 text-slate-100 selection:bg-amber-400 selection:text-slate-950 overflow-hidden"
  >
    <!-- Background Ambient Glow Lembut & Terang -->
    <div class="absolute -top-32 right-1/4 w-[500px] h-[500px] bg-cyan-500/15 blur-[150px] rounded-full pointer-events-none -z-0"></div>
    <div class="absolute -bottom-32 left-1/4 w-[500px] h-[500px] bg-amber-500/15 blur-[150px] rounded-full pointer-events-none -z-0"></div>

    <div class="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
      
      <!-- Section Header persis ala Referensi: Line — ABOUT THE TOUR — Line -->
      <div class="reveal-fade-up flex items-center justify-center gap-4 sm:gap-8 mb-24">
        <div class="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/30"></div>
        <h2 class="text-2xl sm:text-4xl font-extrabold uppercase tracking-[0.25em] text-white/95">
          ABOUT THE TOUR
        </h2>
        <div class="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/30"></div>
      </div>

      <!-- Timeline Vertikal Seimbang Kiri & Kanan (Zig-Zag Bersih Mengacu Referensi) -->
      <div class="relative max-w-5xl mx-auto">
        
        <!-- Garis Timeline di Tengah (Desktop) / Sisi Kiri (Mobile) -->
        <div class="absolute top-4 bottom-8 left-6 md:left-1/2 -translate-x-[1px] w-[2px] bg-white/20"></div>

        <div class="space-y-20">
          <div
            v-for="(item, idx) in timeline"
            :key="idx"
            class="relative flex flex-col md:flex-row items-center group transition-all duration-700"
            :class="[
              idx % 2 === 0 ? 'md:flex-row reveal-slide-left' : 'md:flex-row-reverse reveal-slide-right',
              `delay-${Math.min((idx + 1) * 100, 500)}`
            ]"
          >
            <!-- Node Marker Putih Bulat Tepat di Garis Vertikal -->
            <div
              class="absolute left-6 md:left-1/2 -translate-x-1/2 top-4 w-3.5 h-3.5 rounded-full bg-white shadow-md shadow-white/40 group-hover:bg-amber-300 group-hover:scale-125 transition-all duration-300 z-20"
            ></div>

            <!-- Sisi Konten Teks: Daftar Destinasi -->
            <div
              class="w-full md:w-1/2 pl-14 md:pl-0 pt-1"
              :class="idx % 2 === 0 ? 'md:pr-14 md:text-right text-left' : 'md:pl-14 md:text-left text-left'"
            >
              <div class="space-y-2">
                <!-- Hari & Tanggal -->
                <div
                  class="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-slate-400"
                  :class="idx % 2 === 0 ? 'md:justify-end justify-start' : 'justify-start'"
                >
                  <span class="text-amber-300 font-bold text-sm">{{ item.dayLabel }}</span>
                  <span>•</span>
                  <span>{{ item.date }}</span>
                </div>

                <!-- Daftar Nama Tempat Wisata / Destinasi -->
                <ul
                  class="space-y-1.5 pt-1"
                  :class="idx % 2 === 0 ? 'md:items-end items-start' : 'items-start'"
                >
                  <li
                    v-for="(place, pIdx) in item.places"
                    :key="pIdx"
                    class="text-sm sm:text-base font-medium text-white/95 leading-snug flex items-start gap-2 group-hover:text-amber-200 transition-colors"
                    :class="idx % 2 === 0 ? 'md:flex-row-reverse flex-row' : 'flex-row'"
                  >
                    <span class="text-amber-400 mt-1 text-xs">•</span>
                    <span>{{ place }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Sisi Tumpukan Foto (Photo Stack) Interaktif ala Referensi -->
            <div
              class="w-full md:w-1/2 pl-14 md:pl-0 mt-6 md:mt-0 flex"
              :class="idx % 2 === 0 ? 'md:pl-14 justify-start' : 'md:pr-14 md:justify-end justify-start'"
            >
              <!-- Container Photo Stack -->
              <div class="relative w-44 h-36 sm:w-52 sm:h-40 group/stack cursor-pointer">
                
                <!-- Foto Belakang (Tumpukan 1) -->
                <div
                  class="absolute top-0 rounded-2xl overflow-hidden border border-white/20 shadow-xl transition-all duration-500 ease-out transform group-hover/stack:-rotate-6 group-hover/stack:-translate-x-3 group-hover/stack:-translate-y-2 group-hover/stack:scale-105"
                  :class="[
                    idx % 2 === 0
                      ? 'left-0 rotate-[-4deg] w-32 h-28 sm:w-36 sm:h-32'
                      : 'right-2 rotate-[4deg] w-32 h-28 sm:w-36 sm:h-32'
                  ]"
                >
                  <img
                    :src="item.photos[0]"
                    :alt="item.dayLabel"
                    class="w-full h-full object-cover filter brightness-[0.8] group-hover/stack:brightness-100 transition-all duration-300"
                  />
                  <div class="absolute inset-0 bg-slate-950/20"></div>
                </div>

                <!-- Foto Depan (Tumpukan 2 - Bertumpuk tumpang tindih seperti di referensi) -->
                <div
                  class="absolute bottom-0 rounded-2xl overflow-hidden border-2 border-white/40 shadow-2xl transition-all duration-500 ease-out transform group-hover/stack:rotate-4 group-hover/stack:translate-x-3 group-hover/stack:translate-y-1 group-hover/stack:scale-110 group-hover/stack:border-amber-400 z-10"
                  :class="[
                    idx % 2 === 0
                      ? 'right-2 rotate-[3deg] w-32 h-28 sm:w-36 sm:h-32'
                      : 'left-0 rotate-[-3deg] w-32 h-28 sm:w-36 sm:h-32'
                  ]"
                >
                  <img
                    :src="item.photos[1] || item.photos[0]"
                    :alt="item.dayLabel"
                    class="w-full h-full object-cover filter brightness-[0.95] group-hover/stack:brightness-110 transition-all duration-300"
                  />
                  <!-- Glass highlight overlay -->
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  </section>
</template>

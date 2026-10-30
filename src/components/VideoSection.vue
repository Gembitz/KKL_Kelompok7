<script setup>
import { ref } from 'vue'
import { Play, Sparkles, Compass } from 'lucide-vue-next'
import { studyTourData } from '../data/studyTourData'

const profile = studyTourData.profileVideo
const isPlaying = ref(false)

const playVideo = () => {
  isPlaying.value = true
}
</script>

<template>
  <section
    id="profil"
    class="relative w-full py-24 text-slate-100 selection:bg-amber-400 selection:text-slate-950 overflow-hidden"
  >
    <!-- Background Glow Ambient -->
    <div class="absolute -top-32 left-1/3 w-[550px] h-[550px] bg-cyan-500/10 blur-[160px] rounded-full pointer-events-none -z-0"></div>
    <div class="absolute -bottom-32 right-1/4 w-[500px] h-[500px] bg-amber-500/10 blur-[160px] rounded-full pointer-events-none -z-0"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      
      <!-- Section Header persis gaya konsisten: Line — PROFIL KELOMPOK — Line -->
      <div class="reveal-fade-up flex items-center justify-center gap-4 sm:gap-8 mb-6">
        <div class="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/30"></div>
        <div class="flex items-center gap-3">
          <Compass class="w-6 h-6 text-amber-400" />
          <h2 class="text-2xl sm:text-4xl font-extrabold uppercase tracking-[0.25em] text-white/95">
            {{ profile.badge }}
          </h2>
        </div>
        <div class="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/30"></div>
      </div>

      <!-- Judul & Lead Deskripsi Ala Profil UPGRIS -->
      <div class="reveal-fade-up delay-100 text-center max-w-3xl mx-auto mb-12 space-y-3">
        <h3 class="text-xl sm:text-2xl font-bold text-white">
          {{ profile.title }} <span class="text-amber-400 italic">{{ profile.titleEm }}</span>
        </h3>
        <p class="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
          {{ profile.lead }}
        </p>
      </div>

      <!-- Frame Video Modern 16:9 Ala Profil UPGRIS Informatika -->
      <div class="reveal-zoom-in delay-200 max-w-4xl mx-auto">
        <div class="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-slate-900/80 group">
          
          <!-- State 1: Thumbnail & Play Button Overlay (Jika belum di-play) -->
          <template v-if="!isPlaying">
            <img
              :src="profile.thumbnail"
              :alt="profile.videoTitle"
              class="w-full h-full object-cover filter brightness-[0.8] group-hover:scale-105 group-hover:brightness-[0.88] transition-all duration-700 ease-out"
            />
            
            <!-- Gradient Overlay Lembut -->
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent"></div>

            <!-- Tombol Play Bulat Modern Ala Video Profil UPGRIS -->
            <button
              type="button"
              @click="playVideo"
              class="absolute inset-0 m-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/20 hover:bg-amber-400 text-white hover:text-slate-950 backdrop-blur-md border border-white/40 hover:border-amber-400 shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group/btn cursor-pointer z-10"
              aria-label="Putar Video Profil"
            >
              <Play class="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1 transition-transform group-hover/btn:translate-x-0.5" />
            </button>

            <!-- Video Info Caption di Kiri Bawah Frame -->
            <div class="absolute bottom-5 left-6 right-6 sm:bottom-6 sm:left-8 sm:right-8 flex items-center justify-between pointer-events-none z-10">
              <div class="space-y-1">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-amber-400/90 text-slate-950">
                  <Sparkles class="w-3 h-3" />
                  Official Video Profil
                </span>
                <p class="text-xs sm:text-sm font-semibold text-white drop-shadow">
                  {{ profile.videoTitle }}
                </p>
              </div>
            </div>
          </template>

          <!-- State 2: Iframe Video Embed Responsif (Aktif saat klik play) -->
          <template v-else>
            <iframe
              :src="profile.videoUrl + '&autoplay=1'"
              :title="profile.videoTitle"
              class="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </template>

        </div>
      </div>

    </div>
  </section>
</template>


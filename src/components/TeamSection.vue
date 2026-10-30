<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Users, User, Quote, ChevronLeft, ChevronRight, Star } from 'lucide-vue-next'
import { studyTourData } from '../data/studyTourData'

const team = studyTourData.teamMembers
const reflections = studyTourData.studentReflections

// Slider Carousel State
const currentIndex = ref(0)
let autoplayTimer = null

const nextSlide = () => {
  if (currentIndex.value < reflections.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = reflections.length - 1
  }
}

const goToSlide = (idx) => {
  currentIndex.value = idx
}

// Autoplay
const startAutoplay = () => {
  stopAutoplay()
  autoplayTimer = setInterval(() => {
    nextSlide()
  }, 5000)
}

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<template>
  <section
    id="tim"
    class="relative w-full py-24 text-slate-100 selection:bg-amber-400 selection:text-slate-950 overflow-hidden"
  >
    <!-- Background Ambient Glow Lembut & Terang -->
    <div class="absolute -top-40 right-1/4 w-[500px] h-[500px] bg-cyan-500/15 blur-[150px] rounded-full pointer-events-none -z-0"></div>
    <div class="absolute -bottom-40 left-1/4 w-[500px] h-[500px] bg-amber-500/15 blur-[150px] rounded-full pointer-events-none -z-0"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      
      <!-- Section Header persis gaya konsisten: Line — ANGGOTA TIM — Line -->
      <div class="reveal-fade-up flex items-center justify-center gap-4 sm:gap-8 mb-16">
        <div class="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/30"></div>
        <div class="flex items-center gap-3">
          <Users class="w-6 h-6 text-amber-400" />
          <h2 class="text-2xl sm:text-4xl font-extrabold uppercase tracking-[0.25em] text-white/95">
            ANGGOTA TIM
          </h2>
        </div>
        <div class="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/30"></div>
      </div>

      <!-- Grid 10 Anggota Tim: Simple Avatar Bulat + Nama + NPM -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 mb-24">
        <div
          v-for="(member, mIdx) in team"
          :key="member.id"
          class="reveal-fade-up group flex flex-col items-center text-center p-3 rounded-2xl transition-all duration-300 hover:bg-white/[0.03]"
          :class="`delay-${Math.min((mIdx % 5 + 1) * 100, 500)}`"
        >
          <!-- Avatar Bulat Ikon Profil Kosong -->
          <div class="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-white/20 bg-slate-800/80 group-hover:bg-slate-800 group-hover:border-amber-400 group-hover:scale-105 transition-all duration-500 shadow-lg flex items-center justify-center">
            <User class="w-10 h-10 sm:w-12 sm:h-12 text-slate-400 group-hover:text-amber-300 transition-colors" />
          </div>

          <!-- Nama & NPM di Bawah Avatar -->
          <div class="mt-3 space-y-0.5">
            <h3 class="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
              {{ member.name }}
            </h3>
            <span class="text-[11px] font-mono text-slate-400 block tracking-wider">
              {{ member.npm }}
            </span>
          </div>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- BAGIAN KOMENTAR / TESTIMONI ALA UPGRIS INFORMATIKA      -->
      <!-- ======================================================== -->
      <div class="reveal-fade-up pt-16 border-t border-white/10 max-w-4xl mx-auto" @mouseenter="stopAutoplay" @mouseleave="startAutoplay">
        
        <!-- Header Sub-Section Komentar ala UPGRIS "Apa Kata Mereka?" -->
        <div class="text-center mb-10 space-y-2">
          <span class="inline-block text-[11px] font-bold tracking-[0.2em] text-amber-400 uppercase">
            REFLEKSI & KOMENTAR
          </span>
          <h3 class="text-xl sm:text-3xl font-extrabold text-white">
            Apa Kata <span class="text-amber-400 italic">Mereka?</span>
          </h3>
          <p class="text-xs sm:text-sm text-slate-300 font-light">
            Kesan, wawasan ilmiah, dan pengalaman langsung mahasiswa selama kegiatan KKL Bali 2026.
          </p>
        </div>

        <!-- Carousel Container Berbingkai Elegan Ala Card UPGRIS -->
        <div class="relative bg-white/[0.03] backdrop-blur-md border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden min-h-[220px] flex flex-col justify-between">
          
          <!-- Ornamen Kutip Transparan di Background -->
          <Quote class="absolute -right-4 -bottom-6 w-32 h-32 text-white/[0.03] pointer-events-none select-none rotate-12" />

          <!-- Isi Kartu Testimoni Aktif -->
          <transition mode="out-in" name="fade-slide">
            <div :key="currentIndex" class="space-y-6">
              
              <!-- Bagian Atas: Avatar Bulat Inisial/Foto + Nama + Role/NPM + Star Rating -->
              <div class="flex items-center justify-between gap-4">
                <div class="flex items-center gap-3.5">
                  <!-- Avatar Ikon Profil Kosong yang Selaras dengan Anggota Tim -->
                  <div
                    class="w-12 h-12 rounded-full overflow-hidden border border-white/20 bg-slate-800/80 flex items-center justify-center shrink-0 shadow-md"
                  >
                    <User class="w-6 h-6 text-slate-300" />
                  </div>

                  <div>
                    <h4 class="text-sm sm:text-base font-bold text-white tracking-wide">
                      {{ reflections[currentIndex].name }}
                    </h4>
                    <p class="text-xs text-slate-400 font-mono">
                      {{ reflections[currentIndex].role }}
                    </p>
                  </div>
                </div>

                <!-- Bintang Rating -->
                <div class="flex items-center gap-1 text-amber-400">
                  <Star
                    v-for="star in 5"
                    :key="star"
                    class="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                </div>
              </div>

              <!-- Kutipan Komentar Mahasiswa -->
              <p class="text-sm sm:text-base text-slate-200 font-light leading-relaxed italic border-l-2 border-amber-400/80 pl-4 py-1">
                "{{ reflections[currentIndex].quote }}"
              </p>

            </div>
          </transition>

          <!-- Navigasi Slider: Panah Kiri, Pagination Dots, Panah Kanan -->
          <div class="flex items-center justify-between pt-6 mt-6 border-t border-white/10">
            <!-- Dots Indikator -->
            <div class="flex items-center gap-2">
              <button
                v-for="(_, idx) in reflections"
                :key="idx"
                @click="goToSlide(idx)"
                class="transition-all duration-300 rounded-full h-2 cursor-pointer"
                :class="currentIndex === idx ? 'w-7 bg-amber-400' : 'w-2 bg-white/30 hover:bg-white/60'"
                :aria-label="`Pergi ke komentar ke-${idx + 1}`"
              ></button>
            </div>

            <!-- Tombol Prev & Next Carousel Ala UPGRIS -->
            <div class="flex items-center gap-2">
              <button
                type="button"
                @click="prevSlide"
                class="w-9 h-9 rounded-full bg-white/10 hover:bg-amber-400 text-white hover:text-slate-950 border border-white/15 flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
                aria-label="Komentar Sebelumnya"
              >
                <ChevronLeft class="w-5 h-5" />
              </button>
              <button
                type="button"
                @click="nextSlide"
                class="w-9 h-9 rounded-full bg-white/10 hover:bg-amber-400 text-white hover:text-slate-950 border border-white/15 flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
                aria-label="Komentar Berikutnya"
              >
                <ChevronRight class="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  </section>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.35s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(16px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-16px);
}
</style>

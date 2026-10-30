<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { studyTourData } from '../data/studyTourData'

const mapContainer = ref(null)
const mapSectionRef = ref(null)
const isPlaying = ref(false)
const currentStep = ref(0)
const reachedDestinations = ref([])

let map = null
let carMarker = null
let pathPolyline = null
let traveledPolyline = null
let animInterval = null
let observer = null
const markersMap = new Map()

// Kumpulan titik waypoint rute dari Semarang ke Bali
const routePoints = [
  studyTourData.mapRoute.startPoint.coords,
  ...studyTourData.mapRoute.destinations.map(d => d.coords)
]

// Interpolasi koordinat untuk pergerakan mobil yang halus
const generateSmoothTrack = (points, subdivisions = 20) => {
  const smooth = []
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i]
    const p2 = points[i + 1]
    for (let step = 0; step < subdivisions; step++) {
      const t = step / subdivisions
      smooth.push([
        p1[0] + (p2[0] - p1[0]) * t,
        p1[1] + (p2[1] - p1[1]) * t,
        i // index segmen destinasi
      ])
    }
  }
  smooth.push([...points[points.length - 1], points.length - 2])
  return smooth
}

const smoothTrack = generateSmoothTrack(routePoints, 20)

// Custom Icon HTML untuk Mobil Bus KKL
const createCarIcon = () => {
  return L.divIcon({
    className: 'custom-car-marker',
    html: `
      <div class="relative flex items-center justify-center w-11 h-11">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60"></span>
        <div class="relative w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center shadow-2xl border-2 border-white transform transition-transform">
          <svg class="w-5 h-5 fill-slate-950" viewBox="0 0 24 24">
            <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
          </svg>
        </div>
      </div>
    `,
    iconSize: [44, 44],
    iconAnchor: [22, 22]
  })
}

// Marker Destinasi Mini Popup Foto
const createDestMarkerIcon = (dest, isReached) => {
  if (dest.isWaypoint) {
    return L.divIcon({
      className: 'custom-waypoint',
      html: `<div class="w-2.5 h-2.5 rounded-full bg-white/40 border border-white"></div>`,
      iconSize: [10, 10],
      iconAnchor: [5, 5]
    })
  }

  return L.divIcon({
    className: 'custom-dest-marker',
    html: `
      <div class="relative group/pin cursor-pointer flex flex-col items-center">
        <!-- Foto Destinasi Kecil (Muncul saat mobil mencapai lokasi atau di-hover) -->
        <div class="transition-all duration-500 ease-out transform ${
          isReached ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-2 pointer-events-none'
        } mb-1.5">
          <div class="w-16 h-16 rounded-xl overflow-hidden border-2 border-amber-400 shadow-2xl bg-slate-900 relative">
            <img src="${dest.image}" alt="${dest.name}" class="w-full h-full object-cover filter brightness-[0.95]" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
            <span class="absolute bottom-0.5 inset-x-0 text-[8px] font-bold text-amber-300 text-center uppercase tracking-tighter truncate px-1">
              ${dest.day}
            </span>
          </div>
        </div>

        <!-- Titik Pin Marker di Peta -->
        <div class="flex items-center justify-center w-6 h-6 rounded-full ${
          isReached ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/30' : 'bg-slate-800 text-white border border-white/40'
        } shadow-lg transition-all">
          <div class="w-2 h-2 rounded-full ${isReached ? 'bg-slate-950' : 'bg-amber-400'}"></div>
        </div>
      </div>
    `,
    iconSize: [64, 90],
    iconAnchor: [32, 80]
  })
}

const initMap = () => {
  if (!mapContainer.value) return

  // Inisialisasi Peta Leaflet berpusat di antara Jawa Timur & Bali
  map = L.map(mapContainer.value, {
    center: [-7.8, 113.2],
    zoom: 7,
    minZoom: 6,
    maxZoom: 14,
    scrollWheelZoom: false
  })

  // Light Theme Tile Layer dari ArcGIS World Street Map (100% bebas API Key, jernih, dan terang)
  const tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'

  L.tileLayer(tileUrl, {
    attribution: '&copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom',
    maxZoom: 17
  }).addTo(map)

  setTimeout(() => {
    if (map) {
      map.invalidateSize()
    }
  }, 200)

  // Gambar Garis Rencana Rute Penuh (abu-abu gelap presisi agar jelas di peta terang)
  pathPolyline = L.polyline(routePoints, {
    color: 'rgba(30, 41, 59, 0.55)',
    weight: 3.5,
    dashArray: '6, 8',
    smoothFactor: 1
  }).addTo(map)

  // Garis rute berwarna oranye keemasan menyala (Amber 600) untuk jejak yang sudah dilalui bus di peta terang
  traveledPolyline = L.polyline([], {
    color: '#d97706',
    weight: 5,
    opacity: 0.95
  }).addTo(map)

  // Tambahkan Marker Semarang (Titik Awal)
  const startIcon = L.divIcon({
    className: 'custom-start-marker',
    html: `
      <div class="relative flex flex-col items-center">
        <span class="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-400 text-slate-950 shadow-md uppercase tracking-wider mb-1 whitespace-nowrap">
          Semarang (Start)
        </span>
        <div class="w-4 h-4 rounded-full bg-amber-400 border-2 border-white shadow-lg"></div>
      </div>
    `,
    iconSize: [100, 30],
    iconAnchor: [50, 26]
  })
  L.marker(studyTourData.mapRoute.startPoint.coords, { icon: startIcon }).addTo(map)

  // Tambahkan Marker Destinasi
  studyTourData.mapRoute.destinations.forEach((dest) => {
    const isReached = reachedDestinations.value.includes(dest.id)
    const marker = L.marker(dest.coords, {
      icon: createDestMarkerIcon(dest, isReached)
    }).addTo(map)

    markersMap.set(dest.id, marker)
  })

  // Tambahkan Marker Mobil Bus KKL di Titik Awal
  carMarker = L.marker(smoothTrack[0], {
    icon: createCarIcon(),
    zIndexOffset: 1000
  }).addTo(map)
}

// Otomatis Bekerja / Bergerak Saat Pengguna di Menu Peta
const startAnimation = () => {
  if (isPlaying.value) return

  if (currentStep.value >= smoothTrack.length - 1) {
    resetAnimation()
  }
  isPlaying.value = true

  animInterval = setInterval(() => {
    if (currentStep.value < smoothTrack.length - 1) {
      currentStep.value++
      const currentCoord = smoothTrack[currentStep.value]

      // Perbarui posisi mobil
      if (carMarker) {
        carMarker.setLatLng([currentCoord[0], currentCoord[1]])
      }

      // Perbarui jejak garis yang ditempuh
      if (traveledPolyline) {
        const traveledPoints = smoothTrack.slice(0, currentStep.value + 1).map(p => [p[0], p[1]])
        traveledPolyline.setLatLngs(traveledPoints)
      }

      // Cek apakah mobil telah mencapai salah satu destinasi
      const currentSegmentIndex = currentCoord[2]
      const targetDest = studyTourData.mapRoute.destinations[currentSegmentIndex]

      if (targetDest && !targetDest.isWaypoint && !reachedDestinations.value.includes(targetDest.id)) {
        reachedDestinations.value.push(targetDest.id)

        // Perbarui icon marker agar menampilkan gambar destinasi kecil di peta
        const marker = markersMap.get(targetDest.id)
        if (marker) {
          marker.setIcon(createDestMarkerIcon(targetDest, true))
        }
      }

      // Smooth panning kamera mengikuti mobil secara berkala
      if (currentStep.value % 15 === 0 && map) {
        map.panTo([currentCoord[0], currentCoord[1]], { animate: true, duration: 0.3 })
      }
    } else {
      // Saat sampai akhir rute di Bali, jeda sejenak lalu ulang otomatis dari awal
      pauseAnimation()
      setTimeout(() => {
        resetAnimation()
        startAnimation()
      }, 3000)
    }
  }, 65) // Kecepatan pergerakan mobil yang pas dan dinamis
}

const pauseAnimation = () => {
  isPlaying.value = false
  if (animInterval) {
    clearInterval(animInterval)
    animInterval = null
  }
}

const resetAnimation = () => {
  pauseAnimation()
  currentStep.value = 0
  reachedDestinations.value = []

  if (carMarker && smoothTrack.length > 0) {
    carMarker.setLatLng(smoothTrack[0])
  }
  if (traveledPolyline) {
    traveledPolyline.setLatLngs([])
  }

  studyTourData.mapRoute.destinations.forEach((dest) => {
    const marker = markersMap.get(dest.id)
    if (marker) {
      marker.setIcon(createDestMarkerIcon(dest, false))
    }
  })

  if (map) {
    map.flyTo([-7.8, 113.2], 7, { duration: 1 })
  }
}

onMounted(() => {
  initMap()

  // IntersectionObserver: Otomatis jalankan animasi rute saat pengguna berada/menggulir ke menu Peta
  if (mapSectionRef.value) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Ketika peta terlihat di viewport pengguna, pastikan ukuran pas dan mulai jalan otomatis
            if (map) map.invalidateSize()
            startAnimation()
          } else {
            // Jeda sejenak jika pengguna berpindah ke menu lain agar hemat resource
            pauseAnimation()
          }
        })
      },
      { threshold: 0.25 }
    )
    observer.observe(mapSectionRef.value)
  }

  window.addEventListener('resize', () => {
    if (map) map.invalidateSize()
  })
})

onUnmounted(() => {
  pauseAnimation()
  if (observer && mapSectionRef.value) {
    observer.unobserve(mapSectionRef.value)
  }
  if (map) {
    map.remove()
  }
})
</script>

<template>
  <section
    id="peta"
    ref="mapSectionRef"
    class="relative w-full py-20 text-slate-100 selection:bg-amber-400 selection:text-slate-950 overflow-hidden"
  >
    <!-- Background Ambient Glow Lembut -->
    <div class="absolute -top-32 left-1/3 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none -z-0"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header yang Dikembalikan Sesuai Request -->
      <div class="reveal-fade-up flex items-center justify-center gap-4 sm:gap-8 mb-12">
        <div class="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/30"></div>
        <div class="flex items-center gap-3">
          <svg class="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
          </svg>
          <h2 class="text-2xl sm:text-4xl font-extrabold uppercase tracking-[0.25em] text-white/95">
            Rute & Peta Interaktif
          </h2>
        </div>
        <div class="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/30"></div>
      </div>

      <!-- Wadah Peta Utuh & Bersih Tanpa Tombol Kontrol (Otomatis Bergerak Saat di Menu Peta) -->
      <div class="reveal-zoom-in relative w-full h-[520px] sm:h-[620px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
        <!-- Container Peta Leaflet.js -->
        <div ref="mapContainer" class="w-full h-full z-10"></div>
      </div>

    </div>
  </section>
</template>

<style>
/* Style penting untuk Leaflet map container (Light Theme) */
.leaflet-container {
  width: 100% !important;
  height: 100% !important;
  min-height: 500px !important;
  background-color: #e5e9f0 !important;
  font-family: inherit;
  z-index: 10;
}
.leaflet-tile-pane {
  filter: contrast(1.02) saturate(1.05);
}
.leaflet-bar a {
  background-color: #ffffff !important;
  color: #1e293b !important;
  border-color: rgba(0, 0, 0, 0.15) !important;
}
.leaflet-bar a:hover {
  background-color: #f1f5f9 !important;
  color: #d97706 !important;
}
</style>

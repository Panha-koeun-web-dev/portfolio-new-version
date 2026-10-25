<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { navItems, profile } from "../data/portfolio";
import ThemeToggle from "./ThemeToggle.vue";
import { useVideoAudio } from "../composables/useVideoAudio";

const { isMuted, toggleSound } = useVideoAudio();

const isMenuOpen = ref(false);
const isScrolled = ref(false);

const closeMenu = () => {
  isMenuOpen.value = false;
};

const updateScrollState = () => {
  isScrolled.value = window.scrollY > 40;
};

const handleResize = () => {
  if (window.innerWidth >= 1024) {
    isMenuOpen.value = false;
  }
};

onMounted(() => {
  updateScrollState();
  window.addEventListener("scroll", updateScrollState, { passive: true });
  window.addEventListener("resize", handleResize, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateScrollState);
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <nav
    id="navbar"
    class="fixed w-full top-0 left-0 z-50 glass-nav transition-all duration-300"
    :class="{ 'navbar-scrolled py-3 shadow-lg': isScrolled, 'py-3.5 md:py-4': !isScrolled }"
  >
    <div class="container mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between">
        <!-- Brand Logo -->
        <a
          href="#home"
          class="text-xl sm:text-2xl font-bold gradient-text tracking-tighter"
          @click="closeMenu"
        >
          {{ profile.brand }}
        </a>

        <!-- Desktop Navigation Links (strictly hidden on mobile, visible on desktop via CSS) -->
        <div class="navbar-links">
          <a
            v-for="item in navItems"
            :key="item.href"
            :href="item.href"
            class="nav-link text-sm uppercase tracking-widest font-medium"
          >
            {{ item.label }}
          </a>
        </div>

        <!-- Controls Toolbar -->
        <div class="flex items-center gap-3">
          <!-- Video Sound Toggle Button -->
          <button
            type="button"
            class="sound-toggle"
            :class="{ 'sound-active': !isMuted }"
            :title="isMuted ? 'Unmute video audio' : 'Mute video audio'"
            aria-label="Toggle video audio"
            @click="toggleSound"
          >
            <i :class="isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up'"></i>
          </button>

          <ThemeToggle />

          <!-- Mobile / Tablet Hamburger Toggle Button -->
          <button
            class="hamburger-btn focus:outline-none"
            style="color: var(--text-main);"
            type="button"
            aria-label="Toggle navigation"
            :aria-expanded="isMenuOpen"
            @click="isMenuOpen = !isMenuOpen"
          >
            <i class="fas text-xl" :class="isMenuOpen ? 'fa-times' : 'fa-bars'"></i>
          </button>
        </div>
      </div>

      <!-- Mobile & Tablet Dropdown Menu -->
      <div
        v-show="isMenuOpen"
        id="mobile-menu"
        class="mobile-nav-menu"
      >
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          class="mobile-nav-link"
          @click="closeMenu"
        >
          {{ item.label }}
        </a>
      </div>
    </div>
  </nav>
</template>

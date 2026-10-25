<script setup>
import { projects } from "../data/portfolio";
</script>

<template>
  <section id="projects" class="py-16 md:py-24 relative">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="text-center mb-12 md:mb-16" data-aos="fade-up">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Featured <span class="gradient-text">Projects</span></h2>
        <p class="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">A selection of my recent work</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <article
          v-for="(project, index) in projects"
          :key="project.title"
          class="glass rounded-2xl overflow-hidden card-hover group flex flex-col"
          data-aos="fade-up"
          :data-aos-delay="(index + 1) * 100"
        >
          <div class="relative h-48 sm:h-52 overflow-hidden">
            <div
              v-if="project.link && project.link !== '#'"
              class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10"
            >
              <a
                :href="project.link"
                target="_blank"
                rel="noopener noreferrer"
                class="px-6 py-2 bg-indigo-600 text-white rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg"
              >
                View Project
              </a>
            </div>
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div class="p-5 sm:p-6 flex-1 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-lg sm:text-xl font-bold" style="color: var(--text-main);">{{ project.title }}</h3>
                <a
                  v-if="project.link && project.link !== '#'"
                  :href="project.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-indigo-400 hover:text-indigo-300 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors p-1"
                  aria-label="View project link"
                >
                  <span>Live</span>
                  <i class="fas fa-external-link-alt text-[10px]"></i>
                </a>
              </div>
              <p class="text-gray-400 text-xs sm:text-sm mb-4 leading-relaxed">{{ project.description }}</p>
            </div>
            <div class="flex flex-wrap gap-2 text-xs">
              <span
                v-for="tag in project.tags"
                :key="`${project.title}-${tag}`"
                class="px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

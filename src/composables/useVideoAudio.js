import { ref } from "vue";

const isMuted = ref(true);

export function useVideoAudio() {
  const toggleSound = () => {
    const video = document.querySelector("#home video");
    if (video) {
      video.muted = !video.muted;
      isMuted.value = video.muted;
    } else {
      isMuted.value = !isMuted.value;
    }
  };

  return {
    isMuted,
    toggleSound,
  };
}


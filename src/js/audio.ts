export const audio = (): void => {
  const audio = document.getElementById("audio") as HTMLMediaElement | null;
  const playPauseBtn = document.getElementById(
    "playPause",
  ) as HTMLElement | null;
  const seekBar = document.getElementById("seekBar") as HTMLInputElement | null;
  const replayBtn = document.getElementById("replay") as HTMLElement | null;
  let animationFrame: number | undefined;
  updateDurationDisplay();

  function updateSeekBar(): void {
    if (!audio || !seekBar) return;

    const value = (100 / audio.duration) * audio.currentTime;
    seekBar.value = value.toString();

    // Calculate the percentage of the audio that has played
    const playedPercentage = (audio.currentTime / audio.duration) * 100;

    // Update the seek bar's background to show the progress
    seekBar.style.background = `linear-gradient(to right, #034EA4 ${playedPercentage}%, #E0F0FF ${playedPercentage}%)`;

    if (!audio.paused) {
      animationFrame = requestAnimationFrame(updateSeekBar);
    }
    updateDurationDisplay();
  }

  audio?.addEventListener("ended", function () {
    if (!playPauseBtn || !replayBtn) return;
    playPauseBtn.style.display = "none"; // Hide the play/pause button
    replayBtn.style.display = "inline"; // Show the replay button
  });

  // Show replay button when audio ends
  audio?.addEventListener("ended", function () {
    if (!playPauseBtn || !replayBtn) return;
    playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>'; // Update playPause button text if needed
    replayBtn.style.display = ""; // Show replay button
  });

  replayBtn?.addEventListener("click", function () {
    if (!audio) return;
    audio.currentTime = 0; // Reset audio to the beginning
    audio.play(); // Start playing the audio again
    if (!replayBtn || !playPauseBtn) return;
    replayBtn.style.display = "none"; // Hide the replay button
    playPauseBtn.style.display = "inline"; // Show the play/pause button
    playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>'; // Set button text to "Pause"
    requestAnimationFrame(updateSeekBar); // Start updating the seek bar again
  });

  seekBar?.addEventListener("input", function () {
    if (!audio || !seekBar) return;
    const time = (audio.duration / 100) * parseFloat(seekBar.value);
    audio.currentTime = time;
  });

  playPauseBtn?.addEventListener("click", function () {
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      if (!playPauseBtn) return;
      playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      requestAnimationFrame(updateSeekBar);
    } else {
      audio.pause();
      if (!playPauseBtn) return;
      playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      if (animationFrame !== undefined) cancelAnimationFrame(animationFrame);
    }
    updateDurationDisplay();
  });

  if (replayBtn) {
    replayBtn.style.display = "none";
    updateDurationDisplay();
  }
  // Replace 'timeupdate' with 'requestAnimationFrame' for smoother updates
  audio?.addEventListener("play", function () {
    requestAnimationFrame(updateSeekBar);
  });

  audio?.addEventListener("pause", function () {
    if (animationFrame !== undefined) cancelAnimationFrame(animationFrame);
  });

  function formatTime(timeInSeconds: number): string {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  function updateDurationDisplay(): void {
    if (!audio) return;
    const durationDisplay = document.querySelector(
      ".duration",
    ) as HTMLElement | null;
    if (durationDisplay) {
      const currentTimeFormatted = formatTime(audio.currentTime);
      const durationFormatted = isNaN(audio.duration)
        ? "0:00"
        : formatTime(audio.duration);
      durationDisplay.textContent = `${currentTimeFormatted}/${durationFormatted}`;
    }
  }
};

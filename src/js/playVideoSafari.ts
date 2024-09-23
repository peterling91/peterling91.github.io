/* Issue List - Issue 2
   Added "isAutoPlay" - fixed video in modal plays automatically */
const playVideo = () => {
  const videos = document.querySelectorAll("video");

  videos.forEach((video) => {
    const isAutoPlay = video.getAttribute("autoplay");
    const isPlaying =
      video.currentTime > 0 &&
      !video.paused &&
      !video.ended &&
      video.readyState > 2;

    if (!isPlaying && isAutoPlay) video.play();
  });
};

export const playVideoSafari = () => {
  window.addEventListener("click", playVideo);
  window.addEventListener("touchstart", playVideo);
};

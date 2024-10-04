export const lazyloadVideo = () => {
  const lazyVideos = [].slice.call(document.querySelectorAll(".lazyvideo"));

  if ("IntersectionObserver" in window) {
    const lazyVideoObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((video) => {
        if (video.isIntersecting) {
          if (
            typeof video.target.tagName === "string" &&
            video.target.tagName === "VIDEO"
          ) {
            const videoTarget = video.target as HTMLVideoElement;

            for (let source in videoTarget.children) {
              const videoSource = videoTarget.children[
                source
              ] as HTMLSourceElement;

              if (
                typeof videoSource.tagName === "string" &&
                videoSource.tagName === "SOURCE" &&
                videoSource.dataset["src"]
              ) {
                videoSource.src = videoSource.dataset["src"];
              }
            }

            videoTarget.load();
            videoTarget.classList.remove("lazy");
            lazyVideoObserver.unobserve(videoTarget);
          }
        }
      });
    });

    lazyVideos.forEach((lazyVideo) => {
      lazyVideoObserver.observe(lazyVideo);
    });
  }
};

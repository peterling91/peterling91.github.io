export const youtubeEmbed = (body) => {
  const youtubeEmbeds = document.querySelectorAll(".youtube-embed");

  if (youtubeEmbeds.length === 0) return;

  // This code loads the IFrame Player API code asynchronously.
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  body.append(tag);

  window.onYouTubeIframeAPIReady = () => {
    youtubeEmbeds.forEach((youtubeEmbed) => {
      let player;
      let playerId = youtubeEmbed.getAttribute("id");

      if (playerId) {
        // This function creates an <iframe> (and YouTube player)
        // after the API code downloads.
        player = new YT.Player(playerId, {
          height: "605",
          width: "1076",
          videoId: youtubeEmbed.getAttribute("data-video-id"),
          playerVars: {
            playsinline: 1,
          },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          },
        });

        // The API will call this function when the video player is ready.
        function onPlayerReady(event) {
          event.target.stopVideo();
        }

        // The API calls this function when the player's state changes.
        // The function indicates that when playing a video (state=1),
        // the player should play for six seconds and then stop.
        let done = false;
        function onPlayerStateChange(event) {
          if (event.data == YT.PlayerState.PLAYING && !done) {
            // setTimeout(stopVideo, 6000);
            done = true;
          }
        }

        // Stop video when dialog is closed
        let dialogCloseButton = document.querySelector(
          `#${youtubeEmbed.getAttribute(
            "data-dialog-id",
          )} .dialog-close-button`,
        );

        if (dialogCloseButton) {
          dialogCloseButton.addEventListener("click", function () {
            player.stopVideo();
          });
        }

        // Plays video automatically when dialog is opened
        let dialogShowButtonsList = youtubeEmbed
          .getAttribute("data-dialog-show-buttons")
          .split(",");

        dialogShowButtonsList.forEach((dialogShowButtonName) => {
          let dialogShowButton = document.querySelector(
            `#${dialogShowButtonName}`,
          );

          dialogShowButton.addEventListener("click", function () {
            player.playVideo();
          });
        });
      }
    });
  };
};

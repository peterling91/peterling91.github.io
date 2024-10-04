window.addEventListener("load", () => {
  const clickMeButton = document.querySelector(".click-me");
  const closeButton = document.querySelector(".close-confetti-overlay");
  const wiper = document.querySelector(".wiper");
  const audio = new Audio("../dist/confetti/Hand_slide_in.mp3");
  const audio2 = new Audio("../dist/confetti/Sticker_stamp.mp3");
  const stamperContainer = document.querySelector(".stamper-container");
  const stamperMarksContainer = document.querySelector(
    ".stamper-marks-container",
  );

  if (
    !clickMeButton ||
    !closeButton ||
    !wiper ||
    !stamperContainer ||
    !stamperMarksContainer
  )
    return;

  let isProcessingClick = false;
  let isMarkActive = true;

  // Calculate page height
  let pageHeight;

  const getPageHeight = () => {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight,
    );
  };

  const applyPageHeight = () => {
    pageHeight = getPageHeight();
    // Apply the page height to .stamper-marks-container and .confetti-overlay
    stamperMarksContainer.style.height = `${pageHeight}px`;
    stamperContainer.style.height = `${pageHeight}px`;
  };

  applyPageHeight();
  window.addEventListener("resize", applyPageHeight);

  function addEventListeners() {
    document.removeEventListener("click", handleStampClick); // Remove previous event listener if any
    document.removeEventListener("click", handleMarkClick); // Remove previous event listener if any

    document.addEventListener("click", handleStampClick); // Add event listener for subsequent clicks
    document.addEventListener("click", handleMarkClick); // Add event listener for subsequent clicks
  }

  let canPlayAudio = false; // Flag to control audio playback

  let canPlayAudio2 = false; // Flag to control audio playback

  if (clickMeButton) {
    clickMeButton.addEventListener("click", function () {
      // Click me button fade out
      clickMeButton.style.opacity = "0";

      setTimeout(() => {
        clickMeButton.style.display = "none";
      }, 600);

      closeButton.style.display = "flex";
      closeButton.classList.add("animate-sliding-up");
      stamperContainer.style.display = "block";
      stamperMarksContainer.style.display = "block";
      stamperMarksContainer.innerHTML = "";
      isMarkActive = true;
      addEventListeners(); // Call this function to add your event listeners

      canPlayAudio = true; // Allow audio to play
      if (canPlayAudio) {
        audio.currentTime = 0;
        audio.volume = 0.5; // Sets the volume to 50%

        audio.play().catch((e) => console.error("Error playing audio:", e));
      }

      setTimeout(() => {
        canPlayAudio2 = true; // Allow audio to play
        if (canPlayAudio2) {
          audio2.currentTime = 0;
          audio2.volume = 0.5; // Sets the volume to 50%

          audio2
            .play()

            .catch((e) => console.error("Error playing audio:", e));
        }
      }, 1200);
    });
  }

  closeButton.addEventListener(
    "click",
    function () {
      // Sliding down animation of close button
      closeButton.classList.add("animate-sliding-down");

      setTimeout(() => {
        closeButton.classList.remove("animate-sliding-down");
      }, 1200);

      stamperContainer.style.display = "none";
      wiper.style.display = "block";
      isMarkActive = false;
      // stamperMarksContainer.addEventListener("animationstart", function () {
      //   console.log("Animation started");
      // });

      // Listen for the animation end
      // stamperMarksContainer.addEventListener("animationend", function () {
      //   console.log("Animation ended");
      // });

      setTimeout(function () {
        closeButton.style.display = "none";

        // Click me button fade in
        clickMeButton.style.display = "block";
        clickMeButton.style.opacity = "0";

        setTimeout(() => {
          clickMeButton.style.opacity = "1";
        }, 1);

        addEventListeners(); // Call this function to add your event listeners
      }, 1200);

      setTimeout(function () {
        wiper.style.display = "none";
        stamperMarksContainer.style.display = "none";
        stamperMarksContainer.innerHTML = "";
      }, 1200);

      canPlayAudio = false; // Prevent audio from playing
      audio.pause();
      audio.currentTime = 0;
      audio.volume = 0.5; // Sets the volume to 50%

      canPlayAudio2 = false; // Prevent audio from playing
      audio2.pause();
      audio2.currentTime = 0;
    },
    true,
  );

  function fadeOutStampsSequentially() {
    const stamps = [].slice.call(
      document.querySelectorAll(".stamper-marks-container .image-stamps"),
    );

    // Sort stamps by their 'top' property, parsed as integers for accurate comparison
    stamps.sort(
      (a, b) => parseInt(a.style.top, 10) - parseInt(b.style.top, 10),
    );

    // Sequentially add fade-out class with increasing delay
    let stampsInView = 0;

    stamps.forEach((stamp) => {
      const stampTop = stamp.getBoundingClientRect().top;

      if (stampTop >= -stamp.offsetHeight && stampTop <= window.innerHeight) {
        stampsInView += 1;

        setTimeout(() => {
          // Ensure the fade-out effect is visible
          stamp.style.opacity = "0";
        }, stampsInView * 100); // Adjust delay to control the speed of sequential disappearance
      } else {
        stamp.style.opacity = "0";
      }

      setTimeout(() => {
        stamp.remove();
      }, 1200);
    });
  }

  // Attach this function to the closeButton click event
  closeButton.addEventListener("click", fadeOutStampsSequentially);

  function playAudioIfAllowed() {
    if (canPlayAudio) {
      audio.currentTime = 0;
      audio.volume = 0.5; // Sets the volume to 50%

      audio.play().catch((e) => console.error("Error playing audio:", e));
    }
  }

  function playAudioIfAllowed2() {
    if (canPlayAudio2) {
      audio2.currentTime = 0;
      audio2.play().catch((e) => console.error("Error playing audio:", e));
    }
  }

  let centerOfBrowserX, centerOfBrowserY;
  let directions = ["Top", "Bottom", "Left", "Right"];

  function calculateCenterX() {
    centerOfBrowserX = window.innerWidth / 2;
  }

  function calculateCenterY() {
    centerOfBrowserY = window.innerHeight / 2;
  }

  calculateCenterX();
  calculateCenterY();
  window.onresize = calculateCenterX;
  window.onresize = calculateCenterY;

  function handleStampClick(event) {
    if (event.target === closeButton) {
      // console.log("Click on close button - ignoring for stamp.");
      return;
    }

    const clickPositionX = event.clientX;
    const clickPositionY = event.clientY;

    // Determine which side of the center the click occurred and update directions
    if (clickPositionX < centerOfBrowserX) {
      directions = directions.filter((direction) => direction !== "Right");
    } else {
      directions = directions.filter((direction) => direction !== "Left");
    }

    if (clickPositionY < centerOfBrowserY) {
      directions = directions.filter((direction) => direction !== "Bottom");
    } else {
      directions = directions.filter((direction) => direction !== "Top");
    }
    const ogDirections = [...directions];

    if (window.innerWidth < 768) {
      directions = directions.filter((direction) => direction !== "Right");
      directions = directions.filter((direction) => direction !== "Left");
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) {
        directions = directions.filter((direction) => direction !== "Right");
        directions = directions.filter((direction) => direction !== "Left");
      } else {
        directions = [...ogDirections];
      }
    });

    const shadowImages = {
      Top: "shadow-top.png",
      Bottom: "shadow-bottom.png",
      Left: "shadow-left.png",
      Right: "shadow-right.png",
    };

    const armImagesTop = [
      "arm-top-1v2.png",
      "arm-top-2v2.png",
      "arm-top-3v2.png",
      "arm-top-4v2.png",
      "arm-top-5v2.png",
    ];

    const armImagesBottom = [
      "arm-bottom-1v2.png",
      "arm-bottom-2v2.png",
      "arm-bottom-3v2.png",
      "arm-bottom-4v2.png",
      "arm-bottom-5v2.png",
    ];

    const armImagesLeft = [
      "arm-left-1v2.png",
      "arm-left-2v2.png",
      "arm-left-3v2.png",
      "arm-left-4v2.png",
      "arm-left-5v2.png",
    ];

    const armImagesRight = [
      "arm-right-1v2.png",
      "arm-right-2v2.png",
      "arm-right-3v2.png",
      "arm-right-4v2.png",
      "arm-right-5v2.png",
    ];

    const selectedDirection =
      directions[Math.floor(Math.random() * directions.length)];

    let selectedImage;

    switch (selectedDirection) {
      case "Top":
        selectedImage =
          armImagesTop[Math.floor(Math.random() * armImagesTop.length)];
        break;
      case "Bottom":
        selectedImage =
          armImagesBottom[Math.floor(Math.random() * armImagesBottom.length)];
        break;
      case "Left":
        selectedImage =
          armImagesLeft[Math.floor(Math.random() * armImagesLeft.length)];
        break;
      case "Right":
        selectedImage =
          armImagesRight[Math.floor(Math.random() * armImagesRight.length)];
        break;
    }

    const { clientX, clientY } = event;
    // Create a new stamp image
    const newStampImg = document.createElement("img");
    newStampImg.src = `../dist/confetti/${selectedImage}`;
    newStampImg.classList.add("stampers");
    newStampImg.classList.add(`${selectedDirection.toLowerCase()}-arm`);

    const newShadowImg = document.createElement("img");
    newShadowImg.src = `../dist/confetti/${shadowImages[selectedDirection]}`;
    newShadowImg.classList.add(
      "shadow",
      `shadow-${selectedDirection.toLowerCase()}`,
    );

    document.body.appendChild(newShadowImg);

    let startX, startY, endX, endY;

    newStampImg.onload = function () {
      const imgWidth = newStampImg.offsetWidth;
      const imgHeight = newStampImg.offsetHeight;

      switch (selectedDirection) {
        case "Top":
          startX = clientX - imgWidth / 2; // The top edge of the image is 140px to the right of the click point
          startY = window.scrollY - imgHeight; // Start above the viewport
          endX = startX; // Maintain horizontal position
          endY = clientY + window.scrollY + imgWidth / 1.3 - imgHeight;
          shadowOffsetX = 5; // Unique horizontal offset for top shadow
          shadowOffsetY = 5;
          break;
        case "Bottom":
          startX = clientX - imgWidth / 2; // The bottom edge of the image is 140px to the right of the click point
          startY = window.innerHeight + window.scrollY; // Start from bottom of the viewport, considering the scroll
          endX = startX; // Maintain horizontal position
          endY = clientY + window.scrollY - imgWidth / 1.5; // Consider scroll offset for end position
          shadowOffsetX = -5; // Unique horizontal offset for top shadow
          shadowOffsetY = -5;
          break;
        case "Left":
          startX = -imgWidth;
          startY = clientY + window.scrollY - imgHeight / 2.5; // Adjust startY for scroll offset
          endX = clientX - imgWidth / 1.5 - imgHeight; // Adjust this to
          endY = startY; // Maintain vertical position
          shadowOffsetX = 5; // Unique horizontal offset for top shadow
          shadowOffsetY = -5;
          break;
        case "Right":
          startX = window.innerWidth;
          startY = clientY + window.scrollY - imgHeight / 2.5; // Adjust startY for scroll offset
          endX = clientX - imgHeight; // The right edge of the image stops
          endY = startY; // Maintain vertical position
          shadowOffsetX = -5; // Unique horizontal offset for top shadow
          shadowOffsetY = 5;
          break;
      }
      newStampImg.style.left = `${startX}px`;
      newStampImg.style.top = `${startY}px`;
      newStampImg.style.visibility = "visible";

      stamperContainer.appendChild(newStampImg);

      const shadowStartX = startX + shadowOffsetX;
      const shadowStartY = startY + shadowOffsetY;
      const shadowEndX = endX + shadowOffsetX;
      const shadowEndY = endY + shadowOffsetY;

      newShadowImg.style.left = `${shadowStartX}px`;
      newShadowImg.style.top = `${shadowStartY}px`;
      newShadowImg.style.visibility = "visible";

      stamperContainer.appendChild(newShadowImg);

      // console.log(newStampImg);
      // console.log(newShadowImg);

      // Animate the image to move to the click position and then back
      setTimeout(() => {
        newStampImg.style.transition = "all 1s ease"; // Smooth transition for sliding in
        newStampImg.style.left = `${endX}px`;
        newStampImg.style.top = `${endY}px`;

        newShadowImg.style.transition = "all 1s ease";
        newShadowImg.style.left = `${shadowEndX}px`;
        newShadowImg.style.top = `${shadowEndY}px`;
      }, 100); // Delay for starting animation // Delay for starting animation

      setTimeout(() => {
        // Animate back to the starting position
        newStampImg.style.left = `${startX}px`;
        newStampImg.style.top = `${startY}px`;
        newShadowImg.style.left = `${shadowStartX}px`;
        newShadowImg.style.top = `${shadowStartY}px`;
      }, 1150); // Delay for returning animation

      // Remove the image after animations
      setTimeout(() => {
        newStampImg.remove();
        newShadowImg.remove();
      }, 2000);
    };

    // Temporarily add the image to the document to measure its size
    document.body.appendChild(newStampImg);
    newStampImg.style.visibility = "hidden"; // Hide arm image until its size is read
    document.body.appendChild(newShadowImg);
    newShadowImg.style.visibility = "hidden";
    directions = ["Top", "Bottom", "Left", "Right"];

    playAudioIfAllowed(); // Call this function instead of directly playing audio
  }

  function handleMarkClick(event) {
    if (event.target === closeButton) {
      // console.log("Click on close button - ignoring for mark.");
      return;
    }

    if (!isMarkActive) {
      // console.log("Marker functionality is not active.");
      return; // Exit if marker functionality is not active
    }

    const stampImages = [
      "Grad-line-Great-job.png",
      "Grad-line-Mission-accomplished.png",
      "Grad-line-We're-proud-of-you!.png",
      "Grad-line-Youre-amazing.png",
      "Grad-Non-Line-Catch-this-moment.png",
      "Grad-Non-Line-Good-job.png",
      "Grad-Non-Line-Happy-grad-day.png",
      "Grad-Non-Line-You're-lit.png",
    ];
    //const stampImages2 = [];

    if (isProcessingClick) {
      return; // If a click is already being processed, do nothing
    }

    if (/*event.target === clickMeButton ||*/ event.target === closeButton) {
      return; // Ignore clicks on specific buttons
    }

    isProcessingClick = true; // Set the flag to true as we're now processing a click

    // Reset the flag after a delay, ensuring only one stamp per click
    setTimeout(() => {
      isProcessingClick = false;
    }, 100); // Adjust delay as necessary

    // Call your function to display the stamp
    const { clientX, clientY } = event;

    displayStampAtPosition(clientX, clientY);

    function displayStampAtPosition(clientX, clientY) {
      const selectedArray = [...stampImages];
      const selectedStampImage =
        selectedArray[Math.floor(Math.random() * selectedArray.length)];

      // console.log(
      //   `Adding stamp at (${clientX}, ${clientY}):`,
      //   selectedStampImage,
      // );

      const orientation = [0, 30, 330][Math.floor(Math.random() * 3)];

      const newStampImg = document.createElement("img");
      newStampImg.classList.add("image-stamps");
      newStampImg.src = `../dist/confetti/${selectedStampImage}`;
      newStampImg.style.transform = `rotate(${orientation}deg)`;
      const adjustedX = clientX + window.scrollX;
      const adjustedY = clientY + window.scrollY;
      newStampImg.style.left = `${adjustedX - 40}px`;
      newStampImg.style.top = `${adjustedY - 40}px`;

      stamperMarksContainer.appendChild(newStampImg);
      // console.log("Stamp image added:", newStampImg);

      setTimeout(() => {
        playAudioIfAllowed2(); // Call this function instead of directly playing audio
      }, 1100);
    }
  }

  // Function to check if two elements overlap
  function isOverlapping(elem1, elem2) {
    const rect1 = elem1.getBoundingClientRect();
    const rect2 = elem2.getBoundingClientRect();

    return !(
      rect1.top > rect2.bottom ||
      rect1.right < rect2.left ||
      rect1.bottom < rect2.top ||
      rect1.left > rect2.right
    );
  }

  // Function to hide .image-stamp elements that overlap with .wiper::after
  function hideOverlappingImageStamps() {
    // Get the .wiper element and all .image-stamp elements
    const wiper = document.querySelector(".wiper");
    const imageStamps = document.querySelectorAll(".image-stamp");

    if (wiper) {
      // Create an element to represent the ::after pseudo-element
      const after = document.createElement("div");
      wiper.appendChild(after);

      imageStamps.forEach((stamp) => {
        if (isOverlapping(after, stamp)) {
          // Log overlapping status
          // console.log("Overlap detected with:", stamp);

          // Hide the stamp if it overlaps with the wiper::after
          stamp.style.display = "none";
        }
      });

      // Clean up the temporary ::after element
      wiper.removeChild(after);
    }
  }
  hideOverlappingImageStamps();
});

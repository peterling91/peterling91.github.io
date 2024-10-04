export const dialogFullImage = () => {
  const dialogs = document.querySelectorAll(".dialog-full-image");

  dialogs.forEach((dialog) => {
    const closeButton: HTMLElement | null = dialog.querySelector(
      ".dialog-close-button",
    );
    const image: HTMLElement | null = dialog.querySelector(
      ".dialog-full-image__image",
    );
    const contentArea: HTMLElement | null = dialog.querySelector(
      ".dialog-body-content",
    );

    if (closeButton && image && contentArea) {
      // Close dialog functions
      closeButton.addEventListener("click", () => {
        resetImage(); // Reset image when closing
      });

      // Variables for zooming, panning, and interaction tracking
      let scale = 1;
      let targetScale = 1;
      let initialDistance = 0;
      let startX = 0;
      let startY = 0;
      let offsetX = 0;
      let offsetY = 0;
      let isPanning = false;
      let lastTap = 0; // For detecting double-tap
      let isPinching = false; // To track whether pinch zoom is happening

      // Variables for inertia
      let lastTouchX = 0;
      let lastTouchY = 0;
      let velocityX = 0;
      let velocityY = 0;
      let inertiaFrame: number;
      let isAnimating = false; // To throttle updates and prevent flickering

      // Helper function to calculate distance between two touch points
      const getDistance = (touch1: Touch, touch2: Touch) => {
        const deltaX = touch2.clientX - touch1.clientX;
        const deltaY = touch2.clientY - touch1.clientY;
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      };

      // Smoothly scale the image using requestAnimationFrame
      const smoothScaleImage = () => {
        if (Math.abs(scale - targetScale) > 0.01) {
          scale += (targetScale - scale) * 0.1;
          updateImageTransform(); // Update image transform using new scale
          requestAnimationFrame(smoothScaleImage);
        } else {
          scale = targetScale;
          updateImageTransform(); // Ensure the final position is applied
        }
      };

      // Function to update the image transform (called only when necessary)
      const updateImageTransform = () => {
        if (image)
          image.style.transform = `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`;
      };

      // Function to apply inertia for panning
      const applyInertia = () => {
        // Dampen the velocity (reduce it over time)
        velocityX *= 0.95;
        velocityY *= 0.95;

        // Update the image position based on the velocity
        offsetX += velocityX;
        offsetY += velocityY;

        // Apply the translation with the updated offsets
        updateImageTransform();

        // If velocity is very low, stop the animation
        if (Math.abs(velocityX) > 0.1 || Math.abs(velocityY) > 0.1) {
          inertiaFrame = requestAnimationFrame(applyInertia);
        }
      };

      // Throttled panning handler using requestAnimationFrame
      const handlePanning = (touchX: number, touchY: number) => {
        if (!isAnimating) {
          requestAnimationFrame(() => {
            // Update the position of the image
            offsetX = touchX - startX;
            offsetY = touchY - startY;

            // Apply the translation
            updateImageTransform();
            isAnimating = false; // Allow the next frame update
          });
          isAnimating = true; // Prevent multiple updates in the same frame
        }
      };

      // Pinch-to-zoom and pan event handling
      contentArea.addEventListener("touchmove", (event) => {
        if (window.innerWidth < 1024) {
          if (event.touches.length === 2) {
            event.preventDefault();
            isPinching = true; // Set flag to true during pinch

            // Cancel inertia if pinch zoom starts
            cancelAnimationFrame(inertiaFrame); // Stop any ongoing inertia when pinch-zoom starts

            const touch1 = event.touches[0];
            const touch2 = event.touches[1];
            const currentDistance = getDistance(touch1, touch2);

            if (initialDistance === 0) {
              initialDistance = currentDistance;
            } else {
              // Calculate new target scale based on pinch gesture
              const distanceRatio = currentDistance / initialDistance;
              targetScale = Math.max(1, scale * distanceRatio);

              // Start smooth scaling
              requestAnimationFrame(smoothScaleImage);

              // Update the initial distance
              initialDistance = currentDistance;
            }
          } else if (event.touches.length === 1 && scale > 1) {
            // Handle panning when image is zoomed in
            event.preventDefault();
            const touch = event.touches[0];

            if (!isPanning) {
              startX = touch.clientX - offsetX;
              startY = touch.clientY - offsetY;
              isPanning = true;
            }

            // Calculate velocity for inertia
            velocityX = touch.clientX - lastTouchX;
            velocityY = touch.clientY - lastTouchY;

            // Update the image position smoothly using requestAnimationFrame
            handlePanning(touch.clientX, touch.clientY);

            // Store the last touch position
            lastTouchX = touch.clientX;
            lastTouchY = touch.clientY;
          }
        }
      });

      // Detect double-tap to zoom
      contentArea.addEventListener("touchend", (event) => {
        if (window.innerWidth < 1024) {
          // Reset pinching when touch ends
          if (event.touches.length === 0) {
            initialDistance = 0;
            isPanning = false;

            // Apply inertia after panning ends, but not if pinch zoom was active
            if (
              !isPinching &&
              scale > 1 &&
              (Math.abs(velocityX) > 0.1 || Math.abs(velocityY) > 0.1)
            ) {
              inertiaFrame = requestAnimationFrame(applyInertia);
            }
            isPinching = false; // Reset pinch state after touch ends
          }

          // Ignore double-tap if pinch zooming is active
          if (isPinching) return;

          // Double-tap detection logic (with a timeout for debouncing)
          const currentTime = new Date().getTime();
          const tapLength = currentTime - lastTap;

          if (tapLength < 300 && tapLength > 0) {
            // Toggle between zoom in (scale 2.5) and zoom out (scale 1)
            if (scale === 1) {
              targetScale = 2.5;
            } else {
              targetScale = 1;
              offsetX = 0;
              offsetY = 0;
            }

            // Start smooth scaling
            requestAnimationFrame(smoothScaleImage);
          }

          lastTap = currentTime;
        }
      });

      // Reset the image when closing the dialog
      const resetImage = () => {
        scale = 1;
        targetScale = 1;
        offsetX = 0;
        offsetY = 0;
        updateImageTransform(); // Ensure the reset state is applied
        cancelAnimationFrame(inertiaFrame); // Stop any ongoing inertia
        isAnimating = false;
      };

      // Prevent default dialog close on background click
      dialog.addEventListener("click", (event) => {
        if (event.target === dialog) resetImage();
      });
    }
  });
};

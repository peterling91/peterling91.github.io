export const personaCard = (): void => {
  // Fetch all tall cards and overlays dynamically
  const tallCards = Array.from(
    document.querySelectorAll<HTMLElement>(".tall-card"),
  );
  const overlays = tallCards.map((card) =>
    card.querySelector<HTMLElement>(".overlay-two"),
  );

  const hideAllOverlays = () => {
    overlays.forEach((overlay) => (overlay!.style.display = "none"));
  };

  // Set up events for each card
  tallCards.forEach((card, index) => {
    card.addEventListener("mouseover", () => {
      hideAllOverlays();
      overlays.forEach((overlay, overlayIndex) => {
        if (index !== overlayIndex) {
          overlay!.style.display = "block";
        }
      });
    });

    card.addEventListener("mouseout", hideAllOverlays);
  });

  // Initialize by hiding all overlays by default
  hideAllOverlays();
};

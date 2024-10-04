export const filterGroup = () => {
  // Find the element with class `.filter-search-group`
  const element = document.querySelector(".filter-search-group") as HTMLElement;

  if (!element) return;

  // Create a sentinel div and position it right before the sticky element
  const sentinel = document.createElement("div");

  // Zoom fix - change unit px to rem
  sentinel.style.height = "1px"; // this height determines the trigger point
  element.parentElement!.insertBefore(sentinel, element);

  const observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;

      // If the sentinel is not intersecting (i.e., it's out of view),
      // then the sticky element has reached its sticky position
      if (!entry.isIntersecting) {
        element.style.backgroundColor = "#f4f4f5";
      } else {
        element.style.backgroundColor = "white";
      }
    },
    {
      // Zoom fix - change unit px to rem
      rootMargin: "-68px 0px 0px 0px", // Adjust this value for fine-tuning
    },
  );

  observer.observe(sentinel);
};

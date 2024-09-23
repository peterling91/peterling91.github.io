export const emptyLink = () => {
  const links = document.querySelectorAll("a");

  links.forEach((link) => {
    const href = link.getAttribute("href");

    if (href === "" || href === "#") {
      link.addEventListener("click", (event) => event.preventDefault());
    }
  });
};

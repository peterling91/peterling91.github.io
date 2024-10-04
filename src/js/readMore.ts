import { getBreakpoint } from "./utilites";

const truncateText = (
  element: HTMLElement,
  readMoreButton: HTMLAnchorElement,
  text: string,
  truncatedText: string,
  maxTextLength: number,
  maxTextLengthMobile: number,
) => {
  if (getBreakpoint("lg")) {
    if (text.length > maxTextLength) {
      truncatedText = text.slice(0, maxTextLength).concat("...");

      element.innerText = truncatedText;
      element.append(readMoreButton);
    }
  } else {
    if (text.length > maxTextLengthMobile) {
      truncatedText = text.slice(0, maxTextLengthMobile).concat("...");

      element.innerText = truncatedText;
      element.append(readMoreButton);
    }
  }
};

const createReadMoreButton = (
  element: HTMLElement,
  text: string,
  truncatedText: string,
) => {
  const readMoreButton = document.createElement("a");
  readMoreButton.setAttribute("href", "#");
  readMoreButton.setAttribute("role", "button");
  readMoreButton.setAttribute("aria-expanded", "false");
  readMoreButton.style.marginLeft = "0.5rem";
  readMoreButton.style.whiteSpace = "no-wrap";
  readMoreButton.innerText = "Read more";

  readMoreButton.addEventListener("click", (event) => {
    event.preventDefault();

    if (readMoreButton.getAttribute("aria-expanded") === "false") {
      element.innerText = text;
      readMoreButton.innerText = "Read less";
      element.append(readMoreButton);
      readMoreButton.setAttribute("aria-expanded", "true");
    } else {
      element.innerText = truncatedText;
      readMoreButton.innerText = "Read more";
      element.append(readMoreButton);
      readMoreButton.setAttribute("aria-expanded", "false");
    }
  });
  return readMoreButton;
};

export const readMore = () => {
  const elements: NodeListOf<HTMLElement> =
    document.querySelectorAll(".read-more");

  elements.forEach((element) => {
    const text: string = element.innerText;
    let truncatedText: string = text;
    let customMaxTextLength: string | number | null = element.getAttribute(
      "data-read-more-text",
    );
    let customMaxTextLengthMobile: string | number | null =
      element.getAttribute("data-read-more-text-m");

    let maxTextLength: number = 180;
    let maxTextLengthMobile: number = 300;

    if (customMaxTextLength) {
      customMaxTextLength = parseInt(customMaxTextLength);

      if (!Number.isNaN(customMaxTextLength)) {
        maxTextLength = customMaxTextLength;
      }
    }

    if (customMaxTextLengthMobile) {
      customMaxTextLengthMobile = parseInt(customMaxTextLengthMobile);

      if (!Number.isNaN(customMaxTextLengthMobile)) {
        maxTextLengthMobile = customMaxTextLengthMobile;
      }
    }

    if (getBreakpoint("lg")) {
      if (text.length > maxTextLength) {
        truncatedText = text.slice(0, maxTextLength).concat("...");
      }
    } else {
      if (text.length > maxTextLengthMobile) {
        truncatedText = text.slice(0, maxTextLengthMobile).concat("...");
      }
    }

    const readMoreButton = createReadMoreButton(element, text, truncatedText);

    truncateText(
      element,
      readMoreButton,
      text,
      truncatedText,
      maxTextLength,
      maxTextLengthMobile,
    );

    window.addEventListener("resize", () =>
      truncateText(
        element,
        readMoreButton,
        text,
        truncatedText,
        maxTextLength,
        maxTextLengthMobile,
      ),
    );
  });
};

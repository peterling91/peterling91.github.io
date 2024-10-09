export const alertLive = () => {
  const alert = document.querySelector(".alert-live > div");

  if (!alert) return;
  const announcement = document.querySelector(".announcement-banner");

  const alertMobile = document.createElement("div");
  alertMobile.classList.add("alert-information");
  alertMobile.classList.add("alert-live-mobile");

  const alertMobileInner = document.createElement("div");
  alertMobileInner.classList.add("alert-live-mobile-inner");
  alertMobileInner.innerHTML = alert.innerHTML;

  alertMobile.append(alertMobileInner);

  if (announcement) {
    announcement.insertAdjacentElement("afterend", alertMobile);
  } else {
    document.body.prepend(alertMobile);
  }
};

export const alertLive = () => {
  const alert = document.querySelector(".alert-live > div");

  if (!alert) return;

  const alertMobile = document.createElement("div");
  alertMobile.classList.add("alert-information");
  alertMobile.classList.add("alert-live-mobile");

  const alertMobileInner = document.createElement("div");
  alertMobileInner.classList.add("alert-live-mobile-inner");
  alertMobileInner.innerHTML = alert.innerHTML;

  alertMobile.append(alertMobileInner);

  document.body.prepend(alertMobile);
};

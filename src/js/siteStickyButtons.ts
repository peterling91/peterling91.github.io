import { right } from "@popperjs/core";

/*====================================================
  Reusable functions, see main function below
====================================================*/
const createHelpImproveButton = () => {
  const button = document.createElement("button");
  const label = document.createElement("span");

  label.classList.add("visually-hidden");
  label.innerText = "Help improve our site";

  button.classList.add("site-button-help-improve");
  button.classList.add("button-icon");
  button.classList.add("button-sm");
  button.style.display = "block";
  button.style.position = "fixed";
  button.style.left = "1rem";
  button.style.bottom = "1rem";
  button.style.zIndex = "800";
  button.style.width = "3.5rem";
  button.style.minWidth = "3.5rem";
  button.style.maxWidth = "3.5rem";
  button.style.height = "3.5rem";
  button.style.minHeight = "3.5rem";
  button.style.maxHeight = "3.5rem";
  button.style.transition = "bottom 300ms ease-in-out";
  button.style.backgroundSize = "contain";
  button.style.backgroundPosition = "center";
  button.style.backgroundRepeat = "no-repeat";
  button.style.backgroundImage = `url("data:image/svg+xml,%3Csvg width='56' height='56' viewBox='0 0 56 56' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='28' cy='28' r='28' fill='black'/%3E%3Cpath d='M28 7C39.6008 7 49 16.3992 49 28C49 39.6008 39.6008 49 28 49C16.3992 49 7 39.6008 7 28C7 16.3992 16.3992 7 28 7ZM34.7742 21.2258C33.25 21.2258 32.0645 22.496 32.0645 23.9355C32.0645 25.4597 33.25 26.6452 34.7742 26.6452C36.2137 26.6452 37.4839 25.4597 37.4839 23.9355C37.4839 22.496 36.2137 21.2258 34.7742 21.2258ZM21.2258 21.2258C19.7016 21.2258 18.5161 22.496 18.5161 23.9355C18.5161 25.4597 19.7016 26.6452 21.2258 26.6452C22.6653 26.6452 23.9355 25.4597 23.9355 23.9355C23.9355 22.496 22.6653 21.2258 21.2258 21.2258ZM37.6532 35.7056C38.8387 34.2661 36.7218 32.5726 35.621 33.9274C33.6734 36.2137 30.9637 37.4839 28 37.4839C25.0363 37.4839 22.2419 36.2137 20.2944 33.9274C19.1935 32.5726 17.0766 34.2661 18.2621 35.7056C20.6331 38.5847 24.1895 40.1936 28 40.1936C31.7258 40.1936 35.2823 38.5847 37.6532 35.7056Z' fill='%23F1D14B'/%3E%3C/svg%3E%0A")`;

  button.append(label);
  return button;
};

const createHelpImproveButtonNew = () => {
  const button = document.createElement("button");
  const label = document.createElement("span");
  const image = document.createElement("img");

  label.classList.add("visually-hidden");
  label.innerText = "Help improve our site";

  image.setAttribute("src", "../dist/assets/help-us-improve.png");
  image.style.display = "block";
  image.style.position = "relative";
  image.style.width = "183px";
  image.style.maxWidth = "183px";
  image.style.height = "38px";
  image.style.top = "-1px";
  image.style.left = "6px";

  button.classList.add("site-button-help-improve");
  button.classList.add("button-icon");
  button.classList.add("button-sm");
  button.style.display = "block";
  button.style.position = "fixed";
  button.style.left = "1.25rem";
  button.style.bottom = "0";
  button.style.zIndex = "800";
  button.style.width = "180px";
  button.style.minWidth = "180px";
  button.style.maxWidth = "180px";
  button.style.height = "37px";
  button.style.minHeight = "37px";
  button.style.maxHeight = "37px";
  button.style.overflow = "hidden";
  button.style.borderRadius = "4px 4px 0 0";
  button.style.border = "0";
  button.style.marginLeft = "0";
  button.style.marginRight = "0";

  button.append(label);
  button.append(image);
  return button;
};

const createChatBotButton = () => {
  const button = document.createElement("button");
  const label = document.createElement("span");

  label.classList.add("visually-hidden");
  label.innerText = "Ask NYP chatbot";

  button.classList.add("site-button-chatbot");
  button.classList.add("button-icon");
  button.classList.add("button-sm");
  button.style.display = "block";
  button.style.position = "fixed";
  button.style.right = "1rem";
  button.style.bottom = "1rem";
  button.style.zIndex = "800";
  button.style.width = "4.3125rem";
  button.style.minWidth = "4.3125rem";
  button.style.maxWidth = "4.3125rem";
  button.style.height = "4.3125rem";
  button.style.minHeight = "4.3125rem";
  button.style.maxHeight = "4.3125rem";
  button.style.transition = "bottom 300ms ease-in-out";
  button.style.boxShadow = "0px 4px 4px 0px rgba(44, 46, 48, 0.10)";
  button.style.backgroundSize = "contain";
  button.style.backgroundPosition = "center";
  button.style.backgroundRepeat = "no-repeat";
  button.style.backgroundImage = `url("data:image/svg+xml,%3Csvg width='73' height='73' viewBox='0 0 73 73' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='36.5' cy='36.5' r='32.5' fill='%23FFFCC4'/%3E%3Cpath d='M11.2738 38.512H16.6904V40.5239H11.2738C8.95235 40.5239 7.40473 41.9167 7.40473 44.7024C7.40473 47.4882 9.88092 48.5715 12.2023 48.5715H16.6904V50.7382H12.2023C10.3452 50.7382 5.39282 50.2739 5.39282 44.7024C5.39282 39.131 9.36504 38.512 11.2738 38.512Z' fill='%23FF4C4C'/%3E%3Cpath d='M14.2141 35.5714C14.2141 35.0586 14.6298 34.6428 15.1427 34.6428H17.3093C17.8222 34.6428 18.2379 35.0586 18.2379 35.5714V42.3809C18.2379 42.8938 17.8222 43.3095 17.3093 43.3095H15.1427C14.6298 43.3095 14.2141 42.8938 14.2141 42.3809V35.5714Z' fill='%23963434'/%3E%3Ccircle cx='17.9285' cy='49.8094' r='4.64286' fill='%2314438E'/%3E%3Crect x='51.1265' y='22.8811' width='4.02381' height='1.54762' rx='0.77381' transform='rotate(14.5389 51.1265 22.8811)' fill='%23FF4C4C'/%3E%3Crect x='57.9792' y='18.1653' width='5.65208' height='1.54762' rx='0.77381' transform='rotate(110.999 57.9792 18.1653)' fill='%23FF4C4C'/%3E%3Crect x='60.2078' y='19.7576' width='5.65208' height='1.54762' rx='0.77381' transform='rotate(112.451 60.2078 19.7576)' fill='%23FF4C4C'/%3E%3Crect x='61.7964' y='22.5803' width='3.95904' height='1.39286' rx='0.696429' transform='rotate(127.284 61.7964 22.5803)' fill='%23FF4C4C'/%3E%3Cpath d='M57.7025 30.619C54.2358 29.8762 54.762 26.5436 55.381 24.8928L56.9287 25.9762C55.381 30.1547 60.1786 28.9166 62.6548 28.7619C65.131 28.6071 68.3339 29.5491 68.0715 34.7976C67.9168 37.8928 67.2977 38.9762 58.4762 40.369V38.3571C63.8929 37.7381 66.8025 37.7381 66.3691 33.4047C65.9048 28.7619 60.4882 31.216 57.7025 30.619Z' fill='%23FF4C4C'/%3E%3Cpath d='M55.0715 35.5714C55.0715 35.0586 55.4873 34.6428 56.0001 34.6428H58.1668C58.6796 34.6428 59.0953 35.0586 59.0953 35.5714V42.3809C59.0953 42.8938 58.6796 43.3095 58.1668 43.3095H56.0001C55.4873 43.3095 55.0715 42.8938 55.0715 42.3809V35.5714Z' fill='%23963434'/%3E%3Cpath d='M59.7028 24.4244C59.2084 24.1108 56.3098 22.2616 55.381 21.6426C54.4522 21.0237 53.9881 21.3331 53.8334 22.4164C53.6787 23.4998 53.5239 25.8708 55.381 26.9045C58.1823 28.4638 59.8382 26.094 60.1971 25.5158C60.4879 25.0474 60.1971 24.7379 59.7028 24.4244Z' fill='%2314438E'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M16.6904 62.267V36.8095C16.6904 34.2453 18.7691 32.1666 21.3333 32.1666H22.2619V26.2857C22.2619 23.7215 24.3405 21.6428 26.9047 21.6428H46.4047C48.9689 21.6428 51.0476 23.7215 51.0476 26.2857V32.1666H51.6666C54.2308 32.1666 56.3095 34.2453 56.3095 36.8095V62.267C50.8257 66.4892 43.956 69 36.5 69C29.0439 69 22.1743 66.4892 16.6904 62.267Z' fill='%23FF4D4D'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M19.8736 64.431C19.4185 63.3545 19.1667 62.1709 19.1667 60.9286V49.2144C19.1667 44.2438 23.1962 40.2144 28.1667 40.2144H44.8334C49.804 40.2144 53.8334 44.2438 53.8334 49.2144V60.9286C53.8334 62.1709 53.5817 63.3544 53.1266 64.4309C48.2621 67.3328 42.5758 69 36.5 69C30.4243 69 24.738 67.3328 19.8736 64.431Z' fill='%23963535'/%3E%3Cpath d='M49.0796 52.295H48.0519V53.863C48.0519 54.0872 47.999 54.2572 47.8932 54.3731C47.7874 54.4889 47.6539 54.5469 47.4927 54.5469C47.3239 54.5469 47.1879 54.4902 47.0846 54.3768C46.9813 54.261 46.9297 54.0922 46.9297 53.8705V49.601C46.9297 49.3541 46.9864 49.1778 47.0997 49.072C47.2131 48.9662 47.3932 48.9133 47.64 48.9133H49.0796C49.5053 48.9133 49.8327 48.9461 50.062 49.0116C50.2887 49.0745 50.4839 49.1791 50.6476 49.3252C50.8138 49.4713 50.9398 49.6501 51.0254 49.8617C51.1111 50.0733 51.1539 50.3113 51.1539 50.5758C51.1539 51.14 50.9801 51.5683 50.6325 51.8605C50.2849 52.1501 49.7672 52.295 49.0796 52.295ZM48.8075 49.7559H48.0519V51.4486H48.8075C49.072 51.4486 49.2924 51.4209 49.4688 51.3655C49.6476 51.3101 49.7836 51.2194 49.8768 51.0934C49.97 50.9675 50.0166 50.8025 50.0166 50.5985C50.0166 50.3541 49.9448 50.1552 49.8012 50.0015C49.64 49.8378 49.3088 49.7559 48.8075 49.7559Z' fill='white'/%3E%3Cpath d='M43.5611 53.863V52.106L42.2085 50.009C42.0901 49.8201 42.0057 49.6728 41.9553 49.567C41.9075 49.4612 41.8835 49.3692 41.8835 49.2911C41.8835 49.1627 41.9327 49.0518 42.0309 48.9586C42.1317 48.8654 42.2551 48.8188 42.4012 48.8188C42.5548 48.8188 42.6707 48.8629 42.7488 48.9511C42.8294 49.0367 42.949 49.2093 43.1077 49.4687L44.143 51.1501L45.1896 49.4687C45.2526 49.3655 45.3055 49.2785 45.3483 49.208C45.3911 49.1375 45.4377 49.072 45.4881 49.0115C45.541 48.9486 45.5989 48.9007 45.6619 48.868C45.7249 48.8352 45.8017 48.8188 45.8924 48.8188C46.0335 48.8188 46.1506 48.8654 46.2438 48.9586C46.3395 49.0493 46.3874 49.1551 46.3874 49.276C46.3874 49.3743 46.3634 49.4725 46.3156 49.5707C46.2677 49.669 46.1858 49.805 46.07 49.9788L44.6833 52.106V53.863C44.6833 54.0922 44.6304 54.2635 44.5246 54.3768C44.4188 54.4902 44.2841 54.5469 44.1203 54.5469C43.9541 54.5469 43.8193 54.4914 43.7161 54.3806C43.6128 54.2673 43.5611 54.0947 43.5611 53.863Z' fill='white'/%3E%3Cpath d='M38.1407 49.4914L40.2982 52.7559V49.4612C40.2982 49.2471 40.3435 49.0871 40.4342 48.9813C40.5274 48.873 40.6521 48.8188 40.8082 48.8188C40.9695 48.8188 41.0967 48.873 41.1899 48.9813C41.2831 49.0871 41.3297 49.2471 41.3297 49.4612V53.8176C41.3297 54.3038 41.1281 54.5469 40.7251 54.5469C40.6244 54.5469 40.5337 54.5317 40.4531 54.5015C40.3725 54.4738 40.2969 54.4285 40.2264 54.3655C40.1558 54.3025 40.0904 54.2295 40.0299 54.1463C39.9694 54.0607 39.909 53.9738 39.8485 53.8856L37.744 50.6589V53.9045C37.744 54.1161 37.6949 54.2761 37.5966 54.3844C37.4984 54.4927 37.3725 54.5469 37.2188 54.5469C37.0601 54.5469 36.9329 54.4927 36.8372 54.3844C36.7415 54.2736 36.6936 54.1136 36.6936 53.9045V49.6312C36.6936 49.4498 36.7138 49.3075 36.7541 49.2042C36.8019 49.0909 36.8813 48.9989 36.9921 48.9284C37.1029 48.8554 37.2226 48.8188 37.351 48.8188C37.4518 48.8188 37.5374 48.8352 37.608 48.868C37.681 48.9007 37.744 48.9448 37.7969 49.0002C37.8523 49.0556 37.9077 49.1274 37.9631 49.2156C38.0211 49.3037 38.0803 49.3957 38.1407 49.4914Z' fill='white'/%3E%3Cpath d='M34.9726 54.0746L34.062 52.5783L33.5028 53.1073V53.9272C33.5028 54.1262 33.4499 54.2798 33.3441 54.3882C33.2408 54.494 33.1212 54.5469 32.9852 54.5469C32.8265 54.5469 32.7018 54.494 32.6111 54.3882C32.5204 54.2824 32.4751 54.1262 32.4751 53.9196V49.5216C32.4751 49.2924 32.5192 49.1186 32.6073 49.0002C32.6955 48.8793 32.8214 48.8188 32.9852 48.8188C33.1439 48.8188 33.2698 48.873 33.363 48.9813C33.4562 49.0896 33.5028 49.2496 33.5028 49.4612V51.9624L34.6628 50.7458C34.8064 50.5947 34.9159 50.4914 34.9915 50.436C35.0671 50.3806 35.159 50.3529 35.2673 50.3529C35.3958 50.3529 35.5028 50.3944 35.5885 50.4776C35.6741 50.5582 35.7169 50.6602 35.7169 50.7836C35.7169 50.9347 35.5771 51.1362 35.2975 51.3881L34.7497 51.8907L35.8076 53.5531C35.8857 53.6766 35.9411 53.771 35.9739 53.8365C36.0091 53.8995 36.0268 53.9599 36.0268 54.0179C36.0268 54.1816 35.9814 54.3113 35.8907 54.4071C35.8026 54.5003 35.6855 54.5469 35.5394 54.5469C35.4134 54.5469 35.3164 54.5128 35.2484 54.4448C35.1804 54.3768 35.0885 54.2534 34.9726 54.0746Z' fill='white'/%3E%3Cpath d='M31.7626 53.1979C31.7626 53.4825 31.6934 53.7269 31.5548 53.9309C31.4163 54.1324 31.211 54.2861 30.9389 54.3919C30.6694 54.4951 30.3407 54.5468 29.9528 54.5468C29.5825 54.5468 29.2651 54.4901 29.0006 54.3767C28.7362 54.2634 28.5409 54.1223 28.415 53.9536C28.289 53.7823 28.2261 53.611 28.2261 53.4397C28.2261 53.3264 28.2664 53.2294 28.347 53.1488C28.4276 53.0682 28.5296 53.0279 28.653 53.0279C28.7613 53.0279 28.8445 53.0543 28.9024 53.1072C28.9603 53.1601 29.0158 53.2344 29.0686 53.3301C29.1744 53.514 29.3004 53.6513 29.4465 53.742C29.5951 53.8327 29.7966 53.878 30.051 53.878C30.2576 53.878 30.4263 53.8327 30.5573 53.742C30.6908 53.6488 30.7576 53.543 30.7576 53.4246C30.7576 53.2432 30.6883 53.111 30.5498 53.0279C30.4137 52.9447 30.1883 52.8654 29.8734 52.7898C29.5183 52.7017 29.2286 52.6097 29.0044 52.514C28.7828 52.4158 28.6052 52.2873 28.4717 52.1286C28.3382 51.9699 28.2714 51.7747 28.2714 51.543C28.2714 51.3364 28.3331 51.1412 28.4566 50.9573C28.58 50.7734 28.7613 50.6273 29.0006 50.519C29.2425 50.4082 29.5334 50.3528 29.8734 50.3528C30.1404 50.3528 30.3797 50.3805 30.5913 50.4359C30.8054 50.4913 30.983 50.5656 31.1241 50.6588C31.2677 50.752 31.376 50.8553 31.449 50.9687C31.5246 51.082 31.5624 51.1928 31.5624 51.3012C31.5624 51.4195 31.5221 51.5165 31.4415 51.5921C31.3634 51.6677 31.2513 51.7054 31.1052 51.7054C30.9994 51.7054 30.9087 51.6752 30.8331 51.6148C30.7601 51.5543 30.6757 51.4636 30.58 51.3427C30.5019 51.242 30.41 51.1614 30.3042 51.1009C30.1984 51.0404 30.0548 51.0102 29.8734 51.0102C29.687 51.0102 29.5321 51.0505 29.4087 51.1311C29.2853 51.2092 29.2236 51.3075 29.2236 51.4258C29.2236 51.5342 29.2689 51.6236 29.3596 51.6941C29.4503 51.7621 29.5724 51.8188 29.7261 51.8641C29.8797 51.9095 30.0913 51.9649 30.3609 52.0304C30.6808 52.1085 30.9415 52.2017 31.143 52.31C31.347 52.4183 31.5007 52.5468 31.6039 52.6954C31.7097 52.8415 31.7626 53.009 31.7626 53.1979Z' fill='white'/%3E%3Cpath d='M26.7199 53.8252L26.4554 53.13H24.2035L23.939 53.8403C23.8357 54.1174 23.7476 54.305 23.6745 54.4033C23.6015 54.499 23.4818 54.5469 23.3156 54.5469C23.1745 54.5469 23.0498 54.4952 22.9415 54.3919C22.8332 54.2887 22.7791 54.1715 22.7791 54.0406C22.7791 53.965 22.7916 53.8869 22.8168 53.8063C22.842 53.7257 22.8836 53.6136 22.9415 53.47L24.3584 49.873C24.3987 49.7697 24.4466 49.6463 24.502 49.5027C24.5599 49.3566 24.6204 49.2357 24.6833 49.14C24.7488 49.0443 24.8332 48.9675 24.9365 48.9095C25.0423 48.8491 25.172 48.8188 25.3257 48.8188C25.4818 48.8188 25.6116 48.8491 25.7148 48.9095C25.8206 48.9675 25.905 49.043 25.968 49.1362C26.0335 49.2294 26.0876 49.3302 26.1305 49.4385C26.1758 49.5443 26.2325 49.6866 26.3005 49.8655L27.7476 53.4398C27.861 53.7118 27.9176 53.9096 27.9176 54.033C27.9176 54.1615 27.8635 54.2798 27.7552 54.3882C27.6494 54.494 27.5209 54.5469 27.3698 54.5469C27.2816 54.5469 27.206 54.5305 27.1431 54.4977C27.0801 54.4675 27.0272 54.4259 26.9844 54.373C26.9416 54.3176 26.895 54.2345 26.8446 54.1237C26.7967 54.0103 26.7552 53.9108 26.7199 53.8252ZM24.4982 52.2874H26.1531L25.3181 50.0015L24.4982 52.2874Z' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M34.7104 19.9531L34.7104 19.9531L34.7066 19.9541C34.703 19.9552 34.6969 19.9568 34.6885 19.9591C34.6718 19.9635 34.6461 19.9701 34.6124 19.9779C34.545 19.9937 34.4461 20.0145 34.324 20.0337C34.0785 20.0724 33.7456 20.1035 33.3892 20.0768C32.6769 20.0234 31.9183 19.7472 31.5191 18.8823C31.0909 17.9545 31.1293 17.0785 31.2778 16.4276C31.352 16.102 31.4533 15.8353 31.5355 15.6511C31.5765 15.5591 31.6125 15.4883 31.6376 15.4415C31.6502 15.4181 31.66 15.4008 31.6662 15.3899C31.6694 15.3845 31.6716 15.3806 31.6729 15.3785L31.6739 15.3768C31.6739 15.3769 31.6738 15.377 31.4103 15.2146C31.1469 15.0521 31.1468 15.0522 31.1467 15.0524L31.1465 15.0526L31.1461 15.0533L31.1449 15.0552L31.1415 15.061C31.1387 15.0657 31.1349 15.0722 31.1302 15.0803C31.1208 15.0966 31.1078 15.1196 31.0921 15.1489C31.0606 15.2076 31.0178 15.292 30.9702 15.3989C30.8749 15.6123 30.7591 15.9177 30.6742 16.29C30.5043 17.0349 30.4567 18.0576 30.957 19.1417C31.4864 20.2887 32.5076 20.6315 33.343 20.6941C33.7605 20.7254 34.1434 20.6888 34.4202 20.6453C34.4352 20.6429 34.4499 20.6405 34.4642 20.6381C34.4651 20.6751 34.4668 20.7138 34.4695 20.7541C34.4912 21.0796 34.5781 21.5173 34.8417 21.9567C35.1074 22.3995 35.4271 22.6347 35.6948 22.7564C35.827 22.8164 35.9434 22.8475 36.0301 22.8636C36.0735 22.8716 36.1096 22.8759 36.1368 22.8782C36.1504 22.8794 36.1618 22.88 36.1708 22.8804C36.1753 22.8806 36.1792 22.8807 36.1825 22.8807L36.187 22.8808L36.1888 22.8808L36.1897 22.8808L36.1901 22.8808C36.1903 22.8808 36.1905 22.8808 36.1905 22.5713C36.1905 22.2618 36.1907 22.2618 36.1909 22.2618L36.1912 22.2618L36.1919 22.2618L36.1931 22.2618L36.1949 22.2618C36.1953 22.2618 36.1956 22.2618 36.1958 22.2618C36.196 22.2618 36.1961 22.2618 36.196 22.2618C36.1957 22.2618 36.1933 22.2617 36.1891 22.2614C36.1806 22.2607 36.1648 22.2589 36.1429 22.2549C36.099 22.2467 36.0316 22.2294 35.951 22.1928C35.7932 22.121 35.5712 21.9693 35.3726 21.6382C35.1719 21.3039 35.1041 20.9679 35.0872 20.713C35.0787 20.586 35.083 20.481 35.0892 20.4095C35.0922 20.3738 35.0957 20.3467 35.0982 20.3297C35.0995 20.3212 35.1005 20.3153 35.101 20.3121L35.1015 20.3095C35.1015 20.3092 35.1015 20.3092 35.1015 20.3093M34.7106 19.953L34.7104 19.9531Z' fill='%23FF4C4C'/%3E%3Cpath d='M34.1785 14.0595C34.1785 15.1707 33.3308 16.0714 32.4761 16.0714C32.0372 16.0714 31.238 15.7619 31.238 15.7619C31.238 15.7619 30.9285 14.6001 30.9285 14.0595C30.9285 12.9484 31.6214 12.0476 32.4761 12.0476C33.3308 12.0476 34.1785 12.9484 34.1785 14.0595Z' fill='%23963535'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M43.9011 13.8828C43.983 13.5446 43.9804 13.1252 43.9307 12.7029L44.5456 12.6306C44.5991 13.0854 44.6094 13.588 44.5027 14.0285C44.3952 14.4723 44.1565 14.8944 43.6837 15.0983C43.2242 15.2964 42.6232 15.2524 41.8716 14.9654C41.5975 14.8608 41.2972 14.7215 40.9681 14.5437C41.3605 14.9864 41.7409 15.4272 42.0607 15.8228C42.4418 16.2942 42.7616 16.7309 42.9019 17.0378C42.9379 17.1166 42.9701 17.2034 42.9837 17.2907C42.9965 17.3727 43.0005 17.505 42.9173 17.6257C42.8263 17.7578 42.6875 17.7973 42.5845 17.8034C42.4858 17.8093 42.3844 17.7886 42.2921 17.7609C41.8577 17.6306 41.4172 17.3689 41.0052 17.0881C40.7688 16.9269 40.5197 16.7433 40.2823 16.5682C40.1167 16.4461 39.9568 16.3282 39.8109 16.2251C39.43 15.9559 39.1141 15.7641 38.8639 15.6912C38.7435 15.656 38.6622 15.656 38.6078 15.6698C38.5608 15.6818 38.5094 15.71 38.4543 15.7872C38.3629 15.9151 38.3503 16.0872 38.5176 16.3717C38.6868 16.6595 39.0019 16.9851 39.4069 17.3236C40.0974 17.9009 40.9746 18.4561 41.624 18.8672C41.7326 18.936 41.8349 19.0007 41.9288 19.0608C42.0638 19.1472 42.1105 19.3223 42.0365 19.4645C41.9625 19.6066 41.7923 19.6688 41.6441 19.6078C41.0142 19.3484 40.3301 19.1825 39.7093 19.1344C39.0805 19.0857 38.5542 19.1605 38.2131 19.343C38.0472 19.4317 37.9331 19.5413 37.8637 19.6681C37.795 19.7938 37.7579 19.9586 37.7823 20.18C37.8326 20.6373 38.143 21.3049 38.9045 22.2186L38.4289 22.6149C37.6428 21.6716 37.2375 20.8882 37.1669 20.2477C37.1309 19.9201 37.1821 19.6243 37.3207 19.371C37.4586 19.1187 37.671 18.9309 37.9211 18.7971C38.4118 18.5347 39.0753 18.4644 39.7571 18.5172C39.8356 18.5233 39.9148 18.5311 39.9946 18.5404C39.6553 18.305 39.3154 18.054 39.0099 17.7986C38.5895 17.4472 38.2081 17.0667 37.984 16.6855C37.7579 16.301 37.6551 15.8411 37.9506 15.4274C38.0809 15.2449 38.2508 15.1219 38.4551 15.0699C38.652 15.0198 38.8521 15.0429 39.0373 15.0969C39.3984 15.2022 39.7905 15.4526 40.1682 15.7195C40.34 15.8409 40.5059 15.9635 40.6715 16.0859C40.8948 16.2509 41.1177 16.4156 41.3539 16.5766C41.6573 16.7834 41.9465 16.9577 42.2164 17.0743C42.0778 16.8525 41.859 16.558 41.5793 16.212C40.9023 15.3745 39.9445 14.326 39.1756 13.4842C39.0814 13.3811 38.99 13.281 38.9023 13.1848C38.7949 13.0671 38.7945 12.887 38.9014 12.7688C39.0083 12.6505 39.1875 12.6328 39.3155 12.7277C40.5042 13.6097 41.4101 14.1265 42.0925 14.3871C42.7805 14.6499 43.1951 14.6348 43.4385 14.5299C43.6685 14.4307 43.8199 14.2177 43.9011 13.8828ZM42.3721 17.3862C42.3725 17.3889 42.3723 17.3887 42.372 17.3861Z' fill='%23FF4C4C'/%3E%3Cpath d='M46.0954 11.5834C46.0954 13.1311 44.3931 13.5953 44.3931 13.5953C44.3931 13.5953 42.6907 13.2858 42.6907 11.5834C42.6907 10.4723 43.4529 9.57153 44.3931 9.57153C45.3333 9.57153 46.0954 10.4723 46.0954 11.5834Z' fill='%23963535'/%3E%3Cellipse cx='29.0715' cy='30.3097' rx='3.71429' ry='4.33333' fill='white'/%3E%3Cellipse cx='29.2263' cy='30.3095' rx='1.70238' ry='2.16667' fill='%2314438E'/%3E%3Cellipse cx='44.393' cy='30.3097' rx='3.71429' ry='4.33333' fill='white'/%3E%3Cellipse cx='44.3931' cy='30.3095' rx='1.70238' ry='2.16667' fill='%2314438E'/%3E%3Cpath d='M39.9047 34.4881L34.3332 33.4048C34.1785 34.7976 34.6316 36.9013 36.8094 37.1191C38.3571 37.2738 39.7499 35.5715 39.9047 34.4881Z' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M73 36.5C73 56.6584 56.6584 73 36.5 73C16.3416 73 0 56.6584 0 36.5C0 16.3416 16.3416 0 36.5 0C56.6584 0 73 16.3416 73 36.5ZM36.5 69C54.4493 69 69 54.4493 69 36.5C69 18.5507 54.4493 4 36.5 4C18.5507 4 4 18.5507 4 36.5C4 54.4493 18.5507 69 36.5 69Z' fill='white'/%3E%3C/svg%3E%0A")`;

  button.append(label);
  return button;
};

/*========================================
  Main function here
========================================*/
export const siteStickyButtons = () => {
  const container = document.querySelector(".main-container");

  if (!container) return;

  // Add help improve button to the page
  container.append(createHelpImproveButtonNew());

  // Add chatbot button to the page
  container.append(createChatBotButton());
};

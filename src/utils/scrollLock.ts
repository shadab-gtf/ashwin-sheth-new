let scrollY = 0;

export function lockScroll() {
  scrollY = window.scrollY;

  // Freeze current scroll position
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";

  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";

  // Prevent wheel + touch + keyboard
  window.addEventListener("wheel", prevent, { passive: false });
  window.addEventListener("touchmove", prevent, { passive: false });
  window.addEventListener("keydown", preventKeys, { passive: false });
}

export function unlockScroll() {
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";

  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";

  window.removeEventListener("wheel", prevent);
  window.removeEventListener("touchmove", prevent);
  window.removeEventListener("keydown", preventKeys);

  window.scrollTo(0, scrollY);
}

function prevent(e: Event) {
  e.preventDefault();
}

function preventKeys(e: KeyboardEvent) {
  const keys = [
    "ArrowUp",
    "ArrowDown",
    "PageUp",
    "PageDown",
    "Home",
    "End",
    " ",
  ];
  if (keys.includes(e.key)) e.preventDefault();
}

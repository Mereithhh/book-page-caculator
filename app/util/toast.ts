export const toast = (message: string) => {
  const toast = document.createElement("div");
  toast.classList.add("toast-wrapper");
  const toastContent = document.createElement("div");
  toastContent.classList.add("toast-content");
  toastContent.innerText = message;
  toast.appendChild(toastContent);
  document.body.appendChild(toast);
  setTimeout(() => {
    document.body.removeChild(toast);
  }, 2000)
}
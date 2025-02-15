import { Toast } from "../components/toast.js";

window.onerror = function (message, source, lineno, colno, error) {
  console.error("log [error] ",error)
  const toast = new Toast()
  toast.add(message);
  return true; // Impede a exibição no console padrão
};

window.addEventListener("unhandledrejection", function (event) {
  const toast = new Toast()
  toast.add(event.reason);
});
import { createUser } from "./core/api.js";

const formLogin = document.querySelector('#login');

const formHandle = async (ev) => {
  ev.preventDefault();

  const inputIdentifier = document.querySelector('#input-id')
  const value = inputIdentifier.value;

  if (!value || typeof value === 'undefined' || value.length === 0) {
    throw ('Não deixe identificador em branco')
  }

  const response = await createUser(value)

  if (response.id) {
    window.location.replace(`./notas.html?owner=${response.id}`);
  }
}

window.onload = () => {
  formLogin.addEventListener('submit', formHandle)
}
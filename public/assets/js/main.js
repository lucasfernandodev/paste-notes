const formLogin = document.querySelector('#login');
const inputId = document.querySelector('#input-id')



if (formLogin) {

  formLogin.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const value = inputId.value;

    if (!value || typeof value === 'undefined' || value.length === 0) {
      alert('Não deixe identificador em branco')
    }

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: value })
      })

      const data = await response.json();

      if (response.status !== 200) {
        alert(response?.data?.message);
        return;
      }

      window.location.replace(`./notas.html?owner=${data.id}`)

    } catch (error) {
      console.log('Não foi possivel entrar', error)
      alert('Não foi possivel logar')
    }
  })
}

export const createEl = (type, content, attributes = {}) => {
  const el = document.createElement(type);
  el.textContent = content || '';

  for (const [label, value] of Object.entries(attributes)) {
    el.setAttribute(label, value)
  }

  return el;
}
 
export function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export async function copyToClipboard(textToCopy) {
  // Navigator clipboard api needs a secure context (https)
  if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(textToCopy);
  } else {
      // Use the 'out of viewport hidden text area' trick
      const textArea = document.createElement("textarea");
      textArea.style.whiteSpace = "pre";
      textArea.wrap = "off";

      textArea.value = textToCopy;
          
      // Move textarea out of the viewport so it's not visible
      textArea.style.position = "absolute";
      textArea.style.left = "-999999px";
          
      document.body.prepend(textArea);
      textArea.select();

      try {
          document.execCommand('copy');
      } catch (error) {
          console.error(error);
      } finally {
          textArea.remove();
      }
  }
}
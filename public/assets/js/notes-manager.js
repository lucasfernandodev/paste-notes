import { copyToClipboard, createEl } from "./main.js";

export const createNote = (notes, id, { onClick = () => { } }) => {

  const onCopyHandle = () => {
    const noteHTML = document.getElementById(`${id}`);

    if (!noteHTML) return; // Garante que o elemento existe

    // Verifica se há múltiplos elementos de bloco dentro da nota
    const isMultiplesParagraphs = Array.from(noteHTML.children).some(el => el.nodeType === 1); // Apenas elementos

    let textToCopy = '';

    if (isMultiplesParagraphs) {
      textToCopy = Array.from(noteHTML.children)
        .map(el => el.innerText.trim()) // innerText respeita quebras visíveis
        .filter(Boolean) // Remove strings vazias
        .join('\n'); // Junta com quebra de linha
    } else {
      textToCopy = noteHTML.innerText.trim(); // innerText para capturar corretamente quebras de linha
    }

    copyToClipboard(textToCopy);
    buttonCopy.textContent = 'Copiado 🎉'
    console.log('Texto copiado:', JSON.stringify(textToCopy)); // Log para depuração
  };


  const buttonCopy = createEl('button', 'Copiar');
  buttonCopy.classList.add('button-copy')
  buttonCopy.addEventListener('click', () => {
    onCopyHandle();
    setTimeout(() => {
        buttonCopy.textContent = 'Copiar'
        buttonCopy.style.right = '-200px'
    }, 500)
  })

  const container = createEl('div', '', {
    id: id,
    class: 'container-notes'
  });

  const content = createEl('div', '', {
    id,
    class: 'note-content',
    contenteditable: 'true'
  });

  content.addEventListener('click', onClick)

  notes.map(p => content.appendChild(createEl('p', p)))

  container.appendChild(content);
  container.appendChild(buttonCopy)
  return container
}
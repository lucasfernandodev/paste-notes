import { copyToClipboard, createEl } from "./utils.js";



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

  if (notes.length > 0) {
    notes.map(p => content.appendChild(createEl('p', p)))
  }


  container.appendChild(content);
  container.appendChild(buttonCopy)
  return container
}



export class NotesManager {
  $editor;
  canvas;

  _addEmptyMessage = () => {
    this.canvas.innerHTML = ''
    const message = createEl('p', 'Nada por aqui! Crie uma nova nota ou manda um Ctrl + V pra começar. 🚀', { class: 'empty-message' })
    this.canvas.appendChild(message)
  }

  _removeEmptyMessage = () => {
    const isEmptyMessage = this.canvas.querySelector('.empty-message');
    if (isEmptyMessage && isEmptyMessage.parentNode) {
      isEmptyMessage.parentNode.removeChild(isEmptyMessage);
    }
  }

  _addNote = (id, content, inserBefore) => {
    const noteHTML = createNote(content, id, {
      onClick: ({ currentTarget: note }) => {
        this.$editor.open(note.id, Array.from(note.children))
        note.blur()
      }
    });

    inserBefore ? this.canvas.prepend(noteHTML) : this.canvas.appendChild(noteHTML)
  }

  _removeNote = (id) => {
    const noteToDeleted = document.getElementById(id);
    if (noteToDeleted && noteToDeleted.parentNode) {
      noteToDeleted && noteToDeleted.parentNode?.removeChild(noteToDeleted);
    }
  }




  updateUI = (notes = [], hasExistingNotes = false, isClear = false) => {

    this._removeEmptyMessage()

    if (isClear) this._addEmptyMessage()

    for (const note of notes) {

      if (note.status === 'new') {
        this._addNote(note.id, note.content, hasExistingNotes)
      }

      if (note.status === 'deleted') {
        this._removeNote(note.id)
      }
    }
  }

  constructor(editor) {
    this.$editor = editor;
    this.canvas = document.querySelector('#notes-list');
  }
}
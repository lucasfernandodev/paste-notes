import { Note } from "../components/note.js";
import { createEl } from "./utils.js";


export class CanvasManager {
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
    const note = new Note(id, content)
    const noteHTML = note.mount({
      onclick: ({ currentTarget: note }) => {
        this.$editor.open(note.dataset.id, Array.from(note.children))
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
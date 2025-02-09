import { createEl, debounce } from "./main.js";

export class Editor {
  modal = document.querySelector('.modal');
  buttonCloseModal = this.modal.querySelector('.button-close-modal')
  buttonDeleteNote = this.modal.querySelector('.button-delete-note');
  updateAtElement = this.modal.querySelector('.updateTime')
  editor = this.modal.querySelector("#editor");
  onUpdateCallback = async () => { };
  onDeleteCallback = async () => { };

  updateId = (newId) => {
    if (newId) {
      const timeLocale = new Date(newId).toLocaleString()
      this.editor.setAttribute('data-id', newId);
      this.buttonDeleteNote.setAttribute('data-id', newId);
      this.updateAtElement.textContent = `Atualizado em ${timeLocale}`
    }
  }

  getEditorContent = () => {
    const htmlChildrens = Array.from(this.editor.children)
    const paragraphs = htmlChildrens.map(p => p.textContent).filter(p => p !== '');

    if (paragraphs.length === 0) {
      return [this.editor.textContent];
    }

    return paragraphs
  }

  open = (noteId, content) => {
    const timeLocale = new Date(noteId).toLocaleString()
    this.editor.innerHTML = ''
    this.modal.style.display = 'flex';
    this.editor.setAttribute('data-id', noteId);
    this.editor.setAttribute('data-open', 'true');
    this.buttonDeleteNote.setAttribute('data-id', noteId);
    this.updateAtElement.textContent = `Atualizado em ${timeLocale}`

    content.map(p => editor.appendChild(createEl('p', p.textContent, {})))
  }

  onUpdate = (cb) => {
    this.onUpdateCallback = () => cb(
      this.editor.getAttribute('data-id'),
      this.getEditorContent()
    )
  }

  onDelete = (cb) => {
    this.onDeleteCallback = () => cb(
      this.editor.getAttribute('data-id')
    )
  }

  handleDelete = async () => {
    try {
      await this.onDeleteCallback();
      this.close()
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  }

  handleInput = async () => {
    const loading = this.modal.querySelector('.loading');
    loading.textContent = 'loading...'
    try {
      const newId = await this.onUpdateCallback(); // Chama o callback armazenado
      this.updateId(newId)
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    }
    loading.textContent = ''
  }

  close = () => {
    this.modal.style.display = 'none'
    this.editor.setAttribute('data-open', 'false');
  }

  isOpen = () => JSON.parse(this.editor.getAttribute('data-open'))

  constructor() {
    this.buttonCloseModal.addEventListener('click', this.close)
    this.editor.addEventListener('input', debounce(() => this.handleInput(), 1000));
    this.buttonDeleteNote.addEventListener('click', this.handleDelete)
  }
}
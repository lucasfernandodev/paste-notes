import { copyToClipboard, createEl, mapperNotesToContent } from "../core/utils.js"

const clipbaord = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-copy"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" /><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" /></svg>'
const cliboardSuccess = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>'


export class Note {
  id = null;
  notes = []


  _createContainer = () => {
    return createEl('div', '', {
      id: this.id,
      class: 'container-notes', 
    })
  }

  _createHeader = () => {
    return createEl('div', '', {
      class: 'header'
    })
  }

  _createButtonCopy = () => {
    const button = createEl('button', '', {
      class: 'btn-copy',
      'data-id': this.id,
      onclick: async (ev) => {
        const button = ev.currentTarget;
        const containerHTML = document.getElementById(button.dataset.id)
        const contentHTML = containerHTML.querySelector('.content')
        const content = mapperNotesToContent(contentHTML.children)

        await copyToClipboard(content);

        button.innerHTML = `${cliboardSuccess} Nota copiada!`
        button.setAttribute('disabled', 'true');

        setTimeout(() => {
          button.innerHTML = `${clipbaord} Copiar Nota`
          button.removeAttribute('disabled')
        }, 1000)
      }
    })

    button.innerHTML = `${clipbaord} Copiar Nota`;

    return button;
  }

  _createContent = (props = {}) => {
    const content = createEl('div','', {
      'data-id': this.id,
      class: 'content',
      contenteditable: 'true',
      ...props
    })

    if (this.notes.length > 0) {
      this.notes.map(p => content.appendChild(createEl('p', p)))
    }

    return content;
  }

  mount = (props = {}) => {
    const container = this._createContainer();
    const header = this._createHeader();
    const buttonCopy = this._createButtonCopy()
    const content = this._createContent(props)

    header.appendChild(buttonCopy)

    container.appendChild(header);
    container.appendChild(content)

    return container
  }

  constructor(id, notes){
    this.id = id;
    this.notes = notes;
  }
}
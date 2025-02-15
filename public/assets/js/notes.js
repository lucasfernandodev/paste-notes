import { listNotes, saveNote, deleteNote, updateNote, getOwner } from './core/api.js';
import { Editor } from './core/editor.js';
import { loadingDialogConfigHandle } from './event-handlers/dialog-config.js';
import { modalDeleteAllNotesHandle } from './event-handlers/modal-delete-all-notes.js';
import { CanvasManager } from './core/canvas-manager.js';

class Notes {
  $editor = new Editor();
  buttonAddNote = document.querySelector('#add-note');
  manager = new CanvasManager(this.$editor);

  constructor(owner) {
    this.owner = owner;
    this._init()
  }




  _attach = (el, event, cb) => {
    el.addEventListener(event, cb);
  }




  _reloadNotes = async () => {
    const updates = [];
    const elements = document.querySelectorAll('.container-notes')
    const currentNotesId = new Set([...elements].map(n => n.id));
    const retrievedNotes = new Map((await listNotes(this.owner) || []).map(n => [n.id, n.content]));

    if (retrievedNotes.size === 0) {
      this.manager.updateUI([], false, true);
      return;
    }

    currentNotesId.forEach(id => {
      if (!retrievedNotes.has(id)) {
        updates.push({ id, status: 'deleted' });
      }
    });

    retrievedNotes.forEach((content, id) => {
      if (!currentNotesId.has(id)) {
        updates.push({ id, content, status: 'new' });
      }
    })


    this.manager.updateUI(
      updates,
      currentNotesId.size !== 0 ? true : false,
      retrievedNotes.size === 0
    )
  }




  _addNewNote = async () => {
    await saveNote({
      owner: this.owner,
      note: {
        id: new Date().toISOString(),
        content: ['Nota criada, continuar editando']
      }
    })

    await this._reloadNotes()
  }



  _addNewNoteFromPaste = async (ev) => {
    if (this.$editor.isOpen()) return;

    ev.preventDefault();
    const clipboardData = ev?.clipboardData || window?.clipboardData;
    const pastedText = clipboardData.getData('text/plain');

    if (!pastedText) return;

    await saveNote({
      owner: this.owner,
      note: {
        id: new Date().toISOString(),
        content: pastedText.split('\n')
      }
    })

    await this._reloadNotes()
  }




  _updateNote = async (noteId, content) => {
    const data = await updateNote({
      owner: this.owner,
      note: {
        id: noteId,
        content: content
      }
    })
    await this._reloadNotes()
    return data.id
  }




  _deleteNote = async (id) => {
    await deleteNote(this.owner, id)
    await this._reloadNotes()
  }


  _setupEvents = () => {
    this._attach(this.buttonAddNote, 'click', this._addNewNote)
    this._attach(window, 'paste', this._addNewNoteFromPaste)
    this.$editor.onUpdate(async (noteId, content) => this._updateNote(noteId, content))
    this.$editor.onDelete(async (id) => this._deleteNote(id))
    modalDeleteAllNotesHandle(this.owner, {
      onSuccess: this._reloadNotes
    })

    // Open Menu
    loadingDialogConfigHandle()
  }




  _init = () => {
    this._setupEvents();
    this._reloadNotes()
    setInterval(() => {
      this._reloadNotes()
    }, 5000)
  }
}


window.onload = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const owner = urlParams.get('owner');

  if (!owner) {
    window.location.replace(`/`)
  }

  const isOwnerRegistred = await getOwner(owner);

  if (!isOwnerRegistred) {
    window.location.replace(`/`)
  }

  new Notes(owner)

}
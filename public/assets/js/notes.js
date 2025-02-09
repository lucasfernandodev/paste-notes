import { listNotes, saveNote, deleteNote, updateNote, deleteAllNote, getOwner } from './api.js';
import { Editor } from './editor.js';
import { loadingDialogConfigHandle } from './event-handlers/dialog-config.js';
import { modalDeleteAllNotesHandle } from './event-handlers/modal-delete-all-notes.js';
import { createEl } from './main.js';
import { createNote } from './notes-manager.js';

async function core() {
  const buttonAddnote = document.querySelector('#add-note');
  const board = document.querySelector('#notes-list');
  const urlParams = new URLSearchParams(window.location.search);
  const owner = urlParams.get('owner');

  if (!owner) {
    window.location.replace(`/`)
  }

  const isOwnerRegistred = await getOwner(owner);

  if (!isOwnerRegistred) {
    window.location.replace(`/`)
  }

  const $editor = new Editor();

  const fetchAndRenderNotes = async () => {
    document.querySelector('.notes').scrollTo({ top: 0, left: 0, behavior: "smooth" });

    const existingNotes = new Map(Array.from(
      board.querySelectorAll('.container-notes')).map(el => [el.id, el])
    )

    const notes = await listNotes(owner);

    if (notes.length === 0) {
      board.innerHTML = '';
      const message = createEl('p', 'Nada por aqui! Crie uma nova nota ou manda um Ctrl + V pra começar. 🚀', { class: 'empty-message' })
      board.appendChild(message)
    } else {
      const isMessage = board.querySelector('.empty-message')
      if (isMessage) {
        board.removeChild(isMessage)
      }
    }

    const hasExistingNotes = existingNotes.size > 0

    for (const note of notes) {

      if (!existingNotes.has(note.id)) {

        const noteHTML = createNote(note.content, note.id, {
          onClick: ({ currentTarget: note }) => {
            $editor.open(note.id, Array.from(note.children))
          }
        });

        hasExistingNotes ? board.prepend(noteHTML) : board.appendChild(noteHTML)
      } else {
        existingNotes.delete(note.id)
      }
    }

    for (const [id, element] of existingNotes) {
      if (board.contains(element)) { // Verifica se o nó ainda existe no board
        board.removeChild(element);
      }
    }
  }

  const persistNoteFromPaste = async (ev) => {

    if ($editor.isOpen()) return;

    ev.preventDefault();
    const clipboardData = ev?.clipboardData || window?.clipboardData;
    const pastedText = clipboardData.getData('text/plain');

    if (!pastedText) return;

    await saveNote({
      owner,
      note: {
        id: new Date().toISOString(),
        content: pastedText.split('\n')
      }
    })


    await fetchAndRenderNotes()
  }

  const persistNote = async () => {
    await saveNote({
      owner,
      note: {
        id: new Date().toISOString(),
        content: ['Nota criada, continuar editando']
      }
    })

    await fetchAndRenderNotes()
  }

  $editor.onDelete(async (id) => {
    await deleteNote(owner, id) 
    await fetchAndRenderNotes()
  })

  $editor.onUpdate(async (noteId, content) => {
    const data = await updateNote({
      owner,
      note: {
        id: noteId,
        content: content
      }
    })

    await fetchAndRenderNotes()
    return data.id
  })

  buttonAddnote.addEventListener('click', persistNote)
  document.addEventListener('paste', persistNoteFromPaste)



  loadingDialogConfigHandle()
  modalDeleteAllNotesHandle(owner, {
    onSuccess: fetchAndRenderNotes
  })

  await fetchAndRenderNotes()
}

core().catch(console.error)



import { deleteAllNote } from "../api.js";

export const modalDeleteAllNotesHandle = async (owner, {onSuccess = async () => {}}) => {


  const modalConfigDelete = document.querySelector('.modal-confirm');
  const buttonCloseModalConfigDelete = modalConfigDelete.querySelector('.button-close-modal')
  const buttonOpenDeleteAllnNotesModal = document.getElementById('button-delete-all-notes');
  const cancelDeleteAllNoteButton = modalConfigDelete.querySelector('.btn-cancel');
  const buttonDeleteAllNote = modalConfigDelete.querySelector('.btn-confirm');

  buttonOpenDeleteAllnNotesModal.addEventListener('click', () => {
    modalConfigDelete.classList.toggle('open')
  })

  buttonCloseModalConfigDelete.addEventListener('click', () => {
    modalConfigDelete.classList.toggle('open')
  })

  cancelDeleteAllNoteButton.addEventListener('click', () => {
    modalConfigDelete.classList.toggle('open')
  })

  buttonDeleteAllNote.addEventListener('click', async () => {
    buttonDeleteAllNote.setAttribute('disable', 'true');
    buttonDeleteAllNote.textContent = 'loading...'

    const isDeletedAll = await deleteAllNote(owner);

    if (isDeletedAll) {
      buttonDeleteAllNote.setAttribute('disable', 'false');
      buttonDeleteAllNote.textContent = 'Excluir'
      modalConfigDelete.classList.toggle('open')
      await onSuccess()
      return;
    }

    buttonDeleteAllNote.setAttribute('disable', 'false');
    buttonDeleteAllNote.textContent = 'Excluir'
    modalConfigDelete.classList.toggle('open')

    alert('Não foi possivel deletar todas as notas')
  })  
}
import { Toast } from "../components/toast.js";
import { deleteAllNote } from "../core/api.js";

export const modalDeleteAllNotesHandle = async (owner, {onSuccess = async () => {}}) => {

  const modalConfirmDelete = document.querySelector('.modal-confirm');
  const buttonCloseModalConfigDelete = modalConfirmDelete.querySelector('.button-close-modal')
  const buttonOpenDeleteAllnNotesModal = document.getElementById('button-delete-all-notes');
  const buttonCancel = modalConfirmDelete.querySelector('.btn-cancel');
  const buttonDeleteAllNote = modalConfirmDelete.querySelector('.btn-confirm');

  buttonOpenDeleteAllnNotesModal.addEventListener('click', () => {
    modalConfirmDelete.classList.toggle('open')
  })

  buttonCloseModalConfigDelete.addEventListener('click', () => {
    modalConfirmDelete.classList.toggle('open')
  })

  buttonCancel.addEventListener('click', () => {
    modalConfirmDelete.classList.toggle('open')
  })

  buttonDeleteAllNote.addEventListener('click', async () => {
    buttonDeleteAllNote.setAttribute('disable', 'true');
    buttonDeleteAllNote.textContent = 'loading...'

    const isDeletedAll = await deleteAllNote(owner);

    if (isDeletedAll) {
      buttonDeleteAllNote.setAttribute('disable', 'false');
      buttonDeleteAllNote.textContent = 'Excluir'
      modalConfirmDelete.classList.toggle('open')
      await onSuccess()
      return;
    }

    buttonDeleteAllNote.setAttribute('disable', 'false');
    buttonDeleteAllNote.textContent = 'Excluir'
    modalConfirmDelete.classList.toggle('open')

    const toast = new Toast()

    toast.add('Não foi possivel deletar todas as notas')
  })  
}
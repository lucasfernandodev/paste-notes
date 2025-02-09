export const loadingDialogConfigHandle = () => {
  const dialogConfig = document.getElementById('dialog-config-menu')
  const openDialogConfigButton = document.getElementById('open-dialog-config');

  openDialogConfigButton.addEventListener('click', () => {
    if (dialogConfig.classList.contains('open')) {
      dialogConfig.classList.remove('open')

    } else {
      dialogConfig.classList.add('open')
      dialogConfig.focus()
    }
  })

  dialogConfig.onblur = () => {
    setTimeout(() => {
      dialogConfig.classList.remove('open')
    }, 250)
  }
}
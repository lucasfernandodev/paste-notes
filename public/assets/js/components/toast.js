  const toastTemplate = content => (`
  <div class="toast">
    <div class="inner">
      <p>${content}</p>
    </div>
    <div class="container-btn">
      <button type="button" class="button-close">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor"
                  fill="none">
                  <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor"
                    stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </button>
    </div>
  </div>
  `)
  
export class Toast{
    timeout = null;
    delete = (id) => {
      const element = document.getElementById(id);
      if (element && element.parentNode) {
          element.parentNode.removeChild(element);
      }
  
      const toasts = Array.from(document.querySelectorAll('.toast') || []);
      toasts.map((toast, index) => {
        const defaultTopPosition = toasts.length === 0 ? 64 : (64 * (index + 1));
        toast.style.top = `${defaultTopPosition}px`
      })
      clearTimeout(this.timeout)
    }
  
    add = (message) => {
      const toasts = Array.from(document.querySelectorAll('.toast') || []);
      const toastsLength = toasts.length
      const defaultTopPosition = toastsLength === 0 ? 64 : (64 * (toastsLength + 1));
  
      const generatedId = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
      const fragment = document.createRange().createContextualFragment(toastTemplate(message)); 
      const toastEl = fragment.firstElementChild;
      toastEl.setAttribute('id', generatedId);
      toastEl.style.top = `${defaultTopPosition}px`
      const buttonClose = toastEl.querySelector('.button-close');
      buttonClose.onclick = () => {
        const deleteNoteTimeout = () => {
          this.delete(generatedId)
        }
        clearTimeout(this.timeout)
        this.timeout = setTimeout(deleteNoteTimeout, 250)
      }
  
      document.querySelector('body').appendChild(toastEl)
      const deleteNoteTimeout = () => {
        this.delete(generatedId)
      }
  
      this.timeout = setTimeout(deleteNoteTimeout, 2000)
    }
  }
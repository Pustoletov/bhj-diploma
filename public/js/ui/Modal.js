
class Modal {
  constructor(element) {
    if (element === undefined) {
      throw new Error("пустой элемент")
    } else {
      this.element = element;
      this.registerEvents();
    }
  }
  
  open() {
    this.element.style.display = "block";
  }

  close(){
    this.element.style.display = "none";
  }
  
  onClose(e) {
    this.close();
    e.preventDefault();
  }

  registerEvents() {
    const dataDismiss = Array.from(this.element.querySelectorAll('[data-dismiss="modal"]'));
    dataDismiss.forEach(elem => {
      elem.addEventListener('click', () => {
        this.onClose();
      });
    })
  }
}
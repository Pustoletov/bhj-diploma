/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  constructor(element) {
    if (element === undefined) {
      throw new Error("пустой элемент")
    } else {
      this.element = element;
      this.registerEvents();
    }
  }

  registerEvents() {
    this.element.addEventListener('submit', (e) => {
      e.preventDefault(); 
      this.submit();
    });
  }

  getData() {
    let data = {}
    let form = this.element
    for (let atr of form) {
      data[atr.name] = atr.value;
    }
    return data;
  }

  onSubmit(options){

  }

  submit() {
    this.onSubmit(this.getData());
  }
}
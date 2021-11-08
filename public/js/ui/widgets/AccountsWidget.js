/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  constructor( element ) {
    if (element === undefined) {
      throw new Error("пустой элемент")
    } else {
      this.element = element;
      this.registerEvents();
      this.update();
    }
  }

  registerEvents() {
    this.element.addEventListener('click', (elem) => {
      if (elem.target.classList.contains('create-account')) {
        App.getModal('createAccount').open();
      } else if (elem.target.closest('.account')) {
        this.onSelectAccount(elem.target.closest('.account'));
      }
    });
  }

  update() {
    if (User.current())  {
      Account.list(User.current(), (err, response) => {
        if (response.success ===  true) {
          this.clear();
          this.renderItem(response.data);
        }
      });
    }
  }

  clear() {
    const accounts = this.element.querySelectorAll('.account');
    accounts.forEach(elem => 
      elem.remove()
    );
  }

  onSelectAccount( element ) {
    element.classList.add('active');
    const accounts = Array.from(document.querySelectorAll('.account'));
    accounts.forEach(elem => 
      elem.classList.remove('active')
    );

    App.showPage('transactions', {
      account_id: element.dataset.id
    });
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    return `
    <li class="account" data-id="${item.id}">
        <a href="#">
          <span>${item.name}</span> /
          <span>${item.sum}</span>
        </a>
    </li>`
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    data.forEach(elm => {
      document.querySelector(".accounts-panel").innerHTML += this.getAccountHTML(elm);
    });
  }
}

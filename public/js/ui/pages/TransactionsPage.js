/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  constructor( element ) {
    if (element === undefined) {
      throw new Error("пустой элемент")
    } else {
      this.element = element;
      this.registerEvents();
    }
  }

  update() {
    this.render();
    if (this.lastOptions !== undefined) {
      this.render(this.lastOptions);
    }
  }

  registerEvents() {
    this.element.addEventListener("click", (event) => {
      event.preventDefault();
      const removeAccBtn = event.target.closest(".remove-account");
      const removeTransactionBtn = event.target.closest(".transaction__remove");
      if (removeAccBtn) {
        this.removeAccount();
      }

      if (removeTransactionBtn) {
        this.removeTransaction(removeTransactionBtn.dataset.id);
      }
    });
  }

  removeAccount() {
    if (this.lastOptions) {
      if (confirm("Вы действительно хотите удалить счёт?")) {
        Account.remove({id: this.lastOptions.account_id}, (err, response) => {
          if (response.success === true) {
            App.updateWidgets();
          }
        this.clear();
        });
      }
    }
  }

  removeTransaction( id ) {
    if (confirm("Вы действительно хотите удалить эту транзакцию?")) {
      Transaction.remove({id}, (err, response) => {
        if(response.success === true) {
          App.update();
        }
      });
    }
  }

  render(options){
    if (options) {
      this.lastOptions = options;

      Account.get(options.account_id, (err, response) => {
        if (response) {
          this.renderTitle(response.data.name);
        }

        Transaction.list(options, (err, response) => {
          if (response) {
            this.renderTransactions(response.data);
          }
        });
      });
    }
  }

  clear() {
    this.renderTransactions([]);
        this.renderTitle("Название счёта");
        this.lastOptions = " ";
  }

  renderTitle(name){
    const title = document.querySelector(".content-title")
    title.textContent = name;
  }

  formatDate(date){
    const created = new Date(date);
    const createdDate = created.toLocaleDateString("ru-Ru", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const createdTime = created.toLocaleTimeString("ru-Ru", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${createdDate} в ${createdTime}`;
  }

  getTransactionHTML(item){
    return `<div class="transaction transaction_${item.type.toLowerCase()} row">
    <div class="col-md-7 transaction__details">
      <div class="transaction__icon">
          <span class="fa fa-money fa-2x"></span>
      </div>
      <div class="transaction__info">
          <h4 class="transaction__title">${item.name}</h4>
          
          <div class="transaction__date">${this.formatDate(item.created_at)}</div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="transaction__summ">
      ${item.sum} 
      <span class="currency black-rub">P</span>
      </div>
    </div>
    <div class="col-md-2 transaction__controls">
        <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>  
        </button>
    </div>
</div>`
  }

  renderTransactions(data){
    this.element.querySelector(".content").innerHTML = '';
    data.forEach(item => {
      this.element.querySelector(".content").innerHTML += this.getTransactionHTML(item);
    });
  }
}
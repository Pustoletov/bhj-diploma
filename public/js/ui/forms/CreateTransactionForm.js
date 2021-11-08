/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {

  constructor(element) {
    super(element)
    this.renderAccountsList();
  }

  renderAccountsList() {
    Account.list(User.current(), (err, response) => {
      if(response.success === true) {
        this.element.querySelector('.accounts-select').innerHTML = '';
        response.data.forEach(elem => {
          this.element.querySelector('.accounts-select').innerHTML += `<option value="${elem.id}">${elem.name}</option>`;
        });
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response.success === true) {
        this.element.reset();
        App.getModal("newExpense").close();
        App.getModal("newIncome").close();
        App.update();
      }
    });
  }
}
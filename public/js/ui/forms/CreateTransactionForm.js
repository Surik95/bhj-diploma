/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(User.current(), (err, response) => {
      if (response.success === true) {
        this.element.querySelector('select').textContent = '';
        for (let item of response.data) {
          this.element
            .querySelector('select')
            .insertAdjacentHTML(
              'beforeend',
              `<option value="${item.id}">${item.name}</option>`
            );
        }
      } else {
        console.log(err);
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
        if (this.element === document.querySelector('#new-income-form')) {
          App.update();
          this.element.reset();
          App.modals.newIncome.close();
        } else {
          App.update();
          this.element.reset();
          App.modals.newExpense.close();
        }
      } else {
        alert(err);
      }
    });
  }
}

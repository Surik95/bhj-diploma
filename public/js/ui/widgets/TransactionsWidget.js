/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (element) {
      this.element = element;
      this.registerEvents();
    } else {
      throw new Error('Отсутствует параметр');
    }
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const createIncome = document.querySelector('.create-income-button');
    const createExpense = document.querySelector('.create-expense-button');
    const modalIncome = App.getModal('newIncome');
    const modalExpense = App.getModal('newExpense');

    if (createIncome) {
      createIncome.addEventListener('click', (e) => {
        modalIncome.open();
      });
    }
    if (createExpense) {
      createExpense.addEventListener('click', (e) => {
        modalExpense.open();
      });
    }
  }
}

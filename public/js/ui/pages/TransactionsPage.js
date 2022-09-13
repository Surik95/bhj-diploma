/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if (!element) {
      throw new Error('Отсутствует параметр');
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render();
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    this.element.addEventListener('click', (event) => {
      const removeAcountButton = event.target.closest('button.remove-account');
      const removeTransactionButton = event.target.closest(
        'button.transaction__remove'
      );
      if (removeAcountButton) {
        this.removeAccount();
      }

      if (removeTransactionButton) {
        this.removeTransaction(removeTransactionButton.dataset.id);
      }
    });
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
   * либо обновляйте только виджет со счетами и формы создания дохода и расхода
   * для обновления приложения
   * */
  removeAccount() {
    if (this.lastOptions === undefined) {
      return;
    }
    const question = confirm('Вы действительно хотите удалить счёт?');
    if (question) {
      Account.remove({ id: this.lastOptions.account_id }, (err, respone) => {
        if (respone.success === true) {
          App.updateWidgets();
          App.updateForms();
        } else {
          console.log(err);
        }
        this.clear();
      });
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction(id) {
    const question = confirm('Вы действительно хотите удалить эту транзакцию?');
    if (question) {
      Transaction.remove({ id }, (err, respone) => {
        if (respone.success === true) {
          App.update();
        } else {
          console.log(err);
        }
      });
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options) {
    this.lastOptions = options;
    if (this.lastOptions === undefined) {
      return;
    }

    Account.get(options.account_id, (err, response) => {
      if (response.success === true) {
        this.renderTitle(response.data.name);
      } else {
        console.log(err);
      }
    });
    Transaction.list(options, (err, response) => {
      if (response.success === true) {
        this.renderTransactions(response.data);
      } else {
        console.log(err);
      }
    });
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = undefined;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name) {
    this.element.querySelector('.content-title').innerText = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   *
   * */
  formatDate(date) {
    let year = date.slice(0, 4);
    let month = Number(date.slice(5, 7));
    let day = date.slice(8, 10);
    let hours = date.slice(11, 13);
    let minutes = date.slice(14, 16);

    switch (month) {
      case 1:
        month = 'января';
        break;
      case 2:
        month = 'февраля';
        break;
      case 3:
        month = 'мартf';
        break;
      case 4:
        month = 'апреля';
        break;
      case 5:
        month = 'мая';
        break;
      case 6:
        month = 'июня';
        break;
      case 7:
        month = 'июля';
        break;
      case 8:
        month = 'августа';
        break;
      case 9:
        month = 'сентябр';
        break;
      case 10:
        month = 'октября';
        break;
      case 11:
        month = 'ноября;';
        break;
      default:
        month = 'декабря';
    }

    return `${day} ${month} ${year} г. в ${hours}:${minutes}`;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item) {
    return `<div class="transaction transaction_${item.type} row">
    <div class="col-md-7 transaction__details">
      <div class="transaction__icon">
          <span class="fa fa-money fa-2x"></span>
      </div>
      <div class="transaction__info">
          <h4 class="transaction__title">${item.name}</h4>
          <div class="transaction__date">${this.formatDate(
            item.created_at
          )}</div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="transaction__summ">
          <span class="currency">${item.sum}₽</span>
      </div>
    </div>
    <div class="col-md-2 transaction__controls">
        <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>  
        </button>
    </div>
</div>`;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data) {
    const content = this.element.querySelector('.content');
    content.textContent = '';
    for (let item of data) {
      const div = document.createElement('div');
      const section = document.createElement('section');
      const heading = document.createElement('h1');

      div.classList.add('content-wrapper');
      section.classList.add('content-header');

      heading.insertAdjacentHTML('beforeend', this.getTransactionHTML(item));

      content.appendChild(div).appendChild(section).appendChild(heading);
    }
  }
}

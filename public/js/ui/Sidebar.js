/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const burger = document.querySelector('.sidebar-toggle');
    burger.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.classList.toggle('sidebar-open');
      document.body.classList.toggle('sidebar-close');
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const buttonRegister = document.querySelector('.menu-item_register');
    const buttonLogin = document.querySelector('.menu-item_login');
    const buttonExit = document.querySelector('.menu-item_logout');
    const modalRegister = App.getModal('register');
    const modalLogin = App.getModal('login');

    buttonRegister.addEventListener('click', (e) => {
      e.preventDefault();
      modalRegister.open();
    });

    buttonRegister.addEventListener('click', (e) => {
      e.preventDefault();
      modalRegister.open();
    });

    buttonLogin.addEventListener('click', (e) => {
      e.preventDefault();
      modalLogin.open();
    });

    buttonExit.addEventListener('click', (e) => {
      e.preventDefault();
      User.logout((err, response) => {
        if (response.success === true) {
          App.setState('init');
        } else {
          console.log(err);
        }
      });
    });
  }
}

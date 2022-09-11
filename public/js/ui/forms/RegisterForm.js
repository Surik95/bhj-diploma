/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.register(data, (err, response) => {
      if (response.success === true) {
        App.modals.register.element.querySelector('form').reset();
        App.setState('user-logged');
        App.modals.register.close();
      } else {
        console.log(err);
      }
    });
  }
}

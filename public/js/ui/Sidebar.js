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

  static initToggleButton() {
    const sidebarMini = document.querySelector(".sidebar-mini");
    const sidebarToggle = document.querySelector(".sidebar-toggle");
    sidebarToggle.addEventListener("click", ()=>{
      sidebarMini.classList.toggle("sidebar-open");
      sidebarMini.classList.toggle("sidebar-collapse");
    })
  }
  
  static initAuthLinks() {
    const menuItemRegister = document.querySelector(".menu-item_register");
    menuItemRegister.addEventListener("click", ()=> {
      const modal = App.getModal("register");
      modal.open();
    });

    const menuItemLogin = document.querySelector(".menu-item_login");
    menuItemLogin.addEventListener("click", ()=> {
      const modal = App.getModal("login");
      modal.open();
    });

    const menuItemLogout = document.querySelector(".menu-item_logout");
    menuItemLogout.addEventListener("click", ()=> {
      const modal = User.logout({}, (err, response) => {
        if (response.success = true) {
          App.setState('init');
        }
      }) 
    });
  }
}
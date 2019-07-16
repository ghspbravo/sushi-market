const MENU_OPEN_CLASSNAME = 'js-menu-open',
  MENU_CLOSE_CLASSNAME = 'js-menu-close',
  MENU_ID = 'nav-menu',
  OPEN_CLASSNAME = 'open'

document.addEventListener('DOMContentLoaded', function () {

  const openMenuNodes = [...document.getElementsByClassName(MENU_OPEN_CLASSNAME)],
    closeMenuNodes = [...document.getElementsByClassName(MENU_CLOSE_CLASSNAME)],
    menuNode = document.getElementById(MENU_ID)


  openMenuNodes.forEach(item => item.addEventListener('click', () => openMenu(menuNode)))
  closeMenuNodes.forEach(item => item.addEventListener('click', () => closeMenu(menuNode)))
})

/**
 * Handle menu open
 * @param {HTMLElement} menu menu node
 */
function openMenu(menu) {
  menu.classList.add(OPEN_CLASSNAME)
}

/**
 * Handle menu close
 * @param {HTMLElement} menu menu node
 */
function closeMenu(menu) {
  menu.classList.remove(OPEN_CLASSNAME)
}
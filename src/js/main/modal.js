const MODAL_INNER_CLASSNAME = 'js-modal-inner',
  MODAL_CLOSE_CLASSNAME = 'js-modal-close',
  MODAL_OPEN_CLASSNAME = 'js-modal-open'

document.addEventListener('DOMContentLoaded', function () {
  const modalInnerNodes = [...document.getElementsByClassName(MODAL_INNER_CLASSNAME)]
  const modalCloseNodes = [...document.getElementsByClassName(MODAL_CLOSE_CLASSNAME)]
  const modalOpenNodes = [...document.getElementsByClassName(MODAL_OPEN_CLASSNAME)]

  modalInnerNodes.forEach(item => item.addEventListener('click', modalInnerClickHandler))
  modalCloseNodes.forEach(item => item.addEventListener('click', modalCloseHandler))
  modalOpenNodes.forEach(item => item.addEventListener('click', modalOpenHandler))
})

function modalInnerClickHandler(e) {
  e.stopPropagation()
}

function modalCloseHandler(e) {
  try {
    const targetId = e.target.dataset.target
    closeModal(targetId)
  } catch (error) {
    alert(error.message)
  }
}

function modalOpenHandler(e) {
  try {
    const targetId = e.target.dataset.target
    openModal(targetId)
  } catch (error) {
    alert(error.message)
  }
}

const openModal = id => document.getElementById(id).classList.add('open')
const closeModal = id => document.getElementById(id).classList.remove('open')
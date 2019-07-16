const CART_SUBMIT_CLASSNAME = 'js-cart-submit',
  CART_ORDER_FORM_ID = 'cart-order-form',
  ORDER_BUTTON_CLASSNAME = 'js-order'

document.addEventListener('DOMContentLoaded', function () {
  const orderForm = document.getElementById(CART_ORDER_FORM_ID)

  const orderButtons = [...document.getElementsByClassName(ORDER_BUTTON_CLASSNAME)]

  orderForm.addEventListener('submit', orderSubmitHandler)

  orderButtons.forEach(button => button.addEventListener('click', orderInit))
})

function orderInit(e) {
  if (products.length === 0) return
  openModal('cart-order')
}

function orderSubmitHandler(e) {
  e.preventDefault()

  console.log('your order:')
  console.log(products)

  closeModal('cart-order')
  openModal('order-success')
}

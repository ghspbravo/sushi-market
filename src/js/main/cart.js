const CART_COUNTER_CLASSNAME = 'js-cart-count',
  PRODUCT_ITEM_CLASSNAME = 'js-product',
  PRODUCT_ADD_TO_CART_BUTTON_CLASSNAME = 'js-product-add',
  BASKET_ID = 'basket',
  BASKET_NOT_EMPTY_CLASSNAME = 'some',
  TOTAL_PRICE_CLASSNAME = 'js-total-price',
  TOTAL_COUNT_CLASSNAME = 'js-total-count',
  ITEM_NAME_CLASSNAME = 'js-product-name',
  CART_ENTRY_ID = 'js-cart-entry',
  ITEM_REMOVE_CLASSNAME = 'js-product-remove',
  ITEM_ADD_CLASSNAME = 'js-product-more',
  ITEM_LESS_CLASSNAME = 'js-product-less',
  ITEM_PRICE_CLASSNAME = 'js-product-price',
  ITEM_COUNT_CLASSNAME = 'js-product-count',
  CART_ITEM_CLASSNAME = 'js-cart-item'


let products = []
let totalCount = 0
let totalPrice = 0
let totalQuantity = 0

document.addEventListener('DOMContentLoaded', () => {

  const productsNodes = [...document.getElementsByClassName(PRODUCT_ITEM_CLASSNAME)]

  productsNodes.forEach(product => {
    const productDetails = product.dataset

    product.getElementsByClassName(PRODUCT_ADD_TO_CART_BUTTON_CLASSNAME)[0]
      .addEventListener('click', () => addToCart(productDetails))
  })

  if (hasStorage()) {
    getFromStorage()

    products.forEach(product => addNodeInBusket(product))
    updateGlobals()
  }

})

function updateGlobals() {
  updateTotalCount()
  updateTotalPrice()
  updateTotalQuantity()

  const cartCounterNodes = [...document.getElementsByClassName(CART_COUNTER_CLASSNAME)]
  cartCounterNodes.forEach(counter => totalQuantity > 0 ? counter.classList.add('show') : counter.classList.remove('show'))

}

const hasStorage = () => sessionStorage.getItem('products')

function placeInStorage() {
  sessionStorage.setItem('totalCount', totalCount)
  sessionStorage.setItem('totalPrice', totalPrice)
  sessionStorage.setItem('totalQuantity', totalQuantity)
  sessionStorage.setItem('products', JSON.stringify(products))
}

function clearStorage() {
  sessionStorage.clear()
}

function getFromStorage() {
  totalCount = parseInt(sessionStorage.getItem('totalCount'))
  totalPrice = parseInt(sessionStorage.getItem('totalPrice'))
  totalQuantity = parseInt(sessionStorage.getItem('totalQuantity'))
  products = JSON.parse(sessionStorage.getItem('products'))
}

function addToCart({ id, name, count, price }) {

  const existingProductIndex = products.findIndex(product => product.name === name)

  if (existingProductIndex !== -1) {
    addExisting(name)
    return
  }

  products.push({
    quantity: 1,
    id: parseInt(id), name, count: parseInt(count), price: parseInt(price)
  })

  totalCount += parseInt(count)
  totalPrice += parseInt(price)
  totalQuantity += 1

  updateGlobals()
  placeInStorage()

  addNodeInBusket({ id, name, price, quantity: 1 })
}

function addNodeInBusket({ id, name, price, quantity }) {
  const productNode = document.createElement('div')
  productNode.innerHTML = constructInner(id, name, price, quantity)

  const cartEntry = document.getElementById(CART_ENTRY_ID),
    basket = document.getElementById(BASKET_ID)


  basket.classList.add(BASKET_NOT_EMPTY_CLASSNAME)
  cartEntry.appendChild(productNode)

  productNode.getElementsByClassName(ITEM_ADD_CLASSNAME)[0]
    .addEventListener('click', () => addExisting(name))

  productNode.getElementsByClassName(ITEM_LESS_CLASSNAME)[0]
    .addEventListener('click', () => lessExisting(name))

  productNode.getElementsByClassName(ITEM_REMOVE_CLASSNAME)[0]
    .addEventListener('click', () => removeItem(name))

}

function addExisting(name) {
  const item = products.find(item => item.name === name)
  // const newProductIndex = products.findIndex(product => product.name === name)

  item.quantity += 1

  totalCount += item.count
  totalPrice += item.price
  totalQuantity += 1

  updateItem(item)
  updateGlobals()
  placeInStorage()
}

function lessExisting(name) {
  const item = products.find(item => item.name === name)

  item.quantity -= 1

  totalCount -= item.count
  totalPrice -= item.price
  totalQuantity -= 1

  if (item.quantity === 0) {

    removeItem(name)
  }
  else updateItem(item)
  updateGlobals()
  placeInStorage()
}

function removeItem(name) {
  const item = products.find(item => item.name === name)

  const productCount = item.quantity
  const itemNode = findProductInCart(item.name)

  itemNode.parentElement.remove()

  totalQuantity -= productCount
  totalCount -= item.quantity * item.count
  totalPrice -= item.quantity * item.price

  products = products.filter(product => product.name !== item.name)
  updateGlobals()
  if (totalQuantity === 0) {
    cartEmptyHandler()
  }
  placeInStorage()
}

function cartEmptyHandler() {
  const cartNode = document.getElementById(BASKET_ID)

  cartNode.classList.remove(BASKET_NOT_EMPTY_CLASSNAME)

  clearStorage()
}

function updateItem(item) {
  const itemNode = findProductInCart(item.name)

  updateInner(itemNode, item)
}

function findProductInCart(name) {

  const cart = document.getElementById(CART_ENTRY_ID)

  const item = [...cart.getElementsByClassName('cart-item')]
    .find(product => product.dataset.name === name)

  return item
}

function updateTotalPrice() {
  [...document.getElementsByClassName(TOTAL_PRICE_CLASSNAME)].forEach(price => price.innerHTML = totalPrice)
}

function updateTotalCount() {
  [...document.getElementsByClassName(TOTAL_COUNT_CLASSNAME)].forEach(count => count.innerHTML = totalCount)
}

function updateTotalQuantity() {
  [...document.getElementsByClassName(CART_COUNTER_CLASSNAME)].forEach(count => count.innerHTML = totalQuantity)
}

function updateInner(node, { price, quantity }) {

  node.dataset.price = price * quantity
  node.dataset.count = quantity

  node.getElementsByClassName(ITEM_PRICE_CLASSNAME)[0].innerHTML = price * quantity
  node.getElementsByClassName(ITEM_COUNT_CLASSNAME)[0].innerHTML = quantity
}

function constructInner(id, name, price, quantity) {
  return `<li 
  data-id="${id}"
  data-name="${name}"
  data-price="${price}"
  data-count="${quantity}"
  class="cart-item js-cart-item">
  <div class="cart-item__wrapper">
  
    <i class="arrow">></i>
  
    <div class="name">
      <span class="js-product-count quantity">${quantity}</span>
      <h4 class="js-product-name">${name}</h4>
  
      <div class="price"><span class="js-product-price">${price * quantity}</span> ₽</div>
  
      <button class="js-product-remove delete">X</button>
    </div>

    <div class="quantity-control">
      <button class="more js-product-more">+</button>
      <span class="sep"></span>
      <button class="less js-product-less">-</button>
    </div>
    
  </div>
  </li>`
}
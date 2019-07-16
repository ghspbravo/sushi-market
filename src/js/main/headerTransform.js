document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY

    document.querySelector('header').className = scrollTop > 50 ? 'decreased' : 'full'
  })
})
const SCROLLTO_CONTROLS_CLASSNAME = 'js-scrollTo'

document.addEventListener('DOMContentLoaded', () => {
  const controls = [...document.getElementsByClassName(SCROLLTO_CONTROLS_CLASSNAME)]

  controls.forEach(control => control.addEventListener('click', scrollToControlClickHandler))
})

function scrollToControlClickHandler(e) {
  const section = e.target.dataset.section

  try {
    const scrollToSections = [...document.getElementsByClassName(SCROLLSPY_SECTION_CLASSNAME)]

    const targetSection = scrollToSections.find(scrollSection => scrollSection.id === section)

    const offset = 20
    const headerHeight = document.querySelector('header').getBoundingClientRect().height;
    const scrollCoord = targetSection.getBoundingClientRect().top + window.pageYOffset

    window.scrollTo({
      top: scrollCoord - offset -headerHeight,
      behavior: 'smooth'
  });
  } catch (error) {
    console.error(error.message)
  }
}
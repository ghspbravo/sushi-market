const SCROLLSPY_SECTION_CLASSNAME = 'js-spy-section',
  SCROLLSPY_CONTROLS_CLASSNAME = 'js-spy-control'

const spySections = [...document.getElementsByClassName(SCROLLSPY_SECTION_CLASSNAME)],
  spyControls = [...document.getElementsByClassName(SCROLLSPY_CONTROLS_CLASSNAME)]

let currentSection = 'rolls'

document.addEventListener('DOMContentLoaded', () => {
  detectCurrentSection();

  window.addEventListener('scroll', detectCurrentSection)

})

function detectCurrentSection() {
  const sectionDetectOffset = 100

  const currentSection = spySections.find(section => {
    const headerHeight = document.querySelector('header').getBoundingClientRect().height;
    const { height, top } = section.getBoundingClientRect();
    return top - headerHeight - sectionDetectOffset < 0 && top + height > headerHeight;
  });
  try {
    const currentSectionId = currentSection.id;
    changeCurrentControl(currentSectionId);
  }
  catch (error) {
    console.warn('none section is in view');
  }
}

function changeCurrentControl(sectionId) {
  if (currentSection === sectionId) return

  currentSection = sectionId

  spyControls.find(control => control.classList.contains('active')).classList.remove('active')

  const spyControlForSection = spyControls.find(control => control.dataset.section === sectionId)
  spyControlForSection.classList.add('active')
}
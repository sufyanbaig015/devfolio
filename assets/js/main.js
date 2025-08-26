/*=============== NAVIGATION MENU ===============*/
const navMenu = document.querySelector('.nav__menu'),
    navToggle = document.querySelector('.nav__toggle'),
    navLinks = document.querySelectorAll('.nav__link'),
    sections = document.querySelectorAll('section[id]')

// Show/hide menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu')
    })
}

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
})

// Active link highlighting
function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50
        const sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault()
        const targetId = link.getAttribute('href')
        const targetSection = document.querySelector(targetId)
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 4 * 16 // Account for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            })
        }
    })
})

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    reset: true
})

sr.reveal('.home__data, .home__image', { delay: 600 })
sr.reveal('.home__greeting, .home__name, .home__profession', { delay: 700, interval: 100 })
sr.reveal('.home__description', { delay: 800 })
sr.reveal('.home__buttons', { delay: 900 })
sr.reveal('.home__social', { delay: 1000 })

sr.reveal('.about__description', { delay: 600 })
sr.reveal('.about__info', { delay: 700, interval: 100 })
sr.reveal('.about__buttons', { delay: 800 })

sr.reveal('.projects__card', { delay: 600, interval: 100 })

sr.reveal('.skills__content', { delay: 600, interval: 100 })

sr.reveal('.services__content', { delay: 600, interval: 100 })

sr.reveal('.contact__content', { delay: 600 })
sr.reveal('.contact__info', { delay: 700, interval: 100 })

/*=============== HEADER SCROLL EFFECT ===============*/
function scrollHeader() {
    const header = document.querySelector('.header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 200) header.classList.add('scroll-header')
    else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
// This function is already defined above, so we'll remove this duplicate

/*=============== PROJECTS TABS ===============*/
const projectTabs = document.querySelectorAll('.projects__tab')
const projectContents = document.querySelectorAll('.projects__content')

projectTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-target')
        
        // Remove active class from all tabs and contents
        projectTabs.forEach(t => t.classList.remove('active'))
        projectContents.forEach(content => content.classList.remove('active'))
        
        // Add active class to clicked tab and corresponding content
        tab.classList.add('active')
        document.querySelector(`[data-content="${target}"]`).classList.add('active')
    })
})

/*=============== PROJECTS MODAL ===============*/
const projectCards = document.querySelectorAll('.projects__card')

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const modal = card.querySelector('.projects__modal')
        if (modal) {
            modal.style.opacity = '1'
        }
    })

    card.addEventListener('mouseleave', () => {
        const modal = card.querySelector('.projects__modal')
        if (modal) {
            modal.style.opacity = '0'
        }
    })
})

/*=============== WHATSAPP CHAT ANIMATION ===============*/
const whatsappChat = document.querySelector('.whatsapp-chat')

if (whatsappChat) {
    // Add pulse animation on page load
    setTimeout(() => {
        whatsappChat.style.animation = 'pulse 2s infinite'
    }, 3000)

    // Add CSS for pulse animation
    const style = document.createElement('style')
    style.textContent = `
        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.1);
            }
            100% {
                transform: scale(1);
            }
        }
    `
    document.head.appendChild(style)
}

/*=============== SMOOTH SCROLLING FOR ALL INTERNAL LINKS ===============*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href'))
        if (target) {
            const offsetTop = target.offsetTop - 4 * 16 // Account for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            })
        }
    })
})

/*=============== LOADING ANIMATION ===============*/
window.addEventListener('load', () => {
    // Add a subtle fade-in effect for the entire page
    document.body.style.opacity = '0'
    document.body.style.transition = 'opacity 0.5s ease-in-out'
    
    setTimeout(() => {
        document.body.style.opacity = '1'
    }, 100)
})

/*=============== UPWORK ICON COLOR THEME ===============*/
function updateUpworkIconColor() {
    const upworkIcons = document.querySelectorAll('.upwork-icon')
    const isDarkTheme = document.body.classList.contains('dark-theme')
    
    upworkIcons.forEach(icon => {
        icon.style.fill = isDarkTheme ? '#f1f5f9' : '#1e293b'
    })
}

// Update icon color when theme changes
themeButton.addEventListener('click', updateUpworkIconColor)

// Update icon color on page load
document.addEventListener('DOMContentLoaded', updateUpworkIconColor)

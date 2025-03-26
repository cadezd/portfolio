let openMenuBtn = document.getElementById('open-menu-btn');
let menu = document.getElementById('menu');
let menuItems = menu.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');

openMenuBtn.addEventListener('click', function () {
    openMenuBtn.setAttribute('aria-expanded', 'true');
    openElement(menu);
    trapFocus(menu);
});

menuItems.forEach(function (item) {
    item.addEventListener('click', function () {
        openMenuBtn.setAttribute('aria-expanded', 'false');
        closeElement(menu);
    });
});

function openElement(element) {
    element.style.display = 'flex'; // Make sure menu is displayed before adding the 'open' class
    element.setAttribute('aria-hidden', 'false');
    setTimeout(function () {
        element.classList.remove('close');
        element.classList.add('open');
    }, 50); // Delay the addition of 'open' class slightly to ensure transition works properly
}

function closeElement(element) {
    element.setAttribute('aria-hidden', 'true');
    element.classList.remove('open');
    element.classList.add('close');
    element.addEventListener('transitionend', function () {
        element.style.display = 'none';
    }, {once: true});
}

// Function that traps the focus inside a specific element
function trapFocus(element) {
    let focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
    let firstFocusableEl = focusableEls[0];
    let lastFocusableEl = focusableEls[focusableEls.length - 1];
    let KEYCODE_TAB = 9;

    firstFocusableEl.focus();
    element.addEventListener('keydown', function (e) {
        let isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);

        if (!isTabPressed) {
            return;
        }

        if (e.shiftKey) /* shift + tab */ {
            if (document.activeElement === firstFocusableEl) {
                lastFocusableEl.focus();
                e.preventDefault();
            }
        } else /* tab */ {
            if (document.activeElement === lastFocusableEl) {
                firstFocusableEl.focus();
                e.preventDefault();
            }
        }
    });
}


window.onload = async () => {
    await renderProjects();
    await renderEducation();
    await renderExperience();
}

/* Render projects from json file */
async function renderProjects() {
    let projectsContainer = document.getElementById('projects-container');
    let projects = await readJSONFile('data/projects.json');
    for (let project of projects) {

        // Build image element
        let image = document.createElement('img');
        image.setAttribute('src', project.image);
        image.setAttribute('alt', '');
        image.setAttribute('class', 'object-cover aspect-square mb-4');
        image.setAttribute('role', 'presentation');

        // Build title element
        let title = document.createElement('h4');
        title.textContent = project.name;
        title.setAttribute('class', 'mb-1 font-Syne font-normal leading-[120%] text-[1.9rem] lg:text-[2vw]');

        // Build description element
        let description = document.createElement('p');
        description.textContent = project.description;
        description.setAttribute('class', 'font-Satoshi font-normal text-[1.1rem] leading-[160%] text-dark-grey-100');

        // Build link wrapper element
        let link = document.createElement('a');
        link.setAttribute('href', project.link);
        link.setAttribute('target', '_blank');
        // Add elements to link wrapper
        link.appendChild(image);
        link.appendChild(title);
        link.appendChild(description);

        // Build div wrapper element and append link wrapper
        let projectDiv = document.createElement('div');
        projectDiv.appendChild(link);

        // Append project div to projects container
        projectsContainer.appendChild(projectDiv);
    }
}


/* Render education from json file */
async function renderEducation() {
    let educationContainer = document.getElementById('education-container');
    let education = await readJSONFile('data/education.json');
    for (let i = 0; i < education.length; i++) {

        let item = education[i];

        // Build image element
        let image = document.createElement('img');
        image.setAttribute('src', item.image);
        image.setAttribute('alt', '');
        image.setAttribute('class', 'h-16 object-contain');
        image.setAttribute('role', 'presentation');

        // Build title element
        let title = document.createElement('h4');
        title.textContent = item.school;
        title.setAttribute('class', 'mb-1 font-Syne font-normal leading-[120%] text-[1.9rem] lg:text-[2vw]');

        // Build description element
        let description = document.createElement('p');
        description.textContent = item.description;
        description.setAttribute('class', 'font-Satoshi font-normal text-[1.1rem] leading-[160%] text-dark-grey-100');

        // Build div wrapper element and append title and description
        let titleAndDescriptionWrapper = document.createElement('div');
        titleAndDescriptionWrapper.appendChild(title);
        titleAndDescriptionWrapper.appendChild(description);

        // Build div wrapper element and append image and titleAndDescriptionWrapper
        let educationDiv = document.createElement('div');
        educationDiv.setAttribute('class', 'w-full grid grid-cols-[1fr] sm:grid-cols-[.25fr_1fr] grid-rows-* auto-cols-fr gap-4 lg:gap-8 content-stretch');
        educationDiv.appendChild(image);
        educationDiv.appendChild(titleAndDescriptionWrapper);

        // Append education div to education container
        educationContainer.appendChild(educationDiv);

        // Add line separator if not the last item
        if (i !== education.length - 1) {
            let line = document.createElement('div');
            line.setAttribute('class', 'h-full bg-dark-grey-200');
            educationContainer.appendChild(line);
        }
    }
}

/* Render experiences from json file */
async function renderExperience() {
    let experienceContainer = document.getElementById('experience-container');
    let experience = await readJSONFile('data/experience.json');
    for (let i = 0; i < experience.length; i++) {

        let item = experience[i];

        // Build image element
        let image = document.createElement('img');
        image.setAttribute('src', item.image);
        image.setAttribute('alt', '');
        image.setAttribute('class', 'h-16 object-contain');
        image.setAttribute('role', 'presentation');

        // Build title element
        let title = document.createElement('h4');
        title.textContent = item.company;
        title.setAttribute('class', 'mb-1 font-Syne font-normal leading-[120%] text-[1.9rem] lg:text-[2vw]');

        // Build description element
        let description = document.createElement('p');
        description.textContent = item.description;
        description.setAttribute('class', 'font-Satoshi font-normal text-[1.1rem] leading-[160%] text-dark-grey-100');

        // Build div wrapper element and append title and description
        let titleAndDescriptionWrapper = document.createElement('div');
        titleAndDescriptionWrapper.appendChild(title);
        titleAndDescriptionWrapper.appendChild(description);

        // Build div wrapper element and append image and titleAndDescriptionWrapper
        let experienceDiv = document.createElement('div');
        experienceDiv.setAttribute('class', 'w-full grid grid-cols-[1fr] sm:grid-cols-[.25fr_1fr] grid-rows-* auto-cols-fr gap-4 lg:gap-8 content-stretch');
        experienceDiv.appendChild(image);
        experienceDiv.appendChild(titleAndDescriptionWrapper);

        // Append education div to experience container
        experienceContainer.appendChild(experienceDiv);

        // Add line separator if not the last item
        if (i !== experience.length - 1) {
            let line = document.createElement('div');
            line.setAttribute('class', 'h-full bg-dark-grey-200');
            experienceContainer.appendChild(line);
        }
    }
}

async function readJSONFile(file) {
    let response = await fetch(file);
    return await response.json();
}


const responsiveNavbar = document.getElementById("responsiveNavbar");
const openNav = document.getElementById("openNav");
const closeNav = document.getElementById("closeNav");


openNav.addEventListener('click', () => {
    responsiveNavbar.style.width = "100%"
})
closeNav.addEventListener('click', () => {
    responsiveNavbar.style.width = "0%"
})


const contactForm = document.getElementById("contactForm");
const overlay = document.getElementById("overlay");
const openContactForm = document.getElementsByClassName("openContactForm");

Array.from(openContactForm).forEach(button => {
    button.addEventListener('click', () => {
        overlay.style.display = 'block';
        contactForm.style.display = 'flex';

        setTimeout(() => {
            overlay.style.opacity = '1';
            contactForm.style.opacity = '1';
        }, 50);
    });
});

overlay.addEventListener('click', () => {
    overlay.style.opacity = '0';
    contactForm.style.opacity = '0';

    setTimeout(() => {
        overlay.style.display = 'none';
        contactForm.style.display = 'none';
    }, 500);
});



// ===========


// Fetch country data from API
async function fetchCountryData() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();

        // Extract necessary information and sort by country name
        const countries = data.map(country => ({
            code: country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : ""), // Dialing code
            name: country.name.common, // Country name
            flag: country.flags.svg, // Flag URL
        })).filter(country => country.code).sort((a, b) => a.name.localeCompare(b.name));

        return countries;
    } catch (error) {
        console.error('Error fetching country data:', error);
        return [];
    }
}

// Populate dropdown with country data
function populateDropdown(dropdown, countries) {
    countries.forEach(country => {
        const li = document.createElement('li');
        li.className = 'flex items-center gap-2 p-2 transition-all duration-500 hover:bg-gray-200 cursor-pointer';
        li.setAttribute('data-flag', country.flag);
        li.setAttribute('data-code', country.code); // Correct dialing code
        li.innerHTML = `
            <img src="${country.flag}" alt="${country.name} Flag" class="w-6 h-4">
            <div class="flex items-center justify-between w-full">
                <span class="text-gray-700">${country.name}</span>
                <span class="text-gray-500">${country.code}</span>
            </div>
        `;
        dropdown.appendChild(li);
    });
}

// Initialize dropdowns
async function initializeDropdowns() {
    const countries = await fetchCountryData();

    // Select all instances of dropdown containers
    const dropdownContainers = document.querySelectorAll('.dropdown-container');

    dropdownContainers.forEach(container => {
        const selected = container.querySelector('.selected');
        const dropdown = container.querySelector('.dropdown');

        // Populate the dropdown with country data
        populateDropdown(dropdown, countries);

        // Dropdown toggle
        selected.addEventListener('click', () => {
            dropdown.classList.toggle('hidden');
        });

        // Handle selection
        dropdown.addEventListener('click', (e) => {
            const item = e.target.closest('li');
            if (item) {
                const flag = item.getAttribute('data-flag');
                const code = item.getAttribute('data-code');

                // Update selected option
                selected.innerHTML = `
                    <img src="${flag}" alt="Flag" class="w-6 h-4">
                    <span class="text-gray-700">${code}</span>
                `;

                // Hide dropdown
                dropdown.classList.add('hidden');
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && !selected.contains(e.target)) {
                dropdown.classList.add('hidden');
            }
        });
    });
}

// Fetch and initialize dropdowns
initializeDropdowns();

const links = document.getElementById("links")
const closeLinks = document.getElementById("closeLinks")
const openLinks = document.getElementById("openLinks")

openLinks.addEventListener('click', () => {
    links.style.display = "flex"
    links.style.opacity = "1"
    closeLinks.style.opacity = "1"
    openLinks.style.opacity = "0"

})

closeLinks.addEventListener('click', () => {
    links.style.opacity = "0"
    closeLinks.style.opacity = "0"
    openLinks.style.opacity = "1"
    setTimeout(() => {
        links.style.display = "none"
    }, 500)
})



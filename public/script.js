// dropDownButton
document.addEventListener("DOMContentLoaded", function () {
  const dropdownToggle = document.getElementById("dropdownButton");
  const dropdownMenu = document.getElementById("dropdownMenu");

  dropdownToggle.addEventListener("click", function () {
    if (dropdownMenu.style.display === "none") {
      dropdownMenu.style.display = "block";
    } else {
      dropdownMenu.style.display = "none";
    }
  });
});

// select regions
const dropdownItems = dropdownMenu.querySelectorAll("a");
dropdownItems.forEach(function (item) {
  item.addEventListener("click", function () {
    const selectedRegion = item.textContent.trim();
    if(selectedRegion === "All"){
      fetchAndDisplayCountries()
    }
    else{
      fetchAndDisplayCountries(selectedRegion);
    }
    availableCountryMessage.classList.add("hidden"); // remove message when select a region
  });
});

// load all countries initially
fetchAndDisplayCountries();

// countries API
function fetchAndDisplayCountries(region = "") {
  const url = region
    ? `https://restcountries.com/v3.1/region/${region}`
    : "https://restcountries.com/v3.1/all";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const countriesContainer = document.getElementById("countries");
      countriesContainer.innerHTML = ""; // clear previous countries
      
      data.forEach((country) => {
        const countryDiv = document.createElement("div");
        countryDiv.classList.add(
          "flex",
          "flex-col",
          "min-h-400",
          "shadow-sm",
          "rounded-lg",
          "bg-white",
          "overflow-hidden",
          "mb-10",
          "cursor-pointer",
          "w-64",
          "h-96",
          "country-card",
          "dark:bg-[#2b3945]",
          "dark:shadow-xl"
        );
        countryDiv.innerHTML = `
          <div class="h-52">
            <img src="${country.flags.png}" alt="${country.name.common} flag" class="object-fit w-full h-full">
          </div>
          <div class="flex flex-col px-4 py-6">
            <h3 class="font-bold text-lg mb-4 tracking-wide dark:text-[#fafafa]">${country.name.common}</h3>
            <p class="text-gray-900 dark:text-[#fafafa]"><span class="font-semibold">Population: </span>${country.population}</p>
            <p class="text-gray-900 dark:text-[#fafafa]"><span class="font-semibold">Region: </span>${country.region}</p>
            <p class="text-gray-900 dark:text-[#fafafa] capital"><span class="font-semibold">Capital:</span>${country.capital}</p>
          </div>
        `;

        // add event listener to each country card
        countryDiv.addEventListener("click", function () {
          displayCountry(country);
        });

        countriesContainer.appendChild(countryDiv);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// country details
function displayCountry(country) {
  window.scrollTo(0, 0); // scroll bar start at top (0,0)
  const section = document.getElementById("section");
  section.style.display = "none";
  
  const countryDetails = document.createElement("div");
  countryDetails.classList.add(
    "country-details");
  countryDetails.innerHTML = `
    <div class="bg-[#fafafa] dark:bg-[#202c37] px-8 lg:px-16 min-h-screen">
      <div class="py-16 lg:py-14">
        <button
          class="bg-white dark:bg-[#2b3945] flex items-center py-3 px-12 drop-shadow-md rounded-sm back-button"
        >
          <i class="fa-solid fa-arrow-left-long text-[#111517] dark:text-[#fafafa]"></i>
          <p class="font-sans font-normal ml-3 text-[#111517] dark:text-[#fafafa]">Back</p>
        </button>
      </div>

      <div class="flex flex-col lg:flex-row">

        <div class="flex-1 mb-12 lg:mb-0">
          <img src="${country.flags.png}" alt="${country.name.common}" class="w-96 h-80 shadow-xl"/>
        </div>

        <div class="flex-1">
          <h1 class="font-bold tracking-wide text-4xl dark:text-[#fafafa] mb-8">${
            country.name.common
          }</h1>
          <div class="flex flex-col lg:flex-row lg:gap-20 mb-8 lg:mb-0">
            <div class="mb-10 lg:mb-4">
              <p class="text-gray-900 dark:text-[#fafafa]  mb-3">
                <span class="font-semibold mr-1">Native Name:</span>${Object.keys(
                  country.name.nativeName
                )
                  .map((key) => country.name.nativeName[key].common)
                  .join(", ")}
              </p>
              <p class="text-gray-900 dark:text-[#fafafa]  mb-3">
                <span class="font-semibold mr-1">Population:</span>${
                  country.population
                }
              </p>
              <p class="text-gray-900 dark:text-[#fafafa]  mb-3">
                <span class="font-semibold mr-1">Region:</span>${country.region}
              </p>
              <p class="text-gray-900 dark:text-[#fafafa]  mb-3">
                <span class="font-semibold mr-1">Sub Region:</span>${
                  country.subregion
                }
                Europe
              </p>
              <p class="text-gray-900 dark:text-[#fafafa]  mb-3">
                <span class="font-semibold mr-1">Capital:</span>${
                  country.capital
                }
              </p>
            </div>
            <div>
              <p class="text-gray-900 dark:text-[#fafafa]  mb-3">
                <span class="font-semibold mr-1">Top Level Domain:</span>${country.tld.join(
                  ", "
                )}
              </p>
              <p class="text-gray-900 dark:text-[#fafafa]  mb-3">
                <span class="font-semibold mr-1">Currencies:</span> ${Object.keys(
                  country.currencies
                )
                  .map((key) => country.currencies[key].name)
                  .join(", ")}
              </p>
              <p class="text-gray-900 dark:text-[#fafafa] mb-3">
                <span class="font-semibold mr-1">Languages:</span> ${Object.keys(
                  country.languages
                )
                  .map((key) => country.languages[key])
                  .join(", ")}
              </p>
            </div>
          </div>
          <div class="flex flex-col lg:flex-row lg:flex-start pb-12">
            <p class="font-semibold text-lg lg:mr-4 dark:text-[#fafafa]">Border Countries:</p>
            <div class="flex flex-row flex-wrap gap-2 items-center">
            ${
              country.borders
                ? country.borders
                    .map(
                      (border) => `
            <div class="bg-[#fff] dark:bg-[#2b3945] dark:text-[#fafafa] flex items-center py-1 px-5 drop-shadow-md rounded-sm">
              <p>${border}</p>
            </div>
            `
                    )
                    .join("")
                : `<p class="text-gray-900 dark:text-[#fafafa]">No Borders</p>`
            }
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // back button
  const backButton = countryDetails.querySelector(".back-button");
  backButton.addEventListener("click", function(event) {
    event.preventDefault();
    section.style.display = "flex";
    countryDetails.remove();
  });
  document.body.appendChild(countryDetails);
}

// search bar
const searchInput = document.getElementById("search");
searchInput.addEventListener("input", function () {
  const searchQuery = searchInput.value.toLowerCase();
  const countries = document.querySelectorAll(".country-card");
  let visibleCountry = 0; 

  countries.forEach((country) => {
    const countryName = country.querySelector("h3").textContent.toLowerCase();
    const countryCapital = country.querySelector(".capital").textContent.toLowerCase();
    if (countryName.includes(searchQuery) || countryCapital.includes(searchQuery)) {
      country.style.display = "block";
      visibleCountry++;
    } else {
      country.style.display = "none";
    }
  });

  // available Country Message
  const availableCountryMessage = document.getElementById("availableCountryMessage");
  if (visibleCountry === 0) {
    availableCountryMessage.classList.remove("hidden");
  } else {
    availableCountryMessage.classList.add("hidden");
  }
});

// dark mode
const darkModeButton = document.getElementById("darkMode");
const moonIcon = document.getElementById("moonIcon");
const websiteMode = document.getElementById("websiteMode");
darkModeButton.addEventListener("click", function(){
  document.body.classList.toggle("dark");
  moonIcon.classList.toggle("fa-moon");
  moonIcon.classList.toggle("fa-sun");
  
  websiteMode.textContent = document.body.classList.contains("dark") ? "Light Mode" : "Dark Mode";
})

// scroll to top button
const scrollToTop = document.getElementById("scrollToTop");
window.addEventListener("scroll", function(){
  if (window.pageYOffset > 100) {
    scrollToTop.classList.remove("hidden");
  } else {
    scrollToTop.classList.add("hidden");
  }
})

scrollToTop.addEventListener("click", function(){
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })

})
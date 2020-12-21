import Search from "./models/Search";
import { domElements, renderLoader, removeLoader } from "./models/elements";

/**Global app state
 * > Search object
 */
const state = {};
let start = 0;
let end = 8;

/**
 * ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 *  SEARCH CONTROLLER
 * ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 */

// for total stat of wrold
const controlSeachAll = async () => {
    // get query text from view
    const queryType = "all";

    if (queryType) {
        // save as new Search object to the state
        state.searchAll = new Search(queryType);

        try {
            await state.searchAll.getResults();
        } catch (error) {
            console.log(error);
        }
    }

    // show the value in ui
    domElements.totalDeathNumber.textContent = Intl.NumberFormat("en-IN", {
        style: "decimal",
    }).format(state.searchAll.data.deaths);

    domElements.totalRecoveredNumber.textContent = Intl.NumberFormat("en-IN", {
        style: "decimal",
    }).format(state.searchAll.data.recovered);

    domElements.totalInfectedNumber.textContent = Intl.NumberFormat("en-IN", {
        style: "decimal",
    }).format(state.searchAll.data.cases);

    domElements.searchBtn.addEventListener("click", (e) => {
        e.preventDefault(); // stops the page from refreshing
    
        domElements.specificRows.innerHTML = "";
    
        const countryName = domElements.searchInput.value; // get the search query
        controlSeachSpecific(countryName);
    
        domElements.searchInput.value = "Loading...";
        setTimeout(() => (domElements.searchInput.value = ""), 1500);
    });
};

// for a specific country
const controlSeachSpecific = async (countryName) => {
    renderLoader(domElements.specificRows);

    // get query text from view
    const queryType = "countries";

    if (queryType) {
        // save as new Search object to the state
        state.searchSpecific = new Search(queryType, countryName);

        try {
            // Search for recipes
            await state.searchSpecific.getResults();
        } catch (error) {
            console.log(error);
        }
    }

    let specificDeaths = Intl.NumberFormat("en-IN", {
        style: "decimal",
    }).format(state.searchSpecific.data.deaths);

    let specificRecovered = Intl.NumberFormat("en-IN", {
        style: "decimal",
    }).format(state.searchSpecific.data.recovered);

    let specificInfected = Intl.NumberFormat("en-IN", {
        style: "decimal",
    }).format(state.searchSpecific.data.cases);

    let specificActive = Intl.NumberFormat("en-IN", {
        style: "decimal",
    }).format(state.searchSpecific.data.active);

    removeLoader();

    const resultMarkup = `
                        <div class="specific_deaths">
                            <h4 class="cases_number death_number">${specificDeaths}</h4>
                            <h3 class="specific_deaths_heading">Death toll</h3>
                        </div>

                        <div class="specific_recovered">
                            <h4 class="cases_number recovered_number">${specificRecovered}</h4>
                            <h3 class="specific_recovered_heading">recovered</h3>
                        </div>

                        <div class="specific_active">
                            <h4 class="cases_number specific_number">${specificActive}</h4>
                            <h3 class="specific_active_heading">Active cases</h3>
                        </div>

                        <div class="specific_confirmed">
                            <h4 class="cases_number infected_number">${specificInfected}</h4>
                            <h3 class="specific_confirmed_heading">infected</h3>
                        </div>
                        `;

    // show the value in ui
    domElements.countryName.textContent = `${state.searchSpecific.data.country}'s stats`;
    domElements.specificRows.insertAdjacentHTML("afterbegin", resultMarkup);
};

controlSeachAll();

const tableGenerator = async (startIndex = 0, endIndex = 8) => {
    // get query text from view
    const queryType = "countries";

    if (queryType) {
        // save as new Search object to the state
        state.searchAllCountries = new Search(queryType);

        try {
            // Search for recipes
            await state.searchAllCountries.getResults();
        } catch (error) {
            console.log(error);
        }
    }

    state.searchAllCountries.data
        .slice(startIndex, endIndex)
        .forEach((item, i) => {
            let countryName = item.country;

            let totalCases =
                item.cases > 0
                    ? Intl.NumberFormat("en-IN", {
                          style: "decimal",
                      }).format(item.cases)
                    : "-";

            let todayCases =
                item.todayCases > 0
                    ? Intl.NumberFormat("en-IN", {
                          style: "decimal",
                      }).format(item.todayCases)
                    : "-";

            let activeCases =
                item.active > 0
                    ? Intl.NumberFormat("en-IN", {
                          style: "decimal",
                      }).format(item.active)
                    : "-";

            let criticalCases =
                item.critical > 0
                    ? Intl.NumberFormat("en-IN", {
                          style: "decimal",
                      }).format(item.critical)
                    : "-";

            let recoveredCases =
                item.recovered > 0
                    ? Intl.NumberFormat("en-IN", {
                          style: "decimal",
                      }).format(item.recovered)
                    : "-";

            let deathsCases =
                item.deaths > 0
                    ? Intl.NumberFormat("en-IN", {
                          style: "decimal",
                      }).format(item.deaths)
                    : "-";

            let todayDeathsCases =
                item.todayDeaths > 0
                    ? Intl.NumberFormat("en-IN", {
                          style: "decimal",
                      }).format(item.todayDeaths)
                    : "-";

            let casesPerMillion =
                item.casesPerOneMillion > 0
                    ? Intl.NumberFormat("en-IN", {
                          style: "decimal",
                      }).format(item.casesPerOneMillion)
                    : "-";

            let deathsPerMillion =
                item.deathsPerOneMillion > 0
                    ? Intl.NumberFormat("en-IN", {
                          style: "decimal",
                      }).format(item.deathsPerOneMillion)
                    : "-";

            const markup = `
                        <tr>
                            <td class = 'number_td'>${++startIndex}</td>
                            
                            <td class = 'country_name_td'>${countryName}</td>

                            <td class = 'infected_td'>${totalCases}</td>

                            <td>${todayCases}</td>

                            <td>${activeCases}</td>

                            <td>${criticalCases}</td>

                            <td>${recoveredCases}</td>

                            <td class = 'deaths_td'>${deathsCases}</td>

                            <td>${todayDeathsCases}</td>

                            <td>${casesPerMillion}</td>

                            <td>${deathsPerMillion}</td>
                        </tr>`;

            domElements.countryTableBody.insertAdjacentHTML(
                "beforeend",
                markup
            );
        });
};

tableGenerator();

domElements.nextBtn.addEventListener("click", () => {
    if (end < 211) {
        domElements.countryTableBody.innerHTML = "";

        start = start + 8;
        end = end + 8;
        console.log("success", end);

        tableGenerator(start, end);
    } else {
        domElements.countryTableBody.innerHTML = "";
        tableGenerator(start, end);
        alert("It is the last page!");
    }
});

domElements.prevBtn.addEventListener("click", () => {
    if (start > 0) {
        domElements.countryTableBody.innerHTML = "";

        start = start - 8;
        end = end - 8;
        console.log("success", start);

        tableGenerator(start, end);
    } else {
        domElements.countryTableBody.innerHTML = "";
        tableGenerator();
        alert("It is the first page!");
    }
});

domElements.firstPgBtn.addEventListener('click', () => {
    if (start > 0) {
        domElements.countryTableBody.innerHTML = "";

        start = 0
        end = 8;
        console.log("success", start);

        tableGenerator(start, end);
    } else {
        domElements.countryTableBody.innerHTML = "";
        tableGenerator();
        alert("It is the first page!");
    }
})
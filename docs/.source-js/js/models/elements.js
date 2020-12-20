export const domElements = {
    specificRows: document.querySelector(".specific_rows"),

    totalDeathNumber: document.querySelector(".total_death_number"),
    totalRecoveredNumber: document.querySelector(".total_recovered_number"),
    totalInfectedNumber: document.querySelector(".total_infected_number"),

    countryName: document.querySelector(".country_name"),
    specificDeathNumber: document.querySelector(".death_number"),
    specificRecoveredNumber: document.querySelector(".recovered_number"),
    specificInfectedNumber: document.querySelector(".infected_number"),

    searchBtn: document.querySelector(".search_btn"),
    searchInput: document.querySelector(".search_bar_input"),

    tableCard: document.querySelector(".table_card"),
    countryTable: document.querySelector(".country_table"),
    countryTableBody: document.querySelector(".country_table_body"),
    tableHaeder: document.querySelector(".country_table_head"),
    prevBtn: document.querySelector('.prev_page'),
    nextBtn: document.querySelector('.next_page'),
    firstPgBtn: document.querySelector('.first_page')
};

const elementsStrings = {
    loader: "loader",
};

// function to show loading animation
export const renderLoader = (parentDiv) => {
    const loaderHtml = `
        <div class=${elementsStrings.loader}>
            <img src='images/loader.svg'></img>
        </div>
    `;

    parentDiv.insertAdjacentHTML("afterbegin", loaderHtml);
};

// function to hide loading animation
export const removeLoader = () => {
    const loader = document.querySelector(`.${elementsStrings.loader}`);

    if (loader) loader.parentNode.removeChild(loader);
};

document.addEventListener("DOMContentLoaded", function () {
    fetchDataAndUpdateCards("all-employees");
});

// Function to fetch data from the specified page and update cards
function fetchDataAndUpdateCards(page) {
    // Fetch the HTML content of the page
    fetch(`./pages/${page}/${page}.html`)
        .then(response => response.text())
        .then(html => {
            // Create a temporary element to parse the HTML
            const tempElement = document.createElement('div');
            tempElement.innerHTML = html;

            // Extract the data from the parsed HTML
            const allEmployees = parseInt(tempElement.querySelector("#all-employees .card-employees__amount").textContent);
            const menEmployees = parseInt(tempElement.querySelector("#men-employees .card-employees__amount").textContent);
            const womenEmployees = parseInt(tempElement.querySelector("#women-employees .card-employees__amount").textContent);
            const departmentEmployees = parseInt(tempElement.querySelector("#department-employees .card-employees__amount").textContent);
            const averageAge = parseInt(tempElement.querySelector("#average-age .card-employees__amount").textContent);

            // Update the cards on the dashboard using the extracted data
            updateCard("all-employees", allEmployees);
            updateCard("men-employees", menEmployees);
            updateCard("women-employees", womenEmployees);
            updateCard("department-employees", departmentEmployees);
            updateCard("average-age", averageAge);

            // Additional logic specific to the page if needed...
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to update a card with the specified amount
function updateCard(cardId, amount) {
    const cardElement = document.getElementById(cardId);
    if (cardElement) {
        cardElement.querySelector(".card-employees__amount").textContent = amount;
    }
}



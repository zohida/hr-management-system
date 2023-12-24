var itemsPerPage = 5;
var currentPage = 1;
var originalData = []; // Store the original unfiltered data
var filteredData = []; // Store the filtered data

function fetchData() {
    // Your data fetching logic goes here
    // ...

    // For testing, let's use the existing local storage data
    var peopleList = localStorage.getItem("peopleList") ? JSON.parse(localStorage.getItem("peopleList")) : [];
    originalData = peopleList;
    filteredData = originalData.slice(); // Initialize filtered data with all employees
    applyFilters(); // Apply filters and pagination on page load
}

function applyFilters() {
    var departmentFilter = document.getElementById("departmentFilter").value;
    var genderFilter = document.getElementById("genderFilter").value;

    filteredData = filterData(departmentFilter, genderFilter);
    applyPagination();
    renderTable();
}

function filterData(department, gender) {
    // Use department and gender values to filter the data
    return originalData.filter(function(employee) {
        return (!department || employee.department === department) &&
               (!gender || employee.gender === gender);
    });
}

function applyPagination() {
    var totalItems = filteredData.length;
    var totalPages = Math.ceil(totalItems / itemsPerPage);

    // Update the pagination control
    var paginationElement = document.getElementById("pagination");
    paginationElement.innerHTML = "";

    for (var i = 1; i <= totalPages; i++) {
        var pageButton = document.createElement("button");
        pageButton.innerText = i;
        pageButton.classList.add("btn", "btn-secondary", "mx-1");
        pageButton.onclick = function() {
            currentPage = parseInt(this.innerText);
            renderTable();
        };
        paginationElement.appendChild(pageButton);
    }
}

function renderTable() {
    var startIndex = (currentPage - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;
    var displayedData = filteredData.slice(startIndex, endIndex);

    // Display the data in the table
    showData(displayedData);
}

// Example function to fetch and display data
function showData(data) {
    var html = "";

    data.forEach(function (element) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.department + "</td>";
        html += "<td>" + element.position + "</td>";
        html += "<td>" + element.gender + "</td>";
        html += "<td>" + element.dob + "</td>";
        html += "</tr>";
    });

    document.querySelector("#employeeTableBody").innerHTML = html;
}

// Fetch and display data on page load
window.onload = fetchData();



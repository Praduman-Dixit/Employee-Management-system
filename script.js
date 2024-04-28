
const employees = [
    { id: 1, name: "John Doe", gender: "male", department: "hr", salary: 50000 },
    { id: 2, name: "Jane Smith", gender: "female", department: "finance", salary: 60000 },
    { id: 3, name: "Michael Johnson", gender: "male", department: "marketing", salary: 55000 },
    { id: 4, name: "Emily Brown", gender: "female", department: "engineering", salary: 70000 },
    { id: 5, name: "David Lee", gender: "male", department: "operations", salary: 48000 },
    { id: 6, name: "Sarah Wilson", gender: "female", department: "hr", salary: 52000 },
    { id: 7, name: "James Miller", gender: "male", department: "marketing", salary: 58000 },
    { id: 8, name: "Emma Taylor", gender: "female", department: "finance", salary: 65000 },
    { id: 9, name: "Daniel Anderson", gender: "male", department: "engineering", salary: 72000 },
    { id: 10, name: "Olivia Martinez", gender: "female", department: "operations", salary: 49000 },
    { id: 11, name: "William Garcia", gender: "male", department: "hr", salary: 53000 },
    { id: 12, name: "Sophia Rodriguez", gender: "female", department: "marketing", salary: 60000 },
    { id: 13, name: "Alexander Hernandez", gender: "male", department: "finance", salary: 66000 },
    { id: 14, name: "Mia Lopez", gender: "female", department: "engineering", salary: 71000 },
    { id: 15, name: "Ethan Gonzalez", gender: "male", department: "operations", salary: 50000 },
    { id: 16, name: "Isabella Carter", gender: "female", department: "hr", salary: 55000 },
    { id: 17, name: "Ryan Allen", gender: "male", department: "marketing", salary: 59000 },
    { id: 18, name: "Ava Nelson", gender: "female", department: "finance", salary: 63000 },
    { id: 19, name: "Matthew Young", gender: "male", department: "engineering", salary: 73000 },
    { id: 20, name: "Samantha Wright", gender: "female", department: "operations", salary: 51000 },
    { id: 21, name: "Joshua King", gender: "male", department: "hr", salary: 54000 },
    { id: 22, name: "Madison Scott", gender: "female", department: "marketing", salary: 61000 },
    
];

function populateDepartmentDropdown() {
    const departments = new Set(employees.map(employee => employee.department));
    const departmentDropdown = document.querySelector("#department");
    departmentDropdown.innerHTML = "<option value=''>--Select Department--</option>";

    departments.forEach(department => {
        const option = document.createElement("option");
        option.textContent = department;
        option.value = department;
        departmentDropdown.appendChild(option);
    });
}

populateDepartmentDropdown();

function populateTable(data) {
    const tableBody = document.querySelector("#employee-table tbody");
    tableBody.innerHTML = "";
    data.forEach((employee, index) => {
        const row = `<tr>
            <td>${index + 1}</td>
            <td>${employee.name}</td>
            <td>${employee.gender}</td>
            <td>${employee.department}</td>
            <td>${employee.salary}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}
function filterData() {
    const departmentFilter = document.querySelector("#department").value;
    const genderFilter = document.querySelector("#gender").value;
    let filteredData = employees;

    if (departmentFilter) {
        filteredData = filteredData.filter(employee => employee.department === departmentFilter);
    }
    if (genderFilter) {
        filteredData = filteredData.filter(employee => employee.gender === genderFilter);
    }

    return filteredData;
}
function sortData(data, order) {
    if (order === "asc") {
        return data.sort((a, b) => a.salary - b.salary);
    } else if (order === "desc") {
        return data.sort((a, b) => b.salary - a.salary);
    } else {
        return data;
    }
}

function paginateData(data, page, limit) {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return data.slice(startIndex, endIndex);
}

function updateUI() {
    const filteredData = filterData();
    const sortedData = sortData(filteredData, document.querySelector("#sort").value);
    const page = parseInt(document.querySelector("#current-page").textContent);
    const limit = 10;
    const paginatedData = paginateData(sortedData, page, limit);

    populateTable(paginatedData);
    updatePaginationUI(sortedData.length, page, limit);
}
function updatePaginationUI(totalItems, currentPage, limit) {
    const totalPages = Math.ceil(totalItems / limit);
    const prevButton = document.querySelector("#prev-page");
    const nextButton = document.querySelector("#next-page");

    document.querySelector("#current-page").textContent = currentPage;
    document.querySelector("#total-pages").textContent = totalPages;

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}

document.querySelector("#department").addEventListener("change", updateUI);
document.querySelector("#gender").addEventListener("change", updateUI);
document.querySelector("#sort").addEventListener("change", updateUI);
document.querySelector("#prev-page").addEventListener("click", () => {
    const currentPage = parseInt(document.querySelector("#current-page").textContent);
    updatePaginationUI(currentPage - 1);
    updateUI();
});
document.querySelector("#next-page").addEventListener("click", () => {
    const currentPage = parseInt(document.querySelector("#current-page").textContent);
    updatePaginationUI(currentPage + 1);
    updateUI();
});
updateUI();

const API_URL = "http://localhost:8080/api/employees"; // Backend API Base URL

// 🌟 Login Form Submission
document.getElementById("login-form")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Simulated login (Replace with actual authentication logic)
    if (username === "admin" && password === "admin") {
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid username or password");
    }
});

// 🌟 Fetch and Display Employees
async function fetchEmployees() {
    try {
        const response = await fetch(API_URL);
        const employees = await response.json();
        const tableBody = document.querySelector("#employee-table tbody");

        tableBody.innerHTML = ""; // Clear existing rows

        employees.forEach((employee) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.email}</td>
                <td>${employee.position}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching employees:", error);
    }
}

// 🌟 Add Employee
document.getElementById("add-employee-form")?.addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const position = document.getElementById("position").value;

    const employeeData = { name, email, position };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(employeeData),
        });

        if (response.ok) {
            alert("Employee Added Successfully!");
            window.location.href = "view-employees.html";
        } else {
            alert("Failed to Add Employee");
        }
    } catch (error) {
        console.error("Error adding employee:", error);
    }
});

// 🌟 Remove Employee
document.getElementById("remove-employee-form")?.addEventListener("submit", async function (e) {
    e.preventDefault();
    const employeeId = document.getElementById("employee-id").value;

    try {
        const response = await fetch(`${API_URL}/${employeeId}`, { method: "DELETE" });

        if (response.ok) {
            alert("Employee Removed Successfully!");
            window.location.href = "view-employees.html";
        } else {
            alert("Failed to Remove Employee");
        }
    } catch (error) {
        console.error("Error removing employee:", error);
    }
});

// 🌟 Update Employee
document.getElementById("update-employee-form")?.addEventListener("submit", async function (e) {
    e.preventDefault();
    const employeeId = document.getElementById("employee-id").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const position = document.getElementById("position").value;

    const updatedEmployee = { name, email, position };

    try {
        const response = await fetch(`${API_URL}/${employeeId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedEmployee),
        });

        if (response.ok) {
            alert("Employee Updated Successfully!");
            window.location.href = "view-employees.html";
        } else {
            alert("Failed to Update Employee");
        }
    } catch (error) {
        console.error("Error updating employee:", error);
    }
});

// 🌟 Load Employees on Page Load
if (document.querySelector("#employee-table")) {
    fetchEmployees();
}

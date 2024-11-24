const fetch = require("node-fetch");

const API_BASE_URL = "http://localhost:3000/api";

// Function to fetch departments
const fetchDepartments = async () => {
  try {
    console.log("Fetching departments...");
    const response = await fetch(`${API_BASE_URL}/departments`);
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `Failed to fetch departments (${response.status}): ${errorMessage}`
      );
    }
    const data = await response.json();
    console.log("Fetched departments:", data);

    // Simulating how dropdown would map the data
    const dropdownList = data.map((dept) => ({
      label: dept.name,
      value: dept.id,
    }));

    console.log("Dropdown-compatible list:", dropdownList);
  } catch (error) {
    console.error("Error fetching departments:", error.message);
  }
};

// Run the test
fetchDepartments();

// node testFetchDepartments.js

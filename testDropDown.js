const fetch = require("node-fetch");

const API_BASE_URL = "http://localhost:3000/api";

// Fetch departments and simulate dropdown mapping
const testDropDown = async () => {
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

    // Simulate mapping departments to dropdown-compatible format
    const dropDownList = data.map((dept) => ({
      label: dept.name,
      value: dept.id,
    }));

    console.log("Dropdown-compatible list:", dropDownList);

    // Simulate dropdown selection
    const selectedDepartment = dropDownList[1]; // Simulate selecting the second department
    console.log("Selected department:", selectedDepartment);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// Run the test
testDropDown();

//node testDropDown.js

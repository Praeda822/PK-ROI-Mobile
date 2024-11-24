const fetch = require("node-fetch");

const API_BASE_URL = "http://localhost:3000/api";

const addPerson = async (personData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/persondata`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(personData),
    });

    if (!response.ok) {
      const errorMessage = await response.text(); // Log backend error message
      throw new Error(
        `Failed to add person data (${response.status}): ${errorMessage}`
      );
    }

    const data = await response.json();
    console.log("Added person:", data);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// Test the API by adding a person
const newPerson = {
  name: "Test User",
  phone: "1234567890",
  street: "123 Test St",
  city: "Testville",
  state: "TS",
  zip: "54321",
  country: "Testland",
  departmentId: 1,
};

addPerson(newPerson);

// node testAddPerson.js

const fetch = require("node-fetch");

const API_BASE_URL = "http://localhost:3000/api";

const fetchPersonById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/people/${id}`);
    if (!response.ok)
      throw new Error(`Failed to fetch person by ID (${response.status})`);
    const data = await response.json();
    console.log("Person data:", data);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// Test the API with a specific person ID
const personId = 2;
fetchPersonById(personId);

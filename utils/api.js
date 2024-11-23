const API_BASE_URL = "Http://localhost:3000/api"; // Helper function to fetch JSON data
/**
 * My helper function that fetches JSON data from the specified URL.
 * Only works with JSON data, and only works for GET requests.
 *
 * @param {string} url - The URL to fetch JSON data from.
 * @param {string} [errorMsg='Something went wrong..'] - The error message to display if the fetch fails.
 * @returns {Promise} A promise that resolves to the JSON data.
 * @throws {Error} If the fetch fails, an error with the specified error message and status code will be thrown.
 */

const getJSON = async function (url, errorMsg = "Something went wrong..") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

// export async function fetchDepartments() {
//   try {
//     const response = await fetch(`${API_BASE_URL}/departments`);
//     if (!response.ok) throw new Error("Failed to fetch categories");
//     return await response.json();
//   } catch (error) {
//     throw error;
//   }
// }

export async function fetchDepartments() {
  return getJSON(`${API_BASE_URL}/departments`, "Failed to fetch departments");
}

// export async function fetchPeople() {
//   try {
//     const response = await fetch(`${API_BASE_URL}/people`);
//     if (!response.ok) throw new Error("Failed to fetch people");
//     return await response.json();
//   } catch (error) {
//     throw error;
//   }
// }

export async function fetchPeople() {
  return getJSON(`${API_BASE_URL}/people`, "Failed to fetch people");
}

// export async function fetchPersonById(id) {
//   try {
//     const response = await fetch(`${API_BASE_URL}/person/${id}`);
//     if (!response.ok) throw new Error("Failed to fetch person by ID");
//     return await response.json();
//   } catch (error) {
//     throw error;
//   }
// }

export async function fetchPersonById(id) {
  return getJSON(
    `${API_BASE_URL}/person/${id}`,
    "Failed to fetch person by ID"
  );
}

// jh-fa (JH Fetch-Update)
export async function addPerson(personData) {
  try {
    const response = await fetch(`${API_BASE_URL}/persondata`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(personData),
    });
    if (!response.ok) throw new Error("Failed to add person data.");
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function updatePerson(id, updatedData) {
  try {
    const response = await fetch(`${API_BASE_URL}/person/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) throw new Error("Failed to update Data");
    return await response.json();
  } catch (error) {
    throw error;
  }
}

//jh-fu (JH-Fetch-Update)
export async function deletePerson(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/person/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete product");
    return true;
  } catch (error) {
    throw error;
  }
}

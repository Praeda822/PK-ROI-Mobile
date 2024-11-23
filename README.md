# PK-ROI-Mobile

PK-ROI-Mobile is a mobile application built with React Native and Expo. This project is currently under development.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Anatomy](#apianatomy)
- [Snippets](#snippets)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with the project, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/pk-roi-mobile.git
   cd pk-roi-mobile
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Install the server dependencies:
   ```sh
   cd server
   npm install
   cd ..
   ```

## Usage

To start the application, use the following commands:

- Start the Expo development server:

  ```sh
  npm run start
  ```

- Start the server:

  ```sh
  npm run start:server
  ```

- Start both the Expo development server and the backend server concurrently:
  ```sh
  npm run dev
  ```

## API Anatomy

- 2 endpoints: `departments` and `people`
- Records details

### getJSON()

- My helper function I use for GET requests that fetches JSON data from the specified URL and throws an error if the response is not OK.

```javascript
const getJSON = async function (url, errorMsg = "Something went wrong..") {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
  return response.json();
};
```

### departments

```javascript
{
    "id": 1,
    "name": "General"
},
```

### people

```javascript
{
    "id": 1,
    "name": "John Smith",
    "phone": "02 9988 2211",
    "street": "1001 Code Lane",
    "city": "Javaville",
    "state": "NSW",
    "zip": "0100",
    "country": "Australia",
    "departmentId": 1,
    "Department": {
      "id": 1,
      "name": "General"
    }
},
```

## Snippets

| **Prefix** | **Name**     | **Description**                          |
| ---------- | ------------ | ---------------------------------------- |
| jh-f       | Fetch        | Fetches data from an API endpoint.       |
| jh-fbi     | Fetch By ID  | Fetches data from an API endpoint by ID. |
| jh-fa      | Fetch Add    | Adds data to an API endpoint.            |
| jh-fu      | Fetch Update | Updates data in an API endpoint.         |
| jh-fd      | Fetch Delete | Deletes data from an API endpoint.       |

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

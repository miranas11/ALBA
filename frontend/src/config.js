const ENV = "PROD";
//const ENV="DEV;

const API_URL =
    ENV === "PROD" ? "https://alba-1.onrender.com" : "http://localhost:3000";

export default { ENV, API_URL };

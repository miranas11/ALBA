const ENV = "PROD";
//const ENV = "DEV";

const API_URL =
    ENV === "PROD"
        ? "https://alba-production.up.railway.app"
        : "http://localhost:3000";

export default { ENV, API_URL };

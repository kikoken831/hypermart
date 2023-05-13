const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://e8b6c53be9a02fe7d2b311e2f186cf.herokuapp.com"
    : "http://localhost:5000";
export default API_URL;
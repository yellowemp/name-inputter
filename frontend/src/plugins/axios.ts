import axios from "axios";
const URL = "http://localhost:3000";

const restApiClient = axios.create({
    baseURL: URL,
    timeout: 5000
});

export default restApiClient;
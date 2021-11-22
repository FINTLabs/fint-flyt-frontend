import axios from "axios";

export default axios.create({
    // TODO: change baseURL
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-type": "application/json"
    }
});
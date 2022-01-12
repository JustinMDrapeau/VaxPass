import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/api", //TODO: change this to the real endpoint
  headers: {
    "Content-type": "application/json"
  }
});
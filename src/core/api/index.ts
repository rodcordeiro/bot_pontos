import axios from "axios";

const api = axios.create({
  baseURL: "https://raizes.rodrigocordeiro.com.br/api",
  responseType: "json",
});

export { api };

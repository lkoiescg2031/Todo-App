import axios from "axios";

export const MockTestServerApi = axios.create({
	baseURL: "https://localhost:4000/",
	timeout: 1000,
	// headers: { "X-Custom-Header": "foobar" },
});

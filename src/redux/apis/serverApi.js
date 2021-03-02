import axios from "axios";

const MockTestServerApi = axios.create({
	baseURL: "http://localhost:4000/",
	timeout: 1000,
	// headers: { "X-Custom-Header": "foobar" },
});

export default MockTestServerApi;

import axios from "axios";

const baseUrl = "http://localhost:3535";

export function getUserMunicipio(email) {
	return axios
		.get(`${baseUrl}/api/users/municipal?email=${email}`)
		.then((res) => {
			return res.data;
		});
}

export function getUsersResponsible() {
	return axios.get(`${baseUrl}/api/users/municipal/responsible`).then((res) => {
		return res.data;
	});
}

export function getUserAnlyst() {
	return axios.get(`${baseUrl}/api/users/municipal/analyst`).then((res) => {
		return res.data;
	});
}

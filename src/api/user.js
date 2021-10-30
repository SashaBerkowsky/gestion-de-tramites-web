import axios from "axios";

const baseUrl = "http://localhost:3000";

export function getUserMunicipio(email) {
  return axios
    .get(`${baseUrl}/api/users/municipal?email=${email}`)
    .then((res) => {
      return res.data;
    });
}

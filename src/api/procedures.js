import axios from "axios";

const baseUrl = "http://localhost:3000";

export function getPendingProcedures() {
  return axios.get(`${baseUrl}/api/procedures/pending`).then((res) => {
    return res.data;
  });
}

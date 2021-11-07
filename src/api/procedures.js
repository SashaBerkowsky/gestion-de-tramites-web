import axios from "axios";

const baseUrl = "http://localhost:3000";

export function getPendingProcedures() {
  return axios.get(`${baseUrl}/api/procedures/pending`).then((res) => {
    return res.data;
  });
}
export function getProcedureDetail(idProcedure) {
  return axios
    .get(`${baseUrl}/api/procedures?idProcedure=${idProcedure}`)
    .then((res) => {
      return res.data;
    });
}

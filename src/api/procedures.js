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

export function putUserResponsible(idProcedure, idUserResponsible) {
  return axios
    .put(`${baseUrl}/api/procedures/setUserRespon`, {
      idProcedure: Number(idProcedure),
      idUser: Number(idUserResponsible),
    })
    .then((res) => {
      return res.data;
    });
}

export function putUserAnalyst(idProcedure, idUserAnalyst) {
  console.log(idUserAnalyst);
  return axios
    .put(`${baseUrl}/api/procedures/setUserAnalist`, {
      idProcedure: Number(idProcedure),
      idUser: Number(idUserAnalyst),
    })
    .then((res) => {
      return res.data;
    });
}

export function getProceduresInProgress(idUserMunicipal) {
  return axios
    .get(`${baseUrl}/api/procedures/inProgress?idUser=${idUserMunicipal}`)
    .then((res) => {
      return res.data;
    });
}

export function finishProcedure(idProcedure, isRejected, reasonRejection) {
  return axios
    .put(`${baseUrl}/api/procedures/finishProcedure`, {
      idProcedure: Number(idProcedure),
      rejected: isRejected,
      reasonRejection: reasonRejection,
    })
    .then((res) => {
      return res.data;
    });
}

export function putRevisionDate(idProcedure, revisionDate) {
  return axios
    .put(`${baseUrl}/api/procedures/setRevisionDate`, {
      idProcedure: Number(idProcedure),
      revisionDate: revisionDate,
    })
    .then((res) => {
      return res.data;
    });
}

export function putWithdrawalDate(idProcedure, withdrawalDate) {
  return axios
    .put(`${baseUrl}/api/procedures/setWithdrawalDate`, {
      idProcedure: Number(idProcedure),
      withdrawalDate: withdrawalDate,
    })
    .then((res) => {
      return res.data;
    });
}

export function getProcedureObservations(idProcedure) {
  return axios
    .get(`${baseUrl}/api/procedures/events?idProcedure=${idProcedure}`)
    .then((res) => {
      return res.data;
    });
}

export function getProcedureInProgressForResponsable() {
  return axios
    .get(`${baseUrl}/api/procedures/inProgress/Responsable`)
    .then((res) => {
      return res.data;
    });
}

export function getProcedureInProgressForAnalyst() {
  return axios
    .get(`${baseUrl}/api/procedures/inProgress/Analyst`)
    .then((res) => {
      return res.data;
    });
}
export function getListOfHistoricalProcedures() {
  return axios.get(`${baseUrl}/api/procedures/historical`).then((res) => {
    return res.data;
  });
}

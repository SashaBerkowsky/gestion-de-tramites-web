const procedureTypes = {
	1: "Primera Licencia",
	2: "Renovacion",
};

export function formatProcedureType(idProcedureType) {
	return procedureTypes[idProcedureType];
}

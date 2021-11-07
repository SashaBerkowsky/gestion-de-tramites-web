import moment from "moment";

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

export function getComparator(order, orderBy) {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
export function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

function createData(args) {
	return {
		...args,
	};
}

export const getTableRowsForPending = (pendingProcedures) => {
	const rows = pendingProcedures.map((procedure) => {
		const code = `${procedure.procedureTypeDescription
			.toLocaleLowerCase()
			.split(" ")
			.join("_")}-${procedure.id}`;
		const userCompleteName = `${procedure.userCitizenName} ${procedure.userCitizenSurname}`;
		const formattedDate = new Date(
			`${procedure.creationDate.split("-").join("/")}`
		);
		return createData({
			idProcedure: procedure.id,
			code,
			type: procedure.procedureTypeDescription,
			userName: userCompleteName,
			dni: procedure.userCitizenDni,
			createdAt: moment(formattedDate),
		});
	});

	return rows;
};

export const getTableRowsForInProgress = (inProgressProcedures) => {
	const rows = inProgressProcedures.map((procedure) => {
		const code = `${procedure.procedureTypeDescription
			.toLocaleLowerCase()
			.split(" ")
			.join("_")}-${procedure.id}`;
		const userCompleteName = `${procedure.userCitizenName} ${procedure.userCitizenSurname}`;
		const formattedDate = new Date(
			`${procedure.creationDate.split("-").join("/")}`
		);
		return createData({
			idProcedure: procedure.id,
			code,
			type: procedure.procedureTypeDescription,
			userName: userCompleteName,
			dni: procedure.userCitizenDni,
			createdAt: moment(formattedDate),
			designatedTo: `${procedure.userMunicipalName} ${procedure.userMunicipalSurname}`,
			idUserMunicipal: procedure.idUserMunicipal,
		});
	});

	return rows;
};

export const getTableRowsForHistorical = () => {
	const rows = [
		createData({
			code: "lic_conducir-0001",
			type: "Licencia de conducir",
			userName: "Test Uno",
			dni: "12345678",
			createdAt: "2021-08-10T03:52:40.000Z",
			finishedAt: "2021-08-11T03:52:40.000Z",
			analyst: "Ana P",
			evaluator: "Sergio G",
			state: "Aprobado",
		}),
		createData({
			code: "lic_conducir-0001",
			type: "Licencia de conducir",
			userName: "Test Uno",
			dni: "12345678",
			createdAt: "2021-08-10T03:52:40.000Z",
			finishedAt: "2021-08-11T03:52:40.000Z",
			analyst: "Ana P",
			evaluator: "Sergio G",
			state: "Cerrado",
		}),
		createData({
			code: "lic_conducir-0001",
			type: "Licencia de conducir",
			userName: "Test Uno",
			dni: "12345678",
			createdAt: "2021-08-10T03:52:40.000Z",
			finishedAt: "2021-08-11T03:52:40.000Z",
			analyst: "Ana P",
			evaluator: "-",
			state: "Rechazado",
		}),
	];

	return rows;
};

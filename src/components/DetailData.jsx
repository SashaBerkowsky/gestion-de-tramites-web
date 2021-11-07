import React, { useState, forwardRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	IconButton,
	ImageList,
	ImageListItem,
	ImageListItemBar,
	Slide,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import DetailStepper from "../components/DetailStepper";
import imagePlaceholder from "../assets/images/ejemplo imagen.png";
import { useAuth } from "../session";
import { useQuery } from "react-query";
import { getProcedureDetail } from "../api/procedures";
import { formatProcedureType } from "../utils/procedureType";
import Loader from "../components/Loader";

const amountOfColumns = 2;

const paperworkExample = {
	id: 0,
	formType: "Primera licencia",
	idCard: 12345678,
	name: "Nombre",
	surname: "Apellido",
	address: "Domicilio",
	birthdate: "01/01/1990",
	licenceType: "B1",
	images: [
		{ src: imagePlaceholder, desc: "Persona" },
		{ src: imagePlaceholder, desc: "Persona con DNI" },
		{ src: imagePlaceholder, desc: "Frente del DNI" },
		{ src: imagePlaceholder, desc: "Dorso del DNI" },
		{ src: imagePlaceholder, desc: "Libre deuda de multas" },
	],
};

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const DetailData = () => {
	const { pathname } = useLocation();
	const [selectedImg, setSelectedImg] = useState({});
	const [isImgSelected, setIsImgSelected] = useState(false);
	const { currentUser } = useAuth();
	const { idProcedure } = useParams();

	const { isLoading, data: selectedProcedure } = useQuery(
		["getProcedureDetail"],
		() => getProcedureDetail(idProcedure)
	);

	const isStepperActive =
		currentUser.userRole === "responsable" &&
		pathname.startsWith("/in-progress");

	function handleImageClick(image) {
		setSelectedImg(image);
		setIsImgSelected(true);
	}

	function handleDialogClose() {
		setSelectedImg({});
		setIsImgSelected(false);
	}

	function downloadImage() {
		//ImageDownload
		console.log("download Image");
	}

	function getCurrentStep(procedure) {
		if (procedure.revisionDate === null || procedure.revisionDate === "") {
			return 0;
		} else if (
			procedure.withdrawalDate === null ||
			procedure.withdrawalDate === ""
		) {
			return 1;
		} else {
			return 2;
		}
	}

	if (isLoading) return <Loader />;

	return (
		<Box
			sx={{ marginTop: 4, display: "flex", justifyContent: "space-between" }}
		>
			<Box width='50%'>
				<Box>
					<Box as='p' color='text.primary'>
						<Box as='span' sx={{ fontWeight: "bold", marginRight: 1 }}>
							Tipo de tramite:
						</Box>
						{formatProcedureType(selectedProcedure.idProcedureType)}
					</Box>
					<Box as='p' color='text.primary'>
						<Box as='span' sx={{ fontWeight: "bold", marginRight: 1 }}>
							Número de DNI:
						</Box>
						{selectedProcedure.userDni}
					</Box>
					<Box as='p' color='text.primary'>
						<Box as='span' sx={{ fontWeight: "bold", marginRight: 1 }}>
							Nombre:
						</Box>
						{selectedProcedure.userName}
					</Box>
					<Box as='p' color='text.primary'>
						<Box as='span' sx={{ fontWeight: "bold", marginRight: 1 }}>
							Apellido:
						</Box>
						{selectedProcedure.userSurname}
					</Box>
					<Box as='p' color='text.primary'>
						<Box as='span' sx={{ fontWeight: "bold", marginRight: 1 }}>
							Domicilio:
						</Box>
						{selectedProcedure.userAddress}
					</Box>
					<Box as='p' color='text.primary'>
						<Box as='span' sx={{ fontWeight: "bold", marginRight: 1 }}>
							Fecha de nacimiento:
						</Box>
						{selectedProcedure.userBirthdate}
					</Box>
					<Box as='p' color='text.primary'>
						<Box as='span' sx={{ fontWeight: "bold", marginRight: 1 }}>
							Tipo de licencia:
						</Box>
						{selectedProcedure.licenceCode}
					</Box>
				</Box>
				<Box>
					<ImageList cols={amountOfColumns} gap={8}>
						<ImageListItem
							onClick={() =>
								handleImageClick({
									src: selectedProcedure.selfieUrl,
									desc: "Selfie",
								})
							}
						>
							<img src={selectedProcedure.selfieUrl} alt='Selfie' />
							<ImageListItemBar sx={{ textAlign: "center" }} title='Selfie' />
						</ImageListItem>

						<ImageListItem
							onClick={() =>
								handleImageClick({
									src: selectedProcedure.selfieDniUrl,
									desc: "Selfie c/Dni",
								})
							}
						>
							<img src={selectedProcedure.selfieDniUrl} alt='Selfie c/Dni' />
							<ImageListItemBar
								sx={{ textAlign: "center" }}
								title='Selfie c/Dni'
							/>
						</ImageListItem>

						<ImageListItem
							onClick={() =>
								handleImageClick({
									src: selectedProcedure.frontDniUrl,
									desc: "Frente del Dni",
								})
							}
						>
							<img src={selectedProcedure.frontDniUrl} alt='Frente del Dni' />
							<ImageListItemBar
								sx={{ textAlign: "center" }}
								title='Frente del Dni'
							/>
						</ImageListItem>

						<ImageListItem
							onClick={() =>
								handleImageClick({
									src: selectedProcedure.backDniUrl,
									desc: "Dorso del Dni",
								})
							}
						>
							<img src={selectedProcedure.backDniUrl} alt='Dorso del Dni' />
							<ImageListItemBar
								sx={{ textAlign: "center" }}
								title='Dorso del Dni'
							/>
						</ImageListItem>

						<ImageListItem
							onClick={() =>
								handleImageClick({
									src: selectedProcedure.debtFreeUrl,
									desc: "Libre de Deudas",
								})
							}
						>
							<img src={selectedProcedure.debtFreeUrl} alt='Libre de Deudas' />
							<ImageListItemBar
								sx={{ textAlign: "center" }}
								title='Libre de Deudas'
							/>
						</ImageListItem>
					</ImageList>
				</Box>
			</Box>
			{isStepperActive && (
				<Box width='35%'>
					<DetailStepper currentStep={getCurrentStep(selectedProcedure)} />
				</Box>
			)}

			<Dialog
				open={isImgSelected}
				onClose={handleDialogClose}
				TransitionComponent={Transition}
			>
				<DialogTitle>
					{selectedImg.desc}
					<IconButton
						aria-label='close'
						onClick={handleDialogClose}
						sx={{
							position: "absolute",
							right: 8,
							top: 8,
							color: (theme) => theme.palette.text.secondary,
						}}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<img src={selectedImg.src} alt={selectedImg.desc} />
				<DialogActions sx={{ padding: 2 }}>
					<Button
						variant='contained'
						color='info'
						size='small'
						onClick={downloadImage}
					>
						Descargar
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default DetailData;

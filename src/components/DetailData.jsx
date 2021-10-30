import React, { useState, forwardRef } from "react";
import { useLocation } from "react-router-dom";
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

const amountOfColumns = 2;

const paperworkExample = {
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
  return <Slide direction="up" ref={ref} {...props} />;
});

const DetailData = () => {
  const { pathname } = useLocation();
  const [selectedImg, setSelectedImg] = useState({});
  const [isImgSelected, setIsImgSelected] = useState(false);
  const { currentUser } = useAuth();
  const isStepperActive =
    currentUser.role === "responsable" && pathname.startsWith("/in-progress");

  function handleImageClick(image) {
    setSelectedImg(image);
    setIsImgSelected(true);
    console.log(selectedImg);
  }

  function handleDialogClose() {
    setSelectedImg({});
    setIsImgSelected(false);
  }

  function downloadImage() {
    //ImageDownload
    console.log("download Image");
  }

  return (
    <Box
      sx={{ marginTop: 4, display: "flex", justifyContent: "space-between" }}
    >
      <Box width="50%">
        <Box>
          <Box as="p" color="text.primary">
            <Box as="span" sx={{ fontWeight: "bold", marginRight: 1 }}>
              Tipo de tramite:
            </Box>
            {paperworkExample.formType}
          </Box>
          <Box as="p" color="text.primary">
            <Box as="span" sx={{ fontWeight: "bold", marginRight: 1 }}>
              Número de DNI:
            </Box>
            {paperworkExample.idCard}
          </Box>
          <Box as="p" color="text.primary">
            <Box as="span" sx={{ fontWeight: "bold", marginRight: 1 }}>
              Nombre:
            </Box>
            {paperworkExample.name}
          </Box>
          <Box as="p" color="text.primary">
            <Box as="span" sx={{ fontWeight: "bold", marginRight: 1 }}>
              Apellido:
            </Box>
            {paperworkExample.surname}
          </Box>
          <Box as="p" color="text.primary">
            <Box as="span" sx={{ fontWeight: "bold", marginRight: 1 }}>
              Domicilio:
            </Box>
            {paperworkExample.address}
          </Box>
          <Box as="p" color="text.primary">
            <Box as="span" sx={{ fontWeight: "bold", marginRight: 1 }}>
              Fecha de nacimiento:
            </Box>
            {paperworkExample.birthdate}
          </Box>
          <Box as="p" color="text.primary">
            <Box as="span" sx={{ fontWeight: "bold", marginRight: 1 }}>
              Tipo de licencia:
            </Box>
            {paperworkExample.licenceType}
          </Box>
        </Box>
        <Box>
          <ImageList cols={amountOfColumns} gap={8}>
            {paperworkExample.images.map((image, idx) => (
              <ImageListItem key={idx} onClick={() => handleImageClick(image)}>
                <img src={image.src} alt={image.desc} />
                <ImageListItemBar
                  sx={{ textAlign: "center" }}
                  title={image.desc}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Box>
      {isStepperActive && (
        <Box width="35%">
          <DetailStepper />
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
            aria-label="close"
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
            variant="contained"
            color="info"
            size="small"
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

import { useState } from "react";
import moment from "moment";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
//DateTimePicker para desktop
import { LocalizationProvider, MobileDateTimePicker } from "@mui/lab";
import { styled } from "@mui/material/styles";
import DateAdapter from "@mui/lab/AdapterMoment";
import CounterCard from "./CounterCard";
import { useMutation } from "react-query";
import {
  putRevisionDate,
  putWithdrawalDate,
  finishProcedure,
} from "../api/procedures";
import { useParams } from "react-router-dom";

const steps = [
  {
    label: "Asignación turno trámite personal",
    description: `En caso de ser primera licencia, el usuario deberá presentarse a rendir los examenes. Caso contrario deberá abonar el pago correspondiente`,
  },
  {
    label: "Asignación turno retiro de licencia",
    description:
      "Es necesario que la persona que realiza el trámite retire la documentación personalmente.",
  },
  {
    label: "Finalización del trámite",
    description: `El ciudadano ha retirado el documento con éxito`,
  },
];

const CustomStepper = styled(Stepper)(({ theme }) => ({
  "& .MuiSvgIcon-root": {
    "&.Mui-completed": { color: theme.palette.info.main },
    "&.Mui-active": { color: theme.palette.secondary.main },
  },
}));

const DetailStepper = ({ currentStep }) => {
  const { idProcedure } = useParams();
  const [activeStep, setActiveStep] = useState(currentStep);
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [isDateValid, setIsDateValid] = useState(false);
  const [dateErrorMsg, setDateErrorMsg] = useState("");
  const [isDatePickerActive, setIsDatePickerActive] = useState(false);

  const putUserMutation = useMutation(
    (mutationData) => {
      switch (activeStep) {
        case 0:
          putRevisionDate(mutationData.idProcedure, mutationData.date);
          break;
        case 1:
          putWithdrawalDate(mutationData.idProcedure, mutationData.date);
          break;
        case 2:
          finishProcedure(mutationData.idProcedure, false, "");
          break;
        default:
          console.log("error");
          break;
      }
    },
    {
      onSuccess: () => {
        if (activeStep < 2) {
          setIsDatePickerActive(false);
        }
        handleNextStep();
      },
    }
  );

  const validateDate = (newValue) => {
    const selectedDate = newValue._d;
    const initDate = newValue._i;

    // saturday === 0, monday === 1, tuesday === 2, etc
    const selectedDay = selectedDate.getDay();
    const selectedHour = selectedDate.getHours();
    const selectedDateNumber = selectedDate.getDate();

    const initDateNumber = initDate.getDate();
    const initHour = initDate.getHours();

    const isWeekDay = selectedDay !== 0 && selectedDay !== 6;
    const isHourValid = selectedHour >= 8 && selectedHour < 20;
    const isDateOld =
      selectedDateNumber <= initDateNumber && selectedHour <= initHour;

    setIsDateValid(isWeekDay && isHourValid && !isDateOld);
    if (!isDateValid) {
      if (isDateOld) {
        setDateErrorMsg("Elija una fecha valida");
      } else if (!isWeekDay) {
        setDateErrorMsg("Elija un dia de semana");
      } else if (!isHourValid) {
        setDateErrorMsg("Elija un horario laboral");
      }
    } else {
      setDateErrorMsg("");
    }
  };

  const handleNextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // const handleReset = () => {
  // 	setActiveStep(0);
  // };

  const handleDateChange = (newValue) => {
    validateDate(newValue);
    setAppointmentDate(newValue);
  };

  const openAppointmentDialog = (index) => {
    if (index !== steps.length - 1) {
      setIsDatePickerActive(true);
    } else {
      handleNextStep();
      putUserMutation.mutate({ idProcedure });
    }
  };

  const handleDialogCancel = () => {
    setIsDatePickerActive(false);
  };

  const handleAppointmentCreation = () => {
    const selectedDate = appointmentDate.format("yyyy-MM-DD");
    putUserMutation.mutate({ idProcedure, date: selectedDate });
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <CustomStepper
        activeStep={activeStep}
        orientation="vertical"
        sx={{ marginBottom: 2 }}
      >
        {steps.map((step, index) => (
          <Step expanded key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              <Typography
                color={activeStep === index ? "text.primary" : "text.secondary"}
                variant="body"
              >
                {step.label}
              </Typography>
            </StepLabel>
            <StepContent>
              <Typography
                color={activeStep === index ? "text.primary" : "text.secondary"}
              >
                {step.description}
              </Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => openAppointmentDialog(index)}
                    sx={{ mt: 1, mr: 1 }}
                    disabled={activeStep !== index}
                  >
                    {index === steps.length - 1 ? "Finalizar" : "Asignar"}
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
        {/*
					Reset Button For Testing
				 <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
					Reset
				</Button> */}
      </CustomStepper>
      {activeStep === steps.length && (
        <CounterCard
          title="Finalizado exitosamente"
          counter={moment().format("DD/MM/yyyy")}
          fullSize
        />
      )}

      <Dialog open={isDatePickerActive} onClose={handleDialogCancel} fullWidth>
        <DialogTitle sx={{ paddingBottom: 1 }}>
          {activeStep < steps.length ? steps[activeStep].label : ""}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="datepicker-dialog">
            <FormControl variant="standard" sx={{ marginTop: 1, width: 0.75 }}>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <MobileDateTimePicker
                  label="Fecha de trámite"
                  inputFormat="DD/MM/YYYY hh:mm"
                  renderInput={(params) => (
                    <TextField {...params} helperText={dateErrorMsg} />
                  )}
                  value={appointmentDate}
                  onChange={handleDateChange}
                />
              </LocalizationProvider>
            </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Button
            color="info"
            variant="contained"
            size="small"
            onClick={handleDialogCancel}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleAppointmentCreation}
            autoFocus
            color="primary"
            variant="contained"
            size="small"
            disabled={!isDateValid}
          >
            Asignar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DetailStepper;

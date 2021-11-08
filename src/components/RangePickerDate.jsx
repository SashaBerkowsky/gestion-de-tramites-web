import * as React from "react";
import TextField from "@mui/material/TextField";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";

export default function RangePickerDate({ onChangeDate }) {
  const [value, setValue] = React.useState([null, null]);
  const handleChangeValue = (newValue) => {
    setValue(newValue);
    onChangeDate(newValue);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        startText="Inicio"
        endText="Finalización"
        value={value}
        onChange={handleChangeValue}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} size="small" />
            <Box sx={{ mx: 2 }}> a </Box>
            <TextField {...endProps} size="small" />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
}

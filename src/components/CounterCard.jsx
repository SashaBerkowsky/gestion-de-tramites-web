import { Card, CardContent, Grid, Typography } from "@mui/material";

const CounterCard = ({ title, counter, size = 4 }) => {
  return (
    <Grid item xs={size}>
      <Card>
        <CardContent>
          <Typography
            variant="button"
            color="text.greenApp"
            sx={{ fontWeight: "bold" }}
          >
            {title}
          </Typography>
          <Typography
            variant="h5"
            color="text.primary"
            sx={{ fontWeight: "bold" }}
          >
            {counter}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CounterCard;

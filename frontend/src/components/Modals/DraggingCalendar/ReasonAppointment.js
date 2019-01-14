import React from "react";
import { getReasonStyles } from "./Styles";
import TextField from "@material-ui/core/TextField";

function ReasonAppointment(props) {
  const styles = getReasonStyles();
  return (
    <div>
      <div style={styles.reasonAppointment}>{"Reason for the appointment"}</div>
      <TextField />
    </div>
  );
}

export default ReasonAppointment;

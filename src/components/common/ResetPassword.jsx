import React, { useState } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Grid from "@material-ui/core/Grid";
import EmailIcon from "@material-ui/icons/Email";
import InputAdornment from "@material-ui/core/InputAdornment";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Collapse from "@material-ui/core/Collapse";

import Background from "../common/Background";
import http from "../../services/HttpService";
import { apiPasswordReset } from "../../config.json";
import { reportUserErrors } from "../../utils.js";
import MaterialSpinner from "./MaterialSpinner";

const ResetPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Call the back end and re-direct towards the login(to log in w/ the new password)
    try {
      await http.post(apiPasswordReset, { email });
      setIsSubmitting(false);
      setIsEmailSent(true);
    } catch (ex) {
      // Revert the state to its original state.
      setIsSubmitting(false);
      reportUserErrors(ex);
    }
  };

  // Handle fields change
  const handleChange = ({ target }) => {
    setEmail(target.value);
  };

  return (
    <>
      <Background />
      <div className="box">
        <ArrowBackIcon
          color="primary"
          style={{
            cursor: "pointer",
            fontSize: "35px",
            marginTop: "10px",
          }}
          onClick={history.goBack}
        />
        <div
          className="container-fluid d-flex flex-column justify-content-center align-items-center"
          style={{ height: "85%" }}
        >
          <Collapse in={isEmailSent}>
            <div
              className={`${isEmailSent ? "alert alert-primary" : "d-none"}`}
              role="alert"
              style={{ fontSize: ".9rem" }}
            >
              <div className="row">
                <InfoOutlinedIcon
                  className="col align-self-center"
                  style={{ fontSize: "50px" }}
                />
                <p className="col-10">
                  A link has been sent to your Email account with instructions
                  to reset your password, please check your inbox, or spam
                  folder
                </p>
              </div>
            </div>
          </Collapse>
          <ValidatorForm
            instantValidate
            onSubmit={handleSubmit}
            className="w-100"
          >
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item className="w-100">
                <TextValidator
                  id="email"
                  label="Email"
                  name="email"
                  fullWidth
                  onChange={handleChange}
                  value={email}
                  type="email"
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    "This field is required",
                    "Please enter a valid email",
                  ]}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <button
              className="btn custom-submit-btn d-block mt-5 mx-auto"
              type="submit"
              disabled={isSubmitting}
            >
              <span className={`${isSubmitting ? "d-none" : "d-block"}`}>
                Reset Password
              </span>
              <MaterialSpinner
                size={20}
                thickness={4}
                className={`mx-3 ${
                  isSubmitting ? "d-block" : "d-none"
                } text-white`}
              />
            </button>
          </ValidatorForm>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;

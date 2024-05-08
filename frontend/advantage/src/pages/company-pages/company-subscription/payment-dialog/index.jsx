import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { Form, Field } from "react-final-form";
import { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import InputMask from "react-input-mask";
import { BASE_URL } from "../../../../common/constans";

export default function PaymentDialog({
  open,
  handleClose,
  openSnack,
  paymentPlanType,
  paymentPeriodType,
}) {
  const [loading, setLoading] = useState(false);
  const [cvc, setCvc] = useState("");
  const [expiry, setExpiry] = useState("");
  const [focused, setFocused] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleInputFocus = ({ target }) => {
    setFocused(target.id);
  };

  const validateInputs = () => {
    // Check if cvc, expiry, name, and number are entered
    const isCvcEntered = cvc.trim() !== "" && cvc.trim().length === 3;
    const isExpiryEntered = expiry.trim() !== "";
    const isNameEntered = name.trim() !== "";
    const isNumberEntered = number.trim() !== "" && number.trim().length === 19;

    // Check if cvc is entered, expiry month is smaller than 13, and expiry year is larger than 24
    const isValidCVC = isCvcEntered;
    const [expiryMonth, expiryYear] = expiry.split("/");
    const isValidExpiry =
      isExpiryEntered &&
      parseInt(expiryMonth, 10) < 13 &&
      parseInt(expiryYear, 10) > 24;

    // Check if all fields are entered
    const isWholeCardEntered =
      isCvcEntered && isExpiryEntered && isNameEntered && isNumberEntered;

    return {
      isValidCVC,
      isValidExpiry,
      isNameEntered,
      isWholeCardEntered,
    };
  };

  return (
    <Form
      onSubmit={(values) => {
        var validation = validateInputs();
        if (!validation.isValidCVC) {
          openSnack({
            severity: "error",
            text: "CVC is not entered in valid format.",
          });
          return;
        }
        if (!validation.isValidExpiry) {
          openSnack({
            severity: "error",
            text: "Expire date is not entered in valid format.",
          });
          return;
        }
        if (!validation.isNameEntered) {
          openSnack({
            severity: "error",
            text: "Name must be entered in valid format.",
          });
          return;
        }
        if (!validation.isWholeCardEntered) {
          openSnack({
            severity: "error",
            text: "Credit card number must be in valid format.",
          });
          return;
        }

        var token = localStorage.getItem("userToken");
        const requestOptions = {
          method: "POST",
          redirect: "follow",
        };
        const currentDate = new Date();
        const formattedCurrentDate = `${currentDate.getFullYear()}-${(
          currentDate.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${currentDate
          .getDate()
          .toString()
          .padStart(2, "0")} ${currentDate
          .getHours()
          .toString()
          .padStart(2, "0")}:${currentDate
          .getMinutes()
          .toString()
          .padStart(2, "0")}:${currentDate
          .getSeconds()
          .toString()
          .padStart(2, "0")}`;
        fetch(
          BASE_URL +
            "/company/updateSubscription?token=" +
            token +
            "&paymentPlanType=" +
            paymentPlanType +
            "&paymentPeriodType=" +
            paymentPeriodType +
            "&createdAt=" +
            formattedCurrentDate,
          requestOptions
        )
          .then((response) => {
            if (response.ok) {
              window.location.reload();
              openSnack({
                severity: "success",
                text: "Subscription plan has changed successfully.",
              });
              return undefined;
            } else return response.text();
          })
          .then((result) => {
            if (result) {
              openSnack({ severity: "error", text: result });
            }
          })
          .catch((error) => console.error(error));
      }}
      render={({ handleSubmit }) => (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <form onSubmit={handleSubmit} style={{ marginTop: 0, padding: 0 }}>
            <DialogContent>
              <Typography
                variant="h4"
                style={{ marginBottom: "5px", fontSize: "1.3rem" }}
              >
                Enter your payment information
              </Typography>
              <Stack direction={"column"} gap={"8px"}>
                <Box margin={"20px"}>
                  <Cards
                    number={number}
                    name={name}
                    expiry={expiry}
                    cvc={cvc}
                    focused={focused}
                  />
                </Box>

                <Field name="number">
                  {({ input }) => (
                    <Box
                      display={"flex"}
                      alignSelf={"stretch"}
                      flexDirection={"column"}
                      gap={"4px"}
                    >
                      <Typography>Credit Card Number</Typography>
                      <InputMask
                        {...input}
                        mask="9999 9999 9999 9999"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        disabled={false}
                        maskChar=" "
                      >
                        {() => (
                          <TextField
                            id="number"
                            fullWidth
                            size="small"
                            type="outlined"
                            onFocusCapture={handleInputFocus}
                          />
                        )}
                      </InputMask>
                    </Box>
                  )}
                </Field>
                <Field name="expiry">
                  {({ input }) => (
                    <Box
                      display={"flex"}
                      alignSelf={"stretch"}
                      flexDirection={"column"}
                      gap={"4px"}
                    >
                      <Typography>Expiration Date</Typography>
                      <InputMask
                        {...input}
                        mask="99/99"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        disabled={false}
                        maskChar=" "
                      >
                        {() => (
                          <TextField
                            id="expiry"
                            fullWidth
                            size="small"
                            type="outlined"
                            onFocusCapture={handleInputFocus}
                          />
                        )}
                      </InputMask>
                    </Box>
                  )}
                </Field>
                <Field name="cvc">
                  {({ input }) => (
                    <Box
                      display={"flex"}
                      alignSelf={"stretch"}
                      flexDirection={"column"}
                      gap={"4px"}
                    >
                      <Typography>CVC</Typography>
                      <InputMask
                        {...input}
                        mask="999"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        disabled={false}
                        maskChar=" "
                      >
                        {() => (
                          <TextField
                            id="cvc"
                            fullWidth
                            type="outlined"
                            size="small"
                            onFocusCapture={handleInputFocus}
                          />
                        )}
                      </InputMask>
                    </Box>
                  )}
                </Field>
                <Field name="name">
                  {({ input }) => (
                    <Box
                      display={"flex"}
                      alignSelf={"stretch"}
                      flexDirection={"column"}
                      gap={"4px"}
                    >
                      <Typography>Cardholder Name</Typography>
                      <TextField
                        {...input}
                        id="name"
                        fullWidth
                        type="outlined"
                        size="small"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocusCapture={handleInputFocus}
                      />
                    </Box>
                  )}
                </Field>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button color="primary" type="submit" disabled={loading}>
                {loading ? (
                  <CircularProgress
                    style={{ height: "24.5px", width: "24.5px" }}
                    color="inherit"
                  />
                ) : (
                  "Subscribe"
                )}
              </Button>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      )}
    ></Form>
  );
}

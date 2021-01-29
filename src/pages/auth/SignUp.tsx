import React, { useState } from "react";
import { Helmet } from "react-helmet";
import {
  Button,
  CircularProgress,
  Grid,
  Link as MuiLink,
  TextField,
  Typography,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useAuth } from "../../contexts/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterRequest } from "../../types/auth";
import { routes } from "../../routes";
import { useForm } from "react-hook-form";
import { registerSchema } from "../../schemas/authSchema";
import AuthWrapper from "../../components/styleds/AuthWrapper";
import Alert from "../../components/styleds/Alert";

function SignUp() {
  const auth = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [registerError, setRegisterError] = useState<string | null>(null);
  const {
    handleSubmit,
    register,
    errors,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async ({ name, email, password }: RegisterRequest) => {
    await auth.register(
      { email, password, name },
      () => {
        enqueueSnackbar("Sign up successfully", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
        history.push(routes.HOME);
      },
      (error) => {
        setRegisterError(error.message || "Something went wrong");
      }
    );
  };

  console.log(errors);

  return (
    <AuthWrapper>
      <Helmet title="Sign Up" />
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Typography variant="h1" align="center">
            Register
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" align="center">
            Accept and send payments easily with Xendit
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              {registerError && (
                <Grid item xs={12}>
                  <Alert mt={2} mb={1} severity="warning">
                    {registerError}
                  </Alert>
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  id="email"
                  type="email"
                  name="email"
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  required
                  inputRef={register}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  autoComplete="email"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="password"
                  type="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  required
                  inputRef={register}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  variant="outlined"
                  fullWidth
                  required
                  inputRef={register}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              </Grid>
            </Grid>
            <Grid container spacing={6} style={{ marginTop: 10 }}>
              <Grid item xs={12}>
                <Typography variant="subtitle2" align="left" component="span">
                  Already have an account?&nbsp;
                </Typography>
                <Link to={routes.SIGNIN}>
                  <Typography variant="subtitle2" align="left" component="span">
                    Sign in
                  </Typography>
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  color="primary"
                  // disabled={isSubmitting}
                >
                  {isSubmitting ? <CircularProgress /> : "Register"}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" align="center">
                  By clicking Register, you agree to our&nbsp;
                  <MuiLink href="https://www.xendit.co/en/privacy-policy/">
                    Privacy Policy
                  </MuiLink>
                  , and&nbsp;
                  <MuiLink href="https://www.xendit.co/en/terms-and-conditions/">
                    Cookie Policy
                  </MuiLink>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}

export default SignUp;

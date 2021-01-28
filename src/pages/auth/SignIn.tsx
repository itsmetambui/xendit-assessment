import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  TextField,
  Typography,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { useAuth } from "../../contexts/AuthContext";
import { routes } from "../../routes";
import { loginSchema } from "../../schemas/authSchema";
import { LoginRequest } from "../../types/auth";
import AuthWrapper from "../../components/styleds/AuthWrapper";
import Alert from "../../components/styleds/Alert";

function SignIn() {
  const auth = useAuth();
  const history = useHistory();
  const [loginError, setLoginError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      email: "hello@xendit.com",
      password: "unsafepassword",
    },
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async ({ email, password }: LoginRequest) => {
    await auth.login(
      { email, password },
      () => {
        history.push(routes.HOME);
      },
      (error) => {
        setLoginError(error.message || "Something went wrong");
      }
    );
  };

  return (
    <AuthWrapper>
      <Helmet title="Sign In" />
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Typography variant="h1" align="center">
            Login
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" align="center">
            Accept and send payments easily with Xendit
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              <Alert mt={3} mb={1} severity="info">
                Use <strong>hello@xendit.com</strong> and{" "}
                <strong>unsafepassword</strong> to sign in
              </Alert>
              {loginError && (
                <Grid item xs={12}>
                  <Alert mt={2} mb={1} severity="warning">
                    {loginError}
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
                  autoComplete="password"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" align="left" component="span">
                  Not a member?&nbsp;
                </Typography>
                <Link to={routes.SIGNUP}>
                  <Typography variant="subtitle2" align="left" component="span">
                    Register now
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <CircularProgress /> : "Sign in"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}

export default SignIn;

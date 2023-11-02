import { useState } from "react";
import { useRouter } from "next/router";
import { FormWrapper } from "./style";

import {
  Container,
  Box,
  Grid,
  Link,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/auth";

const AuthPage = () => {
  const router = useRouter();
  const { setUser } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const toggleLogIn = () => setIsLoggingIn(!isLoggingIn);

  const handleRedirect = (data) => {
    setUser(data);
    router.push({ pathname: "/" });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password }),
      });
      if (response.ok) {
        const data = await response.json();

        handleRedirect(data);
        setUsername("");
        setPassword("");
      }
      if (response.status === 409) {
        toast.error("User already exists");
        setUsername("");
        setPassword("");
      }
    } catch (err) {
      console.error(err);
      setUsername("");
      setPassword("");
      toast.error("Something went wrong while signing up");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data) {
          handleRedirect(data);
          setUsername("");
          setPassword("");
        }
      }
      if (response.status >= 400 && response.status < 500) {
        toast.error("Wrong username or password");
        setUsername("");
        setPassword("");
      }
    } catch (err) {
      console.error("Network error", err);
      toast.error("Something went wrong. Please try again later.");
      setUsername("");
      setPassword("");
    }
  };

  return (
    <FormWrapper>
      <Container maxWidth='xs'>
        <Box>
          <Typography component='h1' variant='h5'>
            {isLoggingIn ? "Log in" : "Sign Up"}
          </Typography>
          <Box
            component='form'
            onSubmit={isLoggingIn ? handleLogin : handleSignUp}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              label='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              label='Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              {isLoggingIn ? "Log In" : "Sign Up"}
            </Button>

            <Grid container>
              <Link
                onClick={toggleLogIn}
                style={{ cursor: "pointer" }}
                variant='body2'
              >
                {isLoggingIn
                  ? "Don't have an account? Sign Up"
                  : "Have an account? Log In"}
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </FormWrapper>
  );
};

export default AuthPage;

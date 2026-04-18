import {
  Button,
  Card,
  Form,
  Input,
  Label,
  Link,
  TextField,
  Spinner,
} from "@heroui/react";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        BASE_URL + "/login",
        { emailId: email, password },
        { withCredentials: true },
      );

      dispatch(addUser(response.data));
      toast.success("Login successfull");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId: email,
          password,
        },
        { withCredentials: true },
      );

      dispatch(addUser(response.data));
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Resume Generator
        </h1>
        <p className="text-gray-500 mt-2 max-w-md">
          Build professional resumes effortlessly with AI-powered suggestions.
        </p>
      </div>

      <Card className="w-full max-w-md shadow-lg">
        <Card.Header>
          <Card.Title className="text-xl font-bold">
            {isLogin ? "Login" : "Create Account"}
          </Card.Title>
          <Card.Description>
            {isLogin
              ? "Enter your credentials to access your account"
              : "Sign up to start building your resume"}
          </Card.Description>
        </Card.Header>

        <Form onSubmit={isLogin ? handleSignIn : handleSignUp}>
          <Card.Content>
            <div className="flex flex-col gap-4">
              {!isLogin && (
                <>
                  <TextField isRequired name="first_name">
                    <Label>First Name</Label>
                    <Input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John"
                    />
                  </TextField>
                  <TextField isRequired name="last_name">
                    <Label>Last Name</Label>
                    <Input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                    />
                  </TextField>
                </>
              )}

              <TextField name="email" type="email">
                <Label>Email</Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                />
              </TextField>

              <TextField name="password" type="password">
                <Label>Password</Label>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </TextField>
            </div>
          </Card.Content>

          <Card.Footer className="mt-4 flex flex-col gap-3">
            <Button
              className="w-full flex items-center justify-center gap-2"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  {isLogin ? "Signing in..." : "Signing up..."}
                </>
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
            </Button>

            <Link onClick={() => setIsLogin(!isLogin)} className="underline">
              {isLogin
                ? "Don’t have an account? Sign up"
                : "Already have an account? Login"}
            </Link>
          </Card.Footer>
        </Form>
      </Card>
    </div>
  );
};

export default Login;

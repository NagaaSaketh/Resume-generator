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
import { easeOut, motion } from "framer-motion";
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
      navigate("/app");
    } catch (err) {
      console.error(err);
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if(!firstName || !lastName ||!email || !password){
      toast.error("Please enter all the required fields")
      return;
    }
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
      navigate("/app");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-center mb-2">
        <h1 className="text-4xl sm:text-5xl font-bold bg-linear-to-r from-blue-600 to-red-500 bg-clip-text text-transparent mb-2">
          Resume Generator
        </h1>
        {/* <p className="text-gray-500 mt-3 text-lg max-w-lg">
          Build professional resumes effortlessly with AI-powered suggestions.
        </p> */}
      </div>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: easeOut }}
      >
        <Card
          className={`w-full ${isLogin ? "max-w-md" : "max-w-xl"} className="shadow-xl hover:shadow-2xl transition duration-300"`}
        >
          <Card.Header className="px-8 pt-8 pb-2">
            <Card.Title className="text-center text-xl font-bold">
              {isLogin ? "Welcome Back" : "Create Account"}
            </Card.Title>
            <Card.Description className="text-center">
              {isLogin
                ? "Continue building your AI-powered resume"
                : "Start building your AI-powered resume in minutes"}
            </Card.Description>
          </Card.Header>
          <motion.div
            key={isLogin ? "login" : "signup"}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Form onSubmit={isLogin ? handleSignIn : handleSignUp}>
              <Card.Content className="px-8 py-4">
                <div className="flex flex-col gap-6">
                  {!isLogin && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <TextField className="space-y-1">
                          <Label>First Name</Label>
                          <Input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="John"
                            className="h-12 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 rounded-lg"
                          />
                        </TextField>

                        <TextField className="space-y-1">
                          <Label>Last Name</Label>
                          <Input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Doe"
                            className="h-12 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 rounded-lg"
                          />
                        </TextField>
                      </div>
                    </>
                  )}

                  <TextField className="space-y-2" name="email" type="email">
                    <Label>Email</Label>
                    <Input
                      className="h-12"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                    />
                  </TextField>

                  <TextField
                    className="space-y-1"
                    name="password"
                    type="password"
                  >
                    <Label>Password</Label>
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="h-12"
                    />
                  </TextField>
                </div>
              </Card.Content>

              <Card.Footer className="px-8 pb-8 pt-6 flex flex-col gap-4">
                <Button
                  as={motion.button}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.03 }}
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

                <Link
                  onClick={() => setIsLogin(!isLogin)}
                  className="underline font-medium hover:text-blue-600 transition"
                >
                  {isLogin
                    ? "Don’t have an account? Sign up"
                    : "Already have an account? Login"}
                </Link>
              </Card.Footer>
            </Form>
          </motion.div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Login;

import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { addResume } from "../utils/resumeSlice";
import axios from "axios";
import NavBar from "./NavBar";
import { Skeleton } from "@heroui/react";
import { motion } from "framer-motion";
const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const resumes = useSelector((store) => store.resume);
  const [isLoading, setIsLoading] = useState(true);

  console.log(user);
  console.log(resumes);

  const fetchUser = async () => {
    try {
      const response = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });
      dispatch(addUser(response.data));
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchResumes = async () => {
    try {
      const response = await axios.get(BASE_URL + "/resumes", {
        withCredentials: true,
      });
      dispatch(addResume(response.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
    if (user) {
      fetchResumes();
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="space-y-2">
            <p className="text-xs text-muted text-center">Loading...</p>

            <div className="shadow-panel space-y-3 rounded-lg bg-transparent p-4">
              <Skeleton animationType="shimmer" className="h-20 rounded-lg" />
              <Skeleton
                animationType="shimmer"
                className="h-3 w-3/5 rounded-lg"
              />
              <Skeleton
                animationType="shimmer"
                className="h-3 w-4/5 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.3 }}
      >
        <NavBar />
        <main className="flex-1 pb-20">
          <Outlet />
        </main>
      </motion.div>
    </div>
  );
};

export default Body;

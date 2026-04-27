import "./App.css";
import store from "./utils/store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

import Login from "./components/Login";
import Body from "./components/Body";
import ResumeForm from "./components/ResumeForm";
import SavedResumes from "./components/SavedResumes";
import Resume from "./components/Resume";
import HomePage from "./pages/HomePage";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<Body />}>
          <Route index element={<ResumeForm />} />
          <Route path="resumes" element={<SavedResumes />} />
          <Route path="resumes/:id" element={<Resume/>}/>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Toaster position="top-right" />

      <BrowserRouter>
        <AnimatedRoutes /> 
      </BrowserRouter>
    </Provider>
  );
}

export default App;

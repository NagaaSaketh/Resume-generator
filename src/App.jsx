import "./App.css";
import store from "./utils/store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import Body from "./components/Body";
import ResumeForm from "./components/ResumeForm";
import SavedResumes from "./components/SavedResumes";
function App() {
  return (
    <Provider store={store}>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Body />}>
            <Route index element={<ResumeForm />} />
            <Route path="resumes" element={<SavedResumes/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

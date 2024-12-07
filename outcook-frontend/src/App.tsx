import { BrowserRouter, Routes, Route } from "react-router-dom";
import Messages from "@/pages/Messages"
import './App.css'
import LoginPage from "./ui/components/Signin";
import SignupPage from "./ui/components/Signup";
import Toaster from "./ui/components/Toaster";
import Home from "./pages/Home";

function App() {

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
            <Route path="/messages" element={<Messages/>}/>
            <Route path="/signin" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignupPage/>} />
            <Route index element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

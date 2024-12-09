import { BrowserRouter, Routes, Route } from "react-router-dom";
import Messages from "@/pages/Messages"
import './App.css'
import LoginPage from "./ui/components/Signin";
import SignupPage from "./ui/components/Signup";
import Toaster from "./ui/components/Toaster";
import Home from "./pages/Home";
import { Suspense } from "react";
import { Loader } from "./ui/components/Loader";

function App() {

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
            <Route path="/messages" element={<Suspense fallback={< Loader />}><Messages/></Suspense>}/>
            <Route path="/signin" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignupPage/>} />
            <Route index element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

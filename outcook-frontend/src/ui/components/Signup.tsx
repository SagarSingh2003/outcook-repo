import { useToast } from "@/hooks/useToast";
import { SignUp } from "@/utils/sendAuth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { Loader } from "./Loader";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { email, password, username } from "@/atoms/userInfo";

const SignupPage = () => {

    const [loading , setLoading] = useState(false)
    const setEmail = useSetRecoilState(email)
    const setPassword = useSetRecoilState(password)
    const setUsername = useSetRecoilState(username)
    const {showToast} = useToast()
    const navigate = useNavigate()

    const validationSchema = Yup.object({
        username: Yup.string()
          .required("Username is required")
          .min(3, "Username must be at least 3 characters"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        password: Yup.string()
          .required("Password is required")
          .min(6, "Password must be at least 6 characters"),
      });

  const handleSubmit = async (values : any) => {
    
    setLoading(true)
    const isComplete = await SignUp(values.email , values.password , values.username);
    console.log("response : " , isComplete);

    if(isComplete.msg){
        showToast({title : "✅ " + isComplete.msg , desc : ""})
        setEmail(values.email)
        setUsername(values.username)
        setPassword(values.password)
        navigate('/signin')
    }else{
        showToast({title : "❌ signup failed try again! " , desc : isComplete})
    }
    setLoading(false);

  };

  return (
    <div className="login-page">
      <div className="left-panel">
        <div className="brand">Acme Inc</div>
        <div className="testimonial">
          <p className="padding-2">
                This is the Best Message Sharing Platform ❤️
          </p>
          <span className="text-sm">Sagar Singh</span>
        </div>
      </div>
      <div className="right-panel">
        <Formik
          initialValues={{ username: "", email: "" , password : ""}}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="form-container">
              <h2>Create an account</h2>
              <p>Enter your email below to create your account</p>

              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Field
                  type="username"
                  id="username"
                  name="username"
                  placeholder="name example"
                />
                <ErrorMessage name="username" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  type="text"
                  id="password"
                  name="password"
                  placeholder="Your Password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>


              <button type="submit" className="submit-btn">
                { !loading ? "Sign Up with Email" : <Loader />}
              </button>

              <div className="divider">
                <span>OR CONTINUE WITHOUT AUTHENTICATION </span>
              </div>

              <button type="button" className="github-btn" 
                onClick={() => {
                    window.location.href = "/messages"
                }}
              >
                MOCK API MESSAGES SECTION
              </button>

              <p className="terms">
                Already have an Account ? {" "}
                <a href="/signin" style={{color: "#4398f0"}}>signin</a>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupPage;

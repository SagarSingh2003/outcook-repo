import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { SignIn } from "@/utils/sendAuth";
import { useState } from "react";
import { Loader } from "./Loader";
import { useToast } from "@/hooks/useToast";
import { useRecoilValue } from "recoil";
import { email, password} from "@/atoms/userInfo";

const LoginPage = () => {

   const email_id = useRecoilValue(email)
   const pass = useRecoilValue(password);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const [loading , setLoading ] = useState(false)
  const {showToast} = useToast()

  const handleSubmit = async (values : any) => {

            setLoading(true)
            const isComplete = await SignIn(values.email, values.password);
            console.log("response : " , isComplete);
            if(isComplete.msg){
                showToast({title : isComplete.msg + " ✅", desc : ""})
                localStorage.setItem("email" , values.email)
                window.location.href = "/"
            }else{
                showToast({title : "❌ signin failed try again! , please signup first before signing in! " , desc : isComplete})
            }
            setLoading(false);
   };

  return (
    <div className="login-page">
      <div className="left-panel">
        <div className="brand">Outcook Inc</div>
        <div className="testimonial">
          <p className="padding-2">
                This is the Best Message Sharing Platform ❤️
          </p>
          <span className=" text-sm ">Sagar Singh</span>
        </div>
      </div>
      <div className="right-panel">
        <Formik
          initialValues={{email: email_id || "" ,password: pass  || ""}}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="form-container">
              <h2>Already have an account ? Sign in </h2>
              <p>Enter your email below to signin to your account</p>

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
                    {!loading ? "Sign In with Email" : <Loader />}
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
                Don't have an Account ? {" "}
                <a href="/signup" style={{color: "#4398f0"}}>signup</a>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;

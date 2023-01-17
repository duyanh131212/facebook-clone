import LoginInput from "../../components/inputs/logininput";
import { useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const loginInfos = {
    email: "",
    password: "",
  };
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const loginValidation = Yup.object({
    email: Yup.string()
      .email("Invalid email address.")
      .required("Required")
      .max(100),
    password: Yup.string().required("Required"),
  });

  return (
    <div className="login_wrap">
      <div className="login_1">
        <img src="../../icons/facebook.svg" alt="logo" />
      </div>
      <div className="login_2">
        <div className="login_2_wrap">
          <Formik
            enableReinitialize
            initialValues={{ email, password }}
            validationSchema={loginValidation}
          >
            {(formik) => (
              <Form>
                <p className="p">Log Into Facebook</p>
                <LoginInput
                  type="text"
                  name="email"
                  placeholder="Email address or phone number"
                  onChange={handleLoginChange}
                  bottom={false}
                />
                <LoginInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleLoginChange}
                  bottom={true}
                />
                <button type="submit" className="blue_btn">
                  Log In
                </button>
              </Form>
            )}
          </Formik>
          <Link to="/forgot" className="forgot_password">
            Forgot account?
          </Link>
          <div className="sign_splitter"></div>
          <button className="blue_btn open_signup">Create new account</button>
        </div>
      </div>
    </div>
  );
}

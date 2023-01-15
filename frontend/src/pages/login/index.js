import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import LoginInput from "../../components/inputs/logininput";
import { useState } from "react";
import "./style.css";

const loginInfos = {
  email: "",
  password: "",
};

export default function Login() {
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  return (
    <div className="login">
      <div className="login_wrapper">
        <div className="login_wrap">
          <div className="login_1">
            <img src="../../icons/facebook.svg" alt="logo" />
          </div>
          <div className="login_2">
            <div className="login_2_wrap">
              <Formik enableReinitialize initialValues={(email, password)}>
                {(formik) => (
                  <Form>
                    <p>Log Into Facebook</p>
                    <LoginInput
                      type="text"
                      name="email"
                      placeholder="Email address or phone number"
                      onChange={handleLoginChange}
                    />
                    <LoginInput
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleLoginChange}
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
              <button className="blue_btn open_signup">
                Create new account
              </button>
            </div>
          </div>
        </div>
        <div className="register"></div>
      </div>
    </div>
  );
}

import { useAuth } from "../authprovider";
import { useNavigate, useLocation } from "react-router-dom";

import styles from "./LoginPage.module.scss";
import React from "react";

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/";

  function handleSignOutSubmit(event) {
    event.preventDefault();

    auth.signout(() => {
      navigate("/test/login");
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let password = formData.get("password");

    auth.signin(
      password,
      () => {
        // Send them back to the page they tried to visit when they were
        // redirected to the login page. Use { replace: true } so we don't create
        // another entry in the history stack for the login page.  This means that
        // when they get to the protected page and click the back button, they
        // won't end up back on the login page, which is also really nice for the
        // user experience.
        // navigate(from, { replace: true });
        navigate("/test/picker", { replace: true });
      },
      (msg) => {
        console.log("error msg", msg);
      }
    );
  }

  return (
    <div>
      {auth.isAuthenticated ? (
        <React.Fragment>
          <section className={styles.contentContainer}>
            <label className={`title4 ${styles.label}`}>
              You are logged in
            </label>
          </section>
          <form onSubmit={handleSignOutSubmit}>
            <button className={styles.submitLink} type="submit">
              Sign out
            </button>
          </form>
        </React.Fragment>
      ) : (
        <form onSubmit={handleSubmit}>
          <section className={styles.contentContainer}>
            <label className={`title4 ${styles.label}`}>
              password: <input name="password" type="password" />
            </label>
          </section>
          <button className={styles.submitLink} type="submit">
            Login
          </button>
        </form>
      )}
    </div>
  );
}

export default LoginPage;

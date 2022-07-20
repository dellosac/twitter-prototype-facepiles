import { useAuth } from "../authprovider";
import { useEffect, useState, Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Spinner } from "../components";
import { IMAGE_PRELOADER } from "../utils";
import styles from "./LoginPage.module.scss";
import React from "react";

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    async function fetchImages() {
      const imagesLoaded = await IMAGE_PRELOADER.loadImages();
      if (imagesLoaded) {
        console.log("all images loaded effect");
        setImagesLoaded(true);
      }
    }
    fetchImages();
  });

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
            {!imagesLoaded ? (
              <div className={styles.loadingWrapper}>
                <Spinner />
                <div className={styles.loadingCopy}>
                  <p className="title3">Loading Prototype</p>
                  <p className="subtext1">Please wait</p>
                </div>
              </div>
            ) : (
              <Fragment>
                <div className={styles.loadingWrapper}>
                  <div className={styles.loadedCopy}>
                    <p className="title3">Prototype Ready!</p>
  
                  </div>
                </div>
                <label className={`title4 ${styles.label}`}>
                  Enter password:<br /> <input className={styles.passwordInput} name="password" type="password" />
                </label>
              </Fragment>
            )}
          </section>
          {imagesLoaded && (
            <button
              className={styles.submitLink}
              type="submit"
              disabled={!imagesLoaded}
            >
              Login
            </button>
          )}
        </form>
      )}
    </div>
  );
}

export default LoginPage;

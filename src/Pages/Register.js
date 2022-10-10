import React, { useRef, useEffect, useState } from "react";
import { Route } from "react-router-dom";
import axios from "../api/axios";
// REGEX  for validation of username and password
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
//register url
const REGISTER_URL = "/auth/register";


function Register() {
  //set focus on user inputs
  const userRef = useRef();
  //set focus on errs from users for assesibility
  const errRef = useRef();

  const [user, setUser] = useState(""),
    [validName, setValidName] = useState(false),
    [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState(""),
    [validPwd, setValidPwd] = useState(false),
    [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState(""),
    [validMatch, setValidMatch] = useState(false),
    [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState(""),
    [success, setSuccess] = useState(false);

  // rerenders just once .. focus automatcally on the user input area
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // tracks the user input specifically and compares it to regex for validation, if  result= true then setValidName is used to manipulate valid Name to true
  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  // tracks pasword and confirm password, compares pasword to regex and password to confirm passsword
  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  // manages the display of error messsagess
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    //if button enabled with JS hack
    const v1 = USER_REGEX.test(user),
      v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      console.log(user, pwd);
      const response = await axios.post(
        REGISTER_URL,
        { user, pwd },
        {
          Headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(user, pwd);
      console.log(response.data);
      console.log(response.accessToken);
      
      setSuccess(true);

      //clear input fields
    } catch (error) {
      if (error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 409) {
        setErrMsg("Username already exists");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#"> Sign In</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errMsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1> Register</h1>

          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username:
              <span className={validName ? "valid" : "hide"}>|</span>
              <span className={validName || !user ? "hide" : "invalid"}>x</span>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              4 to 10 characters. <br />
              Must begin with a letter. <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
            <hr />

            <label htmlFor="password">
              password
              <span className={validPwd ? "valid" : "hide"}>|</span>
              <span className={validPwd || !pwd ? "hide" : "invalid"}>x</span>
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />

            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              4 to 10 characters. <br />
              8 to 24 characters <br />
              Must include uppercase and lowercase letters, a number a special
              character. <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>
            <hr />

            <label htmlFor="confirm_pwd">
              confirm password
              <span className={validMatch && matchPwd ? "valid" : "hide"}>
                |
              </span>
              <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                x
              </span>
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />

            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              Must match the password
            </p>

            <button
              disabled={!validName || !validPwd || !validMatch ? true : false}
            >
              {" "}
              sign up
            </button>
          </form>
          <p>
            Already Registered? <br />
            <span className="line">
              {/* put router lin here */}
              
              <a href="#"> Sign In</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
}

export default Register;

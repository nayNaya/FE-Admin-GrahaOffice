import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { login } from "../utils/Auth";
import { USER } from '../utils/Url';
import '../../assets/styles/Login.css';
import Logo from "../../assets/img/logo1.png";
import showIcon from '../../assets/img/eye.png';
import showOffIcon from '../../assets/img/eye_invisible.png';
import Email from '../../assets/img/email.png';
import Key from '../../assets/img/key.png';
import axios from 'axios';
import Regis from './Register';

const Login = () => {

  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isRevealPwd, setIsRevealPwd] = useState(false);

  React.useEffect(() => {
    if (email || password) {
        setError(false);
    }
    return () => {};
  }, [email, password]);

  const _onSubmit = () => {
    axios
        .post(USER + "/api/login", {
            email: email,
            password: password
        })
        .then((res) => {
            console.log("sukses bro");
            console.log(res.data);
            console.log(res.data.refreshToken);
            login(res.data.refreshToken, res.data.userID);
            history.push("/dashboard");
        }).catch((err) => {
            console.log("gagal bro");
            console.log(err);
            setError(true);
        });
  };

  // const _onSubmit = () => {
  //   if (email === "admin@gmail.com" && password === "123") {
  //     login({
  //       email: email,
  //     });
  //     history.push("/dashboard");
  //   } else {
  //     setError(true);
  //   }
  // };

  return (
      <div className="divContent bg-lightGrey flex items-center justify-center min-h-screen">
            <div className="form bg-white px-10 py-2 rounded-xl w-2/3 md:w-1/3">
              <img src={Logo} className="h-18 mt-2 mb-2 mx-auto" alt='Logo' />
              <div className="space-y-4">
                <div className="inputField">
                  <div id="Icon">
                    <img src={Email} alt="Icon Email"/> 
                  </div>
                  <label for="email" className="block mb-1 text-grey font-semibold">Email</label>
                  <input type="text" className="mt-1 px-12 py-2 bg-white text-grey text-md border border-grey-300 focus:outline-none focus:ring-info-300 block w-full rounded-md focus:ring-1" placeholder="Email"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="inputField">
                  <div id="Icon">
                    <img src={Key} alt="Icon Password"/> 
                  </div>
                  <label for="password" className="block mb-1 text-grey font-semibold">Password</label>
                  <input type={isRevealPwd ? 'text' : 'password'} className="mt-1 px-12 py-2 bg-white text-grey text-md border border-grey-300 focus:outline-none focus:ring-info-300 block w-full rounded-md focus:ring-1" placeholder="Password"
                        value={password} onChange={e => setPassword(e.target.value)}
                  />
                  <div id="toggle">
                    <img
                      alt={isRevealPwd ? "Hide password" : "Show password"}
                      src={isRevealPwd ? showOffIcon : showIcon}
                      onClick={() => setIsRevealPwd(prevState => !prevState)}
                    />
                  </div>
                </div>
              </div>
              {error && 
                <div className="bg-red-100 border text-red-700 px-4 py-2 rounded relative mt-4" role="alert">
                  <strong className="font-bold text-sm">Login Gagal! </strong>
                  <span className="block sm:inline text-sm">Email atau password salah.</span>
                </div>
              }
              <button className="bg-blue focus:outline-none focus:ring focus:ring-info-300 mt-6 mb-10 w-full font-semibold py-2 rounded-md text-white tracking-wide"
                onClick={_onSubmit}
              >
                LOGIN
              </button>
              <a align="center" href>  Don't Have Account ?
              <a onClick={close} modal trigger={<u> Sign Up</u>}>
            {close => <Regis close={close}/>}
              </a>
              </a> 
            </div>
      </div>
  );
}

export default Login;
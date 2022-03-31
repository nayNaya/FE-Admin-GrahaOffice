import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import '../../assets/styles/Login.css';
import showIcon from '../../assets/img/eye.png';
import showOffIcon from '../../assets/img/eye_invisible.png';
import { USER } from "../utils/Url";
import { getToken, logout, getUserID } from '../utils/Auth';
import axios from 'axios';

const ChangePassword = () => {
  const history = useHistory();
  const [errorMatching, setErrorMatching] = useState(false);
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [isRevealPwdNew, setIsRevealPwdNew] = useState(false);
  const [isRevealConfirmPwd, setIsRevealConfirmPwd] = useState(false);

  React.useEffect(() => {
    if (password || newPassword || confirmNewPassword) {
        setError(false);
        setErrorMatching(false);
    }
    return () => {};
  }, [password, newPassword, confirmNewPassword]);

  function updatePassword(){
    if(!password || !newPassword || !confirmNewPassword){
        alert('Ubah Password Gagal, Isi Field Terlebih Dahulu!');
    } else{
        if(newPassword === confirmNewPassword) {
            console.log("Passwords match");
            async function update() {
              try{
                const tokenRespon = await getToken();
                if(tokenRespon === 400){
                    alert("Authentifikasi Gagal, Silahkan Login Kembali");
                    logout();
                    history.replace("/");
                } else{
                  const variables = {
                    userID: getUserID(),
                    password: password,
                    newPassword: newPassword
                  }
                  const updateRespon = await axios.post(USER + "reset-password", variables, {
                      headers: { Authorization: `Bearer ${tokenRespon}`}
                  });
                  alert('Password Berhasil Dirubah');
                  history.replace('/dashboard');
                  console.log(updateRespon.data);
                }
              } catch(error){
                  setError(true);
              }
          };
          update();
        } else {
          console.log("Password Baru dan Konfirmasi Password Tidak Sama");
          setErrorMatching(true);
        }
    }
  }

  return (
    <div>
        <Sidebar />
        <div className="md:ml-64">
            <div className="mt-8 px-6 md:px-8 h-auto">
              <div className="w-full p-14 bg-white shadow-2xl rounded-xl mx-auto lg:w-3/4">
                  <p className="text-lg font-bold text-blue mb-4">GANTI PASSWORD</p>
                  <hr/>
                  {errorMatching && 
                      <div className="bg-red-100 border text-red-700 px-4 py-2 rounded relative mt-4" role="alert">
                        <strong className="font-bold text-sm">Ubah Password Gagal! </strong>
                        <span className="block sm:inline text-sm">Password Baru dan Konfirmasi Password Tidak Sama</span>
                      </div>
                  }
                  {error && 
                      <div className="bg-red-100 border text-red-700 px-4 py-2 rounded relative mt-4" role="alert">
                        <strong className="font-bold text-sm">Ubah Password Gagal! </strong>
                        <span className="block sm:inline text-sm">Password Lama Tidak Sesuai</span>
                      </div>
                  }
                  <form>
                    <div className="grid grid-cols-12 items-center mt-8 mb-4">
                      <div className="col-start-1 col-end-6 flex justify-start xl:justify-end xl:mr-8 text-sm text-grey font-semibold">
                        <p>Password Lama</p>
                      </div>
                      <div className="inputField col-start-6 col-span-6 sm:col-span-5">
                        <input type={isRevealPwd ? 'text' : 'password'} className="pl-3 pr-10 py-2 bg-white text-grey text-sm border border-grey-300 focus:outline-none block w-full rounded-md" placeholder="Password Lama"
                          value={password} onChange={e => setPassword(e.target.value)}
                        />
                        <div id="iconPassword">
                          <img
                            alt={isRevealPwd ? "Hide password" : "Show password"}
                            src={isRevealPwd ? showOffIcon : showIcon}
                            onClick={() => setIsRevealPwd(prevState => !prevState)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 items-center mb-4">
                      <div className="col-start-1 col-end-6 flex justify-start xl:justify-end xl:mr-8 text-sm text-grey font-semibold">
                        <p>Password Baru</p>
                      </div>
                      <div className="inputField col-start-6 col-span-6 sm:col-span-5">
                        <input type={isRevealPwdNew ? 'text' : 'password'} className="pl-3 pr-10 py-2 bg-white text-grey text-sm border border-grey-300 focus:outline-none block w-full rounded-md" placeholder="Password Baru"
                          value={newPassword} onChange={e => setNewPassword(e.target.value)}
                        />
                        <div id="iconPassword">
                          <img
                            alt={isRevealPwdNew ? "Hide password" : "Show password"}
                            src={isRevealPwdNew ? showOffIcon : showIcon}
                            onClick={() => setIsRevealPwdNew(prevState => !prevState)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 items-center mb-4">
                      <div className="col-start-1 col-end-6 flex justify-start text-sm xl:justify-end xl:mr-8 text-grey font-semibold">
                        <p>Konfirmasi Password Baru</p>
                      </div>
                      <div className="inputField col-start-6 col-span-6 sm:col-span-5">
                        <input type={isRevealConfirmPwd ? 'text' : 'password'} className="pl-3 pr-10 py-2 bg-white text-grey text-sm border border-grey-300 focus:outline-none block w-full rounded-md" placeholder="Konfirmasi Password Baru"
                          value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)}
                        />
                        <div id="iconPassword">
                          <img
                            alt={isRevealConfirmPwd ? "Hide password" : "Show password"}
                            src={isRevealConfirmPwd ? showOffIcon : showIcon}
                            onClick={() => setIsRevealConfirmPwd(prevState => !prevState)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 items-center">
                      <div className="col-start-6 col-span-6">
                        <Link className="bg-blue focus:outline-none focus:ring focus:ring-info-300 mt-6 font-normal px-8 py-2 rounded-md text-white text-sm tracking-wide"
                          onClick={updatePassword}
                        >
                          SIMPAN
                        </Link>
                      </div>
                    </div>
                  </form>
              </div>
            </div>
        </div>
    </div>
  );
}

export default ChangePassword;
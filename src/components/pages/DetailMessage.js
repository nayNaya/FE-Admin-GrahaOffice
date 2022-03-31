import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import TableCard from './components/MessageTableCard';
import Sidebar from "./components/Sidebar";
import { CONTACT } from "../utils/Url";
import { getToken, logout } from '../utils/Auth';
import axios from 'axios';

const DetailMessage = () => {
    const history = useHistory();
    const { id } = useParams();
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        async function getContactId() {
            try{
                const tokenRespon = await getToken();
                if(tokenRespon === 400){
                    alert("Authentifikasi Gagal, Silahkan Login Kembali");
                    logout();
                    history.replace("/");
                } else{
                    const contactRespon = await axios.get(CONTACT + id, {
                        headers: { Authorization: `Bearer ${tokenRespon}`}
                    });
                    setApiData(contactRespon.data);
                    console.log(contactRespon.data);
                }                
            } catch(err){
                console.log(err);
            }
        };
        getContactId();
    },[]);

  return (
    <div>
        <Sidebar />
        <div className="md:ml-64">
            <div className="mt-8 px-6 md:px-8 h-auto">
                <Link className="hover:bg-blue hover:text-white text-grey h-10 w-10 flex items-center justify-center rounded-full space-x-1" to="/pesan">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                </Link>
                <div className="mt-4 mb-10 p-14 bg-white shadow-2xl space-y-10 rounded-xl mx-auto max-w-full">
                    <div className="text-netral">
                        <div className="font-bold text-lg uppercase">
                            {apiData.name}
                        </div>
                        <div className="font-bold text-md capitalize">
                            {apiData.company}
                        </div>
                        <div className="text-md">
                            {apiData.email}
                        </div>
                        <div className="text-md mb-8">
                            {apiData.phone}
                        </div>
                        <hr/>
                    </div>
                    <div className="text-netral text-sm capitalize">
                        {apiData.message}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default DetailMessage;
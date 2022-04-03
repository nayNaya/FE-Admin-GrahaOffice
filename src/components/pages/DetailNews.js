import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import TableCard from './components/MessageTableCard';
import '../../assets/styles/Components.css';
import Sidebar from "./components/Sidebar";
import Tabs from "./components/ComponentTab";
import { SERVICE } from "../utils/Url";
import { getToken, logout } from '../utils/Auth';
import axios from 'axios';

const DetailNews = () => {
    const history = useHistory();
    const { id } = useParams();
    const [apiData, setApiData] = useState([]);
    const [newsId, setNewsId] = useState([]);
    const [newsEn, setNewsEn] = useState([]);

    useEffect(() => {
        async function getNewsId() {
            try{
                const tokenRespon = await getToken();
                if(tokenRespon === 400){
                    alert("Authentifikasi Gagal, Silahkan Login Kembali");
                    logout();
                    history.replace("/");
                } else{
                    const newsRespon = await axios.get(NEWS + id, {
                        headers: { Authorization: `Bearer ${tokenRespon}`}
                    });
                    setApiData(newsRespon.data.contents);
                    setNewsId(newsRespon.data.contents[0]);
                    setNewsEn(newsRespon.data.contents[1]);
                    console.log(newsRespon.data.contents);
                    console.log(newsRespon.data.contents[0].data);
                    console.log(newsRespon.data.contents[1].data);
                }                
            } catch(err){
                console.log(err);
            }
        };
        getNewsId();
    },[]);

    // const renderNews = apiData.map((value, index) => {
    //     return  <div className="mt-4 mb-10 p-14 bg-white shadow-2xl space-y-6 rounded-xl mx-auto max-w-full">
    //                 <div className="flex items-center justify-center bg-blue lg:h-12">
    //                     <p className="text-xl text-white font-semibold">{value.title}</p>
    //                 </div>
    //                 <div id="content">
    //                     <div dangerouslySetInnerHTML={{ __html: value.data }} />
    //                 </div>
    //             </div>
    // })

    // const Tabs = ({ color }) => {
    //     const [openTab, setOpenTab] = React.useState(1);
    //     return (
    //         <>
    //             <div className="flex flex-wrap">
    //                 <div className="w-full">
    //                     <ul
    //                         className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
    //                         role="tablist"
    //                         >
    //                         <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
    //                             <a
    //                             className={
    //                                 "text-xs font-bold uppercase px-5 py-3 shadow-xl rounded block leading-normal " +
    //                                 (openTab === 1
    //                                 ? "text-white bg-" + color
    //                                 : "text-" + color + " bg-white")
    //                             }
    //                             onClick={e => {
    //                                 e.preventDefault();
    //                                 setOpenTab(1);
    //                             }}
    //                             data-toggle="tab"
    //                             href="#link1"
    //                             role="tablist"
    //                             >
    //                             Indonesian
    //                             </a>
    //                         </li>
    //                         <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
    //                             <a
    //                             className={
    //                                 "text-xs font-bold uppercase px-5 py-3 shadow-xl rounded block leading-normal " +
    //                                 (openTab === 2
    //                                 ? "text-white bg-" + color
    //                                 : "text-" + color + " bg-white")
    //                             }
    //                             onClick={e => {
    //                                 e.preventDefault();
    //                                 setOpenTab(2);
    //                             }}
    //                             data-toggle="tab"
    //                             href="#link2"
    //                             role="tablist"
    //                             >
    //                             English
    //                             </a>
    //                         </li>
    //                     </ul>
    //                     <div className="tab-content tab-space">
    //                         <div className={openTab === 1 ? "block" : "hidden"} id="link1">
    //                             <div className="mt-4 mb-16 p-14 bg-white shadow-2xl space-y-6 rounded-xl mx-auto max-w-full">
    //                                 <div className="flex items-center justify-center lg:h-12">
    //                                     <p className="text-xl font-semibold">{newsId.title}</p>
    //                                 </div>
    //                                 <div id="content">
    //                                     <div dangerouslySetInnerHTML={{ __html: newsId.data }} />
    //                                 </div>
    //                             </div>
    //                         </div>
    //                         <div className={openTab === 2 ? "block" : "hidden"} id="link2">
    //                         <div className="mt-4 mb-16 p-14 bg-white shadow-2xl space-y-6 rounded-xl mx-auto max-w-full">
    //                                 <div className="flex items-center justify-center lg:h-12">
    //                                     <p className="text-xl font-semibold">{newsEn.title}</p>
    //                                 </div>
    //                                 <div id="content">
    //                                     <div dangerouslySetInnerHTML={{ __html: newsEn.data }} />
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </>
    //         );
    //     };

    return (
        <div>
            <Sidebar />
            <div className="md:ml-64">
                <div className="mt-8 px-6 md:px-8 h-auto">
                    <Tabs color="blue" ComponentOne={newsId} ComponentTwo={newsEn} inputField={false}/>
                    {/* <Tabs color="blue"/> */}
                    {/* {renderNews} */}
                </div>
            </div>
        </div>
    );
}

export default DetailNews;

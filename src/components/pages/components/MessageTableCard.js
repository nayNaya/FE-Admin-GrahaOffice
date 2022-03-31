import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import ModalDelete from './PopUpModal';
import Table from "./Table";
import '../../../assets/styles/Pagination.css';
import { CONTACT } from "../../utils/Url";
import { getToken, logout } from '../../utils/Auth';
import axios from 'axios';

export default function MessageCardTable(props) {
    const history = useHistory();
    const [apiData, setApiData] = useState([]);
    const [refreshData, setRefreshData] = useState(0);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [idItem, setIdItem] = useState();
    const [nameItem, setNameItem] = useState();
    const [flag, setFlag] = useState();

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    const pages =[];
    for(let i = 1; i <= Math.ceil(apiData.length/itemsPerPage); i++){
        pages.push(i);
    }

    const indexOfLastItem = currentPage*itemsPerPage; 
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = apiData.slice(indexOfFirstItem, indexOfLastItem);

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    };

    const handlePrevBtn = () => {
        setCurrentPage(currentPage - 1);

        if((currentPage - 1) % pageNumberLimit == 0){
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    const handleNextBtn = () => {
        setCurrentPage(currentPage + 1);

        if(currentPage+1 > maxPageNumberLimit){
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };

    let pageIncrementBtn = null;
    if(pages.length > maxPageNumberLimit){
        pageIncrementBtn= <li onClick={handleNextBtn}>&hellip;</li>
    }

    let pageDecrementBtn = null;
    if(minPageNumberLimit >= 1){
        pageDecrementBtn= <li onClick={handlePrevBtn}>&hellip;</li>
    }

    const renderPageNumbers = pages.map(number => {
        if(number < maxPageNumberLimit+1 && number > minPageNumberLimit){
            return(
                <li key={number} id={number} onClick={handleClick} className={currentPage == number ? "active" : null}>
                    {number}
                </li>
            );
        } else {
            return null;
        }
    })

    useEffect(() => {
        async function getContact() {
            try{
                const tokenRespon = await getToken();
                if(tokenRespon === 400){
                    alert("Authentifikasi Gagal, Silahkan Login Kembali");
                    logout();
                    history.replace("/");
                } else{
                    const contactRespon = await axios.get(CONTACT, {
                        headers: { Authorization: `Bearer ${tokenRespon}`}
                    });
                    setApiData(contactRespon.data);
                    console.log(contactRespon.data);
                }
            } catch(err){
                console.log(err);
            }
        };
        getContact();
    },[refreshData]);

    return (
        <Card>
            <CardHeader color="blue" contentPosition="left">
                <h2 className="text-white text-2xl">{props.title}</h2>
            </CardHeader>
            <CardBody>
                <div className="overflow-x-auto">
                    <table className="min-w-max w-full bg-transparent border-collapse">
                        <thead>
                            <tr className="border-b border-solid border-grey-200 whitespace-nowrap">
                                {/* <th className="py-3 px-6 text-left text-sm font-normal text-blue">No</th> */}
                                <th className="py-3 px-6 text-left text-sm font-normal text-blue">Name</th>
                                <th className="py-3 px-6 text-center text-sm font-normal text-blue">Email</th>
                                <th className="py-3 px-6 text-center text-sm font-normal text-blue">Actions</th>
                            </tr>
                        </thead>
                        {currentItems.map((value, index) => (
                            // <Table
                            //     key={value._id}
                            //     id={value._id}
                            //     column1={index+1}
                            //     column2={value.name}
                            //     column3={value.company}
                            //     actionEdit={false}
                            // />
                        <tbody className="text-grey text-sm font-normal">
                            <tr className="border-b border-grey-200 hover:bg-secondary">
                                {/* <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <span>{index+1}</span>
                                </td> */}
                                <td className="py-3 px-6 text-left capitalize">
                                    <span>{value.name}</span>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <span>{value.email}</span>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex item-center justify-center">
                                        {/* <Link className="flex justify-center items-center rounded-full w-5 h-5 mr-2 transform hover:bg-blue hover:text-white hover:scale-110 cursor-pointer"
                                            to={`/detail-pesan/${value.id}`}
                                        >
                                            <svg className="w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                            </svg>
                                        </Link> */}
                                        <Link className="flex justify-center items-center rounded-full w-5 h-5 mr-2 transform hover:bg-blue hover:text-white hover:scale-110 cursor-pointer"
                                            to={`/detail-pesan/${value._id}`}
                                        >
                                            <svg className="w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </Link>
                                        {/* <Link className="flex justify-center items-center rounded-full w-5 h-5 mr-2 transform hover:bg-green hover:text-white hover:scale-110 cursor-pointer"
                                            to={`/edit-berita`}
                                        >
                                            <svg className="w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </Link> */}
                                        <div className="flex justify-center items-center rounded-full w-5 h-5 mr-2 transform hover:bg-red hover:text-white hover:scale-110 cursor-pointer"
                                            onClick={() => {
                                                setShowModalDelete(true);
                                                setIdItem(value._id);
                                                setNameItem(value.name);
                                                setFlag(false);
                                            }}
                                        >
                                            <svg className="w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            {showModalDelete && <ModalDelete closeModal={setShowModalDelete} onSuccess={setRefreshData} idItem={idItem} nameItem={nameItem} flag={flag}/>}
                        </tbody>
                        ))}
                    </table>
                    <ul className="mt-8 pageNumbers flex justify-center">
                        <li>
                            <button onClick={handlePrevBtn} disabled={currentPage == pages[0] ? true : false}>Prev</button>
                        </li>
                            {pageDecrementBtn}
                            {renderPageNumbers}
                            {pageIncrementBtn}
                        <li>
                            <button onClick={handleNextBtn} disabled={currentPage == pages[pages.length - 1] ? true : false}>Next</button>
                        </li>
                    </ul>
                </div>
            </CardBody>
        </Card>
    );
}
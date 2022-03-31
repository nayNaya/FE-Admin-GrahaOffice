import React, { useState } from "react";
import { Link } from "react-router-dom";
import ModalDelete from './PopUpModal';

const Table = (props) => {
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [deleteItem, setDeleteItem] = useState();
    const [nameItem, setNameItem] = useState();
    const [modal, setModal] = useState();
    const [refreshData, onSuccess] = useState();
    
    return (
        <tbody className="text-grey text-sm font-normal">
            <tr className="border-b border-grey-200 hover:bg-secondary">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                    <span>{props.column1}</span>
                </td>
                <td className="py-3 px-6 text-left capitalize">
                    <span>{props.column2}</span>
                </td>
                <td className="py-3 px-6 text-center capitalize">
                    <span>{props.column3}</span>
                </td>
                <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center">
                        <Link className={`${props.actionEdit ? "flex justify-center items-center rounded-full w-5 h-5 mr-2 transform hover:bg-blue hover:text-white hover:scale-110 cursor-pointer" : "hidden"}`} 
                            to={`${props.actionEdit ? `/detail-berita` : `/detail-pesan/${props.id}`}`}
                        >
                            <svg className="w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                        </Link>
                        <Link className="flex justify-center items-center rounded-full w-5 h-5 mr-2 transform hover:bg-blue hover:text-white hover:scale-110 cursor-pointer"
                            to={`${props.actionEdit ? `/detail-berita` : `/detail-pesan/${props.id}`}`}
                        >
                            <svg className="w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </Link>
                        <Link className={`${props.actionEdit ? "flex justify-center items-center rounded-full w-5 h-5 mr-2 transform hover:bg-green hover:text-white hover:scale-110 cursor-pointer" : "hidden"}`}
                            to={`/edit-berita`}
                        >
                            <svg className="w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </Link>
                        <div className="flex justify-center items-center rounded-full w-5 h-5 mr-2 transform hover:bg-red hover:text-white hover:scale-110 cursor-pointer"
                            onClick={() => {
                                setShowModalDelete(true);
                                setDeleteItem(props.id);
                                setNameItem(props.column2);
                                setModal(props.actionEdit);
                                onSuccess(props.refreshData)
                            }}
                        >
                            <svg className="w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                    </div>
                </td>
            </tr>
            {showModalDelete && <ModalDelete closeModalDelete={setShowModalDelete} deleteItem={deleteItem} nameItem={nameItem} modal={modal}/>}
        </tbody>
    );
}

export default Table;
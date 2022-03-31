import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../../../assets/styles/Components.css';

export default function MessageCard(props) {
    return (
        <div className="bg-lightGrey rounded-3xl">
            <div className="overflow-x-auto">
                <p className="text-xl text-white font-bold text-center mt-8 mb-2 tracking-widest">PESAN MASUK TERBARU</p>
                <div className="relative flex flex-wrap justify-center bg-lightGrey mb-8">
                    {props.contentContact.map((value, index) => (
                        <Link key={value._id} className="cards h-56 w-72 m-4 bg-white shadow-md rounded-3xl drop-shadow-2xl py-5 space-y-4"
                            to={`/detail-pesan/${value._id}`}
                        >
                            <p className="text-center font-semibold text-md capitalize">{value.name}</p>
                            <div className="text-sm ml-6 mr-6">
                                <p className="font-semibold capitalize">{value.company}</p>
                                <p>{value.email}</p>
                                <p>{value.phone}</p>
                            </div>
                            <p className="text-sm ml-6 mr-6 capitalize">{value.message.slice(0, 120)}... <span className="text-blue">Read More</span></p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

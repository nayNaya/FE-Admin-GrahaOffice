import React from "react";
import StatusItem from "./StatusItem";

const StatusCard = (props) => {
    
    const statusItems = [
        {   nama: "Berita", jumlah: props.news, icon: "book"},
        {   nama: "Pesan Masuk", jumlah: props.contact, icon: "message"},
    ];
    
    return (
        <div className="flex flex-wrap">
            {statusItems.map((value, index) => (
                <StatusItem
                    key={index}
                    nama={value.nama}
                    jumlah={value.jumlah}
                    icon={value.icon}
                />
            ))}
        </div>
    );
}

export default StatusCard;

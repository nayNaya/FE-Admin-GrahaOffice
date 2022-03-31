import React from "react";
import { useLocation, useHistory } from 'react-router-dom';
import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import Image from '@material-tailwind/react/Image';
import Dropdown from '@material-tailwind/react/Dropdown';
import DropdownItem from '@material-tailwind/react/DropdownItem';
import ProfilePicture from '../../../assets/img/Person.png';
import { USER } from "../../utils/Url";
import { getUserID, logout, getToken } from '../../utils/Auth';
import axios from 'axios';

export default function AdminNavbar({ showSidebar, setShowSidebar }) {
    const location = useLocation().pathname;

    const history = useHistory();

    const handleSetting = () => {
        history.replace('/setting');
    };

    const _onLogout = async () => {
        try {
            const tokenRespon = await getToken();
            if(tokenRespon === 400){
                alert("Authentifikasi Gagal, Silahkan Login Kembali");
                logout();
                history.replace("/");
            } else{
                const logoutRespon = await axios.delete(USER + "logout", {
                    headers: { Authorization: `Bearer ${tokenRespon}`},
                    userID: getUserID()
                });
                logout();
                history.replace("/");
                console.log("Logout Sukses");
            }
        } catch (err) {
            console.error("Logout Error");
            console.error(err);
        }
    };

    return (
        <nav className="bg-blue md:ml-64 py-6 px-3">
            <div className="container max-w-full mx-auto flex items-center justify-between md:pr-8 md:pl-10">
                <div className="md:hidden">
                    <Button
                        color="transparent"
                        buttonType="link"
                        size="lg"
                        iconOnly
                        rounded
                        ripple="light"
                        onClick={() => setShowSidebar('left-0')}
                    >
                        <Icon name="menu" size="2xl" color="white" />
                    </Button>
                    <div
                        className={`absolute top-2 md:hidden ${
                            showSidebar === 'left-0' ? 'left-64' : '-left-64'
                        } z-50 transition-all duration-300`}
                    >
                        <Button
                            color="transparent"
                            buttonType="link"
                            size="lg"
                            iconOnly
                            rounded
                            ripple="light"
                            onClick={() => setShowSidebar('-left-64')}
                        >
                            <Icon name="close" size="2xl" color="white" />
                        </Button>
                    </div>
                </div>

                <div className="flex justify-between items-center w-full">
                    <h4 className="uppercase text-white text-sm tracking-wider mt-1">
                        {location === '/'
                            ? 'DASHBOARD'
                            : location.toUpperCase().replace('/', '')}
                    </h4>

                    <div className="flex">
                        <div className="-mr-4 ml-6">
                            <Dropdown
                                color="transparent"
                                buttonText={
                                    <div className="w-10">
                                        <Image src={ProfilePicture} rounded />
                                    </div>
                                }
                                rounded
                                style={{
                                    padding: 0,
                                    color: 'transparent',
                                }}
                            >
                                <DropdownItem color="blue" onClick={() => handleSetting()}>
                                    Ganti Password
                                </DropdownItem>
                                <DropdownItem color="blue" onClick={_onLogout}>
                                    Keluar
                                </DropdownItem>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
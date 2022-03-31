import React from "react";
import Icon from '@material-tailwind/react/Icon';

const StatusItem = (props) => {    
    return (
        <div className="w-full sm:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto p-6">
                    <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1 mt-2 ml-2">
                            <h5 className="text-grey uppercase text-xs font-normal mb-1">
                                {props.nama}
                            </h5>
                            <span className="font-semibold text-2xl text-netral">
                                {props.jumlah}
                            </span>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                            <div className="text-white p-3 text-center inline-flex items-center justify-center w-16 h-16 shadow-lg rounded-full bg-red">
                                <Icon name={props.icon} size="3xl"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StatusItem;

import React, { useState } from "react";
import TableCard from './components/MessageTableCard';
import Sidebar from "./components/Sidebar";

const Messages = () => {
  return (
    <div>
      <Sidebar />
      <div className="md:ml-64">
        <div className="mt-12 px-6 md:px-8 h-auto">
            <div className="container mx-auto max-w-full">
              <TableCard title="Pesan Masuk"/>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;

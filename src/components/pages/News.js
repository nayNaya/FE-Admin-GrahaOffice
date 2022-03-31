import React, { useState } from "react";
import { Link } from "react-router-dom";
import NewsTableCard from './components/NewsTableCard';
import Sidebar from "./components/Sidebar";

const News = () => {
  return (
    <div>
      <Sidebar />
      <div className="md:ml-64">
        <div className="mt-12 px-6 md:px-8 h-auto">
            <div className="container mx-auto max-w-full">
              <div className="mb-12 w-40 ml-4">
                <Link className="flex items-center justify-center bg-red h-10 w-40 focus:ring-4 focus:ring-red-300 rounded-lg text-white font-normal text-sm"
                    to="/posting-berita"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                  <p>Posting Berita</p>
                </Link>
              </div>
              <NewsTableCard title="Berita"/>
            </div>
        </div>
      </div>
    </div>
  );
}

export default News;

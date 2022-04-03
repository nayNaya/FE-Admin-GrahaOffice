import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-tailwind/react/Button";
import { SERVICE, CONTACT  } from "../../utils/Url";
import { getToken, logout } from '../../utils/Auth';
import axios from 'axios';

const PopUpModal = ({closeModal, onSuccess, idItem, nameItem, flag}) => {
  const history = useHistory();
  console.log(flag);

  const handleDelete = () => {
    if(flag){
      async function getDeleteNews() {
        try{
          const tokenRespon = await getToken();
          if(tokenRespon === 400){
              alert("Authentifikasi Gagal, Silahkan Login Kembali");
              logout();
              history.replace("/");
          } else{
            const deleteContactRespon = await axios.delete(NEWS + idItem, {
              headers: { Authorization: `Bearer ${tokenRespon}`}
            });
            onSuccess(oldKey => oldKey +1);
            closeModal();
            console.log("Berita Berhasil Dihapus");
            //alert("Berita Berhasil Dihapus");
          }
        } catch(err){
          console.log(err);
          alert('Coba Lagi, Berita Gagal Dihapus');
        }
      };
      getDeleteNews();
    } else{
        async function getDeleteMessage() {
          try{
            const tokenRespon = await getToken();
            if(tokenRespon === 400){
                alert("Authentifikasi Gagal, Silahkan Login Kembali");
                logout();
                history.replace("/");
            } else{
              const deleteContactRespon = await axios.delete(CONTACT + idItem, {
                headers: { Authorization: `Bearer ${tokenRespon}`}
              });
              onSuccess(oldKey => oldKey +1);
              closeModal();
              console.log("Pesan Berhasil Dihapus");
              //alert("Pesan Berhasil Dihapus");
            }
          } catch(err){
            console.log(err);
            alert('Coba Lagi, Pesan Gagal Dihapus');
          }
        };
        getDeleteMessage();
      }
  };

  const handlePublish = async (id) => {
    try{
        const tokenRespon = await getToken();
        if(tokenRespon === 400){
            alert("Authentifikasi Gagal, Silahkan Login Kembali");
            logout();
            history.replace("/");
        } else{
            const variables = {
                newspostID: id
            }
            const newsRespon = await axios.post(NEWS + "publish", variables, {
                headers: { Authorization: `Bearer ${tokenRespon}`}
            });
            onSuccess(oldKey => oldKey +1);
            closeModal();
            //alert("Berita berhasil dipublish");
        }
    } catch(err){
        alert("Coba lagi, Berita gagal dipublish!");
        console.log(err);
    }
  };

  const handleDraft = async (id) => {
    try{
        const tokenRespon = await getToken();
        if(tokenRespon === 400){
            alert("Authentifikasi Gagal, Silahkan Login Kembali");
            logout();
            history.replace("/");
        } else{
            const variables = {
                newspostID: id
            }
            const newsRespon = await axios.post(NEWS + "draft", variables, {
                headers: { Authorization: `Bearer ${tokenRespon}`}
            });
            onSuccess(oldKey => oldKey +1);
            closeModal();
            //alert("Berita berhasil disimpan di draft");
        }
    } catch(err){
        alert("Coba Lagi, Berita gagal disimpan di draft!");
        console.log(err);
    }
  };

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-96 sm:w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            {
              flag === true &&
              <div className="p-6 pt-0 text-center">
                <svg className="mx-auto mb-4 w-24 h-24 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h3 className="mb-2 text-lg font-bold text-grey capitalize">"{nameItem}"</h3>
                <h3 className="mb-5 text-lg font-normal text-grey">Apakah anda yakin ingin menghapus item ini?</h3>
                <button className="text-white bg-red hover:bg-darkRed focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-4"
                    onClick={() => handleDelete()}
                >
                    Hapus
                </button>
                <button className="text-white bg-lightGrey hover:bg-darkGrey focus:ring-4 focus:ring-grey-300 font-medium rounded-lg text-sm mb-2 items-center px-5 py-2.5 text-center"
                    onClick={() => closeModal(false)}
                >
                    Batal
                </button>
              </div>
            }
            {
              flag === false &&
              <div className="p-6 pt-0 text-center">
                <svg className="mx-auto mb-4 w-24 h-24 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h3 className="mb-2 text-lg font-bold text-grey capitalize">"{nameItem}"</h3>
                <h3 className="mb-5 text-lg font-normal text-grey">Apakah anda yakin ingin menghapus item ini?</h3>
                <button className="text-white bg-red hover:bg-darkRed focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-4"
                    onClick={() => handleDelete()}
                >
                    Hapus
                </button>
                <button className="text-white bg-lightGrey hover:bg-darkGrey focus:ring-4 focus:ring-grey-300 font-medium rounded-lg text-sm mb-2 items-center px-5 py-2.5 text-center"
                    onClick={() => closeModal(false)}
                >
                    Batal
                </button>
              </div>
            }
            {
              flag === 1 &&
              <div className="p-6 pt-0 text-center">
                <svg className="mx-auto mb-4 w-24 h-24 text-lightGrey" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h3 className="mb-2 text-lg font-bold text-grey capitalize">"{nameItem}"</h3>
                <h3 className="mb-5 text-lg font-normal text-grey">Apakah anda yakin ingin menyimpan berita ini di draft?</h3>
                <button className="text-white bg-blue hover:bg-darkBlue focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-4"
                    onClick={() => handleDraft(idItem)}
                >
                    Oke
                </button>
                <button className="text-white bg-lightGrey hover:bg-darkGrey focus:ring-4 focus:ring-grey-300 font-medium rounded-lg text-sm mb-2 items-center px-5 py-2.5 text-center"
                    onClick={() => closeModal(false)}
                >
                    Batal
                </button>
              </div>
            }
            {
              flag === 0 &&
              <div className="p-6 pt-0 text-center">
                <svg className="mx-auto mb-4 w-24 h-24 text-lightGrey" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h3 className="mb-2 text-lg font-bold text-grey capitalize">"{nameItem}"</h3>
                <h3 className="mb-5 text-lg font-normal text-grey">Apakah anda yakin ingin mempublish berita ini?</h3>
                <button className="text-white bg-blue hover:bg-darkBlue focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-4"
                    onClick={() => handlePublish(idItem)}
                >
                    Publish
                </button>
                <button className="text-white bg-lightGrey hover:bg-darkGrey focus:ring-4 focus:ring-grey-300 font-medium rounded-lg text-sm mb-2 items-center px-5 py-2.5 text-center"
                    onClick={() => closeModal(false)}
                >
                    Batal
                </button>
              </div>
            }
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default PopUpModal;
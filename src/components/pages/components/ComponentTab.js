import React, { useState } from "react";
import QuillEditor from "./QuillEditor";
import '../../../assets/styles/Components.css';

const ComponentTab = ({ color, titleId, titleEn, changeTitleId, changeTitleEn, contentId, contentEn, 
    onEditorChangeId, onFilesChangeId, onEditorChangeEng, onFilesChangeEng, flag, inputField, ComponentOne, ComponentTwo }) => {
    const [openTab, setOpenTab] = useState(1);
    console.log(ComponentTwo)
    function handleTitleId(event) {
        changeTitleId(event.target.value);
    }

    function handleTitleEn(event) {
        changeTitleEn(event.target.value);
    }

    const setContentId = (value) => {
        onEditorChangeId(value)
    }

    const setContentEn = (value) => {
        onEditorChangeEng(value)
    }

    const onEditorChange = (value) => {
        onEditorChangeId(value)
    }

    const onFilesChange = (files) => {
        onFilesChangeId(files)
    }

    const onEditorChangeEn = (value) => {
        onEditorChangeEng(value)
    }

    const onFilesChangeEn = (files) => {
        onFilesChangeEng(files)
    }

    return (
            <>
                <div className="flex flex-wrap">
                    <div className="w-full">
                        <ul
                            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                            role="tablist"
                            >
                            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                <a
                                className={
                                    "text-xs font-bold uppercase px-5 py-3 shadow-xl rounded block leading-normal " +
                                    (openTab === 1
                                    ? "text-white bg-" + color
                                    : "text-" + color + " bg-white")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(1);
                                }}
                                data-toggle="tab"
                                href="#link1"
                                role="tablist"
                                >
                                Indonesian
                                </a>
                            </li>
                            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                <a
                                className={
                                    "text-xs font-bold uppercase px-5 py-3 shadow-xl rounded block leading-normal " +
                                    (openTab === 2
                                    ? "text-white bg-" + color
                                    : "text-" + color + " bg-white")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(2);
                                }}
                                data-toggle="tab"
                                href="#link2"
                                role="tablist"
                                >
                                English
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content tab-space">
                            <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                    {
                                        inputField === false  &&
                                        <div className="mt-4 mb-10 p-14 bg-white shadow-2xl space-y-6 rounded-xl mx-auto max-w-full">
                                            <div className="flex items-center justify-center lg:h-12">
                                                <p className="text-xl font-semibold">{ComponentOne.title}</p>
                                            </div>
                                            <div id="content">
                                                <div dangerouslySetInnerHTML={{ __html: ComponentOne.data }} />
                                            </div>
                                        </div>
                                    }
                                    {
                                        (inputField === true && flag === "post") &&
                                        <div className="mt-4 mb-6 p-14 bg-white space-y-6 rounded-xl mx-auto max-w-full">
                                            <div>
                                                <label className="text-netral text-sm font-semibold tracking-wide">Judul Berita</label><br/>
                                                <input type="text" name="title" className="p-4 w-full h-10 rounded pl-4 mt-1 text-sm border border-grey-300 focus:outline-none" placeholder="Judul Berita"
                                                    value={titleId} onChange={handleTitleId}
                                                />
                                            </div>
                                            <QuillEditor
                                                toolbarId={"toolbarId"}
                                                placeholder={"Mulai Posting Berita!"}
                                                onEditorChange={onEditorChange}
                                                onFilesChange={onFilesChange}
                                                flag={flag}
                                            /> 
                                        </div>
                                    }
                                    {
                                        (inputField === true && flag === "edit") &&
                                        <div className="mt-4 mb-6 p-14 bg-white space-y-6 rounded-xl mx-auto max-w-full">
                                            <div>
                                                <label className="text-netral text-sm font-semibold tracking-wide">Judul Berita</label><br/>
                                                <input type="text" name="title" className="p-4 w-full h-10 rounded pl-4 mt-1 text-sm border border-grey-300 focus:outline-none" placeholder="Judul Berita"
                                                    value={titleId} onChange={handleTitleId}
                                                />
                                            </div> 
                                            <QuillEditor
                                                content={contentId}
                                                toolbarId={"toolbarId"}
                                                onContentChange={setContentId}
                                                placeholder={"Mulai Posting Berita!"}
                                                onFilesChange={onFilesChange}
                                                flag={flag}
                                            />
                                        </div>
                                    }
                            </div>
                            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                    {
                                        inputField === false  &&
                                        <div className="mt-4 mb-10 p-14 bg-white shadow-2xl space-y-6 rounded-xl mx-auto max-w-full">
                                            <div className="flex items-center justify-center lg:h-12">
                                                <p className="text-xl font-semibold">{ComponentTwo.title}</p>
                                            </div>
                                            <div id="content">
                                                <div dangerouslySetInnerHTML={{ __html: ComponentTwo.data }} />
                                            </div>
                                        </div>
                                    }
                                    {
                                        (inputField === true && flag === "post") &&
                                        <div className="mt-4 mb-6 p-14 bg-white space-y-6 rounded-xl mx-auto max-w-full">
                                            <div>
                                                <label className="text-netral text-sm font-semibold tracking-wide">Title News</label><br/>
                                                <input type="text" name="title" className="p-4 w-full h-10 rounded pl-4 mt-1 text-sm border border-grey-300 focus:outline-none" placeholder="Title News"
                                                value={titleEn} onChange={handleTitleEn}
                                                />
                                            </div> 
                                            <QuillEditor
                                                toolbarId={"toolbarEn"}
                                                placeholder={"Start Posting News!"}
                                                onEditorChange={onEditorChangeEn}
                                                onFilesChange={onFilesChangeEn}
                                                flag={flag}
                                            /> 
                                        </div>
                                    }
                                    {
                                        (inputField === true && flag === "edit") &&
                                        <div className="mt-4 mb-6 p-14 bg-white space-y-6 rounded-xl mx-auto max-w-full">
                                            <div>
                                                <label className="text-netral text-sm font-semibold tracking-wide">Title News</label><br/>
                                                <input type="text" name="title" className="p-4 w-full h-10 rounded pl-4 mt-1 text-sm border border-grey-300 focus:outline-none" placeholder="Title News"
                                                value={titleEn} onChange={handleTitleEn}
                                                />
                                            </div>  
                                            <QuillEditor
                                                content={contentEn}
                                                toolbarId={"toolbarEn"}
                                                onContentChange={setContentEn}
                                                placeholder={"Start Posting News!"}
                                                onFilesChange={onFilesChangeEn}
                                                flag={flag}
                                            />
                                        </div>
                                    }
                                {/* <div className="mt-4 mb-6 p-14 bg-white space-y-6 rounded-xl mx-auto max-w-full">
                                    <div>
                                        <label className="text-netral text-sm font-semibold tracking-wide">Title News</label><br/>
                                        <input type="text" name="title" className="p-4 w-full h-10 rounded pl-4 mt-1 text-sm border border-grey-300 focus:outline-none" placeholder="Title News"
                                        value={titleEn} onChange={handleTitleEn}
                                        />
                                    </div>
                                    {
                                        flag === "post" && 
                                        <QuillEditor
                                            toolbarId={"toolbarEn"}
                                            placeholder={"Start Posting News!"}
                                            onEditorChange={onEditorChangeEn}
                                            onFilesChange={onFilesChangeEn}
                                            flag={flag}
                                        />
                                    }  
                                    {
                                        flag === "edit" && 
                                        <QuillEditor
                                            content={contentEn}
                                            toolbarId={"toolbarEn"}
                                            onContentChange={setContentEn}
                                            placeholder={"Start Posting News!"}
                                            onFilesChange={onFilesChangeEn}
                                            flag={flag}
                                        />
                                    }
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </>
    );
}

export default ComponentTab;
import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import "react-quill/dist/quill.snow.css";
import Video from "../../../assets/img/play-button.png";
import File from "../../../assets/img/file.png";
import Image from "../../../assets/img/image.png";
import { NEWS } from "../../utils/Url";
import { getToken } from '../../utils/Auth';

import axios from 'axios';
const __ISMSIE__ = navigator.userAgent.match(/Trident/i) ? true : false;

// Quill.register('modules/clipboard', PlainClipboard, true);

const QuillClipboard = Quill.import('modules/clipboard');

class Clipboard extends QuillClipboard {

    getMetaTagElements = (stringContent) => {
        const el = document.createElement('div');
        el.innerHTML = stringContent;
        return el.getElementsByTagName('meta');
    };

    async onPaste(e) {
        let clipboardData = e.clipboardData || window.clipboardData;
        let pastedData = await clipboardData.getData('Text');

        const urlMatches = pastedData.match(/\b(http|https)?:\/\/\S+/gi) || [];
        if (urlMatches.length > 0) {
            e.preventDefault();
            urlMatches.forEach(link => {
                axios.get(link)
                    .then(payload => {
                        // let title, image, url, description;
                        let title, image, url;
                        for (let node of this.getMetaTagElements(payload)) {
                            if (node.getAttribute("property") === "og:title") {
                                title = node.getAttribute("content");
                            }
                            if (node.getAttribute("property") === "og:image") {
                                image = node.getAttribute("content");
                            }
                            if (node.getAttribute("property") === "og:url") {
                                url = node.getAttribute("content");
                            }
                            // if (node.getAttribute("property") === "og:description") {
                            //     description = node.getAttribute("content");
                            // }
                        }

                        const rendered = `<a href=${url} target="_blank"><div><img src=${image} alt=${title} width="20%"/><span>${title}</span></div></a>`;

                        let range = this.quill.getSelection();
                        let position = range ? range.index : 0;
                        this.quill.pasteHTML(position, rendered, 'silent');
                        this.quill.setSelection(position + rendered.length);
                    })
                    .catch(error => console.error(error));
            });

        } else {
            //console.log('when to use this') 보통 다른 곳에서  paste 한다음에  copy하면 이쪽 걸로 한다. 
            super.onPaste(e);
        }
    }

}
Quill.register('modules/clipboard', Clipboard, true);

const BlockEmbed = Quill.import('blots/block/embed');

class ImageBlot extends BlockEmbed {

    static create(value) {
        const imgTag = super.create();
        imgTag.setAttribute('src', value.src);
        imgTag.setAttribute('alt', value.alt);
        //imgTag.setAttribute('width', '100%');
        return imgTag;
    }

    static value(node) {
        return { src: node.getAttribute('src'), alt: node.getAttribute('alt') };
    }

}

ImageBlot.blotName = 'image';
ImageBlot.tagName = 'img';
Quill.register(ImageBlot);

class VideoBlot extends BlockEmbed {

    static create(value) {
        if (value && value.src) {
            const videoTag = super.create();
            videoTag.setAttribute('src', value.src);
            videoTag.setAttribute('title', value.title);
            //videoTag.setAttribute('width', '100%');
            videoTag.setAttribute('controls', '');

            return videoTag;
        } else {
            const iframeTag = document.createElement('iframe');
            iframeTag.setAttribute('src', value);
            iframeTag.setAttribute('frameborder', '0');
            iframeTag.setAttribute('allowfullscreen', true);
            //iframeTag.setAttribute('width', '100%');
            return iframeTag;
        }
    }

    static value(node) {
        if (node.getAttribute('title')) {
            return { src: node.getAttribute('src'), alt: node.getAttribute('title') };
        } else {
            return node.getAttribute('src');
        }
        // return { src: node.getAttribute('src'), alt: node.getAttribute('title') };
    }

}

VideoBlot.blotName = 'video';
VideoBlot.tagName = 'video';
Quill.register(VideoBlot);

class FileBlot extends BlockEmbed {

    static create(value) {
        const prefixTag = document.createElement('span');
        prefixTag.innerText = "첨부파일 - ";

        const bTag = document.createElement('b');
        //위에 첨부파일 글자 옆에  파일 이름이 b 태그를 사용해서 나온다.
        bTag.innerText = value;

        const linkTag = document.createElement('a');
        linkTag.setAttribute('href', value);
        linkTag.setAttribute("target", "_blank");
        linkTag.setAttribute("className", "file-link-inner-post");
        linkTag.appendChild(bTag);
        //linkTag 이런식으로 나온다 <a href="btn_editPic@3x.png" target="_blank" classname="file-link-inner-post"><b>btn_editPic@3x.png</b></a>

        const node = super.create();
        node.appendChild(prefixTag);
        node.appendChild(linkTag);

        return node;
    }

    static value(node) {
        const linkTag = node.querySelector('a');
        return linkTag.getAttribute('href');
    }

}

FileBlot.blotName = 'file';
FileBlot.tagName = 'p';
FileBlot.className = 'file-inner-post';
Quill.register(FileBlot);

class PollBlot extends BlockEmbed {

    static create(value) {
        const prefixTag = document.createElement('span');
        prefixTag.innerText = "투표 - ";

        const bTag = document.createElement('b');
        bTag.innerText = value.title;

        const node = super.create();
        node.setAttribute('id', value.id);
        node.appendChild(prefixTag);
        node.appendChild(bTag);

        return node;
    }

    static value(node) {
        const id = node.getAttribute('id');
        const bTag = node.querySelector('b');
        const title = bTag.innerText;
        return { id, title };
    }

}

PollBlot.blotName = 'poll';
PollBlot.tagName = 'p';
PollBlot.className = 'poll-inner-post';
Quill.register(PollBlot);

class QuillEditor extends React.Component {

    bandId;
    placeholder;
    onEditorChange;
    onFilesChange;
    onPollsChange;
    _isMounted;
    toolbarId;

    constructor(props) {
        super(props);

        console.log(this.props.flag)
        console.log(this.props.id);

        console.log(this.contentNews)

        if(this.props.flag === "post"){
            this.state = {
                editorHtml: __ISMSIE__ ? "<p>&nbsp;</p>" : "",
                files: [],
                apiData: [],
            };
        } else {
            this.state = {
                editorHtml: localStorage.getItem("NEWS_ID"),
                files: [],
                apiData: [],
            };
        }
        
        this.reactQuillRef = null;

        this.inputOpenImageRef = React.createRef();
        this.inputOpenVideoRef = React.createRef();
        this.inputOpenFileRef = React.createRef();
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleContentChange = event => {
        this.props.onContentChange(event)
        
        console.log(event);
    }
    
    handleChange = (html) => {
        console.log('html', html)
        // https://youtu.be/BbR-QCoKngE
        // https://www.youtube.com/embed/ZwKhufmMxko
        // https://tv.naver.com/v/9176888
        // renderToStaticMarkup(ReactHtmlParser(html, options));

        this.setState({
            editorHtml: html
        }, () => {
            this.props.onEditorChange(this.state.editorHtml);
        });
    };

    // I V F P들을  눌렀을떄 insertImage: this.imageHandler로 가서  거기서 inputOpenImageRef를 클릭 시킨다. 
    imageHandler = () => {
        this.inputOpenImageRef.current.click();
    };

    videoHandler = () => {
        this.inputOpenVideoRef.current.click();
    };

    fileHandler = () => {
        this.inputOpenFileRef.current.click();
    };


    insertImage = async (e) => {
        try{
            e.stopPropagation();
            e.preventDefault();
            if (e.currentTarget && e.currentTarget.files && e.currentTarget.files.length > 0) {
                const file = e.currentTarget.files[0];
                console.log(file);
                
                let formData = new FormData();
                // const config = {
                //     header: { 'content-type': 'multipart/form-data' }
                // }
                formData.append("files", file);
                const tokenRespon = await getToken();
                    const insertImageRespon = await axios.post(NEWS + "uploadimages", formData, {
                        headers: { Authorization: `Bearer ${tokenRespon}`}
                    });
                    if (insertImageRespon.status === 200) {
                        console.log(insertImageRespon);
                        this.setState({ apiData: insertImageRespon.data });
                        console.log("halo"+ insertImageRespon.data[0].url);
                        //console.log("halo"+ this.state.apiData);
                        //console.log("halo"+ this.state.apiData[0].url);
                        const quill = this.reactQuillRef.getEditor();
                        quill.focus();

                        let range = quill.getSelection();
                        let position = range ? range.index : 0;
                        // {this.state.apiData.map((value, index) => (
                        //     console.log(value.url)
                        // ))}

                        //먼저 노드 서버에다가 이미지를 넣은 다음에   여기 아래에 src에다가 그걸 넣으면 그게 
                        //이미지 블롯으로 가서  크리에이트가 이미지를 형성 하며 그걸 발류에서     src 랑 alt 를 가져간후에  editorHTML에 다가 넣는다.
                        quill.insertEmbed(position, "image", { src: "http://192.168.195.195:5000" + insertImageRespon.data[0].url, alt: insertImageRespon.data[0].fileName });
                        quill.setSelection(position + 1);

                        if (this._isMounted) {
                            this.setState({
                                files: [...this.state.files, file]
                            }, () => { this.props.onFilesChange(this.state.files) });
                        }
                    } else {
                        return alert('failed to upload file')
                    }       
            }        
        } catch(err){
            console.log(err);
        }        
    };

    insertVideo = async (e) => {
        try{
            e.stopPropagation();
            e.preventDefault();

            if (e.currentTarget && e.currentTarget.files && e.currentTarget.files.length > 0) {
                const file = e.currentTarget.files[0];
                console.log(file);
                let formData = new FormData();
                formData.append("files", file);
                const tokenRespon = await getToken();
                const insertVideoRespon = await axios.post(NEWS + "uploadvideos", formData, {
                    headers: { Authorization: `Bearer ${tokenRespon}`}
                });
                if (insertVideoRespon.status === 200) {
                    console.log(insertVideoRespon);
                    this.setState({ apiData: insertVideoRespon.data });
                    console.log("halo"+ insertVideoRespon.data[0].url);
                    const quill = this.reactQuillRef.getEditor();
                    quill.focus();

                    let range = quill.getSelection();
                    let position = range ? range.index : 0;
                        
                    quill.insertEmbed(position, "video", { src: "http://192.168.195.195:5000/" + insertVideoRespon.data[0].url, title: insertVideoRespon.data[0].fileName});
                    quill.setSelection(position + 1);

                    if (this._isMounted) {
                        this.setState({
                            files: [...this.state.files, file]
                        }, () => { this.props.onFilesChange(this.state.files) });
                    }
                } else {
                    return alert('failed to upload file')
                }
            }
        } catch(err){
            console.log(err);
        } 
    }

    insertFile = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (e.currentTarget && e.currentTarget.files && e.currentTarget.files.length > 0) {
            const file = e.currentTarget.files[0];
            console.log(file);

            let formData = new FormData();
            const config = {
                header: { 'content-type': 'multipart/form-data' }
            }
            formData.append("file", file);

            axios.post('/api/blog/uploadfiles', formData, config)
                .then(response => {
                    if (response.data.success) {

                        const quill = this.reactQuillRef.getEditor();
                        quill.focus();

                        let range = quill.getSelection();
                        let position = range ? range.index : 0;
                        quill.insertEmbed(position, "file", response.data.fileName);
                        quill.setSelection(position + 1);

                        if (this._isMounted) {
                            this.setState({
                                files: [...this.state.files, file]
                            }, () => { this.props.onFilesChange(this.state.files) });
                        }
                    };
                })
        }
    };
    
    render() {
        return (
            <div>
                <div id={this.props.toolbarId}>
                    <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
                        <option value="1" />
                        <option value="2" />
                        <option value="3" />
                        <option value="" />
                    </select>
                    <button className="ql-bold" />
                    <button className="ql-italic" />
                    <button className="ql-underline" />
                    <button className="ql-strike" />
                    <button className="ql-list" value={"ordered"}/>
                    <button className="ql-list" value={"bullet"}/>
                    <button className="ql-align" value={""} />
                    <button className="ql-align" value={"center"}/>
                    <button className="ql-align" value={"right"} />
                    <button className="ql-insertImage"><img src={Image} alt="Icon Image"/></button>
                    <button className="ql-insertVideo">
                        <img src={Video} alt="Icon Video"/>
                    </button>
                    <button className="ql-video" />
                    {/* <button className="ql-insertFile">
                        <img src={File} alt="Icon File"/>
                    </button> */}
                    <button className="ql-link" />
                    <button className="ql-code-block" />
                    <button className="ql-blockquote" />          
                </div>
                {
                    this.props.flag === "post" &&
                    <ReactQuill
                        ref={(el) => { this.reactQuillRef = el }}
                        theme={'snow'}
                        onChange={this.handleChange}
                        modules={this.modules}
                        formats={this.formats}
                        value={this.state.editorHtml}
                        placeholder={this.props.placeholder}
                    />
                }
                {
                    this.props.flag === "edit" &&
                    <ReactQuill
                        ref={(el) => { this.reactQuillRef = el }}
                        theme={'snow'}
                        onChange={this.handleContentChange}
                        modules={this.modules}
                        formats={this.formats}
                        value={this.props.content}
                        placeholder={this.props.placeholder}
                    />
                }
                <input type="file" accept="image/*" ref={this.inputOpenImageRef} style={{ display: "none" }} onChange={this.insertImage} />
                <input type="file" accept="video/*" ref={this.inputOpenVideoRef} style={{ display: "none" }} onChange={this.insertVideo} />
                <input type="file" accept="*" ref={this.inputOpenFileRef} style={{ display: "none" }} onChange={this.insertFile} />
            </div>
        )
    }

    modules = {
        syntax: true,
        toolbar: {
            container: `#${this.props.toolbarId}`,
            //id ="toorbar"는  그 위에 B I U S I V F P 이거 있는 곳이다. 
            handlers: {
                insertImage: this.imageHandler,
                insertVideo: this.videoHandler,
                insertFile: this.fileHandler,
                insertPoll: this.pollHandler,
            }
        },

    };

    formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'align',
        'image', 'video', "video", 
        //'file', 
        'link', "code-block", "blockquote"
    ];
}

export default QuillEditor;

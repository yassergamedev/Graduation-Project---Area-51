import React, { useState } from "react";
import { Button, Divider, Input, InputNumber } from "antd";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import CompanySelector from "./CompanySelector";
import DomaineSelector from "./DomaineSelector";
import DatePicker from "./DatePicker";
import TagsCreator from "./TagsCreator";
import ImageUploader from "./ImageUploader";

const ModuleCreator2 = ({module,onChangeContent, contentt
  }) => {
 
  const [content, setContent] = useState(module.content);


  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      ["link", "image", "video"],
      [{ table: {} }],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
    "video",
    "color",
    "code",
    "table",
  ];

  const handleContentChange = (value) => {
    setContent(value);
    onChangeContent(value)
  };

 
 


  
  const handleSubmit = (event) => {
    event.preventDefault();
 
  };

  return (
    <form onSubmit={handleSubmit} style={{}}>
  

     

<Divider>Content</Divider>
<ReactQuill
  value={content}
  onChange={handleContentChange}
  modules={quillModules}
  formats={quillFormats}
  placeholder="Content"
  style={{ marginBottom: 20 ,
  height :'300px' }}
/>






</form>
  );
};

export default ModuleCreator2;
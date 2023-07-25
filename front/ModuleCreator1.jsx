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

const ModuleCreator1 = ({module,doms, nam, desc,onChangeDescription,onChangeName,
  onChangeDomains,
  }) => {
  const [name, setName] = useState(module.name);
  const [domains, setDomains] = useState(module.domains);
 const [description, setDescription] = useState(module.description);


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

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    onChangeDescription(event.target.value)
  };

 
  const handleTitleChange = (event) => {
    setName(event.target.value);
    onChangeName(event.target.value);
  };
  
 
  
  const handleDomainsChange = (value) => {
    setDomains(value);
    onChangeDomains(value);
  };

  
  

  
  const handleSubmit = (event) => {
    event.preventDefault();
    const converter = new QuillDeltaToHtmlConverter(description);
   
  };

  return (
    <form onSubmit={handleSubmit} style={{}}>
      <Input
        placeholder="Name"
        value={name}
        onChange={handleTitleChange}
        style={{ marginBottom: 16 }}
      />

     
      <DomaineSelector
      doms={domains}
        onChange={handleDomainsChange}
        style={{ marginBottom: 16 }}
      />
      
      
   
<Divider>Description</Divider>
<textarea
  value={description}
  onChange={handleDescriptionChange}
 
  placeholder="Description"
  style={{ marginBottom: 16 }}
/>






</form>
  );
};

export default ModuleCreator1;
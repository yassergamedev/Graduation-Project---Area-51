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

const JobOfferCreator1 = ({jobOffer,onChangeDescription,onChangeTitle, onChangeImage,
  onChangeDomains,onChangeCoins}) => {
  const [title, setTitle] = useState(jobOffer.title);
  const [domains, setDomains] = useState(jobOffer.domains);
  const [coins, setCoins] = useState(jobOffer.coins);
  const [image, setImage] = useState(jobOffer.image);
  const [description, setDescription] = useState(jobOffer.description);
  

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

  const handleDescriptionChange = (value) => {
    setDescription(value);
    onChangeDescription(value)
  };

 
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    onChangeTitle(event.target.value);
  };
  
 
  
  const handleDomainsChange = (value) => {
    setDomains(value);
    onChangeDomains(value);
  };
  const handleImageChange = (value) => {
    setImage(value);
    onChangeImage(value);
  };
  
 
  const handleCoinsChange = (value) => {
    setCoins(value);
    onChangeCoins(value);
  };
  
 
 
  const handleSubmit = (event) => {
    event.preventDefault();
    const converter = new QuillDeltaToHtmlConverter(description);
    console.log({
      title,

      domains,

      coins,
   

      description: converter.convert(),

    });
  };

  return (
    <form onSubmit={handleSubmit} style={{}}>
      <Input
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
        style={{ marginBottom: 16 }}
      />
<Divider>Cover</Divider>
<center><ImageUploader img={image} onChangeImage={handleImageChange}/></center>

     
      <DomaineSelector
      doms={domains}
        onChange={handleDomainsChange}
        style={{ marginBottom: 16 }}
      />
    
      
      <Divider>  Coins</Divider>
    

<div style={{ display: "flex", marginBottom: 16 }}>
  <div style={{ marginRight: 16 }}>
   
  </div>
 
  <div>
    <InputNumber
      defaultValue={0}
      min={0}
      max={100}
      value={coins}
      formatter={(value) => `${value}Coins`}
      parser={(value) => value.replace("Coins", "")}
      onChange={handleCoinsChange}
      style={{ width: 120 }}
    />
  </div>
</div>
<Divider>Description</Divider>
<ReactQuill
  value={description}
  onChange={handleDescriptionChange}
  modules={quillModules}
  formats={quillFormats}
  placeholder="Description"
  style={{ marginBottom: 16 }}
/>





</form>
  );
};

export default JobOfferCreator1;
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

const LearningPathCreator1 = ({doms,c,lp,img,  nam, desc,onChangeCoins ,onChangeDescription,onChangeName,
  onChangeDomains,onChangeLearningPoints, onChangeImage
  }) => {
  const [name, setName] = useState(lp.name);
  const [domains, setDomains] = useState(lp.domains);
  const [image, setImage] = useState(lp.domains);
  const [learningPoints, setLearningPoints] = useState(lp.learningPoints)
  const [coins, setCoins] = useState(lp.coins)
 const [description, setDescription] = useState(lp.description);


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

  const handleLearningPointsChange = (value) => {
    setLearningPoints(value);
    onChangeLearningPoints(value);
  };
  
  const handleCoinsChange = (value) => {
    setCoins(value);
    onChangeCoins(value);
  };
  

  
  const handleSubmit = (event) => {
    event.preventDefault();
    const converter = new QuillDeltaToHtmlConverter(description);
   
  };
  const handleImageChange = (value) => {
    setImage(value);
    onChangeImage(value);
  };
  return (
    <form onSubmit={handleSubmit} style={{}}>
      <Input
        placeholder="Name"
        value={name}
        onChange={handleTitleChange}
        style={{ marginBottom: 16 }}
      />

<Divider>Cover</Divider>
<center><ImageUploader onChangeImage={handleImageChange}/></center>

      <DomaineSelector
      doms={domains}
        onChange={handleDomainsChange}
        style={{ marginBottom: 16 }}
      />
      
      <Divider> PeP, Coins</Divider>
    

<div style={{ display: "flex", marginBottom: 16 }}>
  <div style={{ marginRight: 16 }}>
   
  </div>
  <div style={{ marginRight: 16 }}>
    <InputNumber
      defaultValue={0}
      min={0}
      value={learningPoints}
      max={100}
      formatter={(value) => `${value}LP`}
      parser={(value) => value.replace("LP", "")}
      onChange={handleLearningPointsChange}
      style={{ width: 120, marginRight: 16 }}
    />
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
<textarea
  value={description}
  onChange={handleDescriptionChange}
 
  placeholder="Description"
  style={{ marginBottom: 16 }}
/>






</form>
  );
};

export default LearningPathCreator1;
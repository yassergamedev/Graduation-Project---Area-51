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

const CompetitionCreator1 = ({competition,onChangeDescription,onChangeTitle, onChangeImage,
  onChangeDomains,onChangeLearningPoints,onChangePractisePoints,onChangeCoins,
  onChangePreferredDate,onChangeJudgingCriteria}) => {
  const [title, setTitle] = useState(competition.title);
  const [companies, setCompanies] = useState([]);
  const [domains, setDomains] = useState(competition.domains);
  const [learningPoints, setLearningPoints] = useState(competition.learningPoints);
  const [practisePoints, setPractisePoints] = useState(competition.practisePoints);
  const [coins, setCoins] = useState(competition.coins);
  const [preferredDate, setPreferredDate] = useState(competition.preferredDate);
  const [image, setImage] = useState(competition.image);
  const [description, setDescription] = useState(competition.description);
  const [judgingCriteria, setJudgingCriteria] = useState(competition.judgingCriteria);
  

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
  
  const handleLearningPointsChange = (value) => {
    setLearningPoints(value);
    onChangeLearningPoints(value);
  };
  
  const handlePractisePointsChange = (value) => {
    setPractisePoints(value);
    onChangePractisePoints(value);
  };
  
  const handleCoinsChange = (value) => {
    setCoins(value);
    onChangeCoins(value);
  };
  
  const handlePreferredDateChange = (value) => {
    console.log(value)
    setPreferredDate(value);
    onChangePreferredDate(value);
  };
  
  const handleJudgingCriteriaChange = (value) => {
    setJudgingCriteria(value);
    onChangeJudgingCriteria(value);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const converter = new QuillDeltaToHtmlConverter(description);
    console.log({
      title,
      companies,
      domains,
      learningPoints,
      practisePoints,
      coins,
      preferredDate,

      description: converter.convert(),
      judgingCriteria,
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
      <Divider>Preffered Date (this could be changed by the admin )</Divider>
      <DatePicker
      onChangeDate={handlePreferredDateChange}
        label="Preferred Date"
        value={preferredDate}
        
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
      max={100}
      value={practisePoints}
      formatter={(value) => `${value}PeP`}
      parser={(value) => value.replace("PeP", "")}
      onChange={handlePractisePointsChange}
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
<ReactQuill
  value={description}
  onChange={handleDescriptionChange}
  modules={quillModules}
  formats={quillFormats}
  placeholder="Description"
  style={{ marginBottom: 16 }}
/>

<Divider>Judging Criteria (this is a description for the participants ) </Divider>
<ReactQuill
  value={judgingCriteria}
  onChange={handleJudgingCriteriaChange}
 
  placeholder="Judging Criteria"
  style={{ marginBottom: 16 }}
/>




</form>
  );
};

export default CompetitionCreator1;
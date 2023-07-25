import React, { useState } from "react";
import FormInput from "./FormInput";
import TagsCreator from "./TagsCreator";
import Tags from "./Tags";
import "quill/dist/quill.snow.css";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import ReactQuill from "react-quill";
import "./styles/ProblemPart1.css";
import Tags2 from "./Tags2";
import DatePicker from "./DatePicker";
import { Divider, InputNumber } from "antd";
import CompanySelector from "./CompanySelector";
import DomaineSelector from "./DomaineSelector";

const ProblemPart1 = ({
  problem,
  onTitleChange,
  onDescriptionChange,
  onCompanyChange,
  onDomaineChange,
  onLpChange,
  onPepChange,
  onCoinsChange,
}) => {

  const [description, setDescription] = useState(problem.description)
  const [title, setTitle] = useState(problem.title)
  const [companies, setCompanies] = useState([])
  const [domains, setDomains] = useState(problem.domains)
  const [learningPoints, setLearningPoints] = useState(0)
  const [practisePoints, setPractisePoints] = useState(problem.practisePoints)
  const [coins, setCoins] = useState(problem.coins)
  const [showTags, setShowTags] = useState(false);
  const [showTagsCreator, setShowTagsCreator] = useState(true);
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      ["link", "image", "video"],
      [{ table: {} }],  // Add a table button to the toolbar
      ["clean"],
    ],
  };
  
  const quillFormats = [  "header",  "bold",  "italic",  "underline",  "strike",  "list",  "bullet",  "link",  "image",  "video",  "color",  "code",  "table"  ];
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const converter = new QuillDeltaToHtmlConverter(description);
    
  };

  const handleDomainsChange = (value) => {
    setDomains(value);
    onDomaineChange(value);
  };


  return (
    <form onSubmit={() => { return false; }}>
      <FormInput
        className="form-input"
        label="Title"
        name="title"
       value={title}
        type="text"
        handleChange={(event) => {
          const value = event.target.value;
          setTitle(value);
          onTitleChange(value);
        }}      
      />
    
      <DomaineSelector
      doms={domains}
       name={domains}onChange={handleDomainsChange} />
      <Divider />
     
     
      <Divider type="vertical" />
      PeP <InputNumber
       name={practisePoints}
       value={practisePoints}
       onChange={(value)=>{
         setPractisePoints(value)
         onPepChange(value)}}
       min={0} max={10}
       defaultValue={3} />
      <Divider type="vertical" />
      Coins <InputNumber
        name={coins} min={0} 
        value={coins}
        onChange={(value)=>{
          setCoins(value)
          onCoinsChange(value)}}
        max={10} defaultValue={3} />
      <Divider>Description</Divider>
      <ReactQuill
        className="quill-container"
        name={description}
        value={description}
        onChange={(value)=>{
          setDescription(value)
          onDescriptionChange(value)}}
        modules={quillModules}
        formats={quillFormats}
      />
    </form>
  );
};

export default ProblemPart1;

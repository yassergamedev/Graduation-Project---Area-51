import React, { useEffect, useState } from "react";
import { Button, Divider, Input, InputNumber, Modal, Select } from "antd";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import CompanySelector from "./CompanySelector";
import DomaineSelector from "./DomaineSelector";
import DatePicker from "./DatePicker";
import TagsCreator from "./TagsCreator";
import ImageUploader from "./ImageUploader";
import { Option } from "antd/es/mentions";
import { useParams } from "react-router-dom";

function ReportCreator ({request, report,adminn}) {

    
  const [title, setTitle] = useState(report.title);
  const [creator, setCreator] = useState(adminn) 
  const [description, setDescription] = useState(report.description);
  const [content, setContent] = useState(report.content);
const [image, setImage] = useState("image")
const [type, setType] = useState(report.type)
const {id} = useParams()
useEffect(() => {
    fetch(`http://localhost:3000/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCreator(data);
        localStorage.setItem('user', JSON.stringify(data));
        console.log(report)
      })
      .catch((error) => console.error(error));},[])
  

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


 
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleContentChange = (value) => {
    setContent(value);

  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (value) => {
    setImage(value);
  };
  const handleTypeChange = (value) => {
    setType(value);
  };

  function success() {
    Modal.success({
      content: 'Report has been created successfully! ',
    });
  };
  function fail() {
    Modal.success({
      content: 'Report has been updated successfully! ',
    });
  };
  function handleSubmit(){
  //   let desc = new QuillDeltaToHtmlConverter(description.delta);
  // let converter = new QuillDeltaToHtmlConverter(content.delta);

  // console.log(desc.convert());
  // console.log(converter.convert());

  let obj = {
    title: title,
    type: type,
    description:description,
    image: image,
    content: content,
    creator: creator,
  };
    if (request === 'post') {
      fetch("http://localhost:3000/report", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Update user's modules_created attribute
          const updatedUser = {
            ...creator,
            reports_created: [...creator.reports_created, data._id],
          };
    
          // Make PATCH request to update user
          fetch(`http://localhost:3000/users/${creator._id}`, {
            method: "PATCH",
            body: JSON.stringify(updatedUser),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              success();
              console.log(data);
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }
    else{
        fetch(`http://localhost:3000/report/${report.key}`, {
        method: "PATCH",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          fail();
          console.log(data)})
        .catch((error) => console.log(error));}
        }

  return (
    <form onSubmit={()=>{return false}} style={{}}>

      <Input
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
        style={{ marginBottom: 16 }}
      />

     <Divider>Type </Divider>
      <Select
        placeholder="Please select Type"
        style={{ width: '100%' }}
        value={type}
        onChange={handleTypeChange}
      >
   
          <Option value="learning path">
          Learning Paths Report
          </Option>
          <Option value="competition">
          Competition Report
          </Option>
          <Option value="job offer">
            Job Offer Report
          </Option>
      </Select>



<div style={{ display: "flex", marginBottom: 16 }}>



</div>
<Divider>Description</Divider>
<textarea
  value={description}
  onChange={handleDescriptionChange}
 
  placeholder="Description"
  style={{ marginBottom: 16 }}
/>
<Divider>Content</Divider>
<ReactQuill
  value={content}
  onChange={handleContentChange}
  modules={quillModules}
  formats={quillFormats}
  placeholder="Content"
  style={{ marginBottom: 16 }}
/>


<Button onClick={handleSubmit}>Post Report</Button>

</form>
  );
};

export default ReportCreator;
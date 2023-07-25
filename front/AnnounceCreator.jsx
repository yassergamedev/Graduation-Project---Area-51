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

function AnnounceCreator ({adminn}) {

    
  const [title, setTitle] = useState("");
  const [user, setUser] = useState(adminn) 
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
const [image, setImage] = useState("")
const [priority, setPriority] = useState("")
  useEffect(()=>{
    setUser(adminn)
  },[adminn])

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
  const handlePriorityChange = (value) => {
    setPriority(value);
  };

  function success() {
    Modal.success({
      content: 'Announce has been created successfully! ',
    });
  };
  const handleSubmit = (event) => {
    let obj= {}
    try {
        let desc = new QuillDeltaToHtmlConverter(description.delta);
        let converter = new QuillDeltaToHtmlConverter(content.delta);
      
        console.log(desc.convert());
        console.log(converter.convert());
      
        obj = {
          title: title,
          priority: priority,
          description:description,
          cover: image,
          content: content,
          creator: user,
        };
      
        // Rest of your code...
      } catch (error) {
        console.error('Error converting Delta to HTML:', error);
      }

   fetch("http://localhost:3000/announce", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        success();
        console.log(data)})
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={()=>{return false}} style={{}}>

      <Input
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
        style={{ marginBottom: 16 }}
      />
<Divider>Cover</Divider>
<center><ImageUploader onChangeImage={handleImageChange}/></center>

     <Divider>Priority </Divider>
      <Select
        placeholder="Please select priority"
        style={{ width: '100%' }}
        onChange={handlePriorityChange}
      >
   
          <Option value="important">
            Important
          </Option>
          <Option value="update">
           Casual Update
          </Option>
          <Option value="new">
            New Feature
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


<Button onClick={handleSubmit}>Post Announce</Button>

</form>
  );
};

export default AnnounceCreator;
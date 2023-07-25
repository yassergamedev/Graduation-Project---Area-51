import React, { useState } from "react";
import { Avatar, Button, Card, Divider, Input, InputNumber, List } from "antd";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import CompanySelector from "./CompanySelector";
import DomaineSelector from "./DomaineSelector";
import DatePicker from "./DatePicker";
import TagsCreator from "./TagsCreator";
import ImageUploader from "./ImageUploader";
import QuestionBank from "./QuestionBank";
import { Link } from "react-router-dom";
import UserList from "./UserList";

const LearningPathCreator3 = ({ lp, onChangeUsers,
}) => {

  const [selectedUsers, setSelectedUsers] = useState({});

  function changeSelectedUsers(user) {
    setSelectedUsers(user)
    onChangeUsers(user);
    console.log(selectedUsers)
  }

  const handleSubmit = (event) => {
    event.preventDefault();

  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '60%' }}>
        <h3>User List</h3>
        <div style={{ height: '500px', overflowY: 'scroll' }}>
          <UserList onChangeSelected={changeSelectedUsers} />
        </div>
      </div>
      <div style={{ width: '40%' }}>
        <h3>Selected Manager</h3>
        <div>
          {selectedUsers && (
            <div>
              <Avatar src={selectedUsers.avatar} />
              <div>
                <h3>{selectedUsers.username}</h3>
                <p>{`${selectedUsers.firstname} ${selectedUsers.lastname}, ${selectedUsers.role}`}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

};

export default LearningPathCreator3;
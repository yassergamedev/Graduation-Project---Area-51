import React, { useState } from "react";
import { Button, Card, Divider, Input, InputNumber, Modal } from "antd";
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
import QuestionCreator from "./QuesionCreator";

const ModuleCreator2 = ({ quests,user, onChangeQuestions,
}) => {

  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [ref, setRef] = useState(false)

  const [isQuestModalVisible, setIsQuestModalVisible] = useState(false);
 
  function changeSelectedQuestions(questions) {
    setSelectedQuestions(questions);
    onChangeQuestions(questions)
  }



  function showQuestEditModal() {
  
    setIsQuestModalVisible(!isQuestModalVisible)
  }





  const handleSubmit = (event) => {
    event.preventDefault();

  };

  return (
    <div style={{ display: "flex" }}>

      <div style={{ width: "60%" }}>
        <h3>Question Bank(<Link onClick={showQuestEditModal}>Create one here</Link>)</h3>
        <div style={{ height: "500px", overflowY: "scroll" }}>
          <QuestionBank onRefresh={ref} onChangeSelected={changeSelectedQuestions} />
        </div>
      </div>
      <div style={{ width: "40%" }}>
        <h3>Selected Questions</h3>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {selectedQuestions.map((question) => (
            <Card key={question._id} style={{ margin: "10px" }}>
              <h4>{question.questionText}</h4>


            </Card>
          ))}
        </div>
        <Modal
          width={1000}
          visible={isQuestModalVisible}
          onCancel={() => setIsQuestModalVisible(false)}
          footer={null}
        >
          <QuestionCreator questionn={{}} onCreate={()=>(setRef(true))} usern={user} request='post' />
        </Modal>
      </div>
    </div>
  );
};

export default ModuleCreator2;
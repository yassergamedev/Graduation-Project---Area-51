import { Card, Col, Row, Tabs } from "antd";
import React from "react";
import ProblemList from "./ProblemList";
//import QuestionList from "./QuestionList";
import CodeEditor from "./CodeEditor";
import ThreeTabsCreator from "./ThreeTabsCreator";
import TwoTabsCreator from "./TwoTabsCreator";
import OneTabCreator from "./OneTabCreator";
const { TabPane } = Tabs;

const CompetitionCreator4 = ({ design, onChangeProblems, onChangeProblemsTime,
onChangeSubmissions, onChangeQuestions, onChangeQuestionsTime, onChangeDebugger }) => {
  const handleTabClick = (key) => {
    console.log("Selected tab:", key);
  };

    
    if(design === "three-tabs")
    return(
    <ThreeTabsCreator onChangeProblems={onChangeProblems} onChangeProblemsTime={onChangeProblemsTime}
    onChangeSubmissions={onChangeSubmissions} onChangeQuestions={onChangeQuestions}
     onChangeQuestionsTime={onChangeQuestionsTime} onChangeDebugger={onChangeDebugger}/>)
    else if(design ==="two-tabs")
    { 
        return (<TwoTabsCreator onChangeProblems={onChangeProblems} onChangeProblemsTime={onChangeProblemsTime}
            onChangeSubmissions={onChangeSubmissions} onChangeQuestions={onChangeQuestions}
             onChangeQuestionsTime={onChangeQuestionsTime} />)
    }
    else {
        return (<OneTabCreator onChangeProblems={onChangeProblems} onChangeProblemsTime={onChangeProblemsTime}
            onChangeSubmissions={onChangeSubmissions} />)
    }
};

export default CompetitionCreator4;
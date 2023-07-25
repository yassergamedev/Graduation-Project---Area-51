import React, { useState, useEffect } from "react";
import { Checkbox, Col, Divider, Input, List, Popover, Row, Tag } from "antd";
import { Link } from "react-router-dom";
import { Collapse } from 'antd';
import DomaineSelector from "./DomaineSelector";

const { Panel } = Collapse;
const { Search } = Input;

const QuestionBank = ({ onRefresh,onChangeSelected }) => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState([]);

  let counter = 1;

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch(`http://localhost:3000/questions/`);
      const data = await response.json();
      setQuestions(data);
      setFilteredQuestions(data);
    };
    fetchQuestions();
  }, [onRefresh]);

  

  const handleSelectQuestion = (question, checked) => {
    if (checked) {
      setSelectedQuestions([...selectedQuestions, question]);
    } else {
      setSelectedQuestions(selectedQuestions.filter((p) => p._id !== question._id));
    }
  };

  useEffect(() => {
    if (onChangeSelected) {
      onChangeSelected(selectedQuestions);
    }
  }, [selectedQuestions]);

  const handleSearch = (value) => {
    const filtered = questions.filter((question) => question.questionText.toLowerCase().includes(value.toLowerCase()));
    setFilteredQuestions(filtered);
  };

  const handleDomainFilter = (selected) => {
    setSelectedDomains(selected);
    const filtered = questions.filter((question) => {
      return selected.every((domain) => question.domains.includes(domain));
    });
    setFilteredQuestions(filtered);
  };

  return (
    <div>
      <Search placeholder="Search questions" onSearch={handleSearch} style={{ marginBottom: '16px' }} />

      <div>
        <h4>Filter by Domain:</h4>
        <DomaineSelector domains={questions.reduce((domains, question) => {
          question.domains.forEach((domain) => {
            if (!domains.includes(domain)) {
              domains.push(domain);
            }
          });
          return domains;
        }, [])} onChange={handleDomainFilter} />
      </div>

      <List
        bordered
        dataSource={filteredQuestions}
        renderItem={(question) => (
          <List.Item key={question._id}>
            <Row justify="start" gutter={16} align="middle">
              <Col span={2}>
                <Checkbox onClick={(e) => handleSelectQuestion(question, e.target.checked)} />
              </Col>
              <Col span={2}>{counter++}</Col>
              <Col span={10}>
                <Collapse defaultActiveKey={['1']} >
                  <Panel header={question.questionText}>
                    {question.possibleAnswers.map((p) => (
                      <li key={p}>{p}<Divider /></li>
                    ))}
                  </Panel>
                </Collapse>
              </Col>
              <Col span={4}>
                {question.domains.slice(0, 1).map((domain) => (
                  <Tag key={domain} color="blue">
                    {domain}
                  </Tag>
                ))}
                {question.domains.length > 1 && (
                  <Popover
                    placement="bottom"
                    content={
                      <>
                        {question.domains.slice(1).map((domain) => (
                          <Tag key={domain} color="blue">
                            {domain}
                          </Tag>
                        ))}
                      </>
                    }
                  >
                    <Tag color="blue">+{question.domains.length - 1} more</Tag>
                  </Popover>
                )}
              </Col>
             
            </Row>
          </List.Item>
        )}
      />
    </div>
  );
};

export default QuestionBank;

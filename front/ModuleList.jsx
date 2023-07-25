import React, { useState, useEffect } from "react";
import { Checkbox, Col, Divider, Input, List, Popover, Row, Tag } from "antd";
import { Link } from "react-router-dom";
import { Collapse } from 'antd';
import DomaineSelector from "./DomaineSelector";

const { Panel } = Collapse;
const { Search } = Input;

const ModuleList = ({ onChangeSelected }) => {
  const [modules, setModules] = useState([]);
  const [selectedModules, setSelectedModules] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState([]);

  let counter = 1;

  useEffect(() => {
    const fetchModules = async () => {
      const response = await fetch(`http://localhost:3000/modules/`);
      const data = await response.json();
      setModules(data);
      setFilteredModules(data);
    };
    fetchModules();
  }, []);

  const handleSelectQuestion = (module, checked) => {
    if (checked) {
      setSelectedModules([...selectedModules, module]);
    } else {
      setSelectedModules(selectedModules.filter((p) => p._id !== module._id));
    }
  };

  useEffect(() => {
    if (onChangeSelected) {
      onChangeSelected(selectedModules);
    }
  }, [selectedModules]);

  const handleSearch = (value) => {
    const filtered = modules.filter((module) => module.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredModules(filtered);
  };

  const handleDomainFilter = (selected) => {
    setSelectedDomains(selected);
    const filtered = modules.filter((module) => {
      return selected.every((domain) => module.domains.includes(domain));
    });
    setFilteredModules(filtered);
  };

  return (
    <div>
      <Search placeholder="Search modules" onSearch={handleSearch} style={{ marginBottom: '16px' }} />

      <div>
        <h4>Filter by Domain:</h4>
        <DomaineSelector domains={modules.reduce((domains, module) => {
          module.domains.forEach((domain) => {
            if (!domains.includes(domain)) {
              domains.push(domain);
            }
          });
          return domains;
        }, [])} onChange={handleDomainFilter} />
      </div>

      <List
        bordered
        dataSource={filteredModules}
        renderItem={(module) => (
          <List.Item key={module._id}>
            <Row justify="start" gutter={16} align="middle">
              <Col span={2}>
                <Checkbox onClick={(e) => handleSelectQuestion(module, e.target.checked)} />
              </Col>
              <Col span={2}>{counter++}</Col>
              <Col span={10}>
                <Collapse defaultActiveKey={['1']} >
                  <Panel header={module.name}>
                  <p>Creator :  </p>
        <p>Creation Date :  {module.creationDate}</p>
                  </Panel>
                </Collapse>
              </Col>
              <Col span={4}>
                {module.domains.slice(0, 1).map((domain) => (
                  <Tag key={domain} color="blue">
                    {domain}
                  </Tag>
                ))}
                {module.domains.length > 1 && (
                  <Popover
                    placement="bottom"
                    content={
                      <>
                        {module.domains.slice(1).map((domain) => (
                          <Tag key={domain} color="blue">
                            {domain}
                          </Tag>
                        ))}
                      </>
                    }
                  >
                    <Tag color="blue">+{module.domains.length - 1} more</Tag>
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

export default ModuleList;

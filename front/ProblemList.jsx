import React, { useState, useEffect } from "react";
import { Checkbox, Input, Select, Table, Tag } from "antd";
import { Link } from "react-router-dom";

const { Option } = Select;

const ProblemList = ({ onChangeSelected }) => {
  const [problems, setProblems] = useState([]);
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    const fetchProblems = async () => {
      const response = await fetch("http://localhost:3000/problems/");
      const data = await response.json();
      setProblems(data);
      console.log(data);
    };
    fetchProblems();
  }, []);

  const handleSelectProblem = (problem, checked) => {
    if (checked) {
      setSelectedProblems([...selectedProblems, problem]);
    } else {
      setSelectedProblems(selectedProblems.filter((p) => p._id !== problem._id));
    }
  };

  useEffect(() => {
    if (onChangeSelected) {
      onChangeSelected(selectedProblems);
    }
  }, [selectedProblems]);

  const columns = [
    {
      title: "Select",
      dataIndex: "checkbox",
      render: (_, record) => (
        <Checkbox
          onClick={(e) => handleSelectProblem(record, e.target.checked)}
        />
      ),
    },
    {
      title: "#",
      dataIndex: "counter",
    },
    {
      title: "Title",
      dataIndex: "title",
      render: (text, record) => (
        <Link to={`${record._id}`}>{text}</Link>
      ),
    },
    
    {
      title: "Domains",
      dataIndex: "domains",
      render: (domains) => (
        <>
          {domains.slice(0, 1).map((domain) => (
            <Tag key={domain} color="blue">
              {domain}
            </Tag>
          ))}
          {domains.length > 1 && (
            <Tag color="blue">+{domains.length - 1} more</Tag>
          )}
        </>
      ),
    },
    {
      title: "Coins",
      dataIndex: "coins",
      render: (coins) => <Tag color="orange">{coins}</Tag>,
    },
    {
      title: "Learning Points",
      dataIndex: "learningPoints",
      render: (learningPoints) => <Tag color="purple">{learningPoints}</Tag>,
    },
    {
      title: "Practise Points",
      dataIndex: "practisePoints",
      render: (practisePoints) => <Tag color="green">{practisePoints}</Tag>,
    },
  ];

  const filteredProblems = problems.filter((problem) =>
    problem?.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search by title"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ width: 200, marginRight: 16 }}
        />
        <Select
          placeholder="Filter by domain"
          value={filterValue}
          onChange={(value) => setFilterValue(value)}
          style={{ width: 200 }}
        >
          <Option value="">All</Option>
          <Option value="domain1">Domain 1</Option>
          <Option value="domain2">Domain 2</Option>
          <Option value="domain3">Domain 3</Option>
        </Select>
      </div>

      <Table
        dataSource={filteredProblems}
        columns={columns}
        rowKey="_id"
        pagination={false}
      />
    </div>
  );
};

export default ProblemList;

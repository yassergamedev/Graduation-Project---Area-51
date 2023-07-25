import React, { useState } from "react";
import { Button, InputNumber, Table } from "antd";
import { on } from "form-data";

const PointsDistributionCreator = ({pool,onChange}) => {
  const [dataSource, setDataSource] = useState(pool || [{rank: 1, lp : 0, pep : 0, coins : 0}]);

  const columns = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
    },
    {
      title: "Learning Points",
      dataIndex: "lp",
      key: "lp",
      render: (lp, record, index) => (
        <InputNumber
          value={lp}
          onChange={(value) => handleInputChange(index, "lp", value)}
        />
      ),
    },
    {
      title: "Practise Points",
      dataIndex: "pep",
      key: "pep",
      render: (pep, record, index) => (
        <InputNumber
          value={pep}
          onChange={(value) => handleInputChange(index, "pep", value)}
        />
      ),
    },
    {
      title: "Coins",
      dataIndex: "coins",
      key: "coins",
      render: (coins, record, index) => (
        <InputNumber
          value={coins}
          onChange={(value) => handleInputChange(index, "coins", value)}
        />
      ),
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: (text, record, index) =>
        dataSource.length >= 2 ? (
          <Button type="danger" onClick={() => handleDeleteRow(index)}>
            Delete
          </Button>
        ) : null,
    },
  ];

  const handleInputChange = (index, key, value) => {
    const newDataSource = [...dataSource];
    newDataSource[index][key] = value;
    setDataSource(newDataSource);
    onChange(newDataSource)
  };

  const handleAddRow = () => {
    const newDataSource = [...dataSource];
    const lastRank = Number(newDataSource[newDataSource.length - 1].rank);
    newDataSource.push({ rank: lastRank + 1, lp: 0, pep: 0, coins: 0 });
    setDataSource(newDataSource);
    onChange(newDataSource);
  };
  

  const handleDeleteRow = (index) => {
    const newDataSource = [...dataSource];
    newDataSource.splice(index, 1);
    setDataSource(newDataSource);
    onChange(newDataSource)
  };

  return (
    <>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
      <Button type="primary" onClick={handleAddRow}>
        Add Row
      </Button>
    </>
  );
};

export default PointsDistributionCreator;

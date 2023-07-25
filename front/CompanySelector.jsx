import { Divider, Select } from 'antd';
import { useEffect, useState } from 'react';

const { Option } = Select;

const CompanySelector = ({ onChange }) => {
  const [companies, setCompanies] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/companies/')
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleOptionsChange = (newOptions) => {
    setSelectedOptions(newOptions);
    if(onChange){
    onChange(newOptions);}
  };

  return (
    <>
      <Divider>Companies</Divider>
      <Select
        mode="tags"
        placeholder="Please select companies"
        style={{ width: '100%' }}
        value={selectedOptions}
        onChange={handleOptionsChange}
      >
        {companies.map((company) => (
          <Option key={company.id} value={company.name}>
            {company.name}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default CompanySelector;

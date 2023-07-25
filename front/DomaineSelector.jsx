import { Divider, Select } from 'antd';
import { useEffect, useState } from 'react';

const { Option } = Select;

const DomaineSelector = ({ onChange,doms }) => {
  const [domaines, setDomaines] = useState([]);

  const handleOptionsChange = (options) => {
  
    if(onChange){
        onChange(options);}
      };
  

  useEffect(() => {
    fetch('http://localhost:3000/domains/')
      .then((res) => res.json())
      .then((data) => {
        setDomaines(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Divider>Domaine Selector</Divider>
      <Select
        mode="tags"
        placeholder="Please select domaines"
        style={{ width: '100%' }}
        value={doms}
        onChange={handleOptionsChange}
      >
        {domaines.map((domaine) => (
          <Option key={domaine._id} value={domaine.name}>
            {domaine.name}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default DomaineSelector;

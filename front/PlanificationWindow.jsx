import {  Form, Button, Input } from 'antd';
import DatePicker from './DatePicker'
import { useState } from 'react';
import { on } from 'form-data';

const PlanificationWindow = ({ competition }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(competition.title)
  const [prefferredDate, setPrefferredDate] = useState(competition.prefferredDate)
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handlePrefferredDateChange = (value) => {
    setPrefferredDate(value);
  };
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const updatedCompetition = { ...competition, date: prefferredDate, competitionStatus: 'active', title: title };
      await fetch(`http://localhost:3000/competitions/${competition._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCompetition),
      });
      // success notification or redirect
    } catch (error) {
      console.log(error);
      // error notification or redirect
    }
    setLoading(false);
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Date">
        <DatePicker
          value={prefferredDate}
          onChangeDate={handlePrefferredDateChange}
       />
      </Form.Item>
      <Form.Item label="Title of Competition">
      <Input
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
        style={{ marginBottom: 16 }}
      />
      </Form.Item>
      
        <Button onClick={onFinish}>
            Confirm
        </Button>
    </Form>
  );
};

export default PlanificationWindow;

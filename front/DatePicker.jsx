import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
const onChange = (value, dateString) => {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
};

const DatePi = ({onChangeDate}) =>{
  const onOk = (value) =>{
    onChangeDate(value)
  }
  
  return (
  <Space direction="vertical" size={12}>
    
    <RangePicker
      showTime={{
        format: 'HH:mm',
      }}
      format="YYYY-MM-DD HH:mm"
      onChange={onChange}
      onOk={onOk}
      placement={'topRight'}
    />
  </Space>
)};
export default DatePi;
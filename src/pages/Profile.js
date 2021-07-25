import React from 'react';
import { DatePicker, Space } from 'antd';
import Wrapper from '../components/Wrapper';

const Profile = () => {
  return (
    <Wrapper>
      <Space direction="vertical">
        <DatePicker />
        <DatePicker picker="week" />
        <DatePicker picker="month" />
        <DatePicker picker="quarter" />
        <DatePicker picker="year" />
      </Space>
    </Wrapper>
  );
};

export default Profile;

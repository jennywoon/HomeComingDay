import React from 'react';
import Input from './elements/Input';

const SchoolInfo = () => {
  return (
    <div>
      {/* 로고 */}
      {/* 검색기능 추가 */}
      <Input placeholder='학교명' width='100%'/>
      {/* select 태그로 바꾸기 */}
      <Input placeholder='학과명 or 학부명' width='100%'/>
      {/* select 태그로 바꾸기 */}
      <Input placeholder='입학년도' width='100%'/>
    </div>
  );
};

export default SchoolInfo;
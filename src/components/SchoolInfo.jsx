import React, {useState} from 'react';
import Button from './elements/Button';
import Input from './elements/Input';

const SchoolInfo = () => {
  const [search, setSearch] = useState('');

  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  }

//   const filterSchool = schoolName.filter((p) => {
//     return p.title.replace(" ","").toLocaleLowerCase().includes(search.toLocaleLowerCase())
// })

  return (
    <div>
      {/* 로고 */}
      {/* 검색기능 추가 */}  
      <Input placeholder='학교명을 검색하세요.' type='text' value={search} onChange={onChangeSearch} width='100%'/>
      {/* select 태그로 바꾸기 */}
      <Input placeholder='학과 • 학부명' width='100%'/>
      {/* select 태그로 바꾸기 */}
      <Input placeholder='입학년도' width='100%'/>
      <Button>저장하기</Button>
    </div>
  );
};

export default SchoolInfo;
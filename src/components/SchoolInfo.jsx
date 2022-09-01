import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from './elements/Button';
import Input from './elements/Input';
import { IoIosArrowBack } from 'react-icons/io';
import { FiSearch } from 'react-icons/fi';
import Dropdown from './test/Dropdown';

const SchoolInfo = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  //   const filterSchool = schoolName.filter((p) => {
  //     return p.title.replace(" ","").toLocaleLowerCase().includes(search.toLocaleLowerCase())
  // })

  return (
    <StSchoolInfo>
      <StSchoolInfoWraps>
        <IoIosArrowBack
          size='28'
          style={{ marginBottom: '20px', cursor: 'pointer' }}
          onClick={() => {
            navigate('/login');
          }}
        />
        <StSchoolTitle style={{ justifyContent: 'center' }}>
          졸업생 인증
        </StSchoolTitle>
        <StSchoolInfoWrap>
          {/* 검색기능 추가 */}
          <Stlabel>학교명</Stlabel>
          <Input
            type='text'
            value={search}
            onChange={onChangeSearch}
            width='100%'
            padding= '10px 15px'
          />
          <StSearch type='button' />
        </StSchoolInfoWrap>
        <StSchoolInfoWrap>
          {/* select 태그로 바꾸기 */}
          <Stlabel>학과 • 학부명</Stlabel>
          <Dropdown/>
          {/* <StSelect>
            <select>
              <option value=''>--학과 • 학부명--</option>
              <option value='경영학과'>경영학과</option>
              <option value='경제학과'>경제학과</option>
              <option value='건축학과'>건축학과</option>
              <option value='국어교육과'>국어교육과</option>
              <option value='심리학과'>심리학과</option>
              <option value='의류학과'>의류학과</option>
              <option value='컴퓨터공학부'>컴퓨터공학부</option>
            </select>
          </StSelect> */}
        </StSchoolInfoWrap>
        <StSchoolInfoWrap>
          {/* select 태그로 바꾸기 */}
          <Stlabel>입학년도</Stlabel>
          <Input width='100%' padding= '10px 15px' />
        </StSchoolInfoWrap>
        <Button width='100%' padding='10px 0' style={{ marginTop: '100px' }}>
          저장하기
        </Button>
      </StSchoolInfoWraps>
    </StSchoolInfo>
  );
};

export default SchoolInfo;

const StSchoolInfo = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StSchoolInfoWraps = styled.div`
  width: 85%;
`;

const StSchoolTitle = styled.p`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 40px;
`;
const StSchoolInfoWrap = styled.div`
  box-sizing: border-box;
  padding: 0;
  border: none;
  align-items: left;
  margin-bottom: 30px;
  position: relative;
`;

const Stlabel = styled.label`
  font-size: 14px;
`;

const StSearch = styled(FiSearch)`
  position: absolute;
  right: 5px;
  top: 70%;
  transform: translatey(-50%);
  background-color: #fff;
  border: 0.5px solid #eee;
  border-radius: 50px;
  padding: 5px 10px;
  font-size: 10px;
  cursor: pointer;
`;

const StSelect=styled.div`
  width: 100%;
`
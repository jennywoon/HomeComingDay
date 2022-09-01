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

  const onClickHandler = () => {
    navigate('/signupcomplete');
  }

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
          대학교 정보 입력
        </StSchoolTitle>

        <StSchoolInfoWrap>
          {/* 검색기능 추가 */}
          <Stlabel>학교명</Stlabel>
          <StInput
            type='text'
            value={search}
            onChange={onChangeSearch}
            width='100%'
            padding='10px 15px'
          />
          <StSearch type='button' />
        </StSchoolInfoWrap>

        <StSchoolInfoWrap>
          <Stlabel>학과 · 학부명</Stlabel>
          {/* <Dropdown /> */}
          <StSelect>
            <option value=''>학과 · 학부명</option>
            <option value='경영학과'>경영학과</option>
            <option value='경제학과'>경제학과</option>
            <option value='건축학과'>건축학과</option>
            <option value='국어교육과'>국어교육과</option>
            <option value='심리학과'>심리학과</option>
            <option value='의류학과'>의류학과</option>
            <option value='컴퓨터공학부'>컴퓨터공학부</option>
          </StSelect>
        </StSchoolInfoWrap>

        <StSchoolInfoWrap>
          <Stlabel>입학년도</Stlabel>
          <StSelect>
            <option value=''>입학년도</option>
            <option value='2018'>2018년</option>
            <option value='2017'>2017년</option>
            <option value='2016'>2016년</option>
            <option value='2015'>2015년</option>
            <option value='2014'>2014년</option>
            <option value='2013'>2013년</option>
            <option value='2012'>2012년</option>
          </StSelect>
          {/* <StInput /> */}
        </StSchoolInfoWrap>

        <Button 
        width='100%' 
        padding='10px 0' 
        style={{ marginTop: '100px' }}
        backgroundColor='black'
        color='white'
        onClickHandler={onClickHandler}
        >
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
  margin-bottom: 10px;
  display: block;
`;

const StInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 10px 10px;
  border-radius: 10px;
  border: 0.5px solid #ddd;
`;

const StSearch = styled(FiSearch)`
  position: absolute;
  right: 5px;
  top: 70%;
  transform: translatey(-50%);
  padding: 5px 10px;
  font-size: 15px;
  cursor: pointer;
`;

const StSelect = styled.select`
  width: 100%;
  border: 0.5px solid #ddd;
  padding: 10px 10px;
  border-radius: 10px;
  box-sizing: border-box;
`;
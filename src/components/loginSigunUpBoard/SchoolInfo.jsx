import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from "../../components/elements/Button"
import { IoIosArrowBack } from 'react-icons/io';
import Select from "react-dropdown-select";
import './search.css'
import { __getSchoolSearch, __getDepartmentSearch } from '../../redux/modules/SchoolInfoSlice';

const SchoolInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 학교 정보 검색
  const schoolSearch = useSelector((state)=> state.schoolSearchs.schoolSearchs)
  // console.log(schoolSearch)

  useEffect(()=> {
    dispatch(__getSchoolSearch())
  },[dispatch])

  const [selectedschoolSearch, setSelectedschoolSearch] = useState([]);

    // 학과 정보 검색
    const departmentSearch = useSelector((state)=> state.departmentSearchs.departmentSearchs)
    console.log(departmentSearch)

    useEffect(()=> {
      dispatch(__getDepartmentSearch())
    },[dispatch])

    const [selectedOptions, setSelectedOptions] = useState([]);

  // 저장하기 버튼
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
          <Stlabel>학교명</Stlabel>
          <Select
          options={schoolSearch.map((item, index) => {
            return { value: item.seq, label: item.schoolName};
          })}
          values={selectedschoolSearch}
          style={{ maxHeight: "20px" }}
          maxMenuHeight={10}
          onChange={(values) => setSelectedschoolSearch([...values])}
          // placeholder='학교명'
        />
        </StSchoolInfoWrap>

        <StSchoolInfoWrap>
          <Stlabel>학과 · 학부명</Stlabel>
          {/* <StSelect>
            <option value=''>학과 · 학부명</option>
            <option value='경영학과'>경영학과</option>
            <option value='경제학과'>경제학과</option>
            <option value='건축학과'>건축학과</option>
            <option value='국어교육과'>국어교육과</option>
            <option value='심리학과'>심리학과</option>
            <option value='의류학과'>의류학과</option>
            <option value='컴퓨터공학부'>컴퓨터공학부</option>
          </StSelect> */}
          <Select
          options={departmentSearch.map((item, index) => {
            return { value: item.seq, label: item.mclass};
          })}
          values={selectedOptions}
          style={{ maxHeight: "20px" }}
          maxMenuHeight={10}
          onChange={(values) => setSelectedOptions([...values])}
          // placeholder='학교명'
        />
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

const StSelect = styled.select`
  width: 100%;
  border: 0.5px solid #ddd;
  padding: 10px 10px;
  border-radius: 10px;
  box-sizing: border-box;
`;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from "../../components/elements/Button"
import { IoIosArrowBack } from 'react-icons/io';
import Select from "react-dropdown-select";
// import './search.css'
import { __getSchoolSearch, __getDepartmentSearch, __getAdmissions, __postSchoolInfo } from '../../redux/modules/SchoolInfoSlice';

const SchoolInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [school, setSchool] = useState('')
  const [department, setDepartment] = useState('')
  const [admission, setAdmission] = useState('')

  const schoolInfos = {
    schoolName: school,
    departmentName: department,
    admission: admission
  }

  // 학교 정보 검색
  const schoolSearch = useSelector((state)=> state.schoolInfo.schoolSearchs)
  // console.log(schoolSearch)
  
  useEffect(()=> {
    dispatch(__getSchoolSearch());
    dispatch(__getDepartmentSearch());
    dispatch(__getAdmissions());
  },[dispatch])

  const [selectedschoolSearch, setSelectedschoolSearch] = useState([]);

  const onChangeSchool = (values) => {
    setSelectedschoolSearch([...values])
    setSchool(values[0].label)
  }

    // 학과 정보 검색
    const departmentSearch = useSelector((state)=> state.schoolInfo.departmentSearchs)
    // console.log(departmentSearch)

    const [selectedOptions, setSelectedOptions] = useState([]);

    const onChangeDepartment = (values) => {
      setSelectedOptions([...values]);
      setDepartment(values[0].label);
    }

    // 입학년도 검색
    const admissionSearch = useSelector((state)=> state.schoolInfo.admissions)
    // console.log(admissionSearch)

    const [selectedAdmission, setSelectedAdmission] = useState([]);

    const onChangeAdmission = (values) => {
      setSelectedAdmission([...values]);
      setAdmission(values[0].label);
    }

  // 저장하기 버튼
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(__postSchoolInfo(schoolInfos)).then(navigate('/signupcomplete'));
  }

  return (
    <StSchoolInfo>
      <StSchoolInfoWraps onSubmit={onSubmitHandler}>
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
          <StyledSelect
            options={schoolSearch.map((item, index) => {
              return { value: item.seq, label: item.schoolName };
            })}
            value={school}
            values={selectedschoolSearch}
            style={{ maxHeight: '20px', borderRadius: '16px', border: '1px solid #ddd', fontSize: '14px', padding:'0 10px'  }}
            maxMenuHeight={10}
            onChange={onChangeSchool}
            placeholder='학교명 '
          />
        </StSchoolInfoWrap>

        <StSchoolInfoWrap>
          <Stlabel>학과 · 학부명</Stlabel>
          <Select
            options={departmentSearch.map((item, index) => {
              return { value: item.seq, label: item.mclass };
            })}
            value={department}
            values={selectedOptions}
            style={{ maxHeight: '20px', borderRadius: '16px', border: '1px solid #ddd', fontSize: '14px', padding:'0 10px' }}
            maxMenuHeight={10}
            onChange={onChangeDepartment}
            placeholder='학과 · 학부명 '
          />
        </StSchoolInfoWrap>

        <StSchoolInfoWrap>
          <Stlabel>입학년도</Stlabel>
          <Select
            options={admissionSearch.map((item, index) => {
              return { value: item.id, label: item.admission };
            })}
            value={admission}
            values={selectedAdmission}
            style={{ maxHeight: '20px', borderRadius: '16px', border: '1px solid #ddd', fontSize: '14px', padding:'0 10px' }}
            maxMenuHeight={10}
            onChange={onChangeAdmission}
            placeholder='입학년도 '
          />
        </StSchoolInfoWrap>

        <Button
          type='submit'
          width='100%'
          padding='10px 0'
          style={{ marginTop: '100px' }}
          backgroundColor='black'
          color='white'
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

const StSchoolInfoWraps = styled.form`
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

const StyledSelect = styled(Select)`
  background: #fff;
  font-size: 14px;
`

const StSelect = styled.select`
  width: 100%;
  border: 1px solid #ddd;
  padding: 10px 10px;
  border-radius: 16px;
  box-sizing: border-box;
`;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/elements/Button';
import Select from 'react-dropdown-select';
// 모듈
import { __getSchoolSearch,  __getDepartmentSearch, __getAdmissions, __postSchoolInfo } from '../../redux/modules/SchoolInfoSlice';
import { __getMyPage } from '../../redux/modules/MyPageSlice';
// 아이콘 이미지
import { IoIosArrowBack } from 'react-icons/io';

const SchoolInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [school, setSchool] = useState('');
  const [department, setDepartment] = useState('');
  const [admission, setAdmission] = useState('');

  const schoolInfos = {
    schoolName: school,
    departmentName: department,
    admission: admission,
  };

  // 학교 정보 검색
  const schoolSearch = useSelector((state) => state.schoolInfo.schoolSearchs);

  useEffect(() => {
    dispatch(__getSchoolSearch());
    dispatch(__getDepartmentSearch());
    dispatch(__getAdmissions());
  }, [dispatch]);

  const [selectedschoolSearch, setSelectedschoolSearch] = useState([]);

  const onChangeSchool = (values) => {
    setSelectedschoolSearch([...values]);
    setSchool(values[0].label);
  };

  // 학과 정보 검색
  const departmentSearch = useSelector(
    (state) => state.schoolInfo.departmentSearchs
  );

  const [selectedOptions, setSelectedOptions] = useState([]);

  const onChangeDepartment = (values) => {
    setSelectedOptions([...values]);
    setDepartment(values[0].label);
  };

  // 입학년도 검색
  const admissionSearch = useSelector((state) => state.schoolInfo.admissions);

  const [selectedAdmission, setSelectedAdmission] = useState([]);

  const onChangeAdmission = (values) => {
    setSelectedAdmission([...values]);
    setAdmission(values[0].label);
  };

  // 저장하기 버튼
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await dispatch(__postSchoolInfo(schoolInfos))
      .then(navigate('/signupcomplete'));
  };

  // 저장하기 버튼 활성화
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (school !== '' && department !== '' && admission !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [school, department, admission]);

  return (
    <StFormContainer>
      <StSchoolInfo>
        <StFormHeader>
          <IoIosArrowBack
            size='28'
            style={{ marginBottom: '20px', cursor: 'pointer' }}
            onClick={() => {
              navigate('/login');
            }}
          />
        </StFormHeader>
        <StSchoolInfoWraps onSubmit={onSubmitHandler}>
          <StFisrtWrap>
            <StSecondWrap>
              <StSchoolTitle>대학교 정보 입력</StSchoolTitle>
              <StSchoolInfoWrap>
                <Stlabel>학교명</Stlabel>
                <StSelect
                  options={schoolSearch.map((item) => {
                    return { value: item.seq, label: item.schoolName };
                  })}
                  value={school}
                  values={selectedschoolSearch}
                  style={{
                    borderRadius: '16px',
                    border: '1px solid #f7931e',
                    padding: '0 10px',
                  }}
                  onChange={onChangeSchool}
                  placeholder='학교명 '
                  dropdownHeight='200px'
                />
              </StSchoolInfoWrap>

              <StSchoolInfoWrap>
                <Stlabel>학과 · 학부명</Stlabel>
                <StSelect
                  options={departmentSearch.map((item) => {
                    return { value: item.seq, label: item.mclass };
                  })}
                  value={department}
                  values={selectedOptions}
                  style={{
                    borderRadius: '16px',
                    border: '1px solid #f7931e',
                    padding: '0 10px',
                  }}
                  onChange={onChangeDepartment}
                  placeholder='학과 · 학부명 '
                  dropdownHeight='200px'
                />
              </StSchoolInfoWrap>

              <StSchoolInfoWrap>
                <Stlabel>입학년도</Stlabel>
                <StSelect
                  options={admissionSearch.map((item) => {
                    return { value: item.id, label: item.admission };
                  })}
                  value={admission}
                  values={selectedAdmission}
                  style={{
                    borderRadius: '16px',
                    border: '1px solid #f7931e',
                    padding: '0 10px',
                  }}
                  onChange={onChangeAdmission}
                  placeholder='입학년도 '
                  dropdownHeight='200px'
                />
              </StSchoolInfoWrap>
            </StSecondWrap>
          </StFisrtWrap>
          <Button
            type='submit'
            width='100%'
            isDisabled={isActive ? false : true}
            style={{ backgroundColor: '#f7931e' }}
            color='white'
          >
            <StButtonTitle>저장하기</StButtonTitle>
          </Button>
        </StSchoolInfoWraps>
      </StSchoolInfo>
    </StFormContainer>
  );
};

export default SchoolInfo;

const StFormContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
  display: flex;
  align-items: center;
`;

const StSchoolInfo = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StFormHeader = styled.div`
  width: 90%;
  height: 50px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const StSchoolInfoWraps = styled.form`
  width: 85%;
  height: 100%;
`;

const StFisrtWrap = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StSecondWrap = styled.div``

const StSchoolTitle = styled.p`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 80px;
  justify-content: center;
`;

const StSchoolInfoWrap = styled.div`
  box-sizing: border-box;
  padding: 0;
  border: none;
  align-items: left;
  margin-bottom: 40px;
  position: relative;
`;

const Stlabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
  display: block;
`;

const StSelect = styled(Select)`
  max-height: 20px;
  font-size: 14px;
`;

const StButtonTitle = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { __getDetailHelp, __getHelp, __postHelp } from '../../redux/modules/HelpSlice';
import { IoIosArrowBack } from 'react-icons/io';
import { GrImage } from 'react-icons/gr';
import Button from '../elements/Button';
import { __updateHelp } from '../../redux/modules/HelpSlice';
import { useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { MdCancel } from 'react-icons/md';

const HelpUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { helps } = useSelector((state) => state.helps);
  const { helpsfind } = useSelector((state) => state.helps);
  // const helpsfind = helps.find((help) => help.articleId === Number(id));

  // const [updateHelp, setUpdateHelp] = useState({
  //     title: "",
  //     content: "",
  //     imgUrl:""
  // });

  // const [title, content , imgUrl] = updateHelp

  // console.log("helps", helps , "helpsfind" , helpsfind)
  const [EditTitle, setEditTitle] = useState(helpsfind && helpsfind.title);
  const [EditContent, setEditContent] = useState(
    helpsfind && helpsfind.content
  );
  const [EditImg, setEditImg] = useState('');
  const [isOnActive, setIsOnActive] = useState(false);

  const onChangeTitle = (e) => {
    setEditTitle(e.target.value);
  };

  const onChangeContent = (e) => {
    setEditContent(e.target.value);
  };

  const onChangeImg = (e) => {
    setEditImg(e.target.value);
  };

  const handleCheck = (e) => {
    setIsOnActive(e);
  };

  useEffect(() => {
    if (EditTitle !== '' && EditContent !== '') {
      handleCheck(true);
    } else {
      handleCheck(false);
    }
  }, [EditTitle, EditContent]);

  const onUpdateHandler = async (e) => {
    e.preventDefault();
    const edithelpsfind = {
      ...helpsfind,
      id: id,
      title: EditTitle,
      content: EditContent,
      imgUrl: EditImg,
    };
    await dispatch(__updateHelp(edithelpsfind));
    await dispatch(__getDetailHelp(id));
    navigate(`/helpdetail/${id}`);
  };

  return (
    <StFormContainer>
      <StFormWrap onSubmit={onUpdateHandler}>
        <StFormHeader>
          <IoIosArrowBack
            size='25px'
            cursor='pointer'
            onClick={() => {
              navigate(`/helpdetail/${id}`);
            }}
          />
        </StFormHeader>
        <StFormBody>
          <StFormSelection name='category'>
            <option value=''>도움요청</option>
          </StFormSelection>
          <StFormInput
            name='title'
            value={EditTitle}
            onChange={onChangeTitle}
            placeholder='제목을 입력해주세요'
          ></StFormInput>
          <StCard>
            <StTextarea
              name='content'
              value={EditContent}
              onChange={onChangeContent}
              placeholder='내용을 입력해주세요'
            ></StTextarea>
          </StCard>
        </StFormBody>
        <StFormFooter>
          <StFooterBtn>
            <Button
              type='submit'
              backgroundColor='#F7931E'
              width='90%'
              height='40px'
              color='white'
              style={{
                display: 'block',
                margin: '15px auto',
                backgroundColor: '#F7931E',
              }}
              isDisabled={isOnActive ? false : true}
            >
              <StChangediv>수정하기</StChangediv>
            </Button>
          </StFooterBtn>
        </StFormFooter>
      </StFormWrap>
    </StFormContainer>
  );
};

export default HelpUpdate;

const StFormContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100%;
  background-color: #f7ede2;
  display: flex;
  justify-content: center;
  overflow: hidden;
  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
`;

const StFormWrap = styled.form`
  width: 100%;
  height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const StFormHeader = styled.div`
  width: 100%;
  padding-left: 15px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 40px 0px;
  @media only screen and (max-width: 768px) {
    margin: 0px 0px 20px 0px;
  }
`;

const StFormBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
`;

const StFormSelection = styled.select`
  border: none;
  margin-bottom: 25px;
  width: 75px;
  color: #f7931e;
  font-size: 14px;
  font-weight: 600;
`;

const StFormInput = styled.input`
  font-size: 20px;
  border: none;
  border-bottom: 1px solid #d9d9d9;
  padding: 10px 10px 10px 5px;
  font-weight: bold;
  color: black;
  margin-bottom: 10px;
  outline: none;
  ::placeholder {
    font-size: 20px;
    color: black;
    font-weight: 600;
  }
`;

const StTextarea = styled.textarea`
  width: 95%;
  /* height: 100%; */
  height:200px;
  border: none;
  padding: 10px 5px;
  outline: none;
  resize: none;
  ::placeholder {
    font-size: 16px;
    color: #aaa;
    font-weight: 400;
  }
`;

const StFormFooter = styled.div`
  display: flex;
  width: 100%;
`;

const StCard = styled.div`
  border: 1px solid #eee;
  border-radius: 16px;
  box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.05);
  padding: 5px;
  height: 300px;
`;

const StFooterBtn = styled.div`
  width: 100%;
  height: 100%;
  position: sticky;
  bottom:0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-top: 40px;
`;

const StChangediv = styled.div`
  font-weight: 500;
  font-size: 16px;
`;

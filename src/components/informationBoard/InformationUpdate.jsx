import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import {IoIosArrowBack} from 'react-icons/io'
import Button from '../elements/Button';
import { useSelector } from 'react-redux';
import { __getInformation, __updateInformation } from '../../redux/modules/InformationSlice';


const InformationUpdate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const {informations} = useSelector((state) => state.informations)
    const informationsfind = informations.find((info)=> info.articleId === Number(id))

    const [EditTitle, setEditTitle] = useState(informationsfind&&informationsfind.title)
    const [EditContent, setEditContent] = useState(informationsfind&&informationsfind.content)
    const [EditImg, setEditImg] = useState('');
    const [isOnActive, setIsOnActive] = useState(false);

    const onChangeTitle = (e) =>{
        setEditTitle(e.target.value)
    }

    const onChangeContent = (e) =>{
        setEditContent(e.target.value)
    }

    useEffect(() => {
        dispatch(__getInformation());
    }, [dispatch])

    const handleCheck = (e) => {
        setIsOnActive(e);
      };
    
      useEffect(() => {
        if (EditTitle !== '' && EditContent !== '') {
          handleCheck(true);
        } else {
          handleCheck(false);
        }
      },[EditTitle, EditContent])

    const onUpdateHandler = (e) => {
        e.preventDefault();
        setIsOnActive(false);
         const editinformationsfind = {
            ...informationsfind ,
            id: id,
            title: EditTitle,
            content: EditContent,
            imageList : EditImg
        }
        dispatch(__updateInformation(editinformationsfind))
        navigate(`/informationdetail/${id}`)
    } 

    

    return (
        <StFormContainer>
            <StFormWrap onSubmit={onUpdateHandler}>
                <StFormHeader>
                    <IoIosArrowBack size="25px" cursor="pointer" onClick={() => {navigate(`/informationdetail/${id}`)}}/>
                </StFormHeader>
                <StFormBody>
                    <StFormSelection name="category">
                        <option value="informationform">정보공유</option>
                    </StFormSelection>
                <StFormInput name="title" value={EditTitle} onChange={onChangeTitle} placeholder="제목을 입력해주세요"></StFormInput>
                <StCard>
                <StTextarea name="content" value={EditContent} onChange={onChangeContent} placeholder="내용을 입력해주세요"></StTextarea>
                </StCard>
                </StFormBody>
                <StFormFooter>
                    <StFooterBtn>
                        <Button type='submit' backgroundColor='#F7931E' width="90%" height="40px" color="white" style={{ display: "block", margin: "15px auto", backgroundColor:'#F7931E'}} isDisabled={isOnActive ? false : true}>
                            <StChangediv>수정하기</StChangediv>
                        </Button>
                    </StFooterBtn>

                    
                </StFormFooter>
            </StFormWrap>
        </StFormContainer>
       
    );
};

export default InformationUpdate;


const StFormContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100%;
  background-color: #f7ede2;
  display: flex;
  justify-content: center;
  overflow:hidden;
  
  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
`;

const StFormWrap = styled.form`
  width: 100%;
  height:100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  
`;
const StFormHeader = styled.div`
    width: 100%;
    padding-left:15px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 40px 0px;
`
const StFormBody = styled.div`
    display: flex;
    flex-direction: column;
    padding : 10px 20px;
`
const StFormSelection = styled.select`
    border: none;
    margin-bottom: 25px;
    width: 75px;
    color: #f7931e;
    font-size: 14px;
    font-weight: 600;
`
const StFormInput =styled.input`
    font-size: 20px;
    border: none;
    border-bottom:1px solid gray;
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
`
const StTextarea = styled.textarea`
    width: 100%;
    height:300px;
    resize:none;
    outline: none;
    border:none;
    padding: 10px 5px;
`

const StFormFooter = styled.div`
    display: flex;
    width:100%;

`
const StFooterBtn = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 5%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    /* margin-bottom: 50px;     */
    
`
const StCard = styled.div`
  border: 1px solid #eee;
  border-radius: 16px;
  box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.05);
  padding: 5px;
`;

const StChangediv = styled.div`
font-weight: 500;
font-size: 16px;
`
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import {IoIosArrowBack} from 'react-icons/io'
import {GrImage} from 'react-icons/gr'
import Button from '../elements/Button';
import { useSelector } from 'react-redux';
import { __getFreeTalk, __updateFreeTalk } from '../../redux/modules/FreeTalkSlice';


const FreeTalkUpdate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const {freetalks} = useSelector((state) => state.freetalks)
    const freetalksfind = freetalks.find((freetalk)=> freetalk.id === Number(id))

    // const [updateHelp, setUpdateHelp] = useState({
    //     title: "",
    //     content: "",
    //     imgUrl:""
    // });

    // const [title, content , imgUrl] = updateHelp

    // console.log("helps", helps , "helpsfind" , helpsfind)
    const [EditTitle, setEditTitle] = useState(freetalksfind&&freetalksfind.title)
    const [EditContent, setEditContent] = useState(freetalksfind&&freetalksfind.content)
    const [EditImg, setEditImg] = useState('')

    const onChangeTitle = (e) =>{
        setEditTitle(e.target.value)
    }


    
    const onChangeContent = (e) =>{
        setEditContent(e.target.value)
    }

    const onChangeImg = (e) =>{
        setEditImg(e.target.value)
    }

    useEffect(() => {
        dispatch(__getFreeTalk());
    }, [dispatch])

    const onUpdateHandler = async(e) => {
        e.preventDefault();
         const editfreetalksfind = {
            ...freetalksfind ,
            id: id,
            title: EditTitle,
            content: EditContent,
            imageList : EditImg
        }
        await dispatch(__updateFreeTalk(editfreetalksfind))
        await dispatch(__getFreeTalk());
        navigate(`/freetalkdetail/${id}`)
    } 

    

    return (
        <FormContainer>
            <FormWrap onSubmit={onUpdateHandler}>
                <FormHeader>
                    <IoIosArrowBack size="25px" cursor="pointer" onClick={() => {navigate(`/freetalkdetail/${id}`)}}/>
                </FormHeader>
                <FormBody>
                    <FormSelection name="category">
                        {/* <option value="">도움요청</option>
                        <option value="informationform">정보공유</option>
                        <option value="">만남일정</option> */}
                        <option value="">자유토크</option>
                    </FormSelection>
                <FormInput name="title" value={EditTitle} onChange={onChangeTitle} placeholder="제목을 입력해주세요"></FormInput>
                <Textarea name="content" value={EditContent} onChange={onChangeContent} placeholder="내용을 입력해주세요"></Textarea>
                </FormBody>
                <FormFooter>
                    <FooterBtn>
                        <Button type='submit' backgroundColor='#F7931E' width="90%" height="40px" color="white" style={{ display: "block", margin: "15px auto" }}>
                            <div style={{ fontWeight: "500", fontSize: "16px" }}>수정하기</div>
                        </Button>
                    </FooterBtn>
                    
                </FormFooter>
            </FormWrap>
        </FormContainer>
       
    );
};

export default FreeTalkUpdate;


const FormContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100%;
  background-color: #f7ede2;
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
`;

const FormWrap = styled.form`
  width: 500px;
  height:100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  
`;
const FormHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 80px;
    padding : 10px 20px;
`
const FormBody = styled.div`
    display: flex;
    flex-direction: column;
    padding : 10px 20px;
`
const FormSelection = styled.select`
    border: none;
    margin-bottom: 25px;
    width: 75px;
    color: #f7931e;
    font-size: 14px;
    font-weight: 600;
`
const FormInput =styled.input`
    font-size: 20px;
    border: none;
    border-bottom:1px solid gray;
    padding: 10px 10px 10px 5px;
    font-weight: bold;
    color: black;
`
const Textarea = styled.textarea`
    width: 100%;
    height:400px;
    border:none;
    padding: 10px 5px;
`

const FormFooter = styled.div`
    display: flex;
    width:100%;
    /* background-color: yellow; */
    border-top: 1px solid gray;

`
const Filelabel = styled.label`
    margin : 10px 20px;
    
`

const Addfile = styled.input`
    display: none;
`
const FooterBtn = styled.div`
        margin:0 auto;
        width:100%;
        
`
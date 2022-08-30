import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { __getHelp, __postHelp } from '../../redux/modules/HelpSlice';
import {IoIosArrowBack} from 'react-icons/io'
import {GrImage} from 'react-icons/gr'
import Button from '../elements/Button';

const HelpForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [help, setHelp] = useState({
        title: "",
        content: "",
        imageList: [
            { imgUrl: "" }
        ],
    });


    useEffect(() => {
        dispatch(__getHelp());
    }, [dispatch]);

    const { title, content, imgUrl } = help;
    console.log(help);

    const onChangeHandler = (e) => {
        const { value, name } = e.target;
        setHelp({
            ...help,
            [name]: value,
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (title === "") {
            return alert("제목을 입력해주세요");
        } else if (content === "") {
            return alert("내용을 입력해주세요");
        }
        dispatch(__postHelp(help));
    } 

    return (
        <FormContainer>
            <FormWrap onSubmit={onSubmitHandler}>
                <FormHeader>
                    <IoIosArrowBack size="25px" cursor="pointer" onClick={() => {navigate(-1)}}/>
                    <Button type="submit" backgroundColor="white">올리기</Button>
                </FormHeader>
                <FormBody>
                    <FormSelection name="category">
                        <option value="">도움요청</option>
                        <option value="informationform">정보공유</option>
                        <option value="">만남일정</option>
                        <option value="">자유토크</option>
                    </FormSelection>
                <FormInput name="title" value={title} onChange={onChangeHandler} placeholder="제목을 입력해주세요"></FormInput>
                <Textarea name="content" value={content} onChange={onChangeHandler} placeholder="내용을 입력해주세요"></Textarea>
                </FormBody>
                <FormFooter>
                    <Filelabel className="fileUpload-button" htmlFor="fileUpload">
                    <GrImage size="24px" />
                    </Filelabel>
                    <Addfile type="file" multiple={true} id="fileUpload" name="imgUrl" value={imgUrl || ""} onChange={onChangeHandler}>
                    </Addfile>
                    
                </FormFooter>
            </FormWrap>
        </FormContainer>
       
    );
};

export default HelpForm;


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
    border:none;
    margin-bottom: 25px;
    width:75px;
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
    height:63vh;
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
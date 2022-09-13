import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { __getHelp, __postHelp } from '../../redux/modules/HelpSlice';
import { IoIosArrowBack } from 'react-icons/io'
import { GrImage } from 'react-icons/gr'
import Button from '../elements/Button';
import { __updateHelp } from '../../redux/modules/HelpSlice';
import { useSelector } from 'react-redux';
import { useDropzone } from "react-dropzone";
import { MdCancel } from 'react-icons/md';

const HelpUpdate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { helps } = useSelector((state) => state.helps)
    const helpsfind = helps.find((help) => help.articleId === Number(id))


    // const [updateHelp, setUpdateHelp] = useState({
    //     title: "",
    //     content: "",
    //     imgUrl:""
    // });

    // const [title, content , imgUrl] = updateHelp

    // console.log("helps", helps , "helpsfind" , helpsfind)
    const [EditTitle, setEditTitle] = useState(helpsfind && helpsfind.title)
    const [EditContent, setEditContent] = useState(helpsfind && helpsfind.content)
    const [EditImg, setEditImg] = useState("")
    const [isOnActive, setIsOnActive] = useState(false);


    const onChangeTitle = (e) => {
        setEditTitle(e.target.value)
    }


    const onChangeContent = (e) => {
        setEditContent(e.target.value)
    }

    const onChangeImg = (e) => {
        setEditImg(e.target.value)
    }

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

    const onUpdateHandler = async (e) => {
        e.preventDefault();
        const edithelpsfind = {
            ...helpsfind,
            id: id,
            title: EditTitle,
            content: EditContent,
            imgUrl: EditImg
        }
        await dispatch(__updateHelp(edithelpsfind))
        await dispatch(__getHelp());
        navigate(`/helpdetail/${id}`)
    }



    return (
        <FormContainer>
            <FormWrap onSubmit={onUpdateHandler}>
                <FormHeader>
                    <IoIosArrowBack size="25px" cursor="pointer" onClick={() => { navigate(`/helpdetail/${id}`) }} />
                </FormHeader>
                <FormBody>
                    <FormSelection name="category">
                        <option value="">도움요청</option>
                        {/* <option value="informationform">정보공유</option>
                        <option value="">만남일정</option>
                        <option value="">자유토크</option> */}
                    </FormSelection>
                    <FormInput name="title" value={EditTitle} onChange={onChangeTitle} placeholder="제목을 입력해주세요"></FormInput>
                    <StCard>
                    <Textarea name="content" value={EditContent} onChange={onChangeContent} placeholder="내용을 입력해주세요"></Textarea>
                    </StCard>
                </FormBody>
                <FormFooter>
                    
                    <FooterBtn>
                        <Button type='submit' backgroundColor='#F7931E' width="90%" height="40px" color="white" style={{ display: "block", margin: "15px auto" ,backgroundColor:'#F7931E'}} isDisabled={isOnActive ? false : true}>
                            <div style={{ fontWeight: "500", fontSize: "16px" }}>수정하기</div>
                        </Button>
                    </FooterBtn>

                </FormFooter>
            </FormWrap>
        </FormContainer>

    );
};

export default HelpUpdate;


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
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 40px 0px;
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
const FormInput = styled.input`
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
const Textarea = styled.textarea`
    width: 100%;
    height:400px;
    border:none;
    padding: 10px 5px;
`

const FormFooter = styled.div`
    display: flex;
    width:100%;
`
const StCard = styled.div`
  border: 1px solid #eee;
  border-radius: 16px;
  box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.05);
  padding: 5px;
`;

const FooterContain = styled.div`
        width: 100%;
        `;

const Imgadd = styled(GrImage)`
        opacity: 0.3;
        `;

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
const CancelBtn = styled(MdCancel)`
        position:absolute;
        right:0;

        `
const CalendarWrap = styled.div`
  display: flex;
  justify-content: right;
  /* padding-right: 10px; */
`
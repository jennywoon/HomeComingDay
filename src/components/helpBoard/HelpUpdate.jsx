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



    const onChangeTitle = (e) => {
        setEditTitle(e.target.value)
    }



    const onChangeContent = (e) => {
        setEditContent(e.target.value)
    }

    const onChangeImg = (e) => {
        setEditImg(e.target.value)
    }


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
                    <Textarea name="content" value={EditContent} onChange={onChangeContent} placeholder="내용을 입력해주세요"></Textarea>
                </FormBody>
                <FormFooter>
                    {/* <Filelabel className="fileUpload-button" htmlFor="fileUpload">
                        <GrImage size="24px" />
                    </Filelabel>
                    <Addfile type="file" multiple={true} id="fileUpload" name="imgUrl" value={EditImg || ""} onChange={onChangeImg}>
                    </Addfile> */}
                    


            {/* <FooterContain>
              <>
                <GetRootProps {...getRootProps({ className: "dropzone" })}>
                  <input
                    {...getInputProps()}
                  />
                  <StImaBox>
                    <StImgUpload>
                      <Imgadd size='24px' />
                      <Imgtxt>이미지 첨부</Imgtxt>
                      
                    </StImgUpload>
                  </StImaBox>
                </GetRootProps>
                <StImgContainer>
                  {files.length !== 0 &&
                    files.map((file, i) => (
                      // console.log("file!!!!!!!", file)
                      <div key={i} style={{ display: "flex" }}>
                        <div
                          style={{
                            width: "120px",
                            height: "110px",
                            overflow: "hidden",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative"
                          }}
                        >
                          <img
                            src={file.preview}
                            style={{
                              width: "100px",
                              height: "100px",
                              backgroundSize: "cover",
                              justifyContent: "center",
                              objectFit: "cover",
                              borderRadius: "16px",

                            }}
                        
                          />
                          <CancelBtn onClick={() => deleteImage(i)} size="20px" style={{ color: "#F7931E", position: "absolute", right: "5px", top: "0px", cursor: "pointer" }} />
                        </div>
                      </div>
                    ))}
                </StImgContainer>
              </>
            
          </FooterContain> */}

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
const FormInput = styled.input`
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
     width: 100%;
        height: 100%;
        border-top: 1px solid gray;
        align-items: center;
`

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

//Dropzone추가
const GetRootProps = styled.div`
        /* width: 100%;
        height: 300px;
        display: flex;
        justify-content: center; */
        `;

const StImaBox = styled.div`
        display: flex;
        width:100%;
        height: 36px;
        margin:10px;
        cursor: pointer;
        `

const StImgUpload = styled.div`
        display: flex;
        width:111px;
        height: 100%;
        justify-content: center;
        flex-direction: row;
        align-items: center;
        position: relative;
        padding: 0.5rem;
        border:1px solid #e3e3e3;
        border-radius: 20px;
        `;

const StImgContainer = styled.div`
        display: flex;
        width: 100%;
        height: 100px;
        box-sizing: border-box;
        background: #fff;
        scrollbar-width: none;
        `;
const Imgtxt = styled.div`
        width:80px;
        text-align: center;
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
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { __getHelp, __postHelp } from '../../redux/modules/HelpSlice';
import { __postFreeTalk } from '../../redux/modules/FreeTalkSlice';
import { __postInformation } from '../../redux/modules/InformationSlice';
import { __getCalendar, __postCalendar } from '../../redux/modules/CalendarSlice';
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import {GrImage} from 'react-icons/gr'
import Button from '../elements/Button';
import CalendarModal from '../calendarBoard/CalendarModal';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';

const HelpForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [help, setHelp] = useState({
        title: "",
        content: "",
        // imageList: [
        //     { imgUrl: "" }
        // ],
        imgUrl : ""
    }); 

    const [info, setInfo] = useState({
        infotitle: "",
        infocontent: "",
        // infoimageList: [
        //     { imgUrl: "" }
        // ],
        infoimageUrl:""
    });

    const [freetalk, setFreetalk] = useState({
        freetitle: "",
        freecontent: "",
        // freeimageList: [
        //     { imgUrl: "" }
        // ],
        freeimageUrl : ""
    });

    const [calendar, setCalendar] = useState({
        calendartitle: "",
        calendarlocation: "",
        calendarcontent: "",
    })

    const [select , setSelect] = useState("help")


    useEffect(() => {
        dispatch(__getHelp());
    }, [dispatch]);

    useEffect(() => {
        dispatch(__getCalendar());
    }, [dispatch])


    const { title, content, imgUrl } = help;
    const { infotitle, infocontent, infoimageUrl } = info;
    const { freetitle, freecontent, freeimageUrl } = freetalk;
    const { calendartitle, calendarlocation, calendarcontent } = calendar;

    // console.log("help", title.length , "info" , info.length , "free" , freetalk.length)

    const onChangeHandler = (e) => {
        const { value, name } = e.target;
        setHelp({
            ...help,
            [name]: value,
        })
    }

    const infoonChangeHandler = (e) => {
        const { value, name } = e.target;
        setInfo({
            ...info,
            [name]: value,
        })
    }

    const freeonChangeHandler = (e) => {
        const { value, name } = e.target;
        setFreetalk({
            ...freetalk,
            [name]: value,
        })
    }

    const calendaronChangeHandler = (e) => {
        const {value, name} = e.target;
        setCalendar({
            ...calendar,
            [name]: value,
        })
    }

    const handleSelect = (e) =>{
        setSelect(e.target.value)
    }


    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (title.length && infotitle.length && freetitle.length && calendartitle.length === 0) {
            return alert("제목을 입력해주세요");
        } else if (content.length && infocontent.length && freecontent.length && calendarcontent.length === 0) {
            return alert("내용을 입력해주세요");
        }

        // if (title && infotitle && freetitle && calendartitle === "") {
        //     return alert("제목을 입력해주세요");
        // } else if (content && infocontent && freecontent && calendarcontent === "") {
        //     return alert("내용을 입력해주세요");
        // }

        if (select === "help"){
            dispatch(__postHelp(help));
            setHelp({
            title: "",
            content: "",
            imgUrl : ""});
        }else if(select === "info"){
            dispatch(__postInformation(info));
            setInfo({
            infotitle: "",
            infocontent: "",
            infoimageUrl:""
            });
        }else if(select ==="freetalk"){
            dispatch(__postFreeTalk(freetalk));
            setFreetalk({
            freetitle: "",
            freecontent: "",
            freeimageUrl : ""
            })
        }else if(select ==="meet"){
            dispatch(__postCalendar(calendar));
            setFreetalk({
                calendartitle: "",
                calendarlocation: "",
                calendarcontent : ""
            })
        }
        navigate("/main")
    }

    // 모달 구현
    const [modalOpen, setModalOpen] = useState(false);

    const showModal = (e) => {
        e.preventDefault();
        setModalOpen(true);
    }

    const [value, onChange] = useState(['10:00', '11:00']);
    //

    // useEffect(()=>{
    //     setHelp({
    //         title: "",
    //         content: "",
    //         imgUrl : ""
    //     }),
    //     setInfo({
    //         infotitle: "",
    //         infocontent: "",
    //         infoimageUrl:""
    //     }),
    //     setFreetalk({
    //         freetitle: "",
    //         freecontent: "",
    //         freeimageUrl : ""
    //     })
    // },[handleSelect])

    return (
        <FormContainer>
             
            <FormWrap onSubmit={onSubmitHandler}>
                <FormHeader>
                    <IoIosArrowBack size="25px" cursor="pointer" onClick={() => navigate("/main")}/>
                    <Button type="submit" backgroundColor="white" >올리기</Button>
                </FormHeader>
                <FormBody>
                    <FormSelection name="category" onChange={handleSelect}>
                        <option value="help">도움요청</option>
                        <option value="info">정보공유</option>
                        <option value="meet">만남일정</option>
                        <option value="freetalk">자유토크</option>
                    </FormSelection>
                
                {(select === "help")? 
                    <>
                    <FormInput name="title" value={title} onChange={onChangeHandler} placeholder="제목을 입력해주세요"></FormInput>
                    <Textarea name="content" value={content} onChange={onChangeHandler} placeholder="내용을 입력해주세요"></Textarea>
                    </>
                 : 
                 (select === "info")?
                 <>
                    <FormInput name="infotitle" value={infotitle} onChange={infoonChangeHandler} placeholder="제목을 입력해주세요"></FormInput>
                    <Textarea name="infocontent" value={infocontent} onChange={infoonChangeHandler} placeholder="내용을 입력해주세요"></Textarea>
                 </>
                 : 
                 (select === "meet")?
                 <>
                 {modalOpen && <CalendarModal setModalOpen={setModalOpen}/>}
                    {/* 만남일정 게시판 get, post 구현 안되어서 구현되면 input name,value 줄 예정 */}
                    {/* <FormInput name="infotitle" value={infotitle} onChange={infoonChangeHandler} placeholder="제목을 입력해주세요"></FormInput> */}
                    <FormInput name="calendartitle" value={calendartitle} onChange={calendaronChangeHandler} placeholder="제목을 입력해주세요"></FormInput>
                    <CalendarButton onClick={showModal}>
                            <CalendarTitle>날짜</CalendarTitle>
                            <IoIosArrowForward />
                            {/* <DateDiv></DateDiv> */}
                        </CalendarButton>
                        <TimeDiv>
                            <CalendarTitle>시간</CalendarTitle>
                            {/* <IoIosArrowForward /> */}
                            <TimeRangePicker
                            onChange={onChange}
                            value={value}
                        />
                        </TimeDiv>
                        <CalendarDiv>
                            <CalendarTitle>장소</CalendarTitle>
                            <CalendarInput name="calendarlocation" value={calendarlocation} onChange={calendaronChangeHandler} placeholder="내용을 입력해주세요"></CalendarInput>
                        </CalendarDiv>
                        <CalendarDiv>
                            <CalendarTitle>내용</CalendarTitle>
                            <CalendarInput name="calendarcontent" value={calendarcontent} onChange={calendaronChangeHandler} placeholder="내용을 입력해주세요"></CalendarInput>
                        </CalendarDiv>
                 </>
                 : 
                 (select === "freetalk")?
                 <>
                    <FormInput name="freetitle" value={freetitle} onChange={freeonChangeHandler} placeholder="제목을 입력해주세요"></FormInput>
                    <Textarea name="freecontent" value={freecontent} onChange={freeonChangeHandler} placeholder="내용을 입력해주세요"></Textarea>
                 </>
                 :null
                 } 

                </FormBody>
                <FormFooter>
                    <Filelabel className="fileUpload-button" htmlFor="fileUpload">
                    <GrImage size="24px" />
                    </Filelabel>
                    {(select === "help")? 
                    <>
                    <Addfile type="file" multiple={true} id="fileUpload" name="imgUrl" value={imgUrl || ""} onChange={onChangeHandler} />
                    <div style={{fontSize : "12px"}}>이미지 파일: {imgUrl}</div>
                    </>
                    :
                    (select === "info")? 
                    <>
                    <Addfile type="file" multiple={true} id="fileUpload" name="infoimageUrl" value={infoimageUrl || ""} onChange={infoonChangeHandler} />
                    <div style={{fontSize : "12px"}}>이미지 파일: {infoimageUrl}</div>
                    </>
                    :
                    (select === "meet")? 
                    <>
                    {/* <Addfile type="file" multiple={true} id="fileUpload" name="infoimageUrl" value={infoimageUrl || ""} onChange={infoonChangeHandler} />
                    <div style={{fontSize : "12px"}}>이미지 파일: {infoimageUrl}</div> */}
                    </>
                    :
                    (select === "freetalk")?
                    <>
                    <Addfile type="file" multiple={true} id="fileUpload" name="freeimageUrl" value={freeimageUrl || ""} onChange={freeonChangeHandler} />
                    <div style={{fontSize : "12px"}}>이미지 파일: {freeimageUrl}</div>
                    </>
                    : null
                    }
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
    align-items: center;

`
const Filelabel = styled.label`
    margin : 10px 20px;
    
`

const Addfile = styled.input`
    display: none;
`

const CalendarButton = styled.button`
    height: 40px;
    margin-top: 10px;
    border-radius: 10px;
    border: 1px solid #9b9999;
    background-color: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    cursor: pointer;
`

const TimeDiv = styled.div`
    height: 40px;
    margin-top: 10px;
    border-radius: 10px;
    border: 1px solid #9b9999;
    background-color: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    /* cursor: pointer; */
`
const CalendarTitle = styled.div`
    font-size: 14px;
`

const DateDiv = styled.div`
    width: 65%;
    height: 30px;
    border: 1px solid red;
`
const CalendarDiv = styled.div`
    height: 40px;
    margin-top: 10px;
    border-radius: 10px;
    border: 1px solid #9b9999;
    background-color: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
`
const CalendarInput = styled.input`
    width: 65%;
    height: 30px;
    /* margin-top: 10px; */
    border-radius: 10px;
    border: none;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    ::-webkit-input-placeholder{text-align:right}
    padding: 0 10px;
    /* outline: none; */
`
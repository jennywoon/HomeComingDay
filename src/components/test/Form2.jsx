import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom"
import { __getHelp, __postHelp } from '../../redux/modules/HelpSlice';
import { __postFreeTalk } from '../../redux/modules/FreeTalkSlice';
import { __postInformation } from '../../redux/modules/InformationSlice';
import { __getCalendar, __postCalendar } from '../../redux/modules/CalendarSlice';
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import {TiDelete} from 'react-icons/ti'
import {GrImage} from 'react-icons/gr'
import Button from '../elements/Button';
import CalendarModal from '../calendarBoard/CalendarModal';
import { __getDate } from '../../redux/modules/DateSlice';
// import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import moment from 'moment';
import { TimePicker } from 'antd';
// import 'antd/dist/antd.css';
import '../calendarBoard/TimePicker.css';


const Form2 = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [help, setHelp] = useState({
        title: "",
        content: "",
        imgUrl : ""
    }); 

    const [info, setInfo] = useState({
        infotitle: "",
        infocontent: "",
        infoimageUrl:""
    });

    const [freetalk, setFreetalk] = useState({
        freetitle: "",
        freecontent: "",
        freeimageUrl : ""
    });

    const [calendar, setCalendar] = useState({
        calendartitle: "",
        calendartime:"",
        calendarlocation: "",
        calendarcontent: "",
    })

    const [select , setSelect] = useState("help")


    //이미지관련 함수
    const [selectedImage , setSelectedImage] = useState([]);

    //이미지프리뷰 추가
    const addImage = (e) =>{
        const nowSelectImageList = e.target.files;
        const nowImageURLList = [...selectedImage];
        for (let i = 0; i < nowSelectImageList.length; i+=1){
            const nowImageUrl = URL.createObjectURL(nowSelectImageList[i]);
            // const nowImageobject = {imgUrl : nowImageUrl}
            nowImageURLList.push(nowImageUrl)
        }
        setSelectedImage(nowImageURLList)
    }
    //이미지프리뷰삭제
    const deleteImage = (id) =>{
        // console.log(id)
        // console.log(selectedImage)
        setSelectedImage(selectedImage.filter((_,index)=>index !== id))
        }
        


        // selectedImage.filter((img,id)=>{
        //     URL.revokeObjectURL(img);
        // })
        // setSelectedImage([])

    

    // console.log(selectedImage)

    useEffect(() => {
        dispatch(__getHelp());
    }, [dispatch]);

    useEffect(() => {
        dispatch(__getCalendar());
    }, [dispatch])

    useEffect(() => {
        dispatch(__getDate());
    },[dispatch])

    const { title, content, imgUrl } = help;
    const { infotitle, infocontent, infoimageUrl } = info;
    const { freetitle, freecontent, freeimageUrl } = freetalk;
    const { calendartitle,calendartime, calendarlocation, calendarcontent} = calendar;

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
            const newhelp = {
                title : title,
                content:content,
                imageList:selectedImage
            }
            dispatch(__postHelp(newhelp));

            // setHelp({
            // title: "",
            // content: "",
            // imgUrl : ""});
            navigate("/")
        }else if(select === "info"){
            const newinfo = {
                title : infotitle,
                content : infocontent,
                imageList : selectedImage
            }
            dispatch(__postInformation(newinfo));
            // setInfo({
            // infotitle: "",
            // infocontent: "",
            // infoimageUrl:""
            // });
            navigate("/information")
        }else if(select ==="freetalk"){
            const newfreetalk = {
                title : freetitle,
                content : freecontent,
                imageList : selectedImage
            }
            dispatch(__postFreeTalk(newfreetalk));
            // setFreetalk({
            // freetitle: "",
            // freecontent: "",
            // freeimageUrl : ""
            // })
            navigate("/freetalk")
        }else if(select ==="meet"){
            dispatch(__postCalendar(calendar));
            // setFreetalk({
            //     calendartitle: "",
            //     calendarlocation: "",
            //     calendarcontent : "",
            //     getLastArrItem: ""
            // })
            navigate("/calendar")
        }
    }

    // 모달 구현
    const [modalOpen, setModalOpen] = useState(false);

    const showModal = (e) => {
        e.preventDefault();
        setModalOpen(true);
    }

    // calendar 시간
    const [value, onChange] = useState(['10:00', '11:00']);
    const showSecond = true;
const str = showSecond ? 'HH:mm:ss' : 'HH:mm';
    
    const getArrItem = useSelector((state) => state.dates.dates)
    // console.log(getArrItem[0].calendarDate)
    console.log(getArrItem)
    // const getLastArrItem = getArrItem[0].calendarDate

    const getLastArrItem = getArrItem[getArrItem.length-1];  

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
            <IoIosArrowBack
              size='25px'
              cursor='pointer'
              onClick={() => navigate('/')}
            />
            <Button type='submit' backgroundColor='white'>
              올리기
            </Button>
          </FormHeader>
          <FormBody>
            <FormSelection name='category' onChange={handleSelect}>
              <option value='help'>도움요청</option>
              <option value='info'>정보공유</option>
              <option value='meet'>만남일정</option>
              <option value='freetalk'>자유토크</option>
            </FormSelection>

            {select === 'help' ? (
              <>
                <FormInput
                  name='title'
                  value={title}
                  onChange={onChangeHandler}
                  placeholder='제목을 입력해주세요'
                ></FormInput>
                <Textarea
                  name='content'
                  value={content}
                  onChange={onChangeHandler}
                  placeholder='내용을 입력해주세요'
                ></Textarea>
              </>
            ) : select === 'info' ? (
              <>
                <FormInput
                  name='infotitle'
                  value={infotitle}
                  onChange={infoonChangeHandler}
                  placeholder='제목을 입력해주세요'
                ></FormInput>
                <Textarea
                  name='infocontent'
                  value={infocontent}
                  onChange={infoonChangeHandler}
                  placeholder='내용을 입력해주세요'
                ></Textarea>
              </>
            ) : select === 'meet' ? (
              <>
                {modalOpen && <CalendarModal setModalOpen={setModalOpen} />}
                {/* 만남일정 게시판 get, post 구현 안되어서 구현되면 input name,value 줄 예정 */}
                {/* <FormInput name="infotitle" value={infotitle} onChange={infoonChangeHandler} placeholder="제목을 입력해주세요"></FormInput> */}
                <FormInput
                  name='calendartitle'
                  value={calendartitle}
                  onChange={calendaronChangeHandler}
                  placeholder='제목을 입력해주세요'
                ></FormInput>
                <CalendarButton onClick={showModal}>
                  <CalendarTitle>날짜</CalendarTitle>
                  <DateDiv>
                    {getLastArrItem &&
                      moment(getLastArrItem.calendarDate).format(
                        'YYYY년 MM월 DD일'
                      )}
                  </DateDiv>
                  <IoIosArrowForward />
                </CalendarButton>
                <TimeDiv>
                  <CalendarTitle>시간</CalendarTitle>
                  <StTimePicker use12Hours format='h:mm a' onChange={onchange} placeholder='시간을 선택해주세요' />
                  {/* <IoIosArrowForward /> */}
                </TimeDiv>
                <CalendarDiv>
                  <CalendarTitle>장소</CalendarTitle>
                  <CalendarInput
                    name='calendarlocation'
                    value={calendarlocation}
                    onChange={calendaronChangeHandler}
                    placeholder='장소를 입력해주세요'
                  ></CalendarInput>
                </CalendarDiv>
                <CalendarDiv>
                  <CalendarTitle>내용</CalendarTitle>
                  <CalendarInput
                    name='calendarcontent'
                    value={calendarcontent}
                    onChange={calendaronChangeHandler}
                    placeholder='내용을 입력해주세요'
                  ></CalendarInput>
                </CalendarDiv>
              </>
            ) : select === 'freetalk' ? (
              <>
                <FormInput
                  name='freetitle'
                  value={freetitle}
                  onChange={freeonChangeHandler}
                  placeholder='제목을 입력해주세요'
                ></FormInput>
                <Textarea
                  name='freecontent'
                  value={freecontent}
                  onChange={freeonChangeHandler}
                  placeholder='내용을 입력해주세요'
                ></Textarea>
              </>
            ) : null}
          </FormBody>
          <FormFooter>
            <FooterContain>
              {select === 'help' ||
              select === 'info' ||
              select === 'freetalk' ? (
                <>
                  <Filelabel
                    className='fileUpload-button'
                    htmlFor='fileUpload'
                    onChange={addImage}
                  >
                    <Imgadd size='24px' />
                    <Addfile
                      type='file'
                      multiple='multiple'
                      id='fileUpload'
                      accept='.jpg,.jpeg,.png'
                    />
                    <div style={{ fontSize: '12px', marginLeft: '10px' }}>
                      이미지 첨부
                    </div>
                  </Filelabel>

                  {selectedImage.map((image, id) => (
                    <ImgContainer key={id}>
                      <ImgContent src={image} alt={`${image}-${id}`} />
                      <DeleteButton
                        size='25px'
                        onClick={() => deleteImage(id)}
                      />
                    </ImgContainer>
                  ))}
                </>
              ) : null}
            </FooterContain>
          </FormFooter>
        </FormWrap>
      </FormContainer>
    );
};

export default Form2;


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
    height:40vh;
    border:none;
    padding: 10px 5px;
`

const FormFooter = styled.div`
    
    width:100%;
    /* background-color: yellow; */
    border-top: 1px solid gray;
    align-items: center;
`

const FooterContain = styled.div`

`

const Imgadd = styled(GrImage)`
    opacity: 0.3;
`

const Filelabel = styled.label`
    /* margin : 10px 20px; */
    display: flex;
    align-items:center;
    justify-content: center;
    width:120px;
    height:50px;
    border:1px solid #eee;
    border-radius: 20px;
    margin:15px;
    
`

const Addfile = styled.input`
    display: none;
`
const ImgContainer = styled.label`
    display: "flex";
    align-items: center;
    margin:20px 10px;
    position:relative;
`

const ImgContent = styled.img`
    width:100px;
    height:100px;
    position:relative;
    
`
const DeleteButton = styled(TiDelete)`
    position: absolute;
    /* size:50px; */
    right:1px;
    color:white;
    cursor:pointer;
`

// const DateDiv = styled.div``

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
    /* border: 1px solid red; */
    display: flex;
    justify-content: right;
    align-items: center;
    font-size: 14px;
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

const StTimePicker = styled(TimePicker)`
  width: 160px;
  justify-content: space-between;
  border:none;
  color:orange;
  input::placeholder {
  color: gray;
}
`
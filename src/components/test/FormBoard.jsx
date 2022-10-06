import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate,useLocation } from 'react-router-dom';
import styled from 'styled-components';
import DaumPostcode from 'react-daum-postcode';
import Calendar from 'react-calendar';
import Button from '../elements/Button';
import moment from 'moment';
import '../calendarBoard/CalendarModal.css';
import ImgUploadNumberModal from './ImgUploadNumberModal';
import ImgUploadTypeModal from './ImgUploadTypeModal';
import ImgUploadSizeModal from './ImgUploadSizeModal';
import imageCompression from 'browser-image-compression';
// 모듈
import { __getHelp, __postHelp } from '../../redux/modules/HelpSlice';
import { __postFreeTalk } from '../../redux/modules/FreeTalkSlice';
import { __postInformation } from '../../redux/modules/InformationSlice';
import { __postCalendar } from '../../redux/modules/CalendarSlice';
// 이미지 아이콘
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { AiOutlinePlusCircle,AiOutlineMinusCircle  } from 'react-icons/ai';
import { MdCancel } from 'react-icons/md';
import { GrImage } from 'react-icons/gr';


const Form2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {state} = useLocation();

  useEffect(() => {
    dispatch(__getHelp());
  }, [dispatch]);


  //타이틀,컨텐츠
  const [help, setHelp] = useState({
    title: '',
    content: '',
  });

  const [info, setInfo] = useState({
    infotitle: '',
    infocontent: '',
  });

  const [freetalk, setFreetalk] = useState({
    freetitle: '',
    freecontent: '',
  });

  const { title, content} = help;
  const { infotitle, infocontent} = info;
  const { freetitle, freecontent} = freetalk;

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setHelp({
      ...help,
      [name]: value,
    });
  };

  const infoonChangeHandler = (e) => {
    const { value, name } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const freeonChangeHandler = (e) => {
    const { value, name } = e.target;
    setFreetalk({
      ...freetalk,
      [name]: value,
    });
  };


  //카테고리 선택
  const [select, setSelect] = useState('help');

  useEffect(()=>{
  if(state == 'help'){
    setSelect('help')
  }else if(state == 'information'){
    setSelect('information')
  }else if(state == 'meet'){
    setSelect('meet')
  }else{
    setSelect('freetalk')
  }
},[])
  
  const handleSelect = (e) => {
      setSelect(e.target.value)
    };


  //참여하기 인원
  const [joinNumber , setJoinNumber] = useState(1);

  const joinMinusHandle =()=>{
    if(joinNumber > 1){
    setJoinNumber(joinNumber -1)
  }
  }
  const joinPlusHandle =()=>{
    if(joinNumber < 50)
    setJoinNumber(joinNumber +1)
  }


  //이미지 리사이징 && 프리뷰
  const [files, setFiles] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);
  const IMAGETYPE = [
    "png", "jpg", "jpeg","heic","heif","gif"
  ];
  const [imageNumberAlert, setImageNumberAlert] = useState(false);
  const [imageTypeAlert, setImageTypeAlert] = useState(false);
  const [imageSizeAlert, setImageSizeAlert] = useState(false);

  
  const handleAddImages = async (e) => {
    if (files.length + e.target.files.length > 3) {return setImageNumberAlert(true);}
    
    [...e.target.files].map(async (file) => {
      if (
        !IMAGETYPE.includes(
          file.name.split(".")[file.name.split(".").length - 1].toLowerCase()))return setImageTypeAlert(true);
        
      if (file.size > 10000000) return setImageSizeAlert(true);
      
      const options = {
        maxSizeMB: 10,
        maxWidthOrHeight: 3000,
        useWebWorker: true,
      };
      try {
        
        const compressedFile = await imageCompression(file, options);
        setFiles((files) => [...files, compressedFile]);
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onload = () => {
          const previewImgUrl = reader.result;
          setPreviewImg((previewImg) => [...previewImg, previewImgUrl]);
        };
      } catch (error) {
        alert("이미지를 불러올 수 없습니다");
      }
    });
  };
  //이미지프리뷰삭제
  const deleteImage = (id) => {
    setPreviewImg(previewImg.filter((_, index) => index !== id));
    setFiles(files.filter((_, index) => index !== id));
  };


  // 날짜
  const [calendar, setCalendar] = useState({
    calendartitle: '',
    calendarDate: null,
    calendarcontent: '',
  });

  const {
    calendartitle,
    calendarDate,
    calendarcontent,
  } = calendar;

  const [reactCalendar, setReactCalendar] = useState('');
  const onChangeCalendar = (e) => {
    setReactCalendar(e.target.value);
  };

  const [date, setDate] = useState({
    calendarDate: null,
  });
  const onChange = (value) => setDate(value);
  const realCalendar = moment(date.toString()).format('YYYY년 MM월 DD일 dddd');
  const dates = { calendarDate: realCalendar };

  const calendaronChangeHandler = (e) => {
    const { value, name } = e.target;
    setCalendar({
      ...calendar,
      [name]: value,
    });
  };


  // 시간
  const [dateShow, setDateShow] = useState(true);
  const [timeShow, setTimeShow] = useState(false);
  const [selectTime, setSelectTime] = useState("오전");
  const [selectHour, setSelectHour] = useState("01");
  const [selectMinute, setSelectMinute] = useState("00");

  const division = ["오전", "오후"];
  const hourSelect = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const minuteSelect = ["00", "10", "20", "30", "40", "50"];
  const hour = String(
    Number(selectHour) + Number(selectTime === "오후" ? 12 : 0)
  ).padStart(2, "0");


  const timeShowBtn = () => {
    setDateShow(false);
    setTimeShow(!timeShow);
  };

  const closeTimeShowBtn = () => {
    setTimeShow(!timeShow);
  }
  

  // 장소
  const [openPostcode, setOpenPostcode] = useState(false);
  const [calendarlocation, setCalendarLocation] = useState("")
  const locations = { calendarLocation: calendarlocation }

  
  const handle = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode(current => !current);
    },

    // 주소 선택 이벤트
    selectAddress: (data) => {
      setCalendarLocation(data.address);
      setOpenPostcode(false);
    },
  }
  const formdata = new FormData();


  // 게시글 등록
  const [isOnActive, setIsOnActive] = useState(false);

  const onSubmitHandler = async(e) => {

    // 등록시 조건
    e.preventDefault();
    setIsOnActive(e);
    if (
      title.length &&
      infotitle.length &&
      freetitle.length &&
      calendartitle.length === 0
    ) {
      return alert('제목을 입력해주세요');
    } else if (
      content.length &&
      infocontent.length &&
      freecontent.length &&
      calendarcontent.length === 0
    ) {
      return alert('내용을 입력해주세요');
    }


    // Formdata로 변경하여 등록
    // 도움요청
    if (select === 'help') {
      const newhelp = {
        title: title,
        content: content,
      };
    
      files.map((image) => {
        formdata.append('files', image);
      });
     
      formdata.append(
        'articleRequestDto',
        new Blob([JSON.stringify(newhelp)], { type: 'application/json' })
      );
  
      dispatch(__postHelp(formdata));
      navigate('/main');

      // 정보공유
    } else if (select === 'information') {
      const newinfo = {
        title: infotitle,
        content: infocontent,
      };
      files.map((image) => {
        formdata.append('files', image);
      });
      formdata.append(
        'articleRequestDto',
        new Blob([JSON.stringify(newinfo)], { type: 'application/json' })
      );
      dispatch(__postInformation(formdata));
      navigate('/information');

      // 자유토크
    } else if (select === 'freetalk') {
      const newfreetalk = {
        title: freetitle,
        content: freecontent,
      };
      files.map((image) => {
        formdata.append('files', image);
      });
      formdata.append(
        'articleRequestDto',
        new Blob([JSON.stringify(newfreetalk)], { type: 'application/json' })
      );

      dispatch(__postFreeTalk(formdata));
      navigate('/freetalk');

      // 만남일정
    } else if (select === 'meet') {

      const now = new Date()
      const defaultValue = moment(now.toString()).format('YYYY년 MM월 DD일 dddd')

      const newcalendar = {
        title: calendartitle,
        calendarTime: hour + ":" + selectMinute,
        calendarLocation: calendarlocation,
        content: calendarcontent,
        calendarDate: realCalendar,
        maxPeople : joinNumber
      };
      
      if (newcalendar.calendarDate === "Invalid date") {
        newcalendar.calendarDate = defaultValue
      }

      formdata.append(
        'articleRequestDto',
        new Blob([JSON.stringify(newcalendar)], { type: 'application/json' })
      );

      dispatch(__postCalendar(formdata));
      navigate('/calendar');
    }
  };


  // 게시글등록 조건
  const handleCheck = (e) => {
    setIsOnActive(e);
  };

  useEffect(() => {
    if (title.trim() !== '' && content.trim() !== '') {
      handleCheck(true);
    } else {
      handleCheck(false);
    }
  }, [title, content])

  useEffect(() => {
    if (infotitle.trim() !== '' && infocontent.trim() !== '') {
      handleCheck(true);
    } else {
      handleCheck(false);
    }
  }, [infotitle, infocontent])

  useEffect(() => {
    if (freetitle.trim() !== '' && freecontent.trim() !== '') {
      handleCheck(true);
    } else {
      handleCheck(false);
    }
  }, [freetitle, freecontent])

  useEffect(() => {
    if (calendartitle.trim() !== '' && calendarlocation !== '' && calendarcontent.trim() !== '') {
      handleCheck(true);
    } else {
      handleCheck(false);
    }
  }, [calendartitle, calendarlocation, calendarcontent])


  //이미지프리뷰 URL삭제
  useEffect(() => {
    return () =>
      files && files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);



  //모달닫기
  const [isActive, setIsActive] = useState(false);

  const node = useRef();
  useEffect(() => {
    const clickOutside = (e) => {
      // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
      if (isActive && node.current && !node.current.contains(e.target)) {
        setIsActive(false);
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [isActive]);



  return (
    <StTotalCatiner ref={node}>
      {imageNumberAlert && <ImgUploadNumberModal setImageNumberAlert={setImageNumberAlert}/>}
      {imageTypeAlert && <ImgUploadTypeModal setImageTypeAlert={setImageTypeAlert}/>}
      {imageSizeAlert && <ImgUploadSizeModal setImageSizeAlert={setImageSizeAlert}/>}
      <StFormWrap onSubmit={onSubmitHandler}>
        <StFormHeader>
          <IoIosArrowBack
            size='25px'
            cursor='pointer'
            onClick={() => navigate(-1)}
          />
        </StFormHeader>
        <StFormBody>
          <FormSelection name='category' value={select} onChange={handleSelect}>
            <option value='help'>도움요청</option> 
            <option value='information'>정보공유</option>
            <option value='meet'>만남일정</option>
            <option value='freetalk'>자유토크</option>
          </FormSelection>
          
          {select === 'help' ? (
            <>
              <StFormInput
                name='title'
                value={title}
                onChange={onChangeHandler}
                placeholder='제목을 입력해주세요'
                maxLength='40'
              ></StFormInput>
              <StFormCheckWrap>
                <StCard>
                  <StTextAreaBox>
                    <StTextarea
                      name='content'
                      value={content}
                      onChange={onChangeHandler}
                      placeholder='내용을 입력해주세요'
                      maxLength='300'
                    ></StTextarea>
                  </StTextAreaBox>
                  <StFormFooter>
                    <StFooterContain>
                      <>
                        <StGetRootProps>
                          <StImaBox>
                              <StImgLabel htmlFor="input-Imgfile">
                                <StImgadd />
                                <StImgFont>이미지캡처</StImgFont>
                              </StImgLabel>
                                <StImgInput
                                  type="file"
                                  id="input-Imgfile"
                                  accept=".png, .jpg, .jpeg, .heic, .heif, .gif"
                                  onChange={handleAddImages}
                                  multiple
                                />
                            <TxtWarning>* 이미지 최대 3장</TxtWarning>
                          </StImaBox>
                        </StGetRootProps>
                      
                        <StImageList>
                        {files.length !== 0 ?  (
                              <StImageListBox>
                                {previewImg.map((image, id) => (
                                  <StImage key={id}>
                                    <StImg src={image} alt={`${image}-${id}`} />
                                      <StCancelBtn  onClick={() => deleteImage(id)}/>
                                  </StImage>
                                ))}
                              </StImageListBox>
                                     ) : null}
                        </StImageList>
                      </>
                    </StFooterContain>
                  </StFormFooter>
                </StCard>
              </StFormCheckWrap>
            </>
          ) : select === 'information' ? (
            <>
              <StFormInput
                name='infotitle'
                value={infotitle}
                onChange={infoonChangeHandler}
                placeholder='제목을 입력해주세요'
                maxLength='40'
              ></StFormInput>
              <StFormCheckWrap>
                <StCard>
                  <StTextAreaBox>
                    <StTextarea
                      name='infocontent'
                      value={infocontent}
                      onChange={infoonChangeHandler}
                      placeholder='내용을 입력해주세요'
                      maxLength='300'
                    ></StTextarea>
                  </StTextAreaBox>
                  <StFormFooter>
                    <StFooterContain>
                      <>
                        <StGetRootProps>
                          <StImaBox>
                          <StImgLabel htmlFor="input-Imgfile">
                                <StImgadd />
                                <StImgFont>이미지캡처</StImgFont>
                              </StImgLabel>
                                <StImgInput
                                  type="file"
                                  id="input-Imgfile"
                                  accept=".png, .jpg, .jpeg, .heic, .heif, .gif"
                                  onChange={handleAddImages}
                                  multiple
                                />
                            <TxtWarning>* 이미지 최대 3장</TxtWarning>
                          </StImaBox>
                        </StGetRootProps>
                        <StImageList>
                        {files.length !== 0 ?  (
                              <StImageListBox>
                                {previewImg.map((image, id) => (
                                  <StImage key={id}>
                                    <StImg src={image} alt={`${image}-${id}`} />
                                      <StCancelBtn  onClick={() => deleteImage(id)}/>
                                  </StImage>
                                ))}
                              </StImageListBox>
                                     ) : null}
                        </StImageList>
                      </>
                    </StFooterContain>
                  </StFormFooter>
                </StCard>
              </StFormCheckWrap>
            </>
          ) : select === 'meet' ? (
            <>
              <StFormInput
                name='calendartitle'
                value={calendartitle}
                onChange={calendaronChangeHandler}
                placeholder='제목을 입력해주세요'
                maxLength='40'
              ></StFormInput>
              <div ref={node}>
              <StCalendarButton>
                <StCalendarTitle>날짜</StCalendarTitle>
                <StDateDiv 
                onClick={() => setIsActive(!isActive)}
                >
                  {moment(date).format('YYYY년 MM월 DD일')}
                  <ArrowForward />
                </StDateDiv>
              </StCalendarButton>
              <StCalendarWrap
              value={reactCalendar} onClick={onChangeCalendar}
              >
                {isActive && (
                  <Calendar
                    name='calendarDate'
                    value={calendarDate}
                    onChange={onChange}
                  />
                )}
              </StCalendarWrap>
              </div>
              <StTimeDiv>
                <StCalendarTitle>시간</StCalendarTitle>
                <StTimeOpenBtn
                  onClick={timeShowBtn}
                  timeShow={timeShow}
                  name='calendartime'
                  value={`${hour}:${selectMinute}`}
                >
                  {`${hour}:${selectMinute}`}
                  <ArrowForward />
                  </StTimeOpenBtn>
              </StTimeDiv>
              <StKakaoMap>
                {timeShow && (
                  <StTimeWrap>
                    <StTimeModal className="modal">
                      <div className="section">
                        <div className="select-time">
                          <div className="division">
                            {division.map((e, idx) => {
                              const color =
                                selectTime === e ? "#black" : "#bebebe";
                              return (
                                <SelectTimeBtn
                                  type="button"
                                  key={idx}
                                  onClick={() => {
                                    setSelectTime(e);
                                  }}
                                  color={color}
                                >
                                  {e}
                                </SelectTimeBtn>
                              );
                            })}
                          </div>
                          <div className="hour">
                            {hourSelect.map((e, idx) => {
                              const color =
                                selectHour === e ? "#black" : "#bebebe";
                              return (
                                <SelectTimeBtn
                                  type="button"
                                  key={idx}
                                  onClick={() => {
                                    setSelectHour(e);
                                  }}
                                  color={color}
                                >
                                  {e}
                                </SelectTimeBtn>
                              );
                            })}
                          </div>
                          <div className="minute">
                            {minuteSelect.map((e, idx) => {
                              const color =
                                selectMinute === e ? "#black" : "#bebebe";
                              return (
                                <SelectTimeBtn
                                  key={idx}
                                  onClick={() => {
                                    setSelectMinute(e);
                                  }}
                                  color={color}
                                >
                                  {e}
                                </SelectTimeBtn>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </StTimeModal>
                    <StTimeClose onClick={closeTimeShowBtn}>확인</StTimeClose>
                  </StTimeWrap>
                )}
              </StKakaoMap>
              
              <StJoinPeople>
                <StCalendarTitle>인원</StCalendarTitle>
                <StJoinDiv>
                  <MinusCircle size="20px" onClick={joinMinusHandle}/>
                  {joinNumber}명
                  <PlusCircle size="20px" onClick={joinPlusHandle}/>
                </StJoinDiv>
              </StJoinPeople>
              
              <StCalendarDiv>
                <StCalendarTitle>장소</StCalendarTitle>
                <StDateDiv
                  name='calendarlocation'
                  value={calendarlocation}
                  onChange={calendaronChangeHandler}
                  onClick={handle.clickButton}
                  style={{}}
                >
                  {calendarlocation ? calendarlocation : "장소를 검색해주세요"}
                  <ArrowForward />
                </StDateDiv>
              </StCalendarDiv>
              <StKakaoMap>
                {openPostcode &&
                  <DaumPostcode
                    onComplete={handle.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
                    autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                  />}
              </StKakaoMap>
              <StTextDiv>
                <StCalendarTitle>내용</StCalendarTitle>
                <StTextareaDiv>
                <StCalendarTextarea
                  name='calendarcontent'
                  value={calendarcontent}
                  onChange={calendaronChangeHandler}
                  placeholder='내용을 입력해주세요'
                  maxLength='400'
                ></StCalendarTextarea>
                </StTextareaDiv>
              </StTextDiv>
              </>
          ) : select === 'freetalk' ? (
            <>
              <StFormInput
                name='freetitle'
                value={freetitle}
                onChange={freeonChangeHandler}
                placeholder='제목을 입력해주세요'
                maxLength='40'
              ></StFormInput>
              <StFormCheckWrap>
                <StCard>
                  <StTextAreaBox>
                    <StTextarea
                      name='freecontent'
                      value={freecontent}
                      onChange={freeonChangeHandler}
                      placeholder='내용을 입력해주세요'
                      maxLength='300'
                    ></StTextarea>
                  </StTextAreaBox>
                  <StFormFooter>
                    <StFooterContain>
                      <>
                        <StGetRootProps>
                          <StImaBox>
                          <StImgLabel htmlFor="input-Imgfile">
                                <StImgadd />
                                <StImgFont>이미지캡처</StImgFont>
                              </StImgLabel>
                                <StImgInput
                                  type="file"
                                  id="input-Imgfile"
                                  accept=".png, .jpg, .jpeg, .heic, .heif, .gif"
                                  onChange={handleAddImages}
                                  multiple
                                />
                            <TxtWarning>* 이미지 최대 3장</TxtWarning>
                          </StImaBox>
                        </StGetRootProps>
                        <StImageList>
                        {files.length !== 0 ?  (
                              <StImageListBox>
                                {previewImg.map((image, id) => (
                                  <StImage key={id}>
                                    <StImg src={image} alt={`${image}-${id}`} />
                                      <StCancelBtn  onClick={() => deleteImage(id)}/>
                                  </StImage>
                                ))}
                              </StImageListBox>
                                     ) : null}
                        </StImageList>
                      </>
                    </StFooterContain>
                  </StFormFooter>
                </StCard>
              </StFormCheckWrap>
            </>
          ) : null}
        </StFormBody>
        <StFooterBtn>
            <Button
              type='submit'
              backgroundColor='#F7931E'
              width='100%'
              height='40px'
              color='white'
              style={{ backgroundColor: "#f7931e" }}
              isDisabled={isOnActive ? false : true}
            >
              <div style={{ fontWeight: '500', fontSize: '16px' }}>올리기</div>
            </Button>
          </StFooterBtn>
      </StFormWrap>
    </StTotalCatiner>
  );
};

export default Form2;

const StTotalCatiner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  overflow-y: scroll;
  ::-webkit-scrollbar{
    width: 0px;
  }
`;

const StFormWrap = styled.form`
  width: 95%;
  height: 90%;
  background-color: white;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const StFormHeader = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const StFormBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;


// 카테고리 
const FormSelection = styled.select`
  border: none;
  margin-bottom: 25px;
  width: 75px;
  color: #f7931e;
  font-size: 14px;
  font-weight: 600;
  outline: none;
`;

// 게시글 컨텐츠
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

const StFormCheckWrap = styled.div`
  width: 100%;
  height: 100%;
`;

const StCard = styled.div`
  border: 1px solid #eee;
  border-radius: 16px;
  box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.05);
  padding: 5px;
`;

const StTextAreaBox = styled.div`
  width: 100%;
  height: 300px;
`;

const StTextarea = styled.textarea`
  width: 95%;
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

// 게시글 이미지
const StFormFooter = styled.div`
  width: 100%;
  height: 100%;
  border-top: 1px solid #d9d9d9;
  align-items: center;
`;

const StFooterContain = styled.div`
  width: 100%;
`;

const StFooterBtn = styled.div`
  width: 100%;
  height: 100%;
  position: sticky;
  bottom: 0;
  display: flex;
  align-items: flex-end;
`;

const StGetRootProps = styled.div`
  display: flex;
  justify-content: center;
`;

const StImaBox = styled.div`
  display: flex;
  width: 100%;
  margin:10px 5px;
`;

const StImgLabel = styled.label`
  display: flex;
  border: 1px solid #e3e3e3;
  width: 111px;
  padding:7px;
  border-radius: 20px;
  cursor: pointer;
  align-items: center;
`;

const StImgadd = styled(GrImage)`
  opacity: 0.3;
  font-size:20px;
  width:40px;
`;

const StImgFont = styled.div`
  font-size:14px;
`;

const StImgInput = styled.input`
  display: none;
`;

const TxtWarning = styled.div`
  font-size:12px;
`;

const StImageList = styled.div`
  width:100%;
  height:110px;
  display: flex;
  justify-content: center;
  align-items: center;
 `;

 const StImageListBox = styled.div`
  display: flex;
  width:90%;
  flex-direction: row;
 `;
 
const StImage = styled.div`
  position: relative;
  width:100px; 
  height:100px;
  margin:0px 8px;
`;

const StImg = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 16px;
`;

const StCancelBtn = styled(MdCancel)`
  color:#F7931E;
  position: absolute;
  right: 5px;
  top: 0px;
  cursor: pointer;
  font-size:20px;
`;


// 날짜 스타일
const StCalendarButton = styled.div`
  height: 40px;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.05);
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const StCalendarTitle = styled.div`
  font-size: 14px;
  color: #f7931e;
  font-weight: 600;
`;

const StDateDiv = styled.div`
  width: 80%;
  height: 40px;
  display: flex;
  justify-content: right;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  gap: 10px;
`;

const StCalendarWrap = styled.div`
  display: flex;
  justify-content: right;
`;

const StTimeDiv = styled.div`
  height: 40px;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.05);
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;


// 시간 스타일
const StTimeOpenBtn = styled.div`
font-weight: 500;
height: 40px;
font-size: 14px;
width: 80%;
display: flex;
justify-content: right;
align-items: center;
gap: 10px;
cursor: pointer;
`;

const StTimeWrap = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const StTimeModal = styled.div`
  border-radius: 6.83801px;
  border: none;
  height: 130px;
  overflow: hidden;
  text-align: center;
  width: 85%;
  .select-time {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: auto;

    div {
      :nth-child(1) {
        justify-content: center;
      }
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 150px;
      padding: 28px 9px;
      width: auto;
      box-sizing: border-box;
      text-align: center;
      flex: 1;
      text-align: center;
      overflow-y: scroll;
      ::-webkit-scrollbar{
    width: 0px;
  }
    }
  }
`;

const SelectTimeBtn = styled.p`
  background-color: transparent;
  padding: 10px;
  font-weight: 700;
  font-size: 20px;
  color: ${(props) => props.color && props.color};
  border: 1px solid white;
  cursor: pointer;
`;

const StTimeClose = styled.div`
  background-color: #f7931e;
  border-radius: 20px;
  width: 70%;
  color: white;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 15px 0;
  height: 36px;
  cursor: pointer;
`;


// 참여하기 스타일
const StJoinPeople = styled.div`
  height: 40px;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.05);
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const StJoinDiv = styled.div`
  font-weight: 500;
  height: 40px;
  font-size: 14px;
  width: 80%;
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 10px;
  border:none;
`;

const ArrowForward = styled(IoIosArrowForward)`
  color:#cfcfcf;
`;

const MinusCircle = styled(AiOutlineMinusCircle)`
  color:#cfcfcf;
  cursor: pointer;
`;

const PlusCircle = styled(AiOutlinePlusCircle)`
  color:#cfcfcf;
  cursor: pointer;
`;


// 장소 스타일
const StCalendarDiv = styled.div`
  height: 40px;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.05);
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const StKakaoMap = styled.div`
`;


//내용 스타일
const StTextDiv = styled.div`
  height: 210px;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.05);
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 0 20px;
`;

const StTextareaDiv = styled.div`
  width: 80%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StCalendarTextarea = styled.textarea`
  width: 85%;
  height: 200px;
  resize: none;
  border: none;
  background-color: transparent;
  outline: none;
  ::placeholder {
    line-height: 200px;
    top: 50%;
    text-align: right;
  }
  padding: 0 10px;
  text-align: left;
`;











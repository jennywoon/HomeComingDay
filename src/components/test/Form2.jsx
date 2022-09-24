import React, { useRef, useEffect, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { __getHelp, __postHelp } from '../../redux/modules/HelpSlice';
import { __postFreeTalk } from '../../redux/modules/FreeTalkSlice';
import { __postInformation } from '../../redux/modules/InformationSlice';
import {
  __getCalendar,
  __postCalendar,
  __postTime,
} from '../../redux/modules/CalendarSlice';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { MdCancel } from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';
import { GrImage } from 'react-icons/gr';
import Button from '../elements/Button';
import moment from 'moment';
import { TimePicker } from 'antd';
import '../calendarBoard/Time.css';
import Calendar from 'react-calendar';
import '../calendarBoard/CalendarModal.css';
import { useDropzone } from 'react-dropzone';

const Form2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [help, setHelp] = useState({
    title: '',
    content: '',
    imgUrl: '',
  });

  const [info, setInfo] = useState({
    infotitle: '',
    infocontent: '',
    infoimageUrl: '',
  });

  const [freetalk, setFreetalk] = useState({
    freetitle: '',
    freecontent: '',
    freeimageUrl: '',
  });

  const [valueDate, onChageDate] = useState(new Date());
  const [isActive, setIsActive] = useState(false);
  const [select, setSelect] = useState('help');




  // const onClickDate = () => {
  //   setIsActive(current => !current)
  // }

  //캘린더
  // const [showCalendar, setShowCalendar] = useState(false);
  // const handleChange = value => {
  //   setDate(value);
  //   setShowCalendar(false);
  // };

  const [reactCalendar, setReactCalendar] = useState('');
  const onChangeCalendar = (e) => {
    setReactCalendar(e.target.value);
  };

  //이미지 Dropzone -추가
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 
    'image/*',
    // {
    //   'image/png': ['.png'],
    //   'image/jpg': ['.jpg'],
    //   'image/jpeg': ['.jpeg'],
    //   'image/heic': ['.heic'],
    // },
    maxFiles: 3,
    onDrop: (acceptedFiles) => {
      // console.log(files.length);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  //이미지프리뷰삭제
  const deleteImage = (i) => {
    let deleteList = files.filter((_, id) => id !== i);
    setFiles(deleteList);
    return;
  };

  // selectedImage.filter((img,id)=>{
  //     URL.revokeObjectURL(img);
  // })
  // setSelectedImage([])

  // console.log(selectedImage)

  useEffect(() => {
    dispatch(__getHelp());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(__getCalendar());
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(__getDate());
  // }, [dispatch]);

  const { title, content, imgUrl } = help;
  const { infotitle, infocontent, infoimageUrl } = info;
  const { freetitle, freecontent, freeimageUrl } = freetalk;

  // console.log("help", title.length , "info" , info.length , "free" , freetalk.length)

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

  // 만남일정
  const [calendar, setCalendar] = useState({
    calendartitle: '',
    calendarDate: '',
    calendartime: '',
    calendarLocation: '',
    calendarcontent: '',
  });
  const [date, setDate] = useState({
    calendarDate: '',
  });
  const onChange = (value) => setDate(value);
  const realCalendar = moment(date.toString()).format('MM월 DD일 dddd');
  const dates = { calendarDate: realCalendar };

  const {
    calendartitle,
    calendarDate,
    calendartime,
    calendarLocation,
    calendarcontent,
  } = calendar;

  const [selectedTime, setSelectedTime] = useState('00:00');
  const calendaronChangeHandler = (e) => {
    const { value, name } = e.target;
    setCalendar({
      ...calendar,
      [name]: value,
    });
  };

  const onSelectTimeHandler = (value) => {
    const timeString = moment(value).format('hh:mm a');
    setSelectedTime(timeString);
    console.log(selectedTime);
  };

  const handleSelect = (e) => {
    setSelect(e.target.value);
  };

  // 카카오 주소 검색하기
  const [openPostcode, setOpenPostcode] = useState(false);
  const [calendarlocation, setCalendarLocation] = useState({
    calendarLocation: "",
  })
  const locations = { calendarLocation: calendarlocation }
  const handle = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode(current => !current);
    },

    // 주소 선택 이벤트
    selectAddress: (data) => {
      console.log(`
            주소: ${data.address},
            우편번호: ${data.zonecode}
        `)
      setCalendarLocation(data.address);
      setOpenPostcode(false);
    },
  }
  const formdata = new FormData();
  //등록하기
  const [isOnActive, setIsOnActive] = useState(false);
  const onSubmitHandler = (e) => {
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

    // if (title && infotitle && freetitle && calendartitle === "") {
    //     return alert("제목을 입력해주세요");
    // } else if (content && infocontent && freecontent && calendarcontent === "") {
    //     return alert("내용을 입력해주세요");
    // }

    const now = new Date()
    const defaultValue = moment(now.toString()).format('MM월 DD일 dddd')
    console.log(defaultValue)



    //-추가
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
      for (var value of formdata.values()) {
        console.log('formdata value', value);
      }
      console.log(value);
      dispatch(__postHelp(formdata));
      navigate('/main');
    } else if (select === 'info') {
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
    } else if (select === 'meet') {
      const newcalendar = {
        title: calendartitle,
        calendarTime: selectedTime,
        calendarLocation: calendarlocation,
        content: calendarcontent,
        calendarDate: realCalendar,
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

  useEffect(() => {
    return () =>
      files && files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  // 모달 구현
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };

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

  const handleCheck = (e) => {
    setIsOnActive(e);
  };

  useEffect(() => {
    if (title !== '' && content !== '') {
      handleCheck(true);
    } else {
      handleCheck(false);
    }
  }, [title, content])

  useEffect(() => {
    if (infotitle !== '' && infocontent !== '') {
      handleCheck(true);
    } else {
      handleCheck(false);
    }
  }, [infotitle, infocontent])

  useEffect(() => {
    if (freetitle !== '' && freecontent !== '') {
      handleCheck(true);
    } else {
      handleCheck(false);
    }
  }, [freetitle, freecontent])

  useEffect(() => {
    if (calendartitle !== '' && selectedTime !== '' && calendarcontent !== '') {
      handleCheck(true);
    } else {
      handleCheck(false);
    }
  }, [calendartitle, selectedTime, calendarcontent])

  return (
    <TotalCatiner>
      {/* <FormContainer> */}
      <FormWrap onSubmit={onSubmitHandler}>
        <FormHeader>
          <IoIosArrowBack
            size='25px'
            cursor='pointer'
            onClick={() => navigate('/main')}
          />
          {/* <Button type='submit' backgroundColor='white'>
            올리기
          </Button> */}
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
                maxLength='40'
              ></FormInput>
              <FormCheckWrap>
                <StCard>
                  <StTextArea>
                    <Textarea
                      name='content'
                      value={content}
                      onChange={onChangeHandler}
                      placeholder='내용을 입력해주세요'
                      maxLength='300'
                      style={{ height: "100%" }}
                    ></Textarea>
                  </StTextArea>
                  <FormFooter>
                    <FooterContain>
                      <>
                        <GetRootProps>
                          <StImaBox>
                            <StImgUpload
                              {...getRootProps({ className: 'dropzone' })}
                            >
                              <Imgadd size='24px' />
                              <Imgtxt>이미지 첨부</Imgtxt>

                              {/* <button width="300px" text="컴퓨터에서 선택" /> */}
                              <input {...getInputProps()} />
                            </StImgUpload>
                            <TxtWarning>* 이미지 최대 3장</TxtWarning>
                          </StImaBox>
                        </GetRootProps>
                        <StImgContainer>
                          {files.length !== 0 &&
                            files.map((file, i) => (
                              // console.log("file!!!!!!!", file)
                              <StImgList key={i} style={{ display: 'flex' }}>
                                <div
                                  style={{
                                    width: '122px',
                                    height: '110px',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'relative',
                                  }}
                                >
                                  <img
                                    src={file.preview}
                                    style={{
                                      width: '100px',
                                      height: '100px',
                                      backgroundSize: 'cover',
                                      justifyContent: 'center',
                                      objectFit: 'cover',
                                      borderRadius: '16px',
                                    }}
                                  // onLoad={() => {
                                  //   URL.revokeObjectURL(file.preview);
                                  // }}
                                  />
                                  <CancelBtn
                                    onClick={() => deleteImage(i)}
                                    size='20px'
                                    style={{
                                      color: '#F7931E',
                                      position: 'absolute',
                                      right: '5px',
                                      top: '0px',
                                      cursor: 'pointer',
                                    }}
                                  />
                                </div>
                              </StImgList>
                            ))}
                        </StImgContainer>
                      </>
                    </FooterContain>
                  </FormFooter>
                </StCard>
              </FormCheckWrap>
            </>
          ) : select === 'info' ? (
            <>
              <FormInput
                name='infotitle'
                value={infotitle}
                onChange={infoonChangeHandler}
                placeholder='제목을 입력해주세요'
                maxLength='40'
              ></FormInput>
              <FormCheckWrap>
                <StCard>
                  <StTextArea>
                    <Textarea
                      name='infocontent'
                      value={infocontent}
                      onChange={infoonChangeHandler}
                      placeholder='내용을 입력해주세요'
                      maxLength='300'
                      style={{ height: "100%" }}
                    ></Textarea>
                  </StTextArea>
                  <FormFooter>
                    <FooterContain>

                      <>
                        <GetRootProps>
                          <StImaBox>
                            <StImgUpload
                              {...getRootProps({ className: 'dropzone' })}
                            >
                              <Imgadd size='24px' />
                              <Imgtxt>이미지 첨부</Imgtxt>
                              {/* <button width="300px" text="컴퓨터에서 선택" /> */}
                              <input {...getInputProps()} />
                            </StImgUpload>
                            <TxtWarning>* 이미지 최대 3장</TxtWarning>
                          </StImaBox>
                        </GetRootProps>
                        <StImgContainer>
                          {files.length !== 0 &&
                            files.map((file, i) => (
                              // console.log("file!!!!!!!", file)
                              <StImgList key={i} style={{ display: 'flex' }}>
                                <div
                                  style={{
                                    width: '122px',
                                    height: '110px',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'relative',
                                  }}
                                >
                                  <img
                                    src={file.preview}
                                    style={{
                                      width: '100px',
                                      height: '100px',
                                      backgroundSize: 'cover',
                                      justifyContent: 'center',
                                      objectFit: 'cover',
                                      borderRadius: '16px',
                                    }}
                                  // onLoad={() => {
                                  //   URL.revokeObjectURL(file.preview);
                                  // }}
                                  />
                                  <CancelBtn
                                    onClick={() => deleteImage(i)}
                                    size='20px'
                                    style={{
                                      color: '#F7931E',
                                      position: 'absolute',
                                      right: '5px',
                                      top: '0px',
                                      cursor: 'pointer',
                                    }}
                                  />
                                </div>
                              </StImgList>
                            ))}
                        </StImgContainer>
                      </>

                    </FooterContain>
                  </FormFooter>
                </StCard>
              </FormCheckWrap>
            </>
          ) : select === 'meet' ? (
            <>
              <FormInput
                name='calendartitle'
                value={calendartitle}
                onChange={calendaronChangeHandler}
                placeholder='제목을 입력해주세요'
                maxLength='40'
              ></FormInput>
              <CalendarButton>
                <CalendarTitle>날짜</CalendarTitle>
                <DateDiv onClick={() => setIsActive(!isActive)}>
                  {moment(date).format('YYYY년 MM월 DD일')}
                  <IoIosArrowForward />
                </DateDiv>
              </CalendarButton>
              <CalendarWrap value={reactCalendar} onClick={onChangeCalendar}>
                {isActive && (
                  <Calendar
                    name='calendarDate'
                    value={calendarDate}
                    onChange={onChange}
                  />
                )}
              </CalendarWrap>
              <TimeDiv>
                <CalendarTitle>시간</CalendarTitle>
                <StTimePicker
                  use12Hours
                  format='hh:mm a'
                  name='calendartime'
                  // value={calendartime}
                  // onChange={calendarTimeChangeHandler}
                  placeholder='시간을 선택해주세요'
                  showNow={false}
                  value={moment(selectedTime, 'hh:mm a')}
                  onSelect={onSelectTimeHandler}
                />
              </TimeDiv>
              <CalendarDiv>
                  <CalendarTitle>장소</CalendarTitle>
                  <DateDiv
                    name='calendarlocation'
                    value={calendarlocation}
                    onChange={calendaronChangeHandler}
                    placeholder='장소를 입력해주세요'
                    onClick={handle.clickButton}
                  >
                    {/* {calendarlocation} */}
                    <IoIosArrowForward />
                  </DateDiv>
                  </CalendarDiv>
                <StKakaoMap>
                  {openPostcode &&
                    <DaumPostcode
                      onComplete={handle.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
                      autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                      defaultQuery='판교역로 235' // 팝업을 열때 기본적으로 입력되는 검색어 
                    />}
                </StKakaoMap>
              <TextDiv>
                <CalendarTitle>내용</CalendarTitle>
                <CalendarTextarea
                  name='calendarcontent'
                  value={calendarcontent}
                  onChange={calendaronChangeHandler}
                  placeholder='내용을 입력해주세요'
                  maxLength='400'
                ></CalendarTextarea>
              </TextDiv>
            </>
          ) : select === 'freetalk' ? (
            <>
              <FormInput
                name='freetitle'
                value={freetitle}
                onChange={freeonChangeHandler}
                placeholder='제목을 입력해주세요'
                maxLength='40'
              ></FormInput>
              <FormCheckWrap>
                <StCard>
                  <StTextArea>
                    <Textarea
                      name='freecontent'
                      value={freecontent}
                      onChange={freeonChangeHandler}
                      placeholder='내용을 입력해주세요'
                      maxLength='300'
                      style={{ height: "100%" }}
                    ></Textarea>
                  </StTextArea>
                  <FormFooter>
                    <FooterContain>
                      <>
                        <GetRootProps>
                          <StImaBox>
                            <StImgUpload
                              {...getRootProps({ className: 'dropzone' })}
                            >
                              <Imgadd size='24px' />
                              <Imgtxt>이미지 첨부</Imgtxt>
                              {/* <button width="300px" text="컴퓨터에서 선택" /> */}
                              <input {...getInputProps()} />
                            </StImgUpload>
                            <TxtWarning>* 이미지 최대 3장</TxtWarning>
                          </StImaBox>
                        </GetRootProps>
                        <StImgContainer>
                          {files.length !== 0 &&
                            files.map((file, i) => (
                              // console.log("file!!!!!!!", file)
                              <StImgList key={i} style={{ display: 'flex' }}>
                                <div
                                  style={{
                                    width: '122px',
                                    height: '110px',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'relative',
                                  }}
                                >
                                  <img
                                    src={file.preview}
                                    style={{
                                      width: '100px',
                                      height: '100px',
                                      backgroundSize: 'cover',
                                      justifyContent: 'center',
                                      objectFit: 'cover',
                                      borderRadius: '16px',
                                    }}
                                  // onLoad={() => {
                                  //   URL.revokeObjectURL(file.preview);
                                  // }}
                                  />
                                  <CancelBtn
                                    onClick={() => deleteImage(i)}
                                    size='20px'
                                    style={{
                                      color: '#F7931E',
                                      position: 'absolute',
                                      right: '5px',
                                      top: '0px',
                                      cursor: 'pointer',
                                    }}
                                  />
                                </div>
                              </StImgList>
                            ))}
                        </StImgContainer>
                      </>

                    </FooterContain>
                  </FormFooter>
                </StCard>
              </FormCheckWrap>
            </>
          ) : null}
          <FooterBtn>
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
          </FooterBtn>
        </FormBody>
      </FormWrap>
      {/* </FormContainer> */}
    </TotalCatiner>
  );
};

export default Form2;

const TotalCatiner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  overflow-y: scroll;
  ::-webkit-scrollbar{
    width: 0px;
  }
`
const FormContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
  display: flex;
  align-items: center;
`;

const FormWrap = styled.form`
  width: 90%;
  height: 90%;
  /* border: 1px solid red; */
  background-color: white;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;
const FormHeader = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;
const FormBody = styled.div`
  width: 100%;
  height: 100%;
  /* border: 1px solid green; */
  display: flex;
  flex-direction: column;
`;
const FormSelection = styled.select`
  border: none;
  margin-bottom: 25px;
  width: 75px;
  color: #f7931e;
  font-size: 14px;
  font-weight: 600;
  outline: none;
`;
const FormInput = styled.input`
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
const FormCheckWrap = styled.div`
  width: 100%;
  height: 100%;
  /* border: 1px solid green; */
`
const StCard = styled.div`
  border: 1px solid #eee;
  border-radius: 16px;
  box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.05);
  padding: 5px;
`;

const StTextArea = styled.div`
  width: 100%;
  height: 300px;
  /* border: 1px solid red; */
`

const Textarea = styled.textarea`
  width: 100%;
  height: 400px;
  border: none;
  padding: 10px 5px;
  outline: none;
  ::placeholder {
    font-size: 16px;
    color: #aaa;
    font-weight: 400;
  }
`;

const FormFooter = styled.div`
  width: 100%;
  height: 100%;
  border-top: 1px solid #d9d9d9;
  align-items: center;
`;

const FooterContain = styled.div`
  width: 100%;
  
`;

const Imgadd = styled(GrImage)`
  opacity: 0.3;
`;

const FooterBtn = styled.div`
  /* margin: 0 auto; */
  width: 100%;
  height: 100%;
  position: sticky;
  bottom: 0;
  /* border: 1px solid red; */
  display: flex;
  align-items: flex-end;
`;

const Filelabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 50px;
  border: 1px solid #eee;
  border-radius: 20px;
  margin: 15px;
`;

const Addfile = styled.input`
  display: none;
`;
const ImgContainer = styled.label`
  display: 'flex';
  align-items: center;
  margin: 20px 10px;
  position: relative;
`;

const ImgContent = styled.img`
  width: 100px;
  height: 100px;
  position: relative;
`;
const DeleteButton = styled(TiDelete)`
  position: absolute;
  /* size:50px; */
  right: 1px;
  color: white;
  cursor: pointer;
`;

const CalendarButton = styled.div`
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

const TimeDiv = styled.div`
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
const CalendarTitle = styled.div`
  font-size: 14px;
  color: #f7931e;
  font-weight: 600;
`;

const DateDiv = styled.div`
  width: 90%;
  height: 30px;
  display: flex;
  justify-content: right;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  gap: 10px;
`;
const CalendarDiv = styled.div`
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
`
const CalendarInput = styled.input`
  width: 65%;
  height: 30px;
  border-radius: 10px;
  border: none;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: right;
  ::-webkit-input-placeholder {
    text-align: right;
  }
  padding: 0 10px;
  outline: none;
`;

const TextDiv = styled.div`
  height: 210px;
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

const CalendarTextarea = styled.textarea`
  width: 65%;
  height: 200px;
  resize: none;
  border-radius: 10px;
  border: none;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  outline:none;
  textarea::placeholder {
    text-align: right;
  }
  padding: 0 10px;
  text-align: right;
`;

const StTimePicker = styled(TimePicker)`
  width: 160px;
  justify-content: space-between;
  border: none;
  color: orange;
  input::placeholder {
    color: gray;
  }
`;

//Dropzone추가
const GetRootProps = styled.div`
  /* width: 100%; */
  /* height: 300px; */
  display: flex;
  justify-content: center;
`;

const StImaBox = styled.div`
  display: flex;
  width: 100%;
  height: 36px;
  margin: 10px;
  /* cursor: pointer; */
  /* border: 1px solid blue; */
`;
const TxtWarning = styled.div`
  font-size:12px;
  align-items: center;
  display: flex;
  margin-left: 10px;
`
const StImgList = styled.div`
  justify-items: baseline;
`

const StImgUpload = styled.div`
  display: flex;
  width: 111px;
  height: 100%;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  position: relative;
  padding: 0.5rem;
  border: 1px solid #e3e3e3;
  border-radius: 20px;
  cursor: pointer;
  /* border: 1px solid red; */
`;

const StImgContainer = styled.div`
  display: flex;
  width: 100%;
  height: 110px;
  /* border: 1px solid blue; */
  box-sizing: border-box;
  background: #fff;
  scrollbar-width: none;
`;
const Imgtxt = styled.div`
  width: 80px;
  text-align: center;
`;
const CancelBtn = styled(MdCancel)`
  position: absolute;
  right: 0;
`;
const CalendarWrap = styled.div`
  display: flex;
  justify-content: right;
  /* padding-right: 10px; */
`;

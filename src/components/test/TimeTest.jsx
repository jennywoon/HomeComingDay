import React, { useState } from 'react';
import styled from "styled-components"

const TimeTest = () => {

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
    return (
        <div>
            <TimeOpenBtn
                onClick={timeShowBtn}
                timeShow={timeShow}
            >{`${hour}:${selectMinute}`}</TimeOpenBtn>
            <div>
                {timeShow && (
                    <div>
                    <Modal className="modal">
                        <div className="section">
                            <div className="select-time">
                                <div className="division">
                                    {division.map((e, idx) => {
                                        const color =
                                            selectTime === e ? "var(--black)" : "var(--gray2)";
                                        return (
                                            <SelectTimeBtn
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
                                            selectHour === e ? "var(--black)" : "var(--gray2)";
                                        return (
                                            <SelectTimeBtn
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
                                            selectMinute === e ? "var(--black)" : "var(--gray2)";
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
                        
                    </Modal>
                    <div onClick={closeTimeShowBtn}>끄기</div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default TimeTest;

const TimeOpenBtn = styled.button`
font-weight: 500;
color: var(--blue3);
padding: 7px 10px;
background-color: ${(props) =>
        props.timeShow ? "var(--blue1)" : "transparent"};
border-radius: 35px;
`;

const Modal = styled.div`
  background-color: var(--blue1);
  box-shadow: 0px 14px 24px -4px rgba(117, 146, 189, 0.32),
    inset 0px 8px 14px rgba(255, 255, 255, 0.3);
  border-radius: 6.83801px;
  border: none;

  height: 150px;
  overflow: hidden;
  padding: 18px;
  text-align: center;
  margin-bottom: 16px;

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
      padding: 10px 10px;
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
  height: 150px;
  font-weight: 700;
  font-size: 20px;
  color: ${(props) => props.color && props.color};
`;
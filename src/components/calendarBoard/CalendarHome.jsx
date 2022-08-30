import React from 'react';
import styled from 'styled-components';
import BottomTap from '../BottomTap';
import Calendar from "./Calendar"
import HeaderTap from "../HeaderTap"

const CalendarHome = () => {
    return (
        <HomeContainer>
            <HeaderTap />
            <Calendar/>
            <BottomTap />
        </HomeContainer>
    );
};

export default CalendarHome;

const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`
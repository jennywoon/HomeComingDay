import React from 'react';
import HeaderTap from './HeaderTap';
import BottomTap from './BottomTap';
import Layout from './Layout';
import styled from 'styled-components';

const HelpForm = () => {
    return (
        <Layout>
            <HelpFormContain>
            <HeaderTap />
                 
            <BottomTap />
            </HelpFormContain>
        </Layout>
        
    );
};

export default HelpForm;


const HelpFormContain = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`
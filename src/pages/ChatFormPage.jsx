import React from 'react';
import ChatForm from '../components/chatBoard/ChatForm';
import SearchLayout from "../components/SearchLayout"

const FreeTalkPage = () => {

    return (
        <SearchLayout>
            <ChatForm/>
        </SearchLayout>
    );
};

export default FreeTalkPage;
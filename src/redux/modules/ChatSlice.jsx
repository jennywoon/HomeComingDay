import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { chatApi } from "../../components/chatBoard/ChatApi";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const initialState = {
    messages: [],
    chatList: [],
    unreadCountList: [],
    isLoading: true,
    hasNext: false,
    page: 1,
};

export const getChatList = createAsyncThunk("GET_CHAT_LIST", async(page, thunkAPI) => {
    try{
        const response = await chatApi.getChatList(page);
        return response.data;
    } catch(e) {
        return thunkAPI.rejectWithValue(e.response.data);
        // return thunkAPI.rejectWithValue(page);
    }
});

export const getChatMessage = createAsyncThunk("GET_CHAT_MESSAGE", async(roomId, thunkAPI) => {
    try{
        const response = await chatApi.getChatMessage(roomId);
        console.log(response);
        return response;
    } catch(e) {
        return thunkAPI.rejectWithValue(e.response.data);
        // return thunkAPI.rejectWithValue(roomId);
    }
});

const ChatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        subMessage(state, action) {
            state.messages.push(action.payload);
        },
        // 새로운 채팅 메시지를 받으면 리덕스에 저장
        getUnreadCount(state, action) {
            const findSameRoomId = (u) => {
                return u.roomId === action.payload.roomId;
            };

            const unreadCountIndex = state.unreadCountList.findIndex(findSameRoomId);

            // 1. 해당 roomId를 가지고 있는 요소가 배열에 있으면
            if(unreadCountIndex !== -1){
                // 1) 그 요소의 unreadCount 값을 업데이트하고
                state.unreadCountList[unreadCountIndex] = action.payload;

                // 2) chatList에서 해당 roomId를 가지고 있는 요소를 찾아, 그 요소가 있는 해당 요소의 unreadCount를 update
                // const unReadRoom = state.chatList.find((c) => c.chatRoomUuid === action.payload.roomId) 이건지 아래건지 확인 필요
                const unReadRoom = state.chatList.find((c) => c.chatRoomId === action.payload.roomId)
                if(unReadRoom){
                    unReadRoom.unreadCount = action.payload.unreadCount;
                }
            }

            // 2. 해당 roomId를 가지고 있는 요소가 배열에 없으면
            else{
                // 1) newAlert를 unreadCountList 배열에 더하고
                state.unreadCountList.push(action.payload);

                // 2) chatList에서 해당 roomId를 가지고 있는 요소를 찾아, 그 요소가 있는 경우 해당 요소의 unreadCount 를 update
                // const unReadRoom = state.chatList.find((c) => c.chatRoomUuid === action.payload.roomId)
                const unReadRoom = state.chatList.find((c) => c.chatRoomId === action.payload.roomId)
                if(unReadRoom){
                    unReadRoom.unreadCount = action.payload.unreadCount;
                }
            }
        },
        // chatList 메뉴 클릭시 해당 액션이 실행되게 하여 별 표시를 삭제
        deleteUnreadCount(state, action) {
            state.unreadCountList = [];
        },
        isLoading(state, action) {
            state.isLoading = true;
        },
        deleteChatList(state, action) {
            // state.chatList = state.chatList.filter((chat) => chat.chatRoomUuid !== action.payload);
            state.chatList = state.chatList.filter((chat) => chat.chatRoomId !== action.payload);
        },
    },

    extraReducers: (builder) => {
        builder.addCase(getChatMessage.fulfilled, (state, action) => {
            state.messages = action.payload.datel
        });
        builder.addCase(getChatList.fulfilled, (state, action) => {
            if(state.page === 1){
                state.chatList = action.payload;
            } else if(state.page !== 1){
                state.chatList.push(action.payload);
            }
            state.isLoading = false;
            if(action.payload.length < 10) {
                state.hasNext = false;
            } else {
                state.hasNext = true;
                state.page += 1;
            }
        });
    },
});

export const { subMessage, getUnreadCount, deleteUnreadCount, deleteChatList } = ChatSlice.actions;
export default ChatSlice.reducer;
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { __getInformation, __postInformation } from '../redux/modules/InformationSlice';
import Information from './Information';

const InformationForm = () => {
    const dispatch = useDispatch();

    const [information, setInformation] = useState({
        title: "",
        content: "",
        imageList: [
            { imgUrl: "" }
        ],
        // imgUrl: "",
    });

    useEffect(() => {
        dispatch(__getInformation());
    }, [dispatch]);

    const { title, content, imgUrl } = information;
    console.log(information)

    // const [files, setFiles] = useState([]);
    // const formdata = new FormData();

    // files.map((img) => (
    //     formdata.append("imgUrl", img[0])
    // ))

    const onChangeHandler = (e) => {
        const { value, name } = e.target;
        setInformation({
            ...information,
            [name]: value,
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (title === "") {
            return alert("제목을 입력해주세요");
        } else if (content === "") {
            return alert("내용을 입력해주세요");
        }
        dispatch(__postInformation(information));
        // dispatch(__postInformation(formdata))
    }

    return (
        <Container onSubmit={onSubmitHandler}>
            <Tap>정보 공유</Tap>
            <Title
                name="title" value={title} onChange={onChangeHandler} placeholder="제목을 입력해주세요"
            />
            <AddFile
                type="file" multiple={true} id="fileUpload"
                name="imgUrl" value={imgUrl} onChange={onChangeHandler}
            ></AddFile>
            <Content
                name="content" value={content} onChange={onChangeHandler} placeholder="내용을 입력해주세요"
            ></Content>
            <PostDone
                type="submit"
            >작성 완료</PostDone>
        </Container>
    );
};

export default InformationForm;

const Container = styled.form`
    width: 200px;
    padding: 20px;
`
const Tap = styled.div`
    width: 100%;
    height: 50px;
    border: 1px solid red;
`

const Title = styled.input`
    width: 100%;
`

const AddFile = styled.input`
    width: 100%;
`

const Content = styled.textarea`
    width: 100%;
`

const PostDone = styled.button``
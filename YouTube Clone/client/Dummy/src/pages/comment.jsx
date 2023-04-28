import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { format } from 'timeago.js'

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text}
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Comment = (comment) => {
  console.error("CHECK",comment)

  const [channel, setChannel] = useState([])

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/user/find/${comment.userId}`);
      console.log("Comments",res.data)
      setChannel(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  
  useEffect(() => {
    fetchComments()
  }, [comment.userId])


  return (
    <Container>
      <Avatar src='https://yt3.googleusercontent.com/ytc/AL5GRJUOhe9c1D67-yLQEkT2EqyRclI5V3EOTANZQXmt=s176-c-k-c0x00ffffff-no-rj-mo' />
      <Details>
        <Name>
          {channel.name} <Date>{format(channel.createdAt)}</Date>
        </Name>
        <Text>
          {comment.desc}
        </Text>
      </Details>
    </Container>
  );
};

export default Comment;
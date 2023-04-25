import React, { useEffect, useState } from 'react';
import Card from '../components/Card'
import styled from 'styled-components';
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import { useDispatch, useSelector } from 'react-redux'
import Comments from '../components/Comments';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { dislike, fetchSuccess, like } from '../redux/videoSlice';
import { format } from 'timeago.js'
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { subscribe } from '../redux/userSlice';
import Recommendation from '../components/Recommendation';


const Container = styled.div`
display:flex;
gap:24px;
`
const Content = styled.div`
flex:5;
`;

const VideoWrapper = styled.div``;



const Title = styled.h1`
  font-size:18px;
  font-weight:400;
  margin-top:20px;
  margin-bottom:10px;
  color:${({ theme }) => theme.text};
  `


const Details = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  
`;

const Info = styled.span`
color:${({ theme }) => theme.textSoft};`;


const ButtonContainer = styled.div`
display:flex;
gap:15px;
color: ${({ theme }) => theme.text};
`;

const Buttons = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  border:none;
  cursor: pointer;
  border-radius:10px;
  color: ${({ theme }) => theme.text};
  `;

const HR = styled.hr`
  margin:15px 0px;
  border:0.5px solid ${({ theme }) => theme.soft}
  `

const Channel = styled.div`
    display:flex;
    justify-content:space-between;
  `

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Subscribe = styled.button`
background-color: #cc1a00;
font-weight:500;
color:white;
border:none;
border-radius:none;
height:max-content;
padding:10px 20px;

`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display:flex;
  flex-direction:column;
  color: ${({ theme }) => theme.text};
`
const ChannelName = styled.span`
  font-weight:500`;

const ChannelCounter = styled.span`
  margin-top:3.5px;
  margin-bottom:20px;
  color: ${({ theme }) => theme.text};
  font-size:12px
`;

const Description = styled.p`
  font-size:14px;
`;

const VideoFrame = styled.video`
  max-height:720px;
  width:100%;
  object-fit:cover;
`


const Video = () => {

  const currentUser = useSelector(state => state.user.currentUser);
  const currentVideo = useSelector(state => state.video.currentVideo);
  console.warn("Current USer", currentUser);
  console.warn("Current Video", currentVideo)

  const dispatch = useDispatch();

  const path = useLocation().pathname.split('/')[2];
  console.warn("PATH", path)
  // const path = "64393d0e2cf04a3718b4241f"

  const [channel, setChannel] = useState({});

  const fetchVideos = async () => {
    try {
      const videoRes = await axios.get(`/videos/find/${path}`);
      const channelRes = await axios.get(`/users/find/${videoRes.data.userId}`);
      setChannel(channelRes.data)
      dispatch(fetchSuccess(videoRes.data))

    } catch (error) {
      console.log(error)
    }


  }

  useEffect(() => {
    fetchVideos()
  }, [path, dispatch])


  const likeHandler = async () => {
    await axios.put(`/users/like/${currentVideo._id}`);
    dispatch(like(currentUser._id))
  }

  const dislikeHandler = async () => {
    await axios.put(`/users/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser._id))
  }

  const subscribeHandler = async () => {
    currentUser.subscribedUsers.includes(channel._id)
      ? await axios.put(`/users/sub/${channel._id}`)
      : await axios.put(`/users/unsub/${channel._id}`);
    dispatch(subscribe(channel._id))
  }


  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo.videoUrl} controls />
        </VideoWrapper>
        <Title>{currentVideo.title}</Title>
        <Details>
          <Info>{currentVideo.views} views • {format(currentVideo.createdAt)}</Info>
          <ButtonContainer>
            <Buttons onClick={likeHandler}>
              {currentVideo.likes?.includes(currentUser?._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}{" "}
              {currentVideo.likes?.length} Likes
            </Buttons>
            <Buttons onClick={dislikeHandler}>
              {
                currentVideo.dislikes?.includes(currentUser._id)
                  ? <ThumbDownIcon />
                  : <ThumbDownOffAltOutlinedIcon />
              }
              {" "}
              {currentVideo.dislikes?.length}  dislikes

            </Buttons>
            <Buttons>
              <ReplyOutlinedIcon /> Share
            </Buttons>
            <Buttons>
              <AddTaskOutlinedIcon /> Save
            </Buttons>
          </ButtonContainer>
        </Details>
        <HR />
        <Channel>
          <ChannelInfo>
            <Image src={channel.img} />
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.Subscribers} subscribers</ChannelCounter>
              <Description>{currentVideo.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={subscribeHandler}>
            {
              currentUser.subscribedUsers
                ?.includes(channel._id)
                ? "Subscribed"
                : "Subscribe"
            }
          </Subscribe>
        </Channel>
        <HR />
        <Comments videoId={currentVideo._id} />

      </Content>
      <Recommendation />

    </Container>
  )
}

export default Video
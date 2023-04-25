import React, { useState } from 'react';
import Comment from '../pages/comment';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Container = styled.div`

`;

const NewComment = styled.div`
display: flex;
align-items: center;
gap:10px;`;

const Avatar = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;
`;

const Input = styled.input`
 border:none;
 border-bottom: 1px solid ${({ theme }) => theme.soft};
 background-color:transparent;
 outline:none;
 padding:5px;
 width:100%;
`;


const Comments = ({ videoId }) => {

  console.log("IDDDDD",videoId)
  
  const currentUser = useSelector(state => state.user.currentUser)

  const [comments, setComments] = useState([]);


  const fetchComments = async () => {
    try {
      const res = await axios.get(`/comments/${videoId}`);
      console.warn("Fetch Comments",res.data)
      setComments(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [videoId]);


  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser.img} />
        <Input placeholder='Add a comment...' />
      </NewComment>
      {
        comments.map((comment) => (
          <Comment key={comment._id} Comment={comment} />
        ))
      }

    </Container>
  )
}

export default Comments
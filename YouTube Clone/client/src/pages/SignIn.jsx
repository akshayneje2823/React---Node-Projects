import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from 'react-redux'
import { loadingStart, loadingFail, loadingSuccess } from '../redux/userSlice'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from "../firebase";
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const SignIn = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginHandler = async (e) => {
    e.preventDefault();
    dispatch(loadingStart())

    try {
      const res = await axios.post('/auth/signin', { name, password });
      // console.log(res.data);
      dispatch(loadingSuccess(res.data));
      navigate('/')
    } catch (error) {
      console.log(error, error.name);
      dispatch(loadingFail())
    }
  };

  const signInWithGoogle = async () => {
    dispatch(loadingStart())
    signInWithPopup(auth, provider)
      .then((res) => {
        axios.post('auth/google', {
          name: res.user.displayName,
          email: res.user.email,
          img: res.user.photoURL

        }).then(res => {
          dispatch(loadingSuccess(res.data))
        })
      }).catch(err => {
        dispatch(loadingFail())
        console.log(err)
      })
  }
  return (
    <Container>

      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to YouTube</SubTitle>

        <Input placeholder="username" value={name} onChange={(e) => setName(e.target.value)} />
        <Input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={loginHandler}>Sign in</Button>

        <Title>or</Title>
        <Button onClick={signInWithGoogle}>Sign in with google</Button>
        <Title>or</Title>

        <Input placeholder="username" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button>Sign up</Button>


      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
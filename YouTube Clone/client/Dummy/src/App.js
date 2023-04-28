import React, { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Menu from './components/Menu'
import Navbar from './components/Navbar'
import { darkTheme, lightTheme } from './utils/Theme'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Video from './pages/Video'
import SignIn from './pages/SignIn'
import Search from './pages/Search'


const Container = styled.div`
display:flex;
`


const MainC = styled.div`
flex:7;
background-color:${({ theme }) => theme.bg}

`

const Wrapper = styled.div`
  padding: 22px 96px;
`;


export const App = () => {

  const [darkMode, setDarkMode] = useState(false)

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <Router>
          <Menu setDarkMode={setDarkMode} darkMode={darkMode} />
          <MainC>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type='random'/>} />
                  <Route path='trends' element={<Home type='trend'/>} />
                  <Route path='subscriptions' element={<Home type='sub'/>} />
                  <Route path='search' element={<Search/>} />
                  <Route path="signin" element={<SignIn />} />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </MainC>
        </Router>
      </Container>
    </ThemeProvider>
  )
}

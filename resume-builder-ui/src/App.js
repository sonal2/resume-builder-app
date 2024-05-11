import logo from './logo.svg';
import './App.css';
import { EducationModel } from './model/education';
import { useEffect } from 'react';
import { HeaderModel } from './model/header';
import HomePage from './pages/homePage';
import { ChakraProvider } from '@chakra-ui/react'
import EditPage from './pages/editPage';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' Component={Home}></Route>
        <Route path='/edit' Component={Edit}></Route>
      </Routes>
    </Router>
  );
}

function Home() {
  return (
    <ChakraProvider>
          <HomePage/>
    </ChakraProvider>
  )
}

function Edit() {
  return (
    <ChakraProvider>
          <EditPage/>
    </ChakraProvider>
  )
}

export default App;

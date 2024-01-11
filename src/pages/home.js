import React from 'react'
import Navbar from '../components/navbar'
import Featured from '../components/featured'
import List from '../components/list'
import '../css/home.modules.css'
import Contentlist from '../components/contentlist'
import Footer from '../components/footer'
import { useState, useEffect } from 'react'
import axios from 'axios'
import UploadList from '../components/uploadlist'
import { getSignedInUser } from '../Redux/actions/user'
import { API_URL, getUserBoard } from '../services/user.service'
import store from '../Redux/store/store'
import authHeader from '../services/auth-header'
// import { Modal } from '../components/modal';


const Home = ({ type }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [lists, setLists] = useState([])
  const [genre, setGenre] = useState(null)
  const [film, setFilm] = useState([])
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.data?.token
  const config = {
    headers:{
      'Authorization': `Bearer ${token}`
    }
  };
  const getAll = async () => {
    try {
      const { movie } = await axios
        .get(API_URL + 'movie/allmovies', { headers: authHeader() })
        .then((response) => {
          setFilm(response?.data?.data);
        })
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getAll()
  }, [])

  const getType = async () => {
    try {
        await axios
        .get(`${API_URL}movielist/type${type ? '?type='+ type : ''}${genre ? '&genre='+ genre : ''}`, { headers: authHeader() })
        .then((response) => {
          setLists(response?.data?.data);
          console.log(response?.data)
        })
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getType()
  },[])


  

  return (
    <div className='App'>
      <Navbar />
      <div className='home-body'>
        <Featured type={ type } setGenre={setGenre}/>
        <div className='bottom-body'>
          <Contentlist film={film} lists={lists}/>
          <UploadList />
          {lists.map((list) => (
              <div key={list?.id}>
                <List list={list}/>
              </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home

import React, { useContext, useState, useEffect } from 'react'
import { ChatBubble, Favorite, FavoriteBorder, Home, Share, LocationOn, Person, Create, People, DashboardOutlined } from '@material-ui/icons'
import { Link, useHistory, useLocation } from 'react-router-dom'
import Navbar from '../components/navbar'
import PostModal from '../components/postModal'
import '../css/community.modules.css'
import Video from '../components/video'
import { Routes, Route } from 'react-router-dom'
import { API_URL } from '../services/user.service'
import axios from 'axios'
import authHeader from '../services/auth-header'
import { useDispatch, useSelector } from 'react-redux'
import { getPost } from '../Redux/actions/post'


const Community = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const dispatch = useDispatch();
    const posts = useSelector(state => state?.post?.posts);
    console.log(posts)

    useEffect(() => {
        dispatch(getPost());
    }, [dispatch]);
    
    return(
                <>
                  <div className="community-container" >
                  <Navbar />
                      <div className="community-header" >
                          <div className="community-bar">
                              <Link to="/timeline" >
                                  <div className="top-logo">
                                      <DashboardOutlined className='c-comp'/> Timeline
                                  </div>
                              </Link>
                              {/* <Link to={`/profile/${user.username}`}> */}
                                  <div className="top-logo">
                                      <Home className='c-comp'/> Me
                                  </div>
                              {/* </Link> */}
                          </div>
                      </div>
                      <div className="premium-container" >
                        <div className="video-list" >
                        {posts?.map((post)=>(
                            <Link to={{pathname:`/community/${post.id}`, post: post}}> 
                                <Video key={post?.id} post={post}/>
                            </Link>
                        ))}
                        </div>
                      </div>
          
          
                  <Routes >
                      <Route exact path="/:id" element={<PostModal posts={posts}/>}/>
                  </Routes >
                      
                  </div>
                     </>
    )
}

export default Community
        
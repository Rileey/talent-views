import React, { useContext, useState, useEffect } from 'react'
import { ChatBubble, Favorite, FavoriteBorder, Home, Share, LocationOn, Person, Create, People} from '@material-ui/icons'
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import { Link } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../css/dashboard.modules.css'
import axios from 'axios'
import Footer from '../components/footer'
import Modal from '../components/modal'
import Post from '../components/post'
import Media from "react-media"
import { API_URL } from '../services/user.service';
import authHeader from '../services/auth-header';
import { AuthContext } from '../authContext/authContext';
// import { AuthContext } from '../authContext/authContext'

const Dashboard = () => {

    const [searchTerm, setSearchTerm] = useState("")
    const [stack, setStack] = useState(false)
    const [show, setShow] = useState(false)
    const [post, setPost] = useState([])
    // const [user, setUser] = useState({})
    const {user} = useContext(AuthContext)
    const profile = user?.data?.user

    useEffect(()=> {
        const getPosts = async () => {
            const res = await axios.get(API_URL + 'post/random', { headers: authHeader() })
            setPost(res?.data?.data)
        }
        getPosts()
    }, [])


    return(
        <>
        <div className='dash-app'>
        <Navbar/>
        <div className="dash-timeline">
        <div className="side-bar">
                <div className="side-content-container">

                        <div className="side-log-o" style={{textDecoration: 'none', color: '#ff7e00', margin: '20px 0'}}>
                            <Home className='comp'/> 
                            <span className='top-wordss'>Me</span>
                        </div>
                    <Link to="/community">
                        <div className="side-log-o" style={{textDecoration: 'none', color: '#ff7e00', margin: '20px 0'}}>
                            <LocationOn className='comp'/> 
                            <span className='top-wordss'>Community</span>
                        </div>
                    </Link>
                        
                        <div className="side-log-o" style={{textDecoration: 'none', color: '#ff7e00', margin: '20px 0'}} onClick={()=>setShow(true)}>
                            <Create className='comp' /> 
                            <span className='top-wordss'>Upload Video</span>
                        </div>
                        
                        

                    {/* <Link to="/community" style={{textDecoration: 'none', color: 'white'}}> */}
                        <div className="side-log-o" style={{textDecoration: 'none', color: '#ff7e00', margin: '20px 0'}}>
                            <LeaderboardRoundedIcon className='comp'/> 
                            <span className='top-wordss'>Analytics</span>
                        </div>
                    {/* </Link> */}
                </div>
            </div>
            <div className="dashboard-container">
            
                <div className="timeline-container">
                    {post?.map((post)=>(
                        <Post post={post}/>
                    ))}
            
            {/* <Post/>
            <Post/>
            <Post/>
            <Post/> */}
           
                </div>
            </div>
            
            
                        {
                            show && (
                                <Modal profile={profile}/>
                            )
                        }
        </div>
        </div>
        
        </>
        
    )

}

export default Dashboard


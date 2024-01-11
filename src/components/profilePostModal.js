import React, { useContext, useState, useRef, useEffect, } from 'react'
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { ChatBubble, Favorite, FavoriteBorder, Home, Share, LocationOn, Person, Create, People, DashboardOutlined } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../css/postmodal.modules.css'
import Fullpost from './fullpost'
import { AuthContext } from '../authContext/authContext';
import { withRouter, useNavigate, useParams} from 'react-router-dom';
import { useLocation } from "react-router-dom"
import { API_URL } from '../services/user.service';
import authHeader from '../services/auth-header';


const ProfilePostModal = ({profile, posts}) => {
    const history = useNavigate();
    const {id} = useParams()
    const [post, setPost] = useState([])


    useEffect(()=> {
      const getPost = async () => {
          const { data } = await axios.get(`${API_URL}post/${id}`)
          setPost(data?.data?.post)
      }
      getPost()
    }, [id])
    if (post.length === 0) {
      return null
    }

    console.log(profile, posts, post, id)

const backArrow = () => {
  let currentPostId = post;
  let currentPostIndex = 0;

  currentPostIndex = posts.findIndex(
    (postData, index) => postData._id === currentPostId._id
  );


  if (currentPostIndex > 0) {
    currentPostIndex--;
    // console.log('currentPostIndex', currentPostIndex);

    setPost(posts[currentPostIndex]);
  }
  history(`/profile/${profile?.id}/${post.id}`)
};

const forwardArrow = () => {
  let currentPostId = post.id;
  let currentPostIndex = 0;

  currentPostIndex = posts.findIndex(
    (postData, index) => { 
    return postData._id === currentPostId._id
}
  );



  if (currentPostIndex < posts.length - 1) {
    currentPostIndex++;
    console.log('currentPostIndex', currentPostIndex);

    setPost(posts[currentPostIndex]);
    
  }
  history(`/profile/${profile.id}/${post.id}`)
};

    
    return(<>
    
    <div className="modal-Container">
            <div className="modalBackground-1">  
            <div className="modalLeft left"
            onClick={backArrow}
                >
                    <ArrowBackIosRoundedIcon/>
                </div>
                <div className="modalRight right"
                onClick={forwardArrow}
                >
                    <ArrowForwardIosRoundedIcon/>
                </div> 
                
                <div class="modalContainer-1">
                    <div className="titleCloseBtn-1">
                    <button onClick={(e) => {
                        history('/profile/' + profile?.id)
                        e.stopPropagation()
                        }}> X </button>
                    </div>
                   <Fullpost profile={profile} post={post}/>
                </div>
            </div>
        
    </div>
    </>)
}
export default ProfilePostModal
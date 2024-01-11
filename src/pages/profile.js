import '../css/profile.modules.css'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Link, useParams, Routes, Route  } from 'react-router-dom'
import InsertPhotoRoundedIcon from '@mui/icons-material/InsertPhotoRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import ArrowCircleUpRoundedIcon from '@mui/icons-material/ArrowCircleUpRounded';
import { ArrowDropDown, DashboardOutlined, LocationOn } from '@material-ui/icons'
import Navbar from '../components/navbar';
import { AuthContext } from '../authContext/authContext';
// import Video from '../components/video'
import ProfileVideo from '../components/profileVideo'
import ProfilePostModal from '../components/profilePostModal'
import Media from "react-media"
import { API_URL } from '../services/user.service';
import authHeader from '../services/auth-header';
import { getUser } from '../Redux/actions/user';
import { useDispatch, useSelector } from 'react-redux';



const Profile = (match) => {

    
    const [video, setVideo] = useState([])
    const [profilePicture, setProfilePicture] = useState([])
    const [hovered, setHovered] = useState(false)
    const [myPosts, setMyPosts] = useState([])
    const [show, setShow] = useState(false)
    const [profile, setProfile] = useState({})
    const [searchTerm, setSearchTerm] = useState("")
    const {id} = useParams()
    // const {dispatch, user} = useContext(AuthContext)
    const [isScrolled, setisScrolled] = useState(false);
    // const profile = user?.data?.user
    // const result = decodeURI(username)

    useEffect(()=> {
        const getUser = async () => {
            const res = await axios.get(API_URL + 'user/' + id, { headers: authHeader() })
            setProfile(res?.data?.data?.user)
        }
        getUser()
    }, [id])

const posts = profile?.posts
console.log(profile)

    return(
        <>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            <div className="me-container">
                <div className="me-top">
                    <div className="me-left">
                        <div className="left-top">
                        <div className="me-profile-img" >
                            <img className="me-img" src={profile?.avatar || "../stockphoto.jpeg"} alt="" />    
                        </div>
                        <div className="me-profile-names">
                            <span className="me-name">{profile?.name}</span>
                        </div>
                        </div>
                        <div className="left-bottom">
                        <div className="me-bottom">
                        <span className="bio">{profile?.bio || 'Tell us who you are'}</span>
                        </div>
                        </div>
                    </div>
                    <div className="me-right">
                        <div className="me-posts">
                           <div className="me-logo">
                               <InsertPhotoRoundedIcon/>
                           </div>
                           <div className="me-numbers">
                                <span className="large-number">
                                  {profile?.posts?.length}
                                </span>
                                <span className="small-caption">Posts</span>
                           </div>                         
                        </div>
                        <div className="me-followers">
                           <div className="me-logo">
                               <PeopleRoundedIcon />
                           </div>
                           <div className="me-numbers">
                                <span className="large-number">
                                   {profile?.metrics?.followers}
                                    </span>
                                <span className="small-caption">Followers</span>
                            </div> 
                        </div>
                        <div className="me-upvotes">
                           <div className="me-logo">
                               <ArrowCircleUpRoundedIcon />
                           </div>
                           <div className="me-numbers">
                                <span className="large-number">0</span>
                                <span className="small-caption">Upvotes</span>
                           </div> 
                        </div>
                    </div>
                </div>
                
                <div className="community-heade-r" >
                <div className="community-bar">
                    <Link to="/timeline" style={{textDecoration: 'none', color: 'white'}}>
                        <div className="top-logo">
                            <DashboardOutlined className='c-comp'/> Timeline
                        </div>
                    </Link>
                    <Link to="/community" style={{textDecoration: 'none', color: 'white'}}>
                        <div className="top-logo">
                            <LocationOn className='c-comp'/> Community
                        </div>
                    </Link>
                </div>
            </div>

                <div className="me-posts-container">
                    <div className="me-many-posts">
                    <Media query = '(min-width: 950px)'>
                  {
                    matches => {
                      return matches 
                      ? (
                        <>
                        {profile?.posts?.map((post)=> (
                            <Link to={`/profile/${profile.id}/${post.id}`}>
                            <div key={post.id} className="me-content-container">
                                 <ProfileVideo post={post} />
                            </div>
                            </Link>
                        ))}
                         </>
                      ) : (
                        <>
                        {profile?.posts?.map((post)=>(
                            <ProfileVideo key={post?.id} post={post} />
                        ))}
                        </>
                      )}}
                      </Media>
                        {/* <ProfileVideo />
                        <ProfileVideo /> */}
                    </div>
                    <Routes >
                        <Route exact path="/:id" element={<ProfilePostModal profile={profile} posts={posts} />} />
                    </Routes >
                </div>
            </div>
        </>
    )
}

export default Profile
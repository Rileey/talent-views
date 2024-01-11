import '../css/account.modules.css'
import { AuthContext } from '../authContext/authContext'
import Navbar from './navbar'
import card from '../images/mastercard.svg'
import { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import ProfileModal from '../components/profileModal'
import { Link, useParams } from 'react-router-dom'
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import Profile from '../pages/profile'
import { API_URL } from '../services/user.service'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../Redux/actions/user'

const Account = () => {
    const [image, setImage] = useState({})
    const [profile, setProfile] = useState({})
    const [message, setMessage] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [name, setName] = useState(false)
    const [number, setNumber] = useState(false)
    const [bio, setBio] = useState(false)
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    

    const dispatch = useDispatch();
    const user = useSelector(state => state?.user?.user);

    useEffect(() => {
        dispatch(getUser());
    }, []);

    const date = (params) => {
        const time = new Date(params) 
        return time?.getDate() + '/' + time?.getMonth() + '/' + time?.getFullYear()
    }

    const handleChange = (e) => {
        const value = e.target.value
        setProfile({...profile, [e.target.name]: value})
    }

    if (!image || image === {}){
        return null
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        // setSubmitted(true)
             let data = new FormData();

            data.append('id', user.id) 
            data.append('first_name', user.first_name)
            data.append('phone_number', user.phone_number)
            data.append('bio', user.bio)
            for (let i = 0; i < image.length; i++) {
                data.append('profilePicture', image[i], image[i].name)
            }
            try {
                await axios.put(`${API_URL}user/${user.id}`, data )
                setLoading(false)
                window.location.reload()
            } catch (err) {
                console.log(err);
            }
    }


    return(
        <>
        <Navbar />
        {
            show && (
                <ProfileModal closeModal={setShow} show={show}/>
            )
        }
        <div className="account-head">
            <div className="account-body">
                <div className="user-notice">
                    <div className="me-img-container-s  modImage" >
                    <div className="image-caption-s">
                    <img className="account-image" src={user?.avatar || "../stockphoto.jpeg"} alt=""  cache={false}/>
                    <input type="file" id='image' name="profilePicture" className='modd-image' accept= "image/png, image/jpeg" 
                    onChange={(e)=>setImage(e?.target?.files)}/>
                    <div className="moddLogo">
                        <CameraAltRoundedIcon />
                    </div>
                   
                </div>
                    <div className="end" >
                        <p>{image[0]?.name}</p>
                        {loading ? <div class="loader"></div> : null}
                        <input type='button' className='account-btn' value={loading ? "loading..." : "Save"}/>
                    </div> 
                </div>
                    <span className="account">
                        Hello {user?.first_name}
                    </span>
                    <span className="joined">
                        Joined {date(user?.created_at)}
                    </span>
                    <span className="notice-details">
                        Visit your account at talentcroft.com to update your payment
                        details, change your payment plan and other features
                    </span>
                </div>
            </div>
            <div className="user-information">
                <span className="billing">
                   <b> MEMBERSHIP AND BILLING </b>
                </span>
                <span className="use-r billing">email: <b>{user?.email}</b></span>
                <span className="use-r billing">phone: <b>{user?.phone_number}</b></span>
                <hr />
                        <div className="change-container" >
                            <div className='seasons' onClick={()=>setName(true)}>
                            {name ? 
                            <input type="text" name="first_name" id="" placeholder={"Change username from " + user?.first_name + " ?"} className="mod-input" onChange={handleChange} /> : 
                            <span className='user-action' >Change Username</span>
                            }
                            </div>
                            {name ? <input type="button" value="Back" className="go-back" onClick={()=>setName(false)}/>: null}      
                        </div>
                <hr />
                        <div className="change-container" >
                            <div className='seasons' onClick={()=>setNumber(true)}>
                            {number ? 
                            <input type="number" name="phone_number" id="" placeholder={"Change number from " + user?.phone_number + " ?"} className="mod-input" onChange={handleChange} /> : 
                            <span className='user-action' >Change Phone Number</span>
                            }
                            </div>
                            {number ? <input type="button" value="Back" className="go-back" onClick={()=>setNumber(false)}/>: null}    
                        </div>
                <hr />
                        <div className="change-container" >
                            <div className='seasons' onClick={()=>setBio(true)}>
                            {bio ? 
                            <input type="number" name="bio" id="" placeholder={"Change your bio ?"} className="mod-input" onChange={handleChange} /> : 
                            <span className='user-action' >Update your Bio</span>
                            }
                            </div>
                            {bio ? <input type="button" value="Back" className="go-back" onClick={()=>setBio(false)}/>: null}    
                        </div>
                <hr />
                <span className='user-action' onClick={()=>setShow(true)}>Change Password</span>
                <hr />
                <span className="billing">Card Details</span>
                <div className="user-card">
                {/* <img className='mastercard' src={card} alt="" srcset="" /> */}
                <span className="billing">.... .... .... 2008</span>
                </div>
                <span className="billing">Your next billing date is ---</span>
            </div>
        </div>
        </>
    )
}

export default Account
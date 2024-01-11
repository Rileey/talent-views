// import ContentlistItem from './Contentlistitem'
import UploadListItem from './uploadListItem'
// import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons'
import '../css/uploadlist.modules.css'
import { useEffect, useState, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
// import HorizontalScroll from 'react-scroll-horizontal'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../services/user.service'
import authHeader from '../services/auth-header'


const Contentlist = () => {
    const history = useNavigate();
    const [post, setPost] = useState([])


    useEffect(()=> {
        const getPosts = async () => {
            const res = await axios.get(API_URL + 'post/random', { headers: authHeader() })
            setPost(res?.data?.data)
        }
        getPosts()
    }, [])

    

    const ScrollToTop = () => {
        useLayoutEffect(() => {
            window.scrollTo(0, 0);
        }, []);
    
        return null;
    };
    ScrollToTop()


    return (
        <div className='upload-list'>
            <span class="contentlistTitle">The Community</span>
            <div className="upload-wrapper" >
                <div className="upload-container" >
                    {post?.map((item)=>(
                        <Link to={`/community/${item.id}`} key={item.id} style={{textDecoration: 'none'}} >
                            <UploadListItem item={item} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Contentlist

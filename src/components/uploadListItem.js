import { useEffect, useState }from 'react'
import axios from 'axios'
import '../css/uploadlistitem.modules.css'
import { Link } from 'react-router-dom'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

const Contentlistitem = ({upload, item}) => {

    const [hovered, setIshovered] = useState(false)

    return (
        // <Link to={`/community/${upload._id}`}>
        <div className='upload-list-item'>
            {! hovered ? (
                <div className="vid-container"
                onMouseOver={()=>setIshovered(true)}
                onMouseLeave={()=>setIshovered(false)}
                >
                <video
                src={item?.url} width="640" height="360"
                alt="" 
                autoPlay="true"
                muted
                loop
                type="video/mp4"/>
                </div>
            ) : (
                <div className="vid-container"
                onMouseOver={()=>setIshovered(true)}
                onMouseLeave={()=>setIshovered(false)}
                >
                    <video
                    src={item?.url} width="640" height="360"
                    alt=""
                    loop
                    // autoPlay="false"
                    type="video/mp4"/>
                    <PlayArrowRoundedIcon
                    style={{
                        fontSize: '50px',
                        position: "absolute",
                        bottom: '35%',
                        left: '32%',
                    }}
                    />
                    <div className="vid-overlay"></div>
                </div>    
            )
            
            }
        </div>
    )
}

export default Contentlistitem

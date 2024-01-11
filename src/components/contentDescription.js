import React from 'react'
// import { Link } from 'react-router-dom'
import '../css/contentdescription.modules.css'
import Contentlist from './contentlist'
import { useEffect, useState, useLayoutEffect } from 'react'
import axios from 'axios'
import '../css/film.modules.css'
import Footer from './footer'
import '../css/featured.modules.css'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import Navbar from './navbar'
import {Link, useParams} from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/opacity.css'


 

const ContentDescription = () => {
const {id} = useParams()    
const [movie, setMovie] = useState({})
const [image, setImage] = useState('')
const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.data?.token
  const config = {
    headers:{
      'Authorization': `Bearer ${token}`
    }
  };


    useEffect(() => {
        const getMovie = async () => {
            try {
                const {data} = await axios.get(`http://127.0.0.1:8000/api/movie/${id}`, config)
                setMovie(data?.data?.movie)
                console.log(data?.data?.movie)
                setImage(data.data?.movie?.episodes[0]?.thumbnail)
                window.scrollTo(0, 0);
            } catch (err) {
                console.log(err)
            }
        }
        getMovie()
    }, [id])

    function time_convert(num)
    { 
    const hours = Math.floor(num / 60).toFixed(2);  
    const minutes = num % 60;
    return `${hours}:${minutes}`;         
    }



     return (
        <>
        <Navbar />
        <div className="content-summary">
        <div className='featured' >
            <img
            className='featured-jumbotron'
            style={{position: "fixed"}}
            height='100%'
            src={image}
            // src="https://images.unsplash.com/photo-1665686374221-1901faa9f3ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
            alt="" 
            />
            <div className="info">
            <span className="film-desc-title">{movie?.name}</span>
                <button className="info-btn"><PlayArrowRoundedIcon />Play</button>
            </div>

             </div>
        <div className='film-container' >
            <div className="content-grid">
            <div className="abouts-container">
            <div className="film-details">
                        <span className="p-span">{movie?.year}</span>
                        <span className="p-span">Rated: <span className='rated-border'>+{movie?.age_rating}</span></span>
            </div>
            </div>
            <div className="content-inffo">
                <span className="p-span">{movie?.genre}</span>
            </div>
                <div className="film-description">
                    <span >
                        {movie?.description}
                    </span>
                </div>
                <span className="p-span directed">Directed by: <span> { movie?.director}</span></span>
            </div>
            <div className="trailer">
                <span>Trailer</span>
                <button className="episodes">Episodes</button>
            </div>
            <div className="section-2">
                <div className="film-content-container">
                    {movie?.episodes?.sort((a, b) => a.id - b.id)?.map((episode) => (
                        <Link to={`/content/watch/${episode?.id}`} key={episode?.id} className='i-m-g'>
                        <div className="img" >
                            <img className='glow' src={episode?.thumbnail} alt="" />
                            <div className="desk"><span className="new-title">{episode?.name}</span><span className='c-span'>{episode?.decription}</span></div>
                            <div className="duration p-span">{time_convert(episode?.duration)}hr</div>
                        </div>  
                       </Link>
                    ))}
                
                {/* {movie.episodes.map((mov) => (
                    
                    <div className="img" >
                        <img className='glow' src={mov?.thumbnail} alt="" />
                        <div className="desk"><span className="new-title">{mov?.name}</span><span className='c-span'>mov</span></div>
                        <div className="duration p-span">{time_convert(mov?.duration)}</div>
                     </div>  
                    //  </Link>
                ))}    */}
                </div>   
            </div>
            </div>
            {/* <Contentlist/> */}
        </div>
        </>
    )
}

export default ContentDescription

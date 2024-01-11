import ContentlistItem from './Contentlistitem'
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from '@material-ui/icons'
import '../css/contentlist.modules.css'
import { useEffect, useState, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
// import HorizontalScroll from 'react-scroll-horizontal'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Contentlist = (film, lists) => {
  const movies = film?.film
  const newlists = film?.lists
  const history = useNavigate()
  console.log(movies, newlists)

  const [featured, setFeatured] = useState([])

  // useEffect(() => {
  //     const getFeatured = async () => {
  //         const {data}= await axios.get('/movies/featured', {
  //             headers: {
  //                 token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzQ1ZGJhNWQ5ZGY1NmEzMzhhNTFmNCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDA2MzIyMjYsImV4cCI6MTY0MzIyNDIyNn0.FliBS9psdYuSEbr2OHwGf4iurw4ZjDYUJlbDggfnv1M'
  //             }

  //         })
  //         setFeatured(data)
  //     }
  //     getFeatured()
  // }, [history])

  // const [slideNumber, setSlideNumber] = useState(0);
  // const [isMoved, setIsMoved] = useState(false);

  // const handleClick = (direction) => {
  //     setIsMoved(true)
  //     let distance = listRef.current.getBoundingClientRect().x - 50
  //     if (direction === 'left' &&  slideNumber > 0){
  //         setSlideNumber(slideNumber - 1)
  //         listRef.current.style.transform = `translateX(${230 + distance}px)`
  //     }
  //     if (direction === 'right' && slideNumber < 5){
  //         setSlideNumber(slideNumber + 1)
  //         listRef.current.style.transform = `translateX(${-230 + distance}px)`
  //     }
  // }
  return (
    <div className='content-list'>
      <span className='contentlistTitle'>Recommended Films</span>
      <div className='content-wrapper'>
        <div className='content-container'>
          {movies.map((card) => (
            <Link to={`/content/${card.id}`} key={card.id} style={{textDecoration: 'none'}} >
              <ContentlistItem card={card}/> 
            </Link> 
          ))}
        </div>
      </div>
    </div>
  )
}

export default Contentlist

// import { useEffect, useState }from 'react'
// import axios from 'axios'
import '../css/contentlistitem.modules.css'
// import { Link } from 'react-router-dom'

const Contentlistitem = ({ card }) => {

    // console.log(card.image[0])
    // const [movie, setMovie] = useState({})

    // const trailer = '/fdp.mp4'
    return (
        <div className='contentt'>
        <div className='content-list-item'>
            <img
            src={card?.episodes[0]?.thumbnail || '/cinema.jpeg' }
            alt="" />
        </div>
        <span className='text'>{card?.name}</span>
        </div>
    )
}

export default Contentlistitem

import React, { useState } from 'react'
import '../css/searchitem.modules.css'

const Search = ({content}) => {

    const [isHovered, setIsHovered] = useState(false)
    const [imgsLoaded, setImgsLoaded] = useState(false)

    const onLoad = () => {
        setImgsLoaded(true)
    }

    function time_convert(num){ 
        const hours = Math.floor(num / 60).toFixed(2);  
        const minutes = num % 60;
        return `${hours}:${minutes}`;         
    }

  return (
            <div className='search-list'
                onMouseEnter={()=> setIsHovered(true)} 
                onMouseLeave={()=> setIsHovered(false)}
            >
                <img className='search-image' onLoad={onLoad} src={content?.thumbnail} alt="" />
            
            {isHovered && (
                <>
            <video src={content?.video} className="search-list-video" width="560" height="315" autoPlay={true} loop />
            <div className="search-itemInfo">
                <div className="itemIcons">
                    <span className="search-orange">
                        <span className="now">{content?.name}</span>
                    </span>
                </div>
                <div className="item-desc">
                    <span>{time_convert(content?.episodes[0]?.duration)}hr</span>
                    <span className="limit">+{content?.age_rating}</span>
                    <span>{content?.year}</span>
                </div>
                    <div className="list-item-caption">Director: {content?.director}
                </div>
                <div className="list-item-caption">{content?.description}</div>
                <div className="genre">{content?.genre}</div>
                </div>
            </>
             )}
             </div>
                        );
}

export default Search
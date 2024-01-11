// import { Add, PlayArrowOutlined, ThumbDownAltOutlined, ThumbUpAltOutlined } from '@material-ui/icons'
import axios from 'axios'
import { useEffect, useState, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import '../css/listItem.modules.css'
import { useNavigate } from 'react-router-dom'
import 'react-lazy-load-image-component/src/effects/opacity.css'
import Media from 'react-media'

const ListItem = ({ index, item }) => {
  const history = useNavigate()

  const [isHovered, setIsHovered] = useState(false)
  const [movie, setMovie] = useState({})
  const [video, setVideo] = useState({})
  const [caption, setCaption] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  function time_convert(num)
    { 
    const hours = Math.floor(num / 60).toFixed(2);  
    const minutes = num % 60;
    return `${hours}:${minutes}`;         
    }

  // useEffect(() => {

  //     const getVideo = async () => {

  //         try {
  //             const { data } = await axios.get('movies/find/'+ item, {
  //                 headers: {
  //                     token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzQ1ZGJhNWQ5ZGY1NmEzMzhhNTFmNCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDA2MzIyMjYsImV4cCI6MTY0MzIyNDIyNn0.FliBS9psdYuSEbr2OHwGf4iurw4ZjDYUJlbDggfnv1M'
  //                 }
  //             })
  //             setCaption(data)
  //             // window.scrollTo(0, 0);
  //         } catch (err) {
  //             console.log(err)
  //         }
  //     }
  //     getVideo()
  // }, [item, history])

  // useEffect(() => {

  //     const getImage = async () => {

  //         try {
  //             const { data } = await axios.get('movies/find/'+ item, {
  //                 headers: {
  //                     token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzQ1ZGJhNWQ5ZGY1NmEzMzhhNTFmNCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDA2MzIyMjYsImV4cCI6MTY0MzIyNDIyNn0.FliBS9psdYuSEbr2OHwGf4iurw4ZjDYUJlbDggfnv1n'
  //                 }
  //             })
  //             setIsLoading(false)
  //             setMovie(data.thumbnail[0].thumbnail)

  //         } catch (err) {
  //             console.log(err.message)
  //             setIsLoading(false)
  //         }
  //     }
  //     getImage()
  // }, [item, history])

  // useEffect(() => {
  //   const getCaption = async () => {
  //     try {
  //       const { data } = await axios.get('movies/find/' + item, {
  //         headers: {
  //           token:
  //             'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzQ1ZGJhNWQ5ZGY1NmEzMzhhNTFmNCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDA2MzIyMjYsImV4cCI6MTY0MzIyNDIyNn0.FliBS9psdYuSEbr2OHwGf4iurw4ZjDYUJlbDggfnv1M',
  //         },
  //       })

  //       setVideo(data.trailer[0].trailer)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   getCaption()
  // }, [item, history])

  return (
    <>
      <Media query='(min-width: 769px)'>
        {(matches) => {
          return matches ? (
            <div className='list-item-container'>
              <div
                className='listItem'
                style={{ left: isHovered && index * 220 - 20 + index * 3 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <img
                  className='list-image'
                  src={item?.thumbnail}
                  alt=''
                />

                {isHovered && (
                  <>
                    <video
                      className='listVideo'
                      src={item?.video}
                      width='640'
                      height='360'
                      frameborder='0'
                      allow='autoplay; fullscreen; picture-in-picture'
                      allowfullscreen
                      autoPlay={true}
                      loop
                    />
                    <div className='itemInfo'>
                      <div className='itemIcons'>
                        <span className='orange'>
                          <span className='now'>{item?.name}</span>
                        </span>
                      </div>
                      <div className='item-desc'>
                        <span>{time_convert(item?.duration)}</span>
                        <span className='limit'>+{item?.age_rating}</span>
                      </div>
                      <div className='list-item-caption'>{item?.description}</div>
                      <div className='genre'>{item?.genre}</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            // </Link>
            // <Link to={`/content/${caption._id}`}>
            <div className='list-item-container'>
              <div className='listItem-sm'>
                <img
                  className='list-image'
                  src={item?.thumbnail}
                  alt=''
                />
              </div>
            </div>
            // </Link>
          )
        }}
      </Media>
    </>
  )
}

export default ListItem

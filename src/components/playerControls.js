import React, {forwardRef} from "react"
import '../css/playercontrols.modules.css'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import Box from '@material-ui/core/Box'
// import Stack  from "@mui/material/Stack"
import Button from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover'
import { styled } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
// import Media from "react-media"
import Media from '../../node_modules/react-media/index'
import FastRewindIcon from '@material-ui/icons/FastRewind'
import FastForwardIcon from '@material-ui/icons/FastForward';
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import VolumeOffIcon from '@material-ui/icons/VolumeOff'
import FullscreenIcon  from '@material-ui/icons/Fullscreen'
import IconButton from '@material-ui/core/IconButton'
// import Screenfull from 'screenfull'


function ValueLabelComponent(props) {
    const { children, value } = props;
  
    return (
      <Tooltip enterTouchDelay={1} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }

const PrettoSlider = styled(Slider)({
    color: '#52af77',
    height: 8,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 12,
      width: 12,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#52af77',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  });

const PlayerControls = forwardRef(({
  onPlayPause, 
  playing, 
  onRewind, 
  onFastForward, 
  muted, 
  onMute, 
  onvolumechange, 
  onVolumeSeekUp, 
  volume, 
  playbackRate,
  onPlaybackRateChange,
  played,
  onSeek,
  onSeekMouseDown,
  onSeekMouseUp,
  elapsedTime,
  totalDuration,
  onChangeDisplayFormat,
  film
}, ref) => {


    const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'playbackrate-popover' : undefined;
    return(
        <div>
             <div className="controls-wrapper" ref={ref}
            style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                backgroundColor: 'rgba(0,0,0,0.6)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: '1'
            }}
            >
                <Grid container direction='row' alignItems='center' justifyContent='center'>
                
                </Grid>

                <Media query = '(min-width: 850px)'>
                  {
                    matches => {
                      return matches 
                      
                      ? (
                        <Grid container direction='row' alignItems='center' style={{marginTop: '70px'}} justifyContent='center'>

                <IconButton onClick={onRewind} className='controlIcons' style={{fontSize: '9.5rem', margin: '0 50px'}} aria-label='rewind'>
                    <FastRewindIcon fontSize='inherit' className='controlIcons'/>
                </IconButton>

                <IconButton onClick={onPlayPause} className='controlIcons' style={{fontSize: '9.5rem', margin: '0 50px'}} aria-label='rewind'>
                    {playing ? (<PauseIcon fontSize='inherit' className='controlIcons'/> ) : (<PlayArrowIcon fontSize='inherit' className='controlIcons'/>)}
                </IconButton>

                <IconButton onClick={onFastForward} className='controlIcons' style={{fontSize: '9.5rem', margin: '0 50px'}} aria-label='rewind'>
                    <FastForwardIcon fontSize='inherit' className='controlIcons'/>
                </IconButton>

                </Grid>
                      ) : (
                        <Grid container direction='row' alignItems='center' style={{marginTop: '150px'}} justifyContent='center'>

                <IconButton onClick={onRewind} className='controlIcons' style={{fontSize: '2.5rem', margin: '0 10px'}} aria-label='rewind'>
                    <FastRewindIcon fontSize='inherit' className='controlIcons'/>
                </IconButton>

                <IconButton onClick={onPlayPause} className='controlIcons' style={{fontSize: '2.5rem', margin: '0 10px'}} aria-label='rewind'>
                    {playing ? (<PauseIcon fontSize='inherit' className='controlIcons'/> ) : (<PlayArrowIcon fontSize='inherit' className='controlIcons'/>)}
                </IconButton>

                <IconButton onClick={onFastForward} className='controlIcons' style={{fontSize: '2.5rem', margin: '0 10px'}} aria-label='rewind'>
                    <FastForwardIcon fontSize='inherit' className='controlIcons'/>
                </IconButton>

                </Grid>
                      )
                    }
                  }

                


                </Media>



                <Media query = '(min-width: 610px)'>
                  {
                    matches => {
                      return matches 
                      
                      ? (
                <Grid container direction='row' alignItems='center' justifyContent='center' style={{display: 'flex', marginBottom: '30px'}}>
                    <Grid item xs={10}>
                        <PrettoSlider 
                            min={0}
                            max={100}
                            value={played * 100}
                            onChange={onSeek}
                            onMouseDown={onSeekMouseDown}
                            onChangeCommitted={onSeekMouseUp}
                            ValueLabelComponent={(props)=>(
                              <ValueLabelComponent{...props} value={elapsedTime} style={{marginBottom: '15px'}}/>
                              )}
                            style={{color: '#fff'}}
                            
                        />
                    </Grid>
                    <Grid item style={{display: 'flex'}}>
                            <Button onClick={onChangeDisplayFormat} variant='text' style={{color:'#fff', marginRight: '16px', width: '90px'}}>
                                <Typography > {elapsedTime}/{totalDuration}</Typography>
                            </Button>
                        <Grid container alignItems='center' justifyContent='center' direction='row'>
                            {/* <IconButton onClick={onPlayPause} className='bottomIcons'>
                                {playing? (<PauseIcon fontSize='large' className='bottomIcons'/>) : (<PlayArrowIcon fontSize='large' className='bottomIcons'/>)}
                            </IconButton> */}

                            <Box sx={{ width: 200 }} style={{display: 'flex'}}>
                            {/* <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center" > */}
                            <IconButton onClick={onMute} className='bottomIcons'>
                                {muted ? (<VolumeOffIcon fontSize='large' style={{marginTop: '-5px'}} className='bottomIcons'/>) : (<VolumeUpIcon fontSize='large' style={{marginTop: '-5px'}} className='bottomIcons'/>)}
                            </IconButton>    
                                <Slider
                                 aria-label="Volume"
                                 value={volume * 100}
                                 style={{color: '#fff', marginTop: '10px'}}
                                 onChange={onvolumechange}
                                 onChangeCommitted={onVolumeSeekUp}
                                  />
                            {/* </Stack> */}
                            </Box>

                            <Button variant='text' style={{color:'#fff', margin: '0 16px'}}>
                                <Typography style={{ width: '100px'}}> {film.title}</Typography>
                            </Button>

                        </Grid>
                        
                    </Grid>
                    <Grid item>
                        <Button onClick={handlePopover} variant='text' className='bottomIcons'>
                            <Typography className='bottomIcons' color='#fff'>{playbackRate}x</Typography>
                        </Button>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                            }}
                        >
                            <Grid container direction='column-reverse'>
                            {[0.5, 1, 1.5, 2].map(rate=>(<Button onClick={()=>onPlaybackRateChange(rate)} variant='text'>
                                <Typography color={rate===playbackRate?'secondary':'default'}>{rate}</Typography>
                            </Button>))}
                            </Grid>
      </Popover>

                        <IconButton className='bottomIcons'>
                            <FullscreenIcon fontSize='large' className='bottomIcons'/>
                        </IconButton>
                    </Grid>
                </Grid> ) : (
                  <Grid container direction='row' alignItems='center' justifyContent='center' style={{display: 'flex', marginBottom: '30px'}}>
                  <Grid item xs={10}>
                      <PrettoSlider 
                          min={0}
                          max={100}
                          value={played * 100}
                          onChange={onSeek}
                          onMouseDown={onSeekMouseDown}
                          onChangeCommitted={onSeekMouseUp}
                          ValueLabelComponent={(props)=>(
                            <ValueLabelComponent{...props} value={elapsedTime}/>
                            )}
                          style={{color: '#fff'}}
                          
                      />
                  </Grid>
                  <Grid item style={{display: 'flex'}}>
                          <Button onClick={onChangeDisplayFormat} variant='text' style={{color:'#fff', marginRight: '5px', marginTop: '10px'}}>
                              <Typography fontSize='10px'> {elapsedTime}/{totalDuration}</Typography>
                          </Button>
                      <Grid container alignItems='center' justifyContent='center' direction='row'>

                          <Box sx={{ width: 200 }} style={{marginTop: '5px', display: 'flex'}}>
                          {/* <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center" > */}
                          <IconButton onClick={onMute} className='bottomIcons'>
                              {muted ? (<VolumeOffIcon fontSize='5px' className='bottomIcons'/>) : (<VolumeUpIcon fontSize='5px' className='bottomIcons'/>)}
                          </IconButton>    
                              <Slider
                               aria-label="Volume"
                               value={volume * 100}
                               style={{color: '#fff', marginTop: '5px'}}
                               onChange={onvolumechange}
                               onChangeCommitted={onVolumeSeekUp}
                                />
                          {/* </Stack> */}
                          </Box>

                      </Grid>
                      
                  </Grid>
                  <Grid item>
                      <Button onClick={handlePopover} variant='text' className='bottomIcons'>
                          <Typography fontSize='10px'>{playbackRate}x</Typography>
                      </Button>
                      <Popover
                          id={id}
                          open={open}
                          anchorEl={anchorEl}
                          onClose={handleClose}
                          anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                          }}
                      >
                          <Grid container direction='column-reverse'>
                          {[0.5, 1, 1.5, 2].map(rate=>(<Button onClick={()=>onPlaybackRateChange(rate)} variant='text'>
                              <Typography fontSize='10px' color={rate===playbackRate?'secondary':'default'}>{rate}</Typography>
                          </Button>))}
                          </Grid>
    </Popover>

                      <IconButton className='bottomIcons'>
                          <FullscreenIcon style={{marginTop: '5px'}} fontSize='10px' className='bottomIcons'/>
                      </IconButton>
                  </Grid>
              </Grid> 
                )

                }}

                </Media>

            </div>
        </div>
    )
})

export default PlayerControls
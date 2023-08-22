import React from 'react'
import ReactPlayer from 'react-player';
import { useState } from 'react';

export const Evolution = () => {

    const [video, setVideo] = useState(1)
    const cerrarVideo = () => {
        setVideo(1)
       }

       
  return (
    <div>
    <ReactPlayer 
        url={require('.././videos/Untitled.mp4')}
        width='100%'
        height='100%'
        onEnded={() => cerrarVideo()}
        playing
       />
    </div>
  )
}


/* export default connect(mapStateToProps, mapDispatchToProps)(Evolution) */
export default Evolution
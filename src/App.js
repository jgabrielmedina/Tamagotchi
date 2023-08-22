import { useEffect, useState, useCallback } from 'react';
import './App.css';
import React from 'react';
import { getDigimon } from './services/getDigimon';
import ReactPlayer from 'react-player';

function App() {
  const [digimon, setDigimon] = useState([])
  const [myDigi, setMyDigi] = useState(0)
  const [imagen, setImagen] = useState([])
  const [nextEvo, setNextEvo] = useState([])
  const [level, setLevels] = useState('')
  const [video, setVideo] = useState(1)
  const [nivel, setNivel] = useState(0)
  const [cantidadEvo, setCantidadEvo] = useState(0)

  const babysI = [401,755,746,828,950,948,1141,1149,955,273,600,1412,292]
  const indiceAleatorio = Math.floor(Math.random() * babysI.length);
  const babyI = babysI[indiceAleatorio];

  useEffect(() => {
    (async () => {
      setDigimon(await getDigimon(babyI));
    })();
  }, []);


  const ejecutar = (digimon) => {
    setMyDigi(digimon);
    setImagen(digimon.images[0].href)
    setNextEvo(digimon.nextEvolutions)
    setLevels(digimon.levels[0].level)
  }

  const evolution = (next) => {
    setNivel(nivel + 1)
   
    
    if (level === 'Ultimate' || nextEvo.length === 0) {

      return
    }
    if(cantidadEvo === 0 && nivel<4){
      return
    }
    if(cantidadEvo === 1 && nivel<9){
      return
    }
    if(cantidadEvo === 2 && nivel<14){
      return
    }
    if(cantidadEvo === 3 && nivel<19){
      return
    }
    if(cantidadEvo === 4 && nivel<24){
      return
    }

    abrirVideo()
    const evo = Math.floor(Math.random() * next.length);
    
    (async () => {
      setDigimon(
        await getDigimon(next[evo].id)
      );
    })();
    (async () => {
      ejecutar(await getDigimon(next[evo].id));
    })();
    setCantidadEvo(cantidadEvo + 1)
    console.log(cantidadEvo)
  }

  const abrirVideo = useCallback(() => {
    setVideo(0)
  }, [])
  const cerrarVideo = useCallback(() => {
    setVideo(1)
  }, [])



  return (
    <div className=' grid grid-cols-1 m-4 bg-sky-700 m-auto'>

      
      {myDigi === 0 &&

        <div >
          <img src="https://wikimon.net/images/thumb/1/14/Digitama_zurumon.jpg/200px-Digitama_zurumon.jpg" alt='Digitama'></img>
          <br></br>
          <button onClick={() => ejecutar(digimon)}>Eclosionar</button>
        </div>
       }

      {digimon.length !== 0 &&
        <div>
          <div className='bg-black'>

            {video === 0 &&
              <div className='absolute scale-y-150'>
                 <ReactPlayer
                  url={require('./videos/evolution.mp4')}
                  width='100%'
                  height='21rem'
                  onEnded={() => cerrarVideo()}
                  playing
                /> 
              </div>}

            <img className='m-auto mt-7 bg-black py-2' src={imagen} alt=''></img>
          </div>
          
          <div className='mx-9 my-4 py-3 bg-white border-2 border-black'>
          <p className='text-3xl  start font-bold text-center px-2 text-teal-300'>{myDigi.name}</p>
          <p className='text-center px-2 text-lg font-bold text-teal-300'>{level}</p>
          <p className='text-center px-2 text-2xl font-bold text-teal-300'>Level: {nivel}</p>
          {nivel !== 30 &&  <button className='border border-teal-300 bg-sky-700 py-5 my-2 rounded-xl w-3/5 m-4 text-2xl font-bold text-teal-300   ' onClick={() => evolution(nextEvo)}>Level Up</button> }
          </div>
        


   
      
              
          
     
        </div>
      }

    </div>

  );
}

export default App;

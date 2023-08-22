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
  const [alimento, setAlimento] = useState(0)

  const babysI = [401,755,746,828,950,948,1141,1149,955,273,600,1412,292]
  const indiceAleatorio = Math.floor(Math.random() * babysI.length);
  const babyI = babysI[indiceAleatorio];

  useEffect(() => {
    (async () => {
      setDigimon(await getDigimon(babyI));
    })();
  }, []);

  useEffect(() => {
    console.log('evoluciono')

  }, [digimon]);



  const ejecutar = (digimon) => {
    setMyDigi(digimon);
    setImagen(digimon.images[0].href)
    setNextEvo(digimon.nextEvolutions)
    setLevels(digimon.levels[0].level)
  }

  const evolution = (next) => {
    setAlimento(alimento + 1)
    
    if (level === 'Ultimate' || nextEvo.length === 0 || alimento<=3) {
      return
    }
    abrirVideo()
    const evo = Math.floor(Math.random() * next.length);
    { console.log(next[evo].id) }
    (async () => {
      setDigimon(
        await getDigimon(next[evo].id)
      );
    })();
    (async () => {
      ejecutar(await getDigimon(next[evo].id));
    })();
    setAlimento(0)
  }

  const abrirVideo = useCallback(() => {
    setVideo(0)
  }, [])
  const cerrarVideo = useCallback(() => {
    setVideo(1)
  }, [])



  return (
    <div>





      {myDigi === 0 &&

        <div>
          <img src="https://wikimon.net/images/thumb/1/14/Digitama_zurumon.jpg/200px-Digitama_zurumon.jpg" alt='Digitama'></img>
          <br></br>
          <button onClick={() => ejecutar(digimon)}>Eclosionar</button>

        </div>
      }


      {myDigi.length !== 0 &&
        <div>

  

          <div className='bg-black'>

            {video === 0 &&

              <div className='absolute scale-y-150 max-w-80 h-auto'>
                 <ReactPlayer
                  url={require('./videos/evolution.mp4')}
                  width='100%'
                  height='22rem'
                  onEnded={() => cerrarVideo()}
                  playing
                /> 
              </div>}


            <img className='m-auto rounded-xl my-5 p-5 max-w-80 h-auto  ' src={imagen} alt=''></img>
          </div>

          <p>{myDigi.name}</p><p>{level}</p>
          {console.log(nextEvo)}
          { level !== 'Ultimate' && 
               <button onClick={() => evolution(nextEvo)}>Alimentar</button>
          }
     
        </div>
      }


    </div>

  );
}

export default App;

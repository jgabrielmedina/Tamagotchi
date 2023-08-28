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

  const babysI = [401, 755, 746, 828, 950, 948, 1141, 1149, 955, 273, 600, 1412, 292]
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
    if (cantidadEvo === 0 && nivel < 4) {
      return
    }
    if (cantidadEvo === 1 && nivel < 9) {
      return
    }
    if (cantidadEvo === 2 && nivel < 14) {
      return
    }
    if (cantidadEvo === 3 && nivel < 19) {
      return
    }
    if (cantidadEvo === 4 && nivel < 24) {
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

    <div className=' grid grid-cols-1 m-4 m-auto md:w-[40rem] mt-12 relative'>

      {digimon.length !== 0 &&
        <div className='border border-red-500 m-auto md:w-full'>
          <div className=' border absolute z-50 grid grid-cols-2 w-full  top-36 items-center'>
            <p className=' border text-white  text-7xl h-full grid grid-cols-1 content-center text-start pl-10 neon'>{nivel}</p>
            <div className='border text-white text-xl h-full grid grid-cols-1 grid-rows-6 content-center'>
              {/* <p className='text-right text-3xl row-start-2 pr-3 pt-1' >Level Up</p> */}
              {nivel !== 30 && 
              <button className='border text-right text-3xl row-start-2 pr-3 pt-1 neon hover:text-4xl hover:pr-1 duration-150 ' onClick={() => evolution(nextEvo)}>Level Up</button>
              }
              <button className='border text-right text-3xl row-start-5 pr-7 pt-2 neon'>Detalle</button>
            </div>
          </div>

          {video === 0 &&
              <div className='absolute top-[8.05rem] left-[222px] m-auto w-[249.5px] scale-y-[1.77] items-center z-50'>

                <ReactPlayer
                  playsinline attr
                  url={require('./videos/evolution5.mp4')}
                  width='80%'
                  height='21rem'
                  onEnded={() => cerrarVideo()}  
                  playing
                />

              </div>
            }
          <div className='my-48 py-[3px] pl-1 brightness-100 contrast-75'>
            <img className=' m-auto w-[203px] rounded-2xl border-2 border-neutral-900 ' src={imagen} alt=''></img>
          </div>

          {/*    <div className='mx-9 my-4 py-3 bg-white border-2 border-black'>
            <p className='text-3xl  start font-bold text-center px-2 text-teal-300'>{myDigi.name}</p>
            <p className='text-center px-2 text-lg font-bold text-teal-300'>{level}</p>
            <p className='text-center px-2 text-2xl font-bold text-teal-300'>Level: {nivel}</p>
            {nivel !== 30 && <button className='border border-teal-300 bg-sky-700 py-5 my-2 rounded-xl w-3/5 m-4 text-2xl font-bold text-teal-300   ' onClick={() => evolution(nextEvo)}>Level Up</button>}
          </div>  */}

{myDigi === 0 &&

<div>
  <div className='my-48 py-[3px] pl-1 brightness-100 contrast-75'>
  <img className='m-auto w-[203px] rounded-2xl border-2 border-neutral-900 absolute bottom-[0.08rem] left-[13.7rem]' src="https://wikimon.net/images/thumb/1/14/Digitama_zurumon.jpg/200px-Digitama_zurumon.jpg" alt='Digitama'></img>
  </div>
  <br></br>
  <button className='neon bg-blue-500 w-36 h-12 rounded-xl text-2xl   ' onClick={() => ejecutar(digimon)}>Eclosionar</button>
</div>
}






        </div>
      }

    </div>

  );
}

export default App;

import { useEffect, useState, useCallback } from 'react';
import './App.css';
import React from 'react';
import { getDigimon } from './services/getDigimon';
import ReactPlayer from 'react-player';
import Modal from './components/Modal';
import { useModal } from './useModal';
import {IoHeartHalf, IoHeartOutline, IoHeartSharp} from 'react-icons/io5';
import {FaAngry, FaGrinBeam,FaMeh} from 'react-icons/fa';

function App() {
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [digimon, setDigimon] = useState([])
  const [myDigi, setMyDigi] = useState(0)
  const [imagen, setImagen] = useState([])
  const [nextEvo, setNextEvo] = useState([])
  const [level, setLevels] = useState('')
  const [video, setVideo] = useState(1)
  const [cara, setCara] = useState(0)
  const [heart, setHeart] = useState(0)
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
    console.log(digimon)
  }

  const evolution = (next) => {
    setNivel(nivel + 1)
    if(cara!==2 && heart!==2 || level === 'Ultimate'){
      return
    }
    else if (cantidadEvo === 0 && nivel < 4) {
      return
    }
    else if (cantidadEvo === 1 && nivel < 9) {
      return
    }
    else if (cantidadEvo === 2 && nivel < 14) {
      return
    }
    else if (cantidadEvo === 3 && nivel < 19) {
      return
    }
    else if (cantidadEvo === 4 && nivel < 24 ) {
      return
    }
    else if (cantidadEvo === 5 && nivel < 29) {
      return
    }

    abrirVideo()
    const evo = Math.floor(Math.random() * next.length);
  
    if(next[evo].id === null){
      return 
    }
    (async () => {
      setDigimon(
        await getDigimon(next[evo].id)
      );
    })();
    (async () => {
      ejecutar(await getDigimon(next[evo].id));
    })();
    setCantidadEvo(cantidadEvo + 1)
    setCara(1)
    setHeart(0)
  }

  const abrirVideo = useCallback(() => {
    setVideo(0)
  }, [])
  const cerrarVideo = useCallback(() => {
    openModal()
    setVideo(1)
  }, [])

  const face = () => {
    if(cara===2){return}
    setCara(cara + 1)
  }
  const heartFunction = () => {
    if(heart===2){return}
    setHeart(heart + 1)
  }

  let icono = null 
  
  
  if(cara===0){
    icono = <FaAngry className='text-red-500 text-5xl'/>
  }
  else if (cara === 1) {
    icono = <FaMeh className='text-yellow-500  text-5xl'/>
  } else if (cara ===2){
    icono = <FaGrinBeam className='text-green-600 text-5xl '/>
  }

  let iconoHeart = null 

  if(heart===0){
    iconoHeart = <IoHeartOutline className='text-red-500 text-5xl'/>
  }
  else if (heart === 1) {
    iconoHeart  = <IoHeartHalf className='text-red-500 text-5xl'/>
  } else if (heart ===2){
    iconoHeart  = <IoHeartSharp className='text-red-600 text-5xl'/>
  }

  let msg = 0;

  if(cara === 2 && heart === 2 && level !== 'Ultimate'){
    msg = 1;
  }

  return (

    <div className=' grid grid-cols-1 m-4 m-auto md:w-[40rem] mt-12 relative'>

      {digimon.length !== 0 &&
        <div className='m-auto md:w-full'>
          <div className='hidden md:block'>
          <div className='absolute z-50 grid grid-cols-2 w-full  top-36 items-center'>
            <p className='text-white  text-7xl h-full grid grid-cols-1 content-center text-start pl-11 pt-2 neon'>{nivel}</p>
            <div className='text-white text-xl h-full grid grid-cols-1 grid-rows-6 content-center'>
              {/* <p className='text-right text-3xl row-start-2 pr-3 pt-1' >Level Up</p> */}
              {nivel !== 30 && 
              <button className=' text-right text-3xl row-start-2 pr-5 pt-1 neon hover:font-bold' onClick={() => evolution(nextEvo)}>Level Up</button>
              }
              <button className='  text-right text-3xl row-start-5 pr-9 pt-[12px] neon hover:font-bold' onClick={openModal}>Detalle</button>
            </div>
          </div>
          </div>
          
          {video === 0 &&
             
              <div className='hidden md:block md:absolute top-[8rem] left-[222px] m-auto w-[249.5px] scale-y-[1.77] items-center z-50'>
                <ReactPlayer
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

          <div className='md:hidden bg-blue-600 rounded-xl h-20 mt-[-4rem]'>
          <p className=' neon h-1/2 pt-1 text-3xl'>{nivel}</p>
            <div className=' neon flex justify-evenly py-1'>
              {/* <p className='text-right text-3xl row-start-2 pr-3 pt-1' >Level Up</p> */}
              {nivel !== 30 && 
              <button className='w-1/2 border-r' onClick={() => evolution(nextEvo)}>Level Up</button>
              }
              <button className='w-1/2' onClick={openModal}>Detalle</button>
            </div>
            {myDigi===0 &&   <button className='neon bg-blue-500 w-36 h-12 rounded-xl text-2xl mt-4' onClick={() => ejecutar(digimon)}>Eclosionar</button> }
          
          </div>

{myDigi === 0 &&

<div className='hidden md:block '>
  <div className='my-48 py-[3px] pl-1 brightness-100 contrast-75'>
  <img className='m-auto w-[203px] rounded-2xl border-2 border-neutral-900 absolute bottom-[0.08rem] left-[13.7rem]' src="https://wikimon.net/images/thumb/1/14/Digitama_zurumon.jpg/200px-Digitama_zurumon.jpg" alt='Digitama'></img>
  </div>
  <br></br>
  <button className='neon bg-blue-500 w-36 h-12 rounded-xl text-2xl' onClick={() => ejecutar(digimon)}>Eclosionar</button>
</div>
}

        <Modal isOpen={isOpenModal} closeModal={closeModal}>

        <div className='py-4 md:flex md:flex-row gap-8'>
          <img className='border-r w-[27rem] ' src={imagen}></img>




          <div className=' basis-1/2  m-auto'>
          <p className={`
          ${level === 'Ultimate' ? 'text-orange-400' : 'text-blue-600'} 
          ${level === 'Perfect' ? 'text-pink-500' : 'text-blue-600'} 
          font-bold text-2xl`}>{myDigi.name}  </p>
             <p className={`
          ${level === 'Ultimate' ? 'text-orange-400' : 'text-blue-600'} 
          ${level === 'Perfect' ? 'text-pink-500' : 'text-blue-600'} 
          text-lg`}>&#40;{level}&#41;</p>
          <div className='flex flex-col  my-20 '>
         
         <div className='flex  justify-center gap-2'>
          <p className=' text-2xl text-red-500'>
          {icono}
          </p>
          <p className=' text-2xl'>
          {iconoHeart} 
          </p>
          </div>

          <div className='mt-5'> 
          <button className={`
          ${level === 'Ultimate' ? 'text-orange-400' : 'text-blue-600'} 
          ${level === 'Perfect' ? 'text-pink-500' : 'text-blue-600'} 
          font-bold text-md text-blue-600 px-2`} onClick={()=>{face()}}>Play</button>
          <button className={`
          ${level === 'Ultimate' ? 'text-orange-400' : 'text-blue-600'} 
          ${level === 'Perfect' ? 'text-pink-500' : 'text-blue-600'} 
          font-bold text-md text-blue-600 px-2 pl-4`} onClick={()=>{heartFunction()}}>Heal</button>
        
          </div>
         
          </div>
          {msg !== 0 ? <p className='text-[10px]'>Evolution available</p> : <p className='text-[10px]'>Evolution not available</p>}
          </div>




        </div>

        </Modal>





        </div>
      }

    </div>

  );
}

export default App;

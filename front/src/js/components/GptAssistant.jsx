import React, { useState, useContext, useEffect, useRef } from 'react'
import { Context } from '../store/appContext'
import Lottie from "lottie-react";
import animatedLogo from "../../lotties/foai_animated_logo.json"

const GptAssistant = () => {
  const { store, actions } = useContext(Context)
  const previousKey = useRef()
  const myAudio = useRef()

  const [txt, setTxt] = useState()

  const increaseTextAreaHeight = (element) => {
    let numberOfLineBreaks = (element.value.match(/\n/g) || []).length;
    // min-height + lines x line-height + padding + border
    let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
    element.style.height = newHeight+"px";
  }

  useEffect(() => {
    if(store.audio?.src){
        myAudio.current.play()
    }
  }, [store.audio])

  useEffect(() => {
    if (store.currentLanguage === "en_US") {
        setTxt(require("../../lang/components/en_US/GptAssistant.en_US.json"))
    }else if(store.currentLanguage === "es_ES"){
        setTxt(require("../../lang/components/es_ES/GptAssistant.es_ES.json"))
    }
  }, [store.currentLanguage])

  return (
    <div className='container h-100 d-flex flex-column justify-content-between align-items-center'>
        <div role='button' onClick={() => {
          if(store.audio){
            myAudio.current.paused ? myAudio.current.play() : myAudio.current.pause()
          }
        }}>
          <audio ref={myAudio} src={"data:audio/mp3;base64,"+store.audio?.src}></audio>
          <Lottie animationData={animatedLogo} />
        </div>
        
        <div className='mb-5 w-100 d-flex flex-column justify-content-end align-items-center'>
          <textarea className="form-control mb-5 w-50" title={txt?.inputHelp} placeholder={txt?.inputMessage} style={{resize: "none", height: "38px"}} onKeyUp={(e) => increaseTextAreaHeight(e.target)} onKeyDown={(e) => {
              if ((previousKey.current !== "Shift" || previousKey.current === "Enter") && e.key === "Enter"){
                e.preventDefault()
                // eslint-disable-next-line
                !e.target.value == "" && actions.createGpt(e.target.value, store.currentLanguage)
                e.target.value = "";
              }
              previousKey.current = e.key 
          }}></textarea>
        </div>
    </div>
  )
}

export default GptAssistant
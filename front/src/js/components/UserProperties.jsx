/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { Context } from "../store/appContext";
import enUsFlag from "../../icons/flags/en_US.svg";
import esEsFlag from "../../icons/flags/es_ES.svg";

const UserProperties = () => {
    const { store, actions } = useContext(Context)

    const [theme, setTheme] = useState(store.currentTheme)
    const [lang, setLang] = useState(store.currentLanguage)
    const [txt, setTxt] = useState()

    useEffect(() => {
        actions.setTheme(theme)
    }, [theme])

    useEffect(() => {
        actions.setLanguage(lang) 
    }, [lang])

    useEffect(() => {
        if (store.currentLanguage === "en_US") {
            setTxt(require("../../lang/components/en_US/UserProperties.en_US.json"))
        }else if(store.currentLanguage === "es_ES"){
            setTxt(require("../../lang/components/es_ES/UserProperties.es_ES.json"))
        }
      }, [store.currentLanguage])
    
    return (
        <>
            {/* Inicio Toggle modo dark */}
            <div className="dropdown dropup position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
                <button className="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center"
                    id="bd-theme"
                    type="button"
                    title={txt?.manageProperties}
                    aria-expanded="false"
                    data-bs-toggle="dropdown">
                    <i className={store.currentTheme === "light" ? "bi bi-sun-fill" : "bi bi-moon-stars-fill"}></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="bd-theme-text">
                    <li>
                        <button type="button" className="dropdown-item d-flex align-items-center" title={txt?.tooltipLight} data-bs-theme-value="light" aria-pressed="false" onClick={() => setTheme('light')}>
                            <i className="bi bi-sun-fill me-2 opacity-50 theme-icon" width="1em" height="1em"></i>
                            {txt?.themeLight}
                        </button>
                    </li>
                    <li>
                        <button type="button" className="dropdown-item d-flex align-items-center" title={txt?.tooltipDark} data-bs-theme-value="dark" aria-pressed="false" onClick={() => setTheme('dark')}>
                            <i className="bi bi-moon-stars-fill me-2 opacity-50 theme-icon" width="1em" height="1em"></i>
                            {txt?.themeDark}
                        </button>
                    </li>
                    <li className='d-flex py-1 justify-content-center'>
                        <button className={lang === "en_US" ? 'btn' : 'btn opacity-25'} title={txt?.tooltipEn} onClick={() => setLang('en_US')}>
                            <img src={enUsFlag} width="30px" alt="United States flag" />
                        </button>
                        <button className={lang === "es_ES" ? 'btn' : 'btn opacity-25'} title={txt?.tooltipEs} onClick={() => setLang('es_ES')}>
                            <img src={esEsFlag} width="30px" alt="Spain flag" />
                        </button>
                        
                    </li>
                </ul>
            </div>
            {/* Fin Toggle modo dark */}
        </>
    )
}

export default UserProperties
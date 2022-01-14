import React from  'react'
import css from './Preloader.module.scss'

type PropsType = {}
const Preloader: React.FC<PropsType> = () => {
    return <>

        <div>
            <div className={css.loader}/>
        </div>

    </>
}

export default React.memo(Preloader)
import React from 'react'
import loading from './SPINNER.gif'
const Spinner = () => {

    return (
        <div className='text-center'>
            <img src={loading} alt="Loading..." />
        </div>
    )
}

export default Spinner
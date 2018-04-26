import React from 'react'

export default (props) => {
    console.log(props)
    return (
        <div className="loader">
            <h1 className="loader__indicator">Loading...</h1>
        </div>
    )
}
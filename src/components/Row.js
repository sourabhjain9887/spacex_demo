import React from 'react'
import './Home.css'

const Row = (data) => {
    return (
        <>
            <tr>
                <td>{data.flight_number}</td>
            </tr>
        </>
    )
}

export default Row

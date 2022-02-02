import React from 'react'

const Filter = ( {handler, value} ) => 
    <div>
        filter shown with <input
            value={value}
            onChange={handler}/>
    </div>

export default Filter
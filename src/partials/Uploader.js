import { useState } from 'react'

const Uploader =  () => {
    const [ status, setStatus ] = useState(false)


    return (
        <div>
            <input type="file" name="file"/>    
        </div>
    )
}
 
export default Uploader;
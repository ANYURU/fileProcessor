import { useState } from 'react'

const Uploader =  () => {
    const [ json, setJson ] = useState()
    const [ status, setStatus ] = useState()
    const [ text, setText ] = useState()
    const [ selected, setSelected ] = useState()
    const handleClick = ( id, importFileCallback ) => {
        try {
            const feedback = importFileCallback(id)
            if(feedback?.message === null) {
                setText("No file has been selected") 
            } 
            else {
                setText(feedback.message)
            } 
        } catch (error){ 
            console.log(error)
        }
    }

    /**
     * @param {Object} event An event triggered by the onClick event handler of the upload button element.
     * @param {Object} requiredFields An array of fields that the user wants to extract from the file. Each element of the array should be a String and is case sensitive.
     * @param {Object} defaultFields An object containing a key and value of default fields.
     * @returns {Object} An array of items, each containing the fields specified by the user.
     */
    const handleJSON = async (event, requiredFields = ["email", "name"], defaultFields={password:"changeit"}) =>  {
        const { users } = JSON.parse(event.target.result)
        const data = []

        for(let i = 0; i < users.length; i++) {  
            const selectedFields = {...defaultFields}
            
            requiredFields.forEach(requiredField => {
                selectedFields[requiredField] = users[i][requiredField]
            })

            data.push(selectedFields)
        }
        return await data
    }
    


    /**
     * @param {Object} event An event triggered by the onClick event handler of the upload button element.
     * @param {Object} requiredFields An array of fields that the user wants to extract from the file. Each element of the array should be a string and is case sensitive.
     * @param {Object} defaultFields An object containing a key and value of default fields.
     * @returns {Object} An array of items, each containing the fields specified by the user.
     */

     const handleCsv = async (event, requiredFields = ["Login email", "First name", "One-time password"], defaultFields={}) => {
        const rows = event.target.result.split("\n")
        let fields = rows[0].split(";")
        const users  = []
        const fieldPositions = {}
        
        requiredFields.forEach(requiredField => fieldPositions[requiredField] = fields.indexOf(requiredField))
    
        for(let i = 1; i < rows.length; i++){
            const row = rows[i].split(";")
            const selectedFields = {...defaultFields}
            requiredFields.forEach((requiredField) => selectedFields[requiredField] = row[fieldPositions[requiredField]])
            users.push(selectedFields)
        }
        return await users
    }


    /**
     * @param {String} importedElement The id of the element where the user selects the element
     * @returns {Object} JSON object that has an array of items, each containing the fields specified by the user.
     */
    const importFile = (importedElement) => {

        const importedFile = document.getElementById(importedElement).files[0]
        if(importedFile) {

            const reader = new FileReader()
            const extension = importedFile.name.split('.').pop()
            const filename = importedFile.name
            
            reader.onload = async function(event) {
                if(extension === 'csv') {
                    setJson(await handleCsv(event))
                }
    
                if(extension === 'json') {
                    setJson(await handleJSON(event))
                }
            }
            
            reader.readAsText(importedFile)
            console.log(importedFile.name.split('.').pop())
            console.log(importedFile.type)
            console.log(json)   
            setStatus(true)
            return {message: `${filename} has successfully been imported.`}
        }

        setText("No File Selected")
        setStatus(true)
        return {message: null}   
    }


    return (
        <div style={{display: "flex", gap:"20px"}}>
            {/* Restricting the file uploader to accept files with .csv, .sql and .json file extensions.*/}
            <input id="imported-element"type="file" name="file" accept=".csv, .sql, .json" onChange={event => {
                const reader = new FileReader()
                const selectedFile = document.getElementById(event.target.id).files[0]
                reader.readAsText(selectedFile)
                setText(`${selectedFile.name} has been selected.`)
                setSelected(true)
            }}/>    
            <button onClick={() => {
                handleClick("imported-element", importFile)
                setSelected(false)
            }}>Import</button>
            <button onClick={()=> {
                console.log(json)
            }}>log data</button>
        
            {
                selected === true && <div>{text}</div>     
            }
            {
                status === true && <div>{text}</div>  
            }
            
        </div>
    )
}
 
export default Uploader;
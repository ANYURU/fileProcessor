import { useState } from 'react'

const Uploader =  () => {
    const [ json, setJson ] = useState()

    /**
     * @param {Object} event An event triggered by the onClick event handler of the upload button element.
     * @returns {Object} An array of items, each containing the fields specified by the user.
     */
    const handleJSON = async (event, requiredFields = ["email", "name"], defaultFields={password:"changeit"}) =>  {
        const { users } = JSON.parse(event.target.result)
        const cleanedFileContent = []

        for(let i = 0; i < users.length; i++) {  
            const selectedFields = {...defaultFields}
            
            requiredFields.forEach(requiredField => {
                selectedFields[requiredField] = users[i][requiredField]
            })
            cleanedFileContent.push(selectedFields)
        }
        return await cleanedFileContent  
    }



    /**
     * @param {Object} event An event triggered by the onClick event handler of the upload button element.
     * @returns {Array} An array of items, each containing the fields specified by the user.
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
        const reader = new FileReader()
        const extension = importedFile.name.split('.').pop()
        
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
    }


    return (
        <div style={{display: "flex", gap:"20px"}}>
            <input id="imported-element"type="file" name="file" accept=".csv, .sql, .json"/>    
            <button onClick={()=>{
                importFile("imported-element")
            }}>Upload </button>
            <button onClick={()=> {
                console.log(json)
            }}>log data</button>

        </div>
    )
}
 
export default Uploader;
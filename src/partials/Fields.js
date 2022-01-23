import { Form } from 'react-bootstrap'
// import { useState } from 'react'
import { useForm } from '../hooks/Form'

const Fields = ({ fields }) => {
    const { formData, setFormData } = useForm()
    
    const handleChange = (event, data=formData) => {
        data[event.target.id] = event.target.checked
        setFormData(data)
    }



    console.log(formData)

    return (
        <>
            <Form>
                {
                    fields.map((field, index) => 
                        <Form.Check key={index} >
                            <Form.Check.Input id={field} onChange={(event) => {
                                handleChange(event)
                            }}/>
                            <Form.Check.Label>{field}</Form.Check.Label>
                            <Form.Control.Feedback>Selected</Form.Control.Feedback>
                        </Form.Check>
                    )
                }
            </Form>
        </>
    );
}
 
export default Fields;
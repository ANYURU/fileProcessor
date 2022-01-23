import { useState } from 'react'
import { FormContext } from '../contexts/Form';

export default function FormProvider({ children }) {
    const [formData, setFormData] = useState({})

    const initialValues = {
        formData,
        setFormData
    }
    
    return ( 
        <FormContext.Provider value={initialValues}>
            {children}
        </FormContext.Provider>
    );
}

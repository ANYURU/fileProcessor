import { FormContext } from "../contexts/Form";
import { useContext } from "react";

export const useForm = () => {
    return useContext(FormContext)
}
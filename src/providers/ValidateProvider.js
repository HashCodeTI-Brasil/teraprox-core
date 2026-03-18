import React, { createContext, useContext, useRef } from "react"

const ValidationContext = createContext()

export const ValidateProvider = ({ children }) => {
    const validationRefs = useRef([])

    const registerValidator = (ref) => {
        if (!validationRefs.current.includes(ref)) {
            validationRefs.current.push(ref)
        }
    }

    const unregisterValidator = (ref) => {
        validationRefs.current = validationRefs.current.filter((v) => v !== ref)
    }

    const validateAll = () => {
        let acumulator = 0
        for (let validate of validationRefs.current) {
            let valid = validate()
            if (valid) acumulator = acumulator + 1
        }
        if (acumulator == validationRefs.current.length) return true
        return false
    }

    return (
        <ValidationContext.Provider
            value={{ registerValidator, unregisterValidator, validateAll }}
        >
            {children}
        </ValidationContext.Provider>
    )
}

export const useValidation = () => {
    return useContext(ValidationContext)
}

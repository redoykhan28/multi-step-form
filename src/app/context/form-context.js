'use client';

import { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const [data, setData] = useState({});

    const updateFormData = (newData) => {
        setData((prev) => ({ ...prev, ...newData }));
    };

    return (
        <FormContext.Provider value={{ data, updateFormData }}>
            {children}
        </FormContext.Provider>
    );
};

export const useFormContext = () => useContext(FormContext);

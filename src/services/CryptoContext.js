import React, { createContext, useState, useEffect, useContext } from 'react'

const Crypto = createContext()

const CryptoContext = ({ children }) => {
    const [Currency, setCurrency] = useState("EUR")
    const [Symbol, setSymbol] = useState('€')
    
    useEffect(() => {
        if(Currency === "EUR") setSymbol('€')
        else if (Currency === "USD") setSymbol('$')
    }, [Currency])

    return (
      <Crypto.Provider value={{Currency, Symbol, setCurrency}}>
          {children}
      </Crypto.Provider>

    )
}

export default CryptoContext;

export const CryptoState = () => {
   return useContext(Crypto)
}
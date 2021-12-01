import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api';
import { CryptoState } from '../services/CryptoContext';

const Coinstable = () => {
    const [Coin, setCoin] = useState([]);
    const [Loading, setLoading] = useState(false);

    const { Currency } = CryptoState()

    const fetchCoins = async () => {
        setLoading(true)
        const { data } = await axios.get(CoinList(Currency))
        setCoin(data)
        setLoading(false)
    }

    useEffect(() => {
         fetchCoins()
    }, [Currency]);

    return (
        <>
        hi
        </>
    )
}

export default Coinstable

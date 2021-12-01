import {  makeStyles } from '@material-ui/core'
import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { CryptoState } from '../services/CryptoContext'
import { TrendingCoins } from "../config/api"
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    carousel: {
        height: "80%",
        display: "flex",
        alignItems: "center",
        marginTop: 50
    },
    carouselItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        textTransform: 'uppercase',
        color: 'white'
    }
}))

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const Carousel = () => {

    const [trending, setTrending] = useState([])

    const classes = useStyles()

    const { Currency, Symbol } = CryptoState()

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(Currency))
        setTrending(data)
    }


    useEffect(() => {
        fetchTrendingCoins()
    }, [Currency])

    const items = trending.map((coin) => {

        let profit = coin.price_change_percentage_24 >= 0


        return(
            <Link className={classes.carouselItem}
                  to={`/coin/${coin.id}`}>
                      <img src={coin.image}
                       alt={coin.name}
                       height="80"
                       style={{ marginBottom: 10 }} />
                       <span>
                           {coin?.symbol}
                           &nbsp;
                           <span style={{
                               color: profit > 0 ? "rgb(14,203,129)" : "red",
                               fontWeight: 500
                           }}>
                            {profit && "+"}
                            {coin?.price_change_percentage_24h?.toFixed(2)}%
                           </span>
                       </span>
                       <span style={{ fontSize: 22, fontWeight: 500}}>
                        {Symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                       </span>
            </Link>
        )
    })

    const responsive = {
        0: {
            items: 2
        },
        512: {
            items: 4
        }
    }

    return (
        <div className={classes.carousel}>
            <AliceCarousel 
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableButtonsControls
                responsive={responsive}
                autoPlay
                items={items}
            />
        </div>
    )
}

export default Carousel

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { CryptoState } from '../services/CryptoContext';
import Coininfo from '../components/Coininfo';
import {
    LinearProgress,
        Typography
} from "@material-ui/core"
import ReactHtmlParser from "react-html-parser"
import { SingleCoin } from '../config/api';
import { makeStyles } from "@material-ui/core"

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Coins = () => {
    const {id} = useParams()
    const [Coin, setCoin] = useState()

    const { Currency, Symbol } = CryptoState()

    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id))
        setCoin(data)
    }

    useEffect(() => {
        fetchCoin()
    }, [Currency]);

    const useStyles = makeStyles((theme) => ({
        container: {
            display: "flex",
            [theme.breakpoints.down("md")]: {
                flexDirection: "column",
                alignItems: "center"
            }
        },
        sidebar: {
            width: "30%",
            [theme.breakpoints.down("md")]: {
                width: "100%"
            },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 25,
            borderRight: "2px solid gray"
        },
        heading: {
            fontWeight: "bold",
            marginBottom: 20
        },
        description: {
            width: "100%",
            padding: 25,
            paddingBottom: 15,
            paddingTop: 0,
            textAlign: "justify"
        },
        marketData: {
            alignSelf: "start",
            padding: 25,
            paddinTop: 20,
            width: "100%",
            [theme.breakpoints.down("md")]: {
                display: "flex",
                justifyContent: "space-around"
            },
            [theme.breakpoints.down("sm")]: {
                flexDirection: "column",
                alignItems: "center"
            },
            [theme.breakpoints.down("xs")]: {
                alignItems: "start",
            },

        }
    }))

    const classes = useStyles()

    if (!Coin) return <LinearProgress style={{ backgroundColor: "gold"}} />

    return (
        <div className={classes.container}>
            <div className={classes.sidebar}>
                <img 
                    src={Coin?.image.large}
                    alt={Coin?.name}
                    height="200"
                    style={{ marginBottom:20 }}
                />
                <Typography variant="h3" className={classes.heading}>
                    {Coin?.name}
                </Typography>
                <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(Coin?.description.en.split(". ")[0])}.
        </Typography>
                <div className={classes.marktData}>
                    <span style={{ display:"flex" }}>
                        <Typography variant='h5' className={classes.heading}>
                            Rank:
                            </Typography>
                            &nbsp; &nbsp;
                         <Typography variant='h5'
                                        style={{

                                        }}>
                                            {Coin?.market_cap_rank}
                             </Typography>   
                    </span>
                    <span style={{ display:"flex" }}>
                        <Typography variant='h5' className={classes.heading}>
                            Current Price:
                            </Typography>
                            &nbsp; &nbsp;
                         <Typography variant='h5'
                                        style={{

                                        }}>
                                            {Symbol}{" "}
                                            {numberWithCommas(
                                                Coin?.market_data.current_price[Currency.toLowerCase()])}
                             </Typography>   
                    </span>
                     <span style={{ display:"flex" }}>
                        <Typography variant='h5' className={classes.heading}>
                            Market Cap:
                            </Typography>
                            &nbsp; &nbsp;
                         <Typography variant='h5'
                                        style={{

                                        }}>
                                            {Symbol}{" "}
                                            {numberWithCommas(
                                                Coin?.market_data.market_cap[Currency.toLowerCase()]
                                                .toString()
                                                .slice(0, -6)
                                                )}
                             </Typography>   
                    </span>
                </div>
                </div>   
                {/* {chart} */}
                <Coininfo coin={Coin}/>
        </div>
    )
}

export default Coins

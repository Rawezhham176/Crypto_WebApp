import { CircularProgress, createTheme, makeStyles, ThemeProvider } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { HistoricalChart } from '../config/api'
import { CryptoState } from '../services/CryptoContext'
import { chartDays } from "../config/data"
import SelectButton from './SelectButton'
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'

const Coininfo = ({ coin }) => {
    const [HistoricalData, setHistoricalData] = useState()
    const [Days, setDays] = useState(1)

    const { Currency } = CryptoState()

    const fetchHistoricalData = async() => {
        const { data } = await axios.get(HistoricalChart(coin.id, Days, Currency))
        setHistoricalData(data.prices)
    }

    useEffect(() => {
        fetchHistoricalData()
    }, [Days]);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff"
            },
            type: "dark"
        }
    })

    const useStyles = makeStyles((theme) => ({
        container: {
            width: "75%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 25,
            padding: 40,
            [theme.breakpoints.down("md")]: {
                width: "100%",
                marginTop: 0,
                padding: 20,
                paddingTop: 0
            }
        }
    }))

    const classes = useStyles()

    return (
         <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!HistoricalData ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: HistoricalData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return Days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: HistoricalData.map((coin) => coin[1]),
                    label: `Price ( Past ${Days} Days ) in ${Currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={day.value === Days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
    )
}

export default Coininfo

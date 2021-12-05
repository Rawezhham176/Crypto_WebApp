import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api';
import { CryptoState } from '../services/CryptoContext';
import { Container,
         createTheme,
         LinearProgress,
         Table, 
         TableBody, 
         TableCell, 
         TableContainer, 
         TableHead, 
         TableRow, 
         TextField, 
         ThemeProvider,
         Typography, 
         makeStyles,
         Paper  } from '@material-ui/core'
import { useNavigate } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';


export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Coinstable = () => {
    const [Coins, setCoin] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [Search, setSearch] = useState("");
    const [Page, setPage] = useState(1)

    const navigate = useNavigate()

    const { Currency, Symbol } = CryptoState()

    const fetchCoins = async () => {
        setLoading(true)
        const { data } = await axios.get(CoinList(Currency))
        setCoin(data)
        setLoading(false)
    }

    useEffect(() => {
         fetchCoins()
    }, [Currency]);

    const darkTheme = createTheme({
        palette: {
           primary: {
            main: "#fff",
             },
        type: "dark"
            }
    })

const handleSearch = () => {
    return Coins.filter(
      (coin) => 
        coin.name.toLowerCase().includes(Search) ||
        coin.Symbol.toLowerCase().includes(Search)
    
    );
};

    const useStyles = makeStyles(() => ({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
    },
    pagination: {
        "& .MuiPaginationItem-root": {
            color: "gold"
        }
    }
    }))

    const classes = useStyles()

    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{textAlign: "center"}}>
                <Typography
                variant='h4'
                style={{ margin: 18, 
                }}
                >
                   Cryptocurrency 
                </Typography>
                <TextField label="Search" variant="outlined" 
                style={{ marginBottom: 20, width: '100%'}} 
                onChangeText={(e) => {this.setSearch(e)}}/>
                <TableContainer component={Paper}>
          {Loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice((Page - 1) * 10, (Page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell 
                        align="right">
                          {Symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell 
                          align="right">
                          {Symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination 
            style={{
                padding: 20,
                width: "100%",
                display: "flex",
                justifyContent: "center"
            }}
            classes={{ul: classes.pagination}}
            count={(handleSearch()?.length / 10).toFixed(0)}
            onChange={(_,value) => {
                setPage(value)
                window.scroll(0,450)
            }}
        />
            </Container>
        </ThemeProvider>
    )
}

export default Coinstable

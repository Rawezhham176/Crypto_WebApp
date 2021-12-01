import React from 'react'
import { AppBar, Container, Toolbar, Typography, Select, MenuItem, makeStyles, createTheme, ThemeProvider } from '@material-ui/core'
import { useNavigate } from "react-router-dom"
import { CryptoState } from '../services/CryptoContext'

    const useStyles = makeStyles(() => ({
        title: {
            flex: 1,
            color: 'gold',
            fontWeight: 'bold',
            cursor: 'pointer'
        }
    }))

const Header = () => {

    const classes = useStyles()
    const navigate = useNavigate();

    const { Currency, setCurrency } = CryptoState()

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#fff'
            },
            type: 'dark'
        }
    })

    return (
        <ThemeProvider theme={darkTheme}>
        <AppBar color='transparent' position='static'>
            <Container>
                <Toolbar>
                    <Typography 
                    className={classes.title}
                    onClick={() => navigate('/')}
                    variant='h6'>
                        CryptoWorld
                    </Typography>
                    <Select 
                        variant='outlined' style={{
                        width: 100,
                        height: 40,
                        marginRight: 15
                                        }}
                        value={Currency}
                        onChange={(e) => setCurrency(e.target.value)}
                    >
                        <MenuItem value={'USD'}>
                        USD
                        </MenuItem>
                        <MenuItem value={'EUR'}>
                        EUR
                        </MenuItem>
                    </Select>
                </Toolbar>
            </Container>
        </AppBar>
        </ThemeProvider>
    )
}

export default Header

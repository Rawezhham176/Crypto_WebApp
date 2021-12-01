import React from 'react'
import { makeStyles, Container, Typography } from '@material-ui/core'
import Carousel from './Carousel'

const useStyles = makeStyles(() => ({
    banner: {
        backgroundImage: "url(../ban.jpg)",
        width: "100%",
    },
    bannerContent: {
        height: 500,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 25,
        justifyContent: 'space-around',
    },
    tagline: {
        display: 'flex',
        height: '40%',
        flexDirection: 'column',
        justifyContent: "center",
        textAlign: 'center'
    }
}))

const Banner = () => {

    const classes = useStyles()

    return (
        <div className={classes.banner}>
            <Container className={classes.bannerContent}>
                <div className={classes.tagline}>
                    <Typography
                        variant='h2'
                        style={{
                            fontWeight: "bold",
                            marginBottom: 15
                        }}
                        >
                            Crypto World
                        </Typography>
                        <Typography
                        variant='subtitle2'
                        style={{
                            color: "darkgray",
                            textDecoration: "capitalize"
                        }}
                        >
                            Get all Information about Cryoto
                        </Typography>
                        < Carousel />
                </div>
            </Container>
        </div>
    )
}

export default Banner

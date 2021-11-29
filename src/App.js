import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components'
import { makeStyles } from '@material-ui/core'
import { Coins } from './pages';
import  Homepage  from './pages/Homepage';


function App() {

  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: '#14161a',
      color: 'white',
      minHeight: '100vh'
    }
  }))

  const classes = useStyles()

  return (
    <BrowserRouter>
    <div className={classes.App}>
      <Header />
        <Routes>
          <Route path="/" component={ Homepage } exact />
          <Route path="/coins/:id" component={ Coins } exact />
        </Routes>
 </div>
    </BrowserRouter>
  );
}

export default App;

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components';
import { makeStyles } from '@material-ui/core'
import { Coins, Homepage } from './pages';


  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: '#14161a',
      color: 'white',
      minHeight: '100vh'
    }
  }))


function App() {
  const classes = useStyles()

  return (
    <BrowserRouter>
    <div className={classes.App}>
      <Header />
        <Routes>
          <Route path="/" element={ <Homepage /> } exact />
          <Route path="/coins/:id" element={ < Coins /> } exact />
        </Routes>
 </div>
    </BrowserRouter>
  );
}

export default App;

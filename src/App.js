
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import {useState} from "react";
import Button from '@mui/material/Button';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import TextField from '@mui/material/TextField';

export default function App() {
  const [mode, setMode] = useState("dark");
const darkTheme = createTheme({
  palette: {
    mode: mode,
  },
});
const history = useHistory();
  return (
    <ThemeProvider theme={darkTheme}>
    <Paper elevation={3} style={{borderRadius:"0px",minHeight:"100vh"}}>
    <div className="App">
       <AppBar position="static">
       <Toolbar>
       <Button varient="text" color="inherit"  onClick={()=>history.push("/login")}> log in </Button>
      <Button varient="text" color="inherit"  onClick={()=>setMode(mode==="light"? "dark":"light")}> {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />} {mode==="light"? "Dark":"Light"}Mode</Button>
  
      </Toolbar>
       </AppBar>
       
       <Switch>
     

        <Route path="/login">
          <LoginPage />
        </Route>

        </Switch>
    </div>
    </Paper>
    </ThemeProvider>
  );
}

function LoginPage(){
  return(
    <div className="login-page">
     <h1 className="login-head">Login</h1>
     <h4 className="please">Please enter your e-mail id and Password</h4>
     <TextField id="outlined-basic" label="e-mail id" variant="outlined" />
     <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <Button variant="outlined">log in</Button>
       
    </div>
  );
}



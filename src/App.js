
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
import { useFormik } from 'formik';
import * as yup from 'yup';

const API_URL = "https://password-reset-node-new.herokuapp.com";
// const API_URL = "http://localhost:9000";

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
       <Button varient="text" color="inherit"  onClick={()=>history.push("/")}>Home</Button>
       <Button varient="text" color="inherit" style={{marginLeft:"auto"}} onClick={()=>history.push("/login")}>log in</Button>
       <Button varient="text" color="inherit" style={{marginLeft:"0px"}} onClick={()=>history.push("/signup")}>sign up</Button>
      <Button varient="text" color="inherit" style={{marginLeft:"0px"}} onClick={()=>setMode(mode==="light"? "dark":"light")}> {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />} {mode==="light"? "Dark":"Light"}Mode</Button>
  
      </Toolbar>
       </AppBar>
       
       <Switch>

        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/signupsuccess">
          <SignupSuccess />
        </Route>
        <Route path="/signupfailed">
          <SignupFailed />
        </Route>
        <Route path="/loginsuccess">
          <LoginSuccess />
        </Route>
        <Route path="/loginfailed">
          <LoginFailed />
        </Route>

        <Route path="/login">
          <LoginPage />
        </Route>
        
          <Route path="/signup">
          <SignupPage />
        </Route>

        </Switch>
    </div>
    </Paper>
    </ThemeProvider>
  );
}

function Home(){
  return(
    <div>
      <h1>welcome</h1>
    </div>
  );
}

function LoginPage(){
  const history = useHistory();
  const formvalidationschema = yup.object({
    email: yup.string().min(5, "need a bigger email").required(),
    password: yup.string().min(5).max(12).required(),
  });

  const {handleSubmit, values, handleChange, handleBlur, errors, touched} = useFormik({
    initialValues: { email: "", password:""},
    validationSchema: formvalidationschema,

    onSubmit: (newlogin) => {
      console.log("onsubmit", newlogin);
      addData(newlogin);
    }
  });

  const addData =(newlogin)=>{
    console.log(newlogin)
      fetch(`${API_URL}/login`, {
        method:"POST",
        body: JSON.stringify(newlogin),
        headers: {'Content-Type': 'application/json'},
    }).then((response)=>{
      if(response.status===401){
        history.push("/loginfailed")
      }else{
        history.push("/loginsuccess")
      }
    
      });

    };

  return(
    <form className="login-page" onSubmit={handleSubmit}>
      
     <h1 className="login-head">Login</h1>
     <h4 className="please">Please enter your e-mail id and Password</h4>  
    
    <TextField id="email" 
    name="email" 
    value = {values.email} 
    onChange={handleChange} 
    onBlur={handleBlur}
    type = "email" 
    error={errors.email && touched.email}
    helperText={errors.email && touched.email && errors.email}
    placeholder = "Enter your Email"/>


    <TextField id="password" 
    name="password" 
    value = {values.password} 
    onChange={handleChange} 
    onBlur={handleBlur}
    type="password"
    autoComplete="current-password"
    error={errors.password && touched.password}
    helperText={errors.password && touched.password && errors.password}
    placeholder = "Enter your Password"/>
    
    <Button variant="outlined" type="submit">log in</Button>
  </form>
    
  );
}

function SignupPage(){
  const history = useHistory();
  const formvalidationschema = yup.object({
    email: yup.string().min(5, "need a bigger email").required(),
    password: yup.string().min(5).max(12).required(),
  });

  const {handleSubmit, values, handleChange, handleBlur, errors, touched} = useFormik({
    initialValues: { email: "", password:""},
    validationSchema: formvalidationschema,

    onSubmit: (newSignup) => {
      console.log("onsubmit", newSignup);
      addData(newSignup);
    }
  });
  const addData =(newSignup)=>{
    console.log(newSignup)
      fetch(`${API_URL}/signup`, {
        method:"POST",
        body: JSON.stringify(newSignup),
        headers: {'Content-Type': 'application/json'},
    }).then((response)=>{
    if(response.status===400){
      history.push("/signupfailed")
    }else{
      history.push("/signupsuccess")
    }
    // console.log(response.status));
    });
    };
  return(
    <form className="login-page" onSubmit={handleSubmit}>
    <div className="login-page">
    <h1 className="login-head">sign up</h1>
    <h4 className="please">Please enter your e-mail id and Password</h4>
    <TextField id="email" 
    name="email" 
    value = {values.email} 
    onChange={handleChange} 
    onBlur={handleBlur}
    type = "email" 
    error={errors.email && touched.email}
    helperText={errors.email && touched.email && errors.email}
    placeholder = "Enter your Email"/>

<TextField id="password" 
    name="password" 
    value = {values.password} 
    onChange={handleChange} 
    onBlur={handleBlur}
    type="password"
    autoComplete="current-password"
    error={errors.password && touched.password}
    helperText={errors.password && touched.password && errors.password}
    placeholder = "Enter your Password"/>
       <Button variant="contained" type="submit" >sign up</Button>
      
   </div>
   </form>
  );
}


function LoginSuccess(){
  return(
    <div>
      <img className="success" src="https://tse4.mm.bing.net/th?id=OIP.kPQ0PJHdeZL0H9HLZfbsGQAAAA&pid=Api&P=0&w=214&h=177" alt="Login success" />
      <h2>Successfully logged in</h2>
    </div>
  );
}

function LoginFailed(){
  return(
    <div>
      <img className="failed" src="https://icon-library.com/images/red-cross-icon-png/red-cross-icon-png-27.jpg" alt="Login failed" />
      <h2>Invalid Credentials</h2>
    </div>
  );
}

function SignupSuccess(){
  return(
    <div>
      <img className="success" src="https://tse4.mm.bing.net/th?id=OIP.kPQ0PJHdeZL0H9HLZfbsGQAAAA&pid=Api&P=0&w=214&h=177" alt="signup success" />
      <h2>Successfully signed up</h2>
    </div>
  );
}

function SignupFailed(){
  return(
    <div>
      <img className="failed" src="https://icon-library.com/images/red-cross-icon-png/red-cross-icon-png-27.jpg" alt="signup failed" />
      <h2>email already exists or password must be longer</h2>
    </div>
  );
}

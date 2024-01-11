import { useContext, useEffect, useState, useRef } from 'react'
// import { login } from '../authContext/apicalls';
import { useDispatch, useSelector } from "react-redux";
import { Visibility, VisibilityOff } from '@material-ui/icons'
import axios from 'axios';
import '../css/login.modules.css'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { login } from '../Redux/actions/auth';
import { isEmail } from "validator";

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    } 
  };

  const validEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email.
        </div>
      );
    }
  };


const Login = () => {
    let navigate = useNavigate();
    const form = useRef();
    const checkBtn = useRef();
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);
  
    const dispatch = useDispatch();
    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
      };
    
      const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
      };

      const handleShowHide = () => {
        setShow(!show)
    }
  
      const handleLogin = (e) => {
        e.preventDefault();
    
        setLoading(true);
    
        form.current.validateAll();
    
        if (checkBtn.current.context._errors.length === 0) {
          dispatch(login(email, password))
            .then(() => {
              navigate("/");
            })
            .catch(() => {
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      };

      if (isLoggedIn) {
        return <Navigate to="/" />;
      }

    return (
        <div className='log-login' 
        style=
        {
            {backgroundImage: `url(https://images.unsplash.com/photo-1665686374221-1901faa9f3ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80)`}
            }
            >
            <div className="top-container">
                <div className="my-logo">
                    <span>talentcroft</span>
                </div>
            </div>
            <div className="form-container">
            <div className="log-container">
            <Form onSubmit={handleLogin} ref={form}>
                <form className='log-form' action="/">
                    <h1 className="sign-in">Sign In</h1>
                        <div className='input-email'>
                        <Input type="email" className="form-control" name="email" placeholder='Please input your email' value={email} onChange={onChangeEmail} validations={[validEmail]} />
                        </div>
                        <div className='input-password'>
                            {/* <input type={show ? "text": "password"}  placeholder='Please input your password' /> */}
                            <Input type={show ? "text" : "password"} className="form-control" name="password" placeholder='Please input your password' value={password} onChange={onChangePassword} validations={[required]}/>
                            {
                                show ? (
                                    <span className='visible' onClick={handleShowHide}><Visibility /></span>
                                ) : (
                                    <span className='visible' onClick={handleShowHide}><VisibilityOff /></span>
                                )
                            }
                        </div>

                        <button className="log-button" >Sign In</button>
                        {message && (
                          <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                              {message}
                            </div>
                          </div>
                        )}
                    <span className="signup-span">New to talentcroft views? Sign up <Link to='/register' 
                    style={{textDecoration: 'none', color: 'white'}}><b>here</b></Link></span>
                </form>
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
            </div>

        </div>
        </div>
    )
}

export default Login
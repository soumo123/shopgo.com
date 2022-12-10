import React,{useRef,useState,useEffect} from 'react'
import '../../css/authentication.css'
import {Link,useLocation} from 'react-router-dom'
import {login,register,getProclearErrors} from '../../actions/userAction'
import {useSelector,useDispatch} from 'react-redux'
import {useAlert} from 'react-alert'
import Loader from '../layout/loader/Loader'
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Authentication = () => {

const dispatch = useDispatch()
const {error,loading,isAuthenticated,isRegistered} = useSelector((state)=>state.user)


const navigate = useNavigate()
const loginTab = useRef(null)
const registerTab = useRef(null)
const switcherTab = useRef(null)

const[loginEmail,setLoginEmail] = useState("")
const[loginPassword,setLoginPassword] = useState("")

const[user,setUser] = useState({
  name:"",email:"",password:"", number:""
})

const { name,email,password,number} = user
const [avatar,setAvatar] = useState()
const [avatarPreview,setAvatarPreview] = useState("/profile.png")

const loginSubmit = (e)=>{
  e.preventDefault()
  dispatch(login(loginEmail,loginPassword))
}


const registerSubmit = (e)=>{
  e.preventDefault();

  const myForm = new FormData()
  myForm.set("name",name);
  myForm.set("email",email);
  myForm.set("password",password);
  myForm.set("number",number);
  myForm.set("avatar",avatar);
  dispatch(register(myForm));
 

}

const registerDataChange = (e)=>{
  if(e.target.name==="avatar"){
      const reader = new FileReader();
      reader.onload = ()=>{
        if(reader.readyState===2){
            setAvatarPreview(reader.result)
            setAvatar(reader.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])
  }else{
    setUser({...user,[e.target.name]:e.target.value})
  }
}


// const redirect = location.search ? location.search.split("=")[1] : "/account";

useEffect(() => {
  if(!user){
    toast.error("Invalid Credentials")
    dispatch(getProclearErrors())
  }
  if(isAuthenticated){
    toast.success("Login Succesfull ");
    setInterval(() => {
      window.location.reload();
    }, 2000);
    navigate('/')
  }
  if(isRegistered){
    toast.success("Registration Succesfull ");
    navigate('/login')
  }

  }, [dispatch,toast,isAuthenticated,navigate,user,isRegistered])
  



const switchTabs = (e,tab)=>{
  if (tab === "login") {
    switcherTab.current.classList.add("shiftToNeutral");
    switcherTab.current.classList.remove("shiftToRight");

    registerTab.current.classList.remove("shiftToNeutralForm");
    loginTab.current.classList.remove("shiftToLeft");
  }
  if (tab === "register") {
    switcherTab.current.classList.add("shiftToRight");
    switcherTab.current.classList.remove("shiftToNeutral");

    registerTab.current.classList.add("shiftToNeutralForm");
    loginTab.current.classList.add("shiftToLeft");
  }
}

  return (
   <>
   {
     loading ?( <Loader /> ):(
      
     <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                <i className="fa fa-envelope-o" aria-hidden="true"></i>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                <i className="fa fa-lock" aria-hidden="true"></i>

                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                
                <input type="submit" value="Login" className="loginBtn" />
               <div className="row">
               <div className="col-lg-12 text-center">
                {/* <div className="phoneiocn">
                <i class="fa fa-mobile" aria-hidden="true"></i>
                </div> */}
               <Link to="/otp/verification"className="btn btn-primary btn-sm otpbtn">
                Login With Number</Link>
                    </div>
               </div>
                
              </form>
              

              <ToastContainer
                  position="top-center"
                  autoClose={2000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover />
              
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                <i className="fa fa-user" aria-hidden="true"></i>
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>

                <div className="signUpName">
                <i className="fa fa-user" aria-hidden="true"></i>
                  <input
                    type="number"
                    placeholder="Phone Number"
                    required
                    name="number"
                    value={number}
                    onChange={registerDataChange}
                  />
                </div>







                <div className="signUpEmail">
                <i className="fa fa-envelope-o" aria-hidden="true"></i>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                <i class="fa fa-unlock-alt" aria-hidden="true"></i>
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>

          
     )}
    
    
   </>
  )
}

export default Authentication
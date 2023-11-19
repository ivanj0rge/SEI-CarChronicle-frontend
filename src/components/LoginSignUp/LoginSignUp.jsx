import './LoginSignUp.css'
import iname from '../Assets/icon_name.png'
import iemail from '../Assets/icon__email.png'
import ipass from '../Assets/icon_password.png'
import { useState } from 'react'

function LoginSignUp() {
    const [action, setAction] = useState("Login")

    return (
        <div className='container'>
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action === 'Login' ? <div></div> : <div className="input">
                <img src={iname} alt='' />
                <input className="first-name" type="text" placeholder='First name' />
                <input className="last-name" type="text" placeholder='Last name' />
            </div>}
            <div className="input">
                <img src={iemail} alt='' />
                <input type="email" placeholder='Email'/>
            </div>
            <div className="input">
                <img src={ipass} alt='' />
                <input type="password" placeholder='Password'/>
            </div>
            </div>
            {action === 'Sign Up' ? <div></div> : <div className="forgot-password">Forgot your password? <span>Click Here!</span></div>}
            <div className="submit-container">
                <div className={action === 'Login' ? 'submit gray' : 'submit'} onClick={()=>{setAction('Sign Up')}}>Sign Up</div>
                <div className={action === 'Sign Up' ? 'submit gray' : 'submit'} onClick={()=>{setAction('Login')}}>Login</div>
            </div>
        </div>
    )
}

export default LoginSignUp
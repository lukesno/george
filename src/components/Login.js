import React, { useState, useEffect } from 'react';
import fire from "../firebase";
import GroceryCartIcon from '../assets/grocery_cart_icon.png';
import './SignupModalComponent.css';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Checking if user is already online
    useEffect(() => {
        fire.auth().onAuthStateChanged(user => {
            if (user) {
                window.location.href = "https://e-wai.github.io/george/main"
            } 
        });
    }, [])

    const loginClicked = () => {
        console.log("hi")
        fire
         .auth()
         .signInWithEmailAndPassword(email, password)
         .then(response => {
             const uid = response.user.uid;
             const usersRef = fire.firestore().collection('users');
             usersRef.doc(uid).get()
                .then(userReturned => {
                    if(!userReturned.exists) {
                        alert("Please check your credentials and try again.")
                        return;
                    }
                    window.location.href = "https://e-wai.github.io/george/main";
                })
         }).catch(error => {
             alert(error);
         })
    }

    return (
        // <div>
        //     <h1>Login</h1>
        //     <div>
        //         <label>
        //             <a>Email: </a>
        //             <input type="text" value={email} onChange={event => setEmail(event.target.value)} />
        //         </label>
        //     </div>
        //     <div>
        //         <label>
        //             <a>Password: </a>
        //             <input type="password" value={password} onChange={event => setPassword(event.target.value)}/>
        //         </label>
        //     </div>
        //     <button onClick={() => loginClicked()}>Login</button>
        // </div>

        <div id='signup-modal'>
            <div class="mainBackground">
                <div className='row'>
                    <div className='col' id='info-col'>
                        <p className='title-text'>G.e.o.r.g.e</p>
                        <p className='description-text'>Find the best grocery prices in one consolidated platform and make an order with the click of a button!</p>
                        <img id='icon' alt='grocery-cart-icon' src={GroceryCartIcon}/>
                    </div>
                    <div className='col' id='signup-col'>
                        <p className='info-text' id='sign-up-text'>Not a member? {<a href={"https://e-wai.github.io/george/register"}>signup</a>}</p>
                        <div className='sign-up-content'>
                            <label> 
                                Email
                                <br/>
                                <input className='textInput' type="text" name="email" value={email} onChange={event => setEmail(event.target.value)}/>
                            </label>
                            <label>
                                Password
                                <br/>
                                <input className='textInput' type="password" name="password" value={password} onChange={event => setPassword(event.target.value)}/>
                            </label>
                            <button id='log-in-button' onClick={() => loginClicked()}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
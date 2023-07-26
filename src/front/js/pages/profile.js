import React, { useContext, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import meme from "../../img/meme.jpeg"
import "../../styles/home.css";

export const Profile = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	function handle_logout() {
		actions.logout()
		navigate("/")
	}

	useEffect(() => {
	let token = localStorage.getItem("token")
	console.log(token);
	actions.validate_token(token)
	}, []);

	// window.onload = () => actions.validate_token(token)

	return (
		<>
		{store.auth === true ?
		<div className="main d-flex">
			<div className="col-md-6 col-sm-12 m-auto">
				<div className="login-form" style={{marginTop:"40%"}}>
                <h3 className="text-center mb-3"><strong>User Information</strong></h3>
					<div className="form-group conteiner">
						<img className="pb-3" src={meme} style={{height:400}}></img>
						<p className="text-center">Aqui tendrias a disposicion la informacion de tu perfil ...<br/> Si tan solo supiese como colocarla :s </p>
					{/* {store.user_info.map((user,index) => 
						<h1 key = {index}>
							email = {user.email} 
							password = {user.password}</h1> 
					)}
						<label>Email</label>
						<input type="text" className="form-control" placeholder="Email"/>
					</div>
					<div className="form-group">
						<label>Password</label>
						<input type="password" className="form-control" placeholder="Password"/>
					</div> */}
					</div>
					{/* <button className="btn btn-black">Edit</button> */}
					<button 
					className="btn btn-danger float-end" 
					onClick={()=>handle_logout()}>
						Logout
					</button>
				</div>
			</div>
		</div>
		: <Navigate to='/'/>}
		</>
	);
};

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	// const { store, actions } = useContext(Context);

	return (
		<>
		<div className="main d-flex">
			<div className="col-md-6 col-sm-12 m-auto">
				<div className="login-form">
				<form>
					<div className="form-group">
						<label>Email</label>
						<input type="text" className="form-control" placeholder="Email"/>
					</div>
					<div className="form-group">
						<label>Password</label>
						<input type="password" className="form-control" placeholder="Password"/>
					</div>
					<button type="submit" className="btn btn-black">Login</button>
					<Link to="/form"><button type="submit" className="btn btn-secondary">Register</button></Link>
				</form>
				</div>
			</div>
		</div>
		</>
	);
};

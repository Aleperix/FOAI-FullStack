import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext";
import 'bootstrap'; //Import Bootstrap JS
import 'bootstrap/dist/css/bootstrap.min.css'; //Import Bootstrap CSS
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import '../css/index.css' //Import own CSS
import Home from "./views/Home";
import UserProperties from "./components/UserProperties";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.REACT_APP_BASENAME || "";

	return (
    <>
			<BrowserRouter basename={basename}>
					<Routes>
						<Route path="/" element={<Home />} />
					</Routes>
      </BrowserRouter>
      <UserProperties /> {/* Add user properties floating dropdown to all Routes */}
    </>
	);
};

export default injectContext(Layout);
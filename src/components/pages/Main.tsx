import React, {useContext, useEffect, useState} from "react";
import ConfigurationProvider from "../../context/ConfigurationContext";
import Router from "../../routes/Router";
import {Box} from "@navikt/ds-react";
import {AppBar} from "../organisms/AppBar";
import {SourceApplicationContext} from "../../context/SourceApplicationContext";
import axios from "axios";
import {AuthorizationContext} from "../../context/AuthorizationContext";

function Main() {
	const {sourceApplications, getSourceApplications} = useContext(SourceApplicationContext)
	const [authorized, setAuthorized] = useState<boolean>(false)
	const {getAuthorization} = useContext(AuthorizationContext)

	axios.interceptors.response.use(function (response) {
		setAuthorized(true)
		return response;
	}, function (error) {
		if (error.response.status === 401) {
			setAuthorized(false)
		}
		return Promise.reject(error);
	});

	useEffect(() => {
		getAuthorization()
		getSourceApplications();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Box style={{height: "100vh", backgroundColor: "#EBF4F5"}}>
			<AppBar/>
			{sourceApplications && authorized ? <main>
					<ConfigurationProvider>
						<Router/>
					</ConfigurationProvider>
				</main> :
				<h1>Unauthorized</h1> // change to using 401 page
			}
		</Box>
	);
}

export default Main;

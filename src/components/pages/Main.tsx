import React, {useContext, useEffect, useState} from "react";
import ConfigurationProvider from "../../context/ConfigurationContext";
import Router from "../../routes/Router";
import { Box } from "@navikt/ds-react";
import { AppBar } from "../organisms/AppBar";
import AuthorizationRepository from "../../api/AuthorizationRepository";
import {AuthorizationContext} from "../../context/AuthorizationContext";
import Header from "@navikt/ds-react/esm/table/Header";

function Main() {
const {authorized, getAuthorization} = useContext(AuthorizationContext)

	useEffect(() => {
		getAuthorization()
	}, []);

	return (
		<Box style={{ height: "100vh", backgroundColor: "#EBF4F5" }}>
			<AppBar />
			<main>
				<ConfigurationProvider>
					{authorized && <Header>Autorisert</Header>}
					<Router />
				</ConfigurationProvider>
			</main>
		</Box>
	);
}

export default Main;

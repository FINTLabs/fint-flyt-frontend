import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material";
import Main from "./components/pages/Main";
import { BrowserRouter } from "react-router";
import IntegrationProvider from "./context/IntegrationContext";
import SourceApplicationProvider from "./context/SourceApplicationContext";
import theme from "./util/styles/theme/theme";
import "./global.css";
import AuthorizationProvider from "./context/AuthorizationContext";
import apiAdapter from './api/apiAdapter';

function App() {
	const [basePath, setBasePath] = useState<string>();
	useEffect(() => {
		apiAdapter
			.get<{ basePath: string }>("api/application/configuration")
			.then((value) => {
                apiAdapter.setBaseURL(value.data.basePath);
				setBasePath(value.data.basePath);
			})
			.catch((reason) => {
				console.log("Error getting config:", reason);
                apiAdapter.setBaseURL("/");
                setBasePath("/");
			});
	}, [basePath]);

	return basePath ? (
		<ThemeProvider theme={theme}>
			<AuthorizationProvider basePath={basePath}>
				<SourceApplicationProvider>
					<IntegrationProvider>
						<BrowserRouter basename={basePath}>
							<Main />
						</BrowserRouter>
					</IntegrationProvider>
				</SourceApplicationProvider>
			</AuthorizationProvider>
		</ThemeProvider>
	) : (
		<h1>Loading</h1>
	);
}

export default App;

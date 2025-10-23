import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material";
import Main from "./components/pages/Main";
import { BrowserRouter } from "react-router";
import IntegrationProvider from "./context/IntegrationContext";
import SourceApplicationProvider from "./context/SourceApplicationContext";
import axios from "axios";
import theme from "./util/styles/theme/theme";
import "./global.css";
import AuthorizationProvider from "./context/AuthorizationContext";

function App() {
	const [basePath, setBasePath] = useState<string>();
    console.log("App", basePath);
	useEffect(() => {
        console.log("runnng useeffect");
		axios
			.get("api/application/configuration")
			.then((value: { data: { basePath: string }}) => {
                const basePathFromConfig = value.data.basePath ?? "/";
				axios.defaults.baseURL = basePathFromConfig
				setBasePath(basePathFromConfig);
			})
			.catch((reason) => {
				console.log("Error getting config:", reason);
				setBasePath("/");
			});
	}, []);

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

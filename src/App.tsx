import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material";
import Main from "./components/pages/Main";
import { BrowserRouter } from "react-router-dom";
import IntegrationProvider from "./context/IntegrationContext";
import SourceApplicationProvider from "./context/SourceApplicationContext";
import axios from "axios";
import theme from "./util/styles/theme/theme";
import "./global.css";
import AuthorizationProvider from "./context/AuthorizationContext";

function App() {
	const [basePath, setBasePath] = useState<string>();
	useEffect(() => {
		axios
			.get("api/application/configuration")
			.then((value: { data: { basePath: string }}) => {
				axios.defaults.baseURL = value.data.basePath;
				setBasePath(value.data.basePath);
			})
			.catch((reason) => {
				console.log(reason);
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

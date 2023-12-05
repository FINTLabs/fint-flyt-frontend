import { Link as RouterLink } from "react-router-dom";
import MenuItems from "../../features/main/MenuItems";
import { InternalHeader, Button } from "@navikt/ds-react";
import React from "react";

export const AppBar = () => {
	return (
		<InternalHeader style={{ backgroundColor: "#1F4F59" }}>
			<Button
				variant="tertiary-neutral"
				icon={
					<img
						src="https://cdn.flais.io/media/fint-by-vigo-white.svg"
						alt="logo"
						style={{ width: 80, marginRight: "32px" }}
					/>
				}
				component={RouterLink}
				to="/"
			/>
			<MenuItems />
		</InternalHeader>
	);
};

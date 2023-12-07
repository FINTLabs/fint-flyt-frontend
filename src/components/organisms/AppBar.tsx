import MenuItems from "../molecules/MenuItems";
import { InternalHeader, Button } from "@navikt/ds-react";
import { useHistory } from "react-router-dom";

export const AppBar = () => {
	const history = useHistory();
	return (
		<InternalHeader style={{ backgroundColor: "#1F4F59" }}>
			<Button
				variant="tertiary-neutral"
				onClick={() => {
					history.push("/");
				}}
				icon={
					<img
						src="https://cdn.flais.io/media/fint-by-vigo-white.svg"
						alt="logo"
						style={{ width: 80, marginRight: "32px", marginBottom: "8px" }}
					/>
				}
			/>
			<MenuItems />
		</InternalHeader>
	);
};

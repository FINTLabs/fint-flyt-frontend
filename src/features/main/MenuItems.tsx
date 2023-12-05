import { useHistory } from "react-router-dom";
import routes from "./Routes";
import { useTranslation } from "react-i18next";
import { Button } from "@navikt/ds-react";

const MenuItems = () => {
	const { t } = useTranslation("translations", { keyPrefix: "menuItems" });
	const history = useHistory();
	return (
		<>
			{routes
				.filter((route) => route.inNavigationMenu)
				.map((route) => (
					<Button
						size={"medium"}
						style={{ color: "white" }}
						variant={"tertiary-neutral"}
						onClick={() => {
							history.push(route.path);
						}}
						key={route.name}
					>
						{t(route.name)}
					</Button>
				))}
		</>
	);
};
export default MenuItems;

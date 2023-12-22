import { Button, CardActions, CardContent, Divider } from "@mui/material";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { ILink } from "./types/Link";

import { Box, Heading, HelpText, HStack, Loader } from "@navikt/ds-react";

type Props = {
	content: string;
	value: string;
	links?: ILink[];
	id: string;
};

const DashboardCard: React.FunctionComponent<Props> = (props: Props) => {
	const [isHovered, setHovered] = React.useState(false);

	return (
		<Box
			id={"support-information"}
			background={"surface-default"}
			padding="6"
			borderRadius={"large"}
			shadow="medium"
			borderWidth="2"
			borderColor={"border-subtle"}
			onMouseOver={() => setHovered(true)}
			onMouseOut={() => setHovered(false)}
		>
			<CardContent>
				<Heading size="medium"> {props.value}</Heading>
				<Heading size="small">{props.content}</Heading>
			</CardContent>
			<CardActions>
				{props.links &&
					props.links.map((link: ILink, index: number) => (
						<Button
							key={index}
							id={props.id + `-btn-` + index}
							size="small"
							variant="text"
							component={RouterLink}
							to={link.href}
						>
							<Heading size="small">{link.name}</Heading>
						</Button>
					))}
			</CardActions>
		</Box>
	);
};

export default DashboardCard;

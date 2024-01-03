import * as React from "react";
import { ILink } from "./types/Link";
import { Box, Heading, BodyLong, Link } from "@navikt/ds-react";

type Props = {
	content: string;
	value: string;
	links?: ILink[];
	id: string;
};

const DashboardCard: React.FunctionComponent<Props> = (props: Props) => {
	return (
		<Box
			justify={"space-between"}
			id={"support-information"}
			background={"surface-default"}
			padding="6"
			borderRadius={"large"}
			shadow="small"
			borderWidth="2"
			borderColor={"border-subtle"}
		>
			<Heading size="medium"> {props.value}</Heading>
			<Heading size="small">{props.content}</Heading>

			{props.links &&
				props.links.map((link: ILink, index: number) => (
					<BodyLong key={index} id={props.id + `-btn-` + index}>
						<Link href={link.href}>{link.name}</Link>
					</BodyLong>
				))}
		</Box>
	);
};

export default DashboardCard;

import * as React from "react";
import { ILink } from "../../features/dashboard/Link";
import { Box, Heading, BodyLong, Link, Skeleton } from "@navikt/ds-react";
import { Link as RouterLink } from "react-router-dom";
import { useContext } from "react";
import { IntegrationContext } from "../../context/IntegrationContext";

type Props = {
	content: string;
	value: string;
	links?: ILink[];
	id: string;
};

const DashboardCard: React.FunctionComponent<Props> = (props: Props) => {
	const { statistics, integrations } = useContext(IntegrationContext);

	return (

		<Box
			id="support-information"
			as="div"
			background="surface-default"
			padding="6"
			borderRadius="large"
			borderWidth="2"
			borderColor="border-subtle"
			width="300px"
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				textAlign: "center",
				height: "150px",
			}}
		>
				{statistics && integrations ? (
					<>
						<Heading size="medium"> {props.value}</Heading>
						<Heading size="small">{props.content}</Heading>
						{props.links &&
							props.links.map((link: ILink, index: number) => (
								<BodyLong key={index} id={props.id + `-btn-` + index}>
									<Link as={RouterLink} to={link.href}>
										{link.name}
									</Link>
								</BodyLong>
							))}
					</>
				) : (
					<>
						<Skeleton variant="text" width="25%" />
						<Skeleton variant="text" width="100%" />
						<Skeleton variant="text" width="100%" />
					</>
				)}
			</Box>

	);
};

export default DashboardCard;

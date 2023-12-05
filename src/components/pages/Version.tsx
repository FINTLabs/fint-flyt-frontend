import React from "react";
import { RouteComponent } from "../../routes/Route";
import { BodyLong, Box, List, VStack } from "@navikt/ds-react";
import InformationTemplate from "../templates/InformationTemplate";
import { ABOUT_VERSIONS, VERSION_DATA } from "../utils/version/VersionTexts";

const Version: RouteComponent = () => {
	return (
		<InformationTemplate id={"version"} keyPrefix={"pages.version"}>
			<Box
				id={"version-information"}
				background={"surface-default"}
				padding="6"
				borderRadius={"large"}
				borderWidth="2"
				borderColor={"border-subtle"}
			>
				<VStack gap={"6"}>
					<BodyLong>{ABOUT_VERSIONS}</BodyLong>
					<BodyLong>
						<VStack gap={"6"}>
							{VERSION_DATA.map((value, i) => (
								<List key={i} as="ul" title={value.heading}>
									{value.updates.map((update, i) => (
										<List.Item key={i}>{update}</List.Item>
									))}
								</List>
							))}
						</VStack>
					</BodyLong>
				</VStack>
			</Box>
		</InformationTemplate>
	);
};
export default Version;

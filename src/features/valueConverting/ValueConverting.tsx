import React, { useState } from "react";
import ValueConvertingTable from "./components/ValueConvertingTable";
import ValueConvertingForm from "./components/ValueConvertingForm";
import ValueConvertingRepository from "../../shared/repositories/ValueConvertingRepository";
import { RouteComponent } from "../../routes/Route";
import InformationTemplate from "../../components/templates/InformationTemplate";

const ValueConverting: RouteComponent = () => {
	const [existingValueConverting, setExistingValueConverting] =
		useState(undefined);
	const [newValueConverting, setNewValueConverting] = useState<boolean>(false);
	return (
		<InformationTemplate
			id={"value-converting"}
			keyPrefix={"pages.valueConverting"}
			headingHelpText={{
				title: "Verdikonverteringer informasjon",
				info: "help.valueConverting",
			}}
		>
			{existingValueConverting || newValueConverting ? (
				<ValueConvertingForm
					existingValueConverting={existingValueConverting ?? undefined}
					setNewValueConverting={setNewValueConverting}
					setExistingValueConverting={setExistingValueConverting}
				/>
			) : (
				<ValueConvertingTable
					setNewValueConverting={setNewValueConverting}
					onValueConvertingSelected={(id: number) => {
						return ValueConvertingRepository.getValueConverting(id)
							.then((response) => {
								setExistingValueConverting(response.data);
							})
							.catch((e) => {
								console.log(e);
							});
					}}
				/>
			)}
		</InformationTemplate>
	);
};

export default ValueConverting;

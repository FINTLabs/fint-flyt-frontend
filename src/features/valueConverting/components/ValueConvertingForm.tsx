import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";
import SelectValueComponent from "../../configuration/components/mapping/value/select/SelectValueComponent";
import {
	defaultAlert,
	destinations,
	fromApplicationIds,
	fromTypeIds,
	toTypeIds,
} from "../../configuration/defaults/DefaultValues";
import ValueConvertingRepository from "../../../api/ValueConvertingRepository";
import StringValueComponent from "../../configuration/components/mapping/value/string/StringValueComponent";
import { IValueConverting } from "../types/ValueConverting";
import { IAlertContent } from "../../configuration/types/AlertContent";
import getSelectables from "../../configuration/util/SelectablesUtils";
import { ISelectable } from "../../configuration/types/Selectable";
import ArrayComponent from "../../configuration/components/common/array/ArrayComponent";
import { valueConvertingStyles } from "../../../util/styles/ValueConverting.styles";
import SearchSelectValueComponent from "../../configuration/components/mapping/value/select/SearchSelectValueComponent";
import {
	Alert,
	Box,
	Button,
	Heading,
	HelpText,
	HStack,
	VStack,
} from "@navikt/ds-react";

const useStyles = valueConvertingStyles;

type Props = {
	existingValueConverting: IValueConverting | undefined;
	setExistingValueConverting: React.Dispatch<React.SetStateAction<undefined>>;
	setNewValueConverting: React.Dispatch<React.SetStateAction<boolean>>;
};
type IValueConvertingFormData = Omit<IValueConverting, "convertingMap"> & {
	convertingArray: IValueConvertingConvertingArrayEntry[];
};

type IValueConvertingConvertingArrayEntry = { from: string; to: string };

export const ValueConvertingForm: React.FunctionComponent<Props> = (
	props: Props
) => {
	const classes = useStyles();
	const { t } = useTranslation("translations", {
		keyPrefix: "pages.valueConverting",
	});
	const [disabled, setDisabled] = useState<boolean>(false);
	const [show, setShow] = React.useState(false);
	const [alertContent, setAlertContent] =
		React.useState<IAlertContent>(defaultAlert);

	const [toSelectables, setToSelectables] = useState<ISelectable[]>([]);

	useEffect(() => {
		getSelectables([
			{
				url: "api/intern/arkiv/kodeverk/format",
			},
		]).then((result: ISelectable[]) => {
			setToSelectables(result);
		});
	}, []);

	const methods = useForm<IValueConvertingFormData>({
		defaultValues: props.existingValueConverting
			? toFormData(props.existingValueConverting)
			: {},
	});

	const toTypeIdWatch = useWatch({
		control: methods.control,
		name: "toTypeId",
	});

	function toFormData(
		valueConverting: IValueConverting
	): IValueConvertingFormData {
		// eslint-disable-next-line
		const withRemovedConvertingMap = (({ convertingMap, ...rest }) => rest)(
			valueConverting
		);
		return {
			...withRemovedConvertingMap,
			convertingArray: Object.entries(valueConverting.convertingMap).map(
				([key, value]) => {
					return { from: key, to: value };
				}
			),
		};
	}

	function toValueConverting(
		valueConvertingFormData: IValueConvertingFormData
	): IValueConverting {
		// eslint-disable-next-line
		const withRemovedConvertingArray = (({ convertingArray, ...rest }) => rest)(
			valueConvertingFormData
		);
		const convertingMap: Record<string, string> = {};
		valueConvertingFormData.convertingArray.forEach(
			(entry: IValueConvertingConvertingArrayEntry) => {
				convertingMap[entry.from] = entry.to;
			}
		);
		return {
			...withRemovedConvertingArray,
			convertingMap,
		};
	}

	const onSubmit = (valueConvertingFormData: IValueConvertingFormData) => {
		const valueConverting: IValueConverting = toValueConverting(
			valueConvertingFormData
		);
		ValueConvertingRepository.createValueConverting(valueConverting)
			.then((r) => {
				console.log(r);
				setDisabled(true);
				setShow(true);
				setAlertContent({
					severity: "success",
					message: t('saved'),
				});
			})
			.catch(function (error) {
				if (error.response?.status) {
					setAlertContent({
						severity: "error",
						message: t('saveError') +
							(error.response.data.message
								? error.response.data.message
								: t('genericError')) +
							", status: " +
							error.response.status
					});
					setShow(true);
				}
			});
	};

	function handleCancel() {
		if (props.setExistingValueConverting) {
			props.setExistingValueConverting(undefined);
			props.setNewValueConverting(false);
		}
	}

	return (
		<Box
			background={"surface-default"}
			padding="6"
			borderRadius={"large"}
			borderWidth="2"
			borderColor={"border-subtle"}
		>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<VStack gap={"6"}>
						<VStack gap={"3"} id={"name-container"}>
							<HStack gap={"2"} align="center">
								<Heading size={"small"}>{t("valueConvertingName")}</Heading>
								<HelpText title="Hva er dette?" placement="bottom">
									{t("help.valueConvertingName")}
								</HelpText>
							</HStack>
							<Controller
								rules={{required: {value: true, message: t('requiredField')}}}
								name={"displayName"}
								defaultValue={""}
								render={({ field, fieldState }) => (
									<StringValueComponent
										{...field}
										classes={classes}
										disabled={disabled}
										displayName={t("displayName")}
										fieldState={fieldState}
									/>
								)}
							/>
						</VStack>
						<HStack gap={"6"} id={"from-to-container"}>
							<VStack gap={"3"}>
								<HStack gap={"2"} align="center">
									<Heading size={"small"}>{t("from")}</Heading>
									<HelpText title="Hva er dette?" placement="bottom">
										{t("help.from")}
									</HelpText>
								</HStack>
								<VStack gap={"3"}>
									<Controller
										rules={{required: {value: true, message: t('requiredField')}}}
										name={"fromApplicationId"}
										defaultValue={""}
										render={({ field , fieldState}) => (
											<SelectValueComponent
												{...field}
												fieldState={fieldState}
												disabled={disabled}
												displayName={t("fromApplicationId")}
												selectables={fromApplicationIds.map(
													(fromApplicationId) => {
														return {
															displayName: fromApplicationId.label,
															value: fromApplicationId.value,
														};
													}
												)}
											/>
										)}
									/>
									<Controller
										rules={{required: {value: true, message: t('requiredField')}}}
										name={"fromTypeId"}
										defaultValue={""}
										render={({ field, fieldState }) => (
											<SelectValueComponent
												{...field}
												fieldState={fieldState}
												disabled={disabled}
												displayName={t("fromTypeId")}
												selectables={fromTypeIds.map((fromTypeId) => {
													return {
														displayName: fromTypeId.label,
														value: fromTypeId.value,
													};
												})}
											/>
										)}
									/>
								</VStack>
							</VStack>
							<VStack gap={"3"}>
								<HStack gap={"2"} align="center">
									<Heading size={"small"}>{t("to")}</Heading>
									<HelpText title="Hva er dette?" placement="bottom">
										{t("help.to")}
									</HelpText>
								</HStack>
								<VStack gap={"3"}>
									<Controller
										rules={{required: {value: true, message: t('requiredField')}}}
										name={"toApplicationId"}
										defaultValue={""}
										render={({ field, fieldState }) => (
											<SelectValueComponent
												{...field}
												fieldState={fieldState}
												disabled={disabled}
												displayName={t("toApplicationId")}
												selectables={destinations.map((destination) => {
													return {
														displayName: destination.label,
														value: destination.value,
													};
												})}
											/>
										)}
									/>
									<Controller
										rules={{required: {value: true, message: t('requiredField')}}}
										name={"toTypeId"}
										defaultValue={""}
										render={({ field, fieldState }) => (
											<SelectValueComponent
												{...field}
												fieldState={fieldState}
												disabled={disabled}
												displayName={t("toTypeId")}
												selectables={toTypeIds.map((toTypeId) => {
													return {
														displayName: toTypeId.label,
														value: toTypeId.value,
													};
												})}
											/>
										)}
									/>
								</VStack>
							</VStack>
						</HStack>
						<VStack gap={"3"} id={"value-convertings-container"}>
							<HStack gap={"2"} align="center">
								<Heading id={"value-convertings-header"} size={"small"}>
									{t("convertingMap")}
								</Heading>
								<HelpText title="Konverteringer informasjon" placement="bottom">
									{t("help.convertingMap")}
								</HelpText>
							</HStack>
							<ArrayComponent
								classes={classes}
								absoluteKey={"convertingArray"}
								disabled={disabled}
								fieldComponentCreator={(index: number, absoluteKey: string) => (
									<HStack gap={"6"}>
										<Controller
											rules={{required: {value: true, message: t('requiredField')}}}
											name={`${absoluteKey}.from`}
											defaultValue={""}
											render={({ field, fieldState }) => (
												<StringValueComponent
													{...field}
													disabled={disabled}
													classes={classes}
													displayName={t("from")}
													multiline={true}
													fieldState={fieldState}
												/>
											)}
										/>
										<Controller
											rules={{required: {value: true, message: t('requiredField')}}}
											name={`${absoluteKey}.to`}
											defaultValue={""}
											render={({ field, fieldState }) => {
												return toTypeIdWatch === "text" ? (
													<StringValueComponent
														{...field}
														classes={classes}
														disabled={disabled}
														displayName={t("to")}
														multiline={true}
														fieldState={fieldState}
													/>
												) : (
													<SearchSelectValueComponent
														{...field}
														disabled={disabled}
														displayName={t("to")}
														selectables={toSelectables}
														fieldState={fieldState}
													/>
												);
											}}
										/>
									</HStack>
								)}
								defaultValueCreator={() => {
									return {
										from: "",
										to: "",
									};
								}}
							/>
						</VStack>
						{show && (
							<Alert
								size={"small"}
								closeButton
								onClose={() => {
									setShow(false);
									setAlertContent(defaultAlert);
								}}
								variant={alertContent.severity}
							>
								{alertContent.message}
							</Alert>
						)}
						<HStack id={"button-container"} gap={"6"}>
							<Button id={"submit-button"} type="submit" disabled={disabled}>
								{t("button.create")}
							</Button>
							<Button
								as={RouterLink}
								id={"cancel-button"}
								onClick={handleCancel}
								to={"/valueconverting"}
							>
								{disabled ? t("button.back") : t("button.cancel")}
							</Button>
						</HStack>
					</VStack>
				</form>
			</FormProvider>
		</Box>
	);
};

export default ValueConvertingForm;

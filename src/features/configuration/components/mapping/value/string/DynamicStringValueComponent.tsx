import * as React from "react";
import {BaseSyntheticEvent, forwardRef, useEffect, useState} from "react";
import {useDrop} from "react-dnd";
import {ITag} from "../../../../types/Metadata/Tag";
import {ValueType} from "../../../../types/Metadata/IntegrationMetadata";
import {IconButton, TextField, Typography} from "@mui/material";
import {Search} from "../../../../util/UrlUtils";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ResourceRepository from "../../../../../../api/ResourceRepository";
import {
	errorMsgSX,
	searchResultSX,
} from "../../../../../../util/styles/SystemStyles";
import { Noop } from "react-hook-form/dist/types";
import { ControllerFieldState } from "react-hook-form";
import {useTranslation} from "react-i18next";

interface Props {
    displayName?: string;
    search?: Search;
    accept: ValueType[];
    disabled?: boolean;
    onChange?: (value: string) => void;
    onBlur?: Noop;
    name: string;
    value: string | null;
    fieldState: ControllerFieldState | undefined;
}

const DynamicStringValueComponent: React.FunctionComponent<Props> = forwardRef<
	HTMLDivElement,
	Props
>((props: Props, ref) => {
	DynamicStringValueComponent.displayName = "DynamicStringValueComponent";
	const [searchResult, setSearchResult] = useState<string>();
	const [shrink, setShrink] = useState<boolean | undefined>(undefined);
	const absoluteKey: string = props.name;
	const { t } = useTranslation("translations", { keyPrefix: "pages.configuration" });

    const [{canDrop, isOver}, dropRef] = useDrop({
        accept: props.accept,
        drop: (tag: ITag) => {
            if (!props.disabled) {
                if (props.onChange) {
                    if (props.value === undefined || props.value === "") {
                        setShrink(true);
                        props.onChange(tag.value);
                    } else {
                        props.onChange(props.value + tag.value);
                    }
                }
            }
        },
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),
            isOver: monitor.isOver(),
        }),
    });
    useEffect(() => {
        setSearchResult(undefined);
    }, [props.search]);

    let background = "white";

    const inputStyle = {
        backgroundColor: "white",
        width: "352px",
        borderRadius: "4px",
        margin: "none",
    };

    if (canDrop && isOver && !props.disabled) {
        background = "lightgreen";
    } else if (canDrop && !props.disabled) {
        background = "lightblue";
    }

    const dynamicStyle: React.CSSProperties = {
        ...inputStyle,
        background,
    };

	return (
		<div
			id={"dnd-value-component-" + absoluteKey}
			ref={dropRef}
			key={absoluteKey}
		>
			<TextField
				autoComplete={"off"}
				error={!!props.fieldState?.error}
				style={dynamicStyle}
				variant="outlined"
				size="small"
				multiline
				maxRows={5}
				label={props.displayName}
				disabled={props.disabled}
				onChange={(e: BaseSyntheticEvent) => {
					if (props.onChange) {
						props.onChange(e.target.value);
					}
					setShrink(undefined);
				}}
				onBlur={props.onBlur}
				value={props.value}
				name={props.name}
				ref={ref}
				InputLabelProps={{ shrink }}
				InputProps={{
					endAdornment: (
						<>
							{props.search && (
								<IconButton
									sx={{ padding: "4px", margin: "-4px" }}
									onClick={() => {
										if (props.search?.source) {
											ResourceRepository.search(props.search.source).then(
												(result: { value: string } | undefined) => {
													setSearchResult(
														"Søkeresultat: " +
															(result ? result.value : "Ingen treff")
													);
												}
											);
										}
									}}
								>
									<SearchRoundedIcon />
								</IconButton>
							)}
						</>
					),
				}}
			/>
			{searchResult && (
				<Typography sx={searchResultSX}>{searchResult}</Typography>
			)}
			{props.fieldState?.error && (
				<Typography sx={errorMsgSX}>
					{t('label.formatError')}
				</Typography>
			)}
		</div>
	);
});
export default DynamicStringValueComponent;

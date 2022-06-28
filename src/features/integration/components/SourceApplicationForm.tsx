import {Box, Typography} from "@mui/material";
import {Tag} from "./dnd/Tag";
import * as React from "react";
import HelpPopover from "./popover/HelpPopover";
import {useTranslation} from "react-i18next";
import {MOCK_SKJEMA_METADATA} from "../../../__tests__/mock/mock-skjema-metadata";
import {toTagValue} from "../../util/JsonUtil";

const SourceApplicationForm: React.FunctionComponent<any> = (props) => {
    let myObj = {
        name: 'TEST',
        instanceElementMetadata: [
            {
                id: 'a',
                displayName: 'a',
                children: [
                    {
                        id: 'b1',
                        displayName: 'b1',
                        children: [
                            {
                                id: 'c1',
                                displayName: 'c1',
                                children: [
                                    {
                                        id: 'e1',
                                        displayName: 'e1',
                                        children: [],
                                    },
                                ],
                            },
                            {
                                id: 'd2',
                                displayName: 'd2',
                                children: [],
                            },
                        ],
                    },
                    {
                        id: 'b2',
                        displayName: 'b2',
                        children: [],
                    },
                ],
            },
        ],
    };
    const { t } = useTranslation('translations', { keyPrefix: 'components.SourceApplicationForm'});

    function createArrayUsingMap() {
        let recursiveFn = (obj: any) => {
            if (obj.id && obj.displayName) {
                obj.children.length == 0 ? console.log(obj.id, obj.displayName) : console.log(obj.displayName)
            }
            obj.children.map(recursiveFn);
        };
        recursiveFn(MOCK_SKJEMA_METADATA.instanceElementMetadata[0]);
    }


    if (MOCK_SKJEMA_METADATA) createArrayUsingMap();

    return (
        <Box className={props.style.sourceApplicationForm}>
            <Box className={props.style.row}>
                <Typography variant={"h6"}>{t('header')}</Typography>
                <HelpPopover popoverContent="sourceApplicationFormPopoverContent"/>
            </Box>
            {/*{MOCK_SKJEMA_METADATA.steps.map((step: IStep) => {*/}
            {/*    return (*/}
            {/*        <Box>*/}
            {/*            <Typography>{step.name}</Typography>*/}
            {/*            {step.groups.map((group: IGroup) => {*/}
            {/*                return (*/}
            {/*                    <Box>*/}
            {/*                        {group.elements.map((element, index) => {*/}
            {/*                            return element.type === 'inputBox' && (*/}
            {/*                                <Tag key={index} value={toTagValue(element.name)} name={element.name}/>*/}
            {/*                            )*/}
            {/*                        })}*/}
            {/*                    </Box>*/}
            {/*                )*/}
            {/*            })}*/}
            {/*        </Box>*/}
            {/*    )*/}
            {/*})}*/}
        </Box>
    );
}

export default SourceApplicationForm;

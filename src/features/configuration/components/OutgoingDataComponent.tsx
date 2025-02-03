import * as React from "react";
import {useTranslation} from "react-i18next";
import {testObjectTemplateSak} from "../defaults/FormTemplates";
import ConfigurationMappingComponent from "./mapping/ConfigurationMappingComponent";
import {Box, Heading, HelpText, HStack} from "@navikt/ds-react";

export interface Props {
    onCollectionReferencesInEditContextChange: (collectionReferences: string[]) => void;
}

const OutgoingDataComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.configuration'});

    return (
        <Box style={{minWidth: '400px', minHeight: '70vh'}} id={"outgoing-form-panel"}
             background={"surface-default"} padding="6" borderRadius={"large"} borderWidth="2"
             borderColor={"border-subtle"}>
            <HStack align={"center"} gap={"2"}>
                <Heading size={"small"}>{t('formHeader')}</Heading>
                <HelpText title={"Hva er dette?"} placement={"right"}>{t('help.formHeader')}</HelpText>
            </HStack>
            <HStack id="configuration-mapping-wrapper" wrap={false}>
                <ConfigurationMappingComponent
                    mappingTemplate={testObjectTemplateSak}
                    onCollectionReferencesInEditContextChange={(collectionReferences => {
                        props.onCollectionReferencesInEditContextChange(collectionReferences)
                    })}
                />
            </HStack>
        </Box>
    );
}
export default OutgoingDataComponent;
import { HelpText, HStack } from '@navikt/ds-react';
import * as React from 'react';

import configurationInputStyles from '../styles/configuration.module.css';

interface Props {
    displayName: string;
    description?: string;
}

const DisplayNameWithHelpText: React.FunctionComponent<Props> = ({
    displayName,
    description,
}) => {
    return (
        <HStack gap="1" align="center">
            {displayName}
            {description && (
                <HelpText className={configurationInputStyles.helpText} placement="top">
                    {description}
                </HelpText>
            )}
        </HStack>
    );
};

export default DisplayNameWithHelpText;

import { Box, Heading, HelpText, HStack, VStack } from '@navikt/ds-react';
import * as React from 'react';
import { ReactElement } from 'react';

import PathComponent from '../PathComponent';
import configurationStyles from '../styles/configuration.module.css';

export interface Props {
    index: number;
    title: string;
    description?: string;
    path: string[];
    content: ReactElement;
}

const ColumnElementComponent: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <Box
            id={'column-item-' + props.index + '-' + props.title}
            className={configurationStyles.column}
            borderWidth={'1'}
        >
            <VStack padding={'4'} gap={'2'}>
                <HStack justify={'space-between'} align="center" className={configurationStyles.columnTitle}>
                    <Heading size={'xsmall'}>{props.title}</Heading>
                    {props.description && (
                        <HelpText placement="top">
                            {props.description}
                        </HelpText>
                    )}
                </HStack>
                {props.path.length > 0 && <PathComponent path={props.path} />}
                {props.content}
            </VStack>
        </Box>
    );
};
export default ColumnElementComponent;

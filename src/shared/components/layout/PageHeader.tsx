import { Heading, HelpText, HStack } from '@navikt/ds-react';
import React, { FC } from 'react';

type PageHeaderProps = {
    title: string;
    helperText?: string;
};
const PageHeader: FC<PageHeaderProps> = ({
    title,
    helperText = '',
}: PageHeaderProps) => {
    return (
        <HStack align={'center'} gap={'2'}>
            <Heading size={'large'}>{title}</Heading>
            {helperText && (
                <HelpText placement="bottom">
                    {helperText}
                </HelpText>
            )}
        </HStack>
    );
};

export default PageHeader;

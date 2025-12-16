import React, { FC } from 'react';
import { Heading, HelpText, HStack } from '@navikt/ds-react';

type PageHeaderProps = {
    title: string;
    helperText?: string;
    helperTextTitle?: string;
};
const PageHeader: FC<PageHeaderProps> = ({
    title,
    helperText = '',
    helperTextTitle = 'Hva er dette?',
}: PageHeaderProps) => {
    return (
        <HStack align={'center'} gap={'2'}>
            <Heading size={'large'}>{title}</Heading>
            {helperText && (
                <HelpText title={helperTextTitle} placement="bottom">
                    {helperText}
                </HelpText>
            )}
        </HStack>
    );
};

export default PageHeader;

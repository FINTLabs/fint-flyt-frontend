import { Box } from '@navikt/ds-react';

type FormWrapperProps = {
    children: JSX.Element;
    id?: string;
    variant?: 'contained' | 'standalone';
};

const FormPageWrapper = ({ id, children, variant = 'standalone' }: FormWrapperProps) => {
    return (
        <Box
            id={id}
            marginInline={'auto'}
            background={'surface-default'}
            padding="6"
            borderRadius={'large'}
            borderWidth="1"
            borderColor={'border-subtle'}
            maxWidth={'var(--a-breakpoint-md)'}
            width={'100%'}
        >
            {children}
        </Box>
    );
};

export default FormPageWrapper;

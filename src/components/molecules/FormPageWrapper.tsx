import { Box } from '@navikt/ds-react';

type FormWrapperProps = {
    children: JSX.Element;
    id?: string;
};

const FormPageWrapper = ({ id, children }: FormWrapperProps) => {
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

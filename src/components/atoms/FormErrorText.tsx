import { ErrorMessage } from '@navikt/ds-react';

const FormErrorText = ({ errorMessage }: { errorMessage?: string }) => {
    return (
        <ErrorMessage
            id={'error-message'}
            size={'small'}
            style={{ fontWeight: 'var(--a-font-weight-regular)', padding: 'var(--a-spacing-1)' }}
        >
            {errorMessage}
        </ErrorMessage>
    );
};
export default FormErrorText;

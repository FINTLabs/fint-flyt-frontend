import { Box, HStack, Link } from '@navikt/ds-react';
import { NovariIKS } from '../../images/NovariIKS';

export default function Footer() {
    return (
        <Box
            style={{
                padding: '2rem',
                marginTop: '2rem',
                backgroundColor: '#6B133D',
                // textAlign: "center",
            }}
        >
            <HStack gap={'10'}>
                <NovariIKS width={'9em'} />
                <Link href="https://novari.no/driftsmeldinger/" style={{ color: '#FCF5ED' }}>
                    Driftsmeldinger
                </Link>
                <p style={{ color: '#FCF5ED' }}>|</p>
                <Link href="http://support.novari.no" style={{ color: '#FCF5ED' }}>
                    Opprett supportsak
                </Link>
            </HStack>
        </Box>
    );
}

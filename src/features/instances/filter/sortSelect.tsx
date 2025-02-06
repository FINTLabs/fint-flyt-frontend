import { Select } from '@navikt/ds-react';

export default function SortSelect() {
    return (
        <Select label={'Sortering'}>
            <option value="a">Tidspunkt synkende</option>
            <option value="b">Tidspunkt stigende</option>
            <option value="c">Kildeapplikasjons instans-ID</option>
            <option value="d">Destinasjons instans-ID</option>
        </Select>
    );
}

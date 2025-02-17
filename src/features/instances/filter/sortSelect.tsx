import { Select } from '@navikt/ds-react';
import { useFilters } from './FilterContext';

// TODO: Missing the 2 last options
export default function SortSelect() {
    const { filters, updateFilter } = useFilters();

    return (
        <Select
            label={'Sortering'}
            value={filters.sort || ''}
            onChange={(e) => updateFilter('sort', e.target.value)}>
            <option value="">Velg sortering</option>
            <option value="timestamp,asc">Tidspunkt stigende</option>
            <option value="timestamp,desc">Tidspunkt synkende</option>
            <option value="sourceApplicationInstanceIds,asc">Kildeapplikasjons instans-ID</option>
            <option value="destinationIds,asc">Destinasjons instans-ID</option>
        </Select>
    );
}

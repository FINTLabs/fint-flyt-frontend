import {
    Dispatch,
    FunctionComponent,
    SetStateAction,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { Button, HStack } from '@navikt/ds-react';
import { CustomSelect } from './CustomSelect';
import { useTranslation } from 'react-i18next';
import { IPaginationSelect } from '../../types/TableTypes';
import { useSearchParams } from 'react-router';

type Props = {
    hide?: boolean;
    onFetchMore: (size: number) => void;
};

// TODO: disable restry if no more to fetch
// TODO: new translation object
const LoadMorePagination: FunctionComponent<Props> = ({ hide, onFetchMore }) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.instances' });
    const [searchParams, setSearchParams] = useSearchParams();

    const paramSize = useMemo(
        () => Number(searchParams.get('size') ?? 10),
        [searchParams]
    )

    const [numberOfRows, setNumberOfRows] = useState<number>(paramSize);
    const [timesFetched, setTimesFetched] = useState<number>(1);

    const selectOptions: IPaginationSelect[] = [
        { value: 0, label: t('numberPerPage'), disabled: true },
        { value: 10, label: '10' },
        { value: 25, label: '25' },
        { value: 50, label: '50' },
        { value: 100, label: '100' },
        { value: 1000, label: '1000' },
    ];

    const updateSizeParam = (size: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('size', String(size));
        setSearchParams(params);
    };

    const handleFetchMore = useCallback(
        (newTimes?: number, newRowAmount?: number) => {
            const rows = newRowAmount ?? numberOfRows;
            const times = newTimes ?? timesFetched + 1;

            if (newRowAmount !== undefined) setNumberOfRows(newRowAmount);
            if (newTimes !== undefined) setTimesFetched(newTimes);
            else setTimesFetched((prev) => prev + 1);

            const size = rows * times;
            onFetchMore(size);
            updateSizeParam(size);
        },
        [numberOfRows, timesFetched, onFetchMore, searchParams]
    );

    if (hide) return null;

    return (
        <HStack justify="center" style={{ marginTop: '16px' }} gap="10">
            <CustomSelect
                options={selectOptions}
                onChange={(val) => handleFetchMore(1, Number(val))}
                label={t('numberPerPage')}
                hideLabel
                default={numberOfRows}
            />

            <Button variant="secondary" onClick={() => handleFetchMore()}>
                {t('filter.loadMore')}
            </Button>
        </HStack>
    );
};

export default LoadMorePagination;

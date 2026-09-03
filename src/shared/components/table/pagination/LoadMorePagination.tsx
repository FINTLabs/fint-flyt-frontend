import { Button, HStack } from '@navikt/ds-react';
import { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router';

import { IPaginationSelect } from '../../../types/TableTypes';
import { CustomSelect } from './CustomSelect';

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100, 1000] as const;

type Props = {
    hide?: boolean;
    onFetchMore: (size: number) => void;
};

function resolveInitialPagination(paramSize: number) {
    if ((PAGE_SIZE_OPTIONS as readonly number[]).includes(paramSize)) {
        return { numberOfRows: paramSize, timesFetched: 1 };
    }

    const step =
        [...PAGE_SIZE_OPTIONS].reverse().find((option) => paramSize % option === 0) ??
        PAGE_SIZE_OPTIONS[0];

    return {
        numberOfRows: step,
        timesFetched: Math.max(1, paramSize / step),
    };
}

// TODO: disable restry if no more to fetch
const LoadMorePagination: FunctionComponent<Props> = ({ hide, onFetchMore }) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.instances' });
    const [searchParams, setSearchParams] = useSearchParams();

    const paramSize = useMemo(() => {
        const fromUrl = Number(searchParams.get('size'));
        return Number.isFinite(fromUrl) && fromUrl > 0 ? fromUrl : 10;
    }, [searchParams]);

    const initialPagination = useMemo(() => resolveInitialPagination(paramSize), [paramSize]);

    const [numberOfRows, setNumberOfRows] = useState<number>(initialPagination.numberOfRows);
    const [timesFetched, setTimesFetched] = useState(initialPagination.timesFetched);

    useEffect(() => {
        setNumberOfRows(initialPagination.numberOfRows);
        setTimesFetched(initialPagination.timesFetched);
    }, [initialPagination.numberOfRows, initialPagination.timesFetched]);

    const selectOptions: IPaginationSelect[] = [
        { value: 0, label: t('numberPerPage'), disabled: true },
        ...PAGE_SIZE_OPTIONS.map((value) => ({ value, label: String(value) })),
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
                value={numberOfRows}
            />

            <Button
                variant="secondary"
                type={'button'}
                size={'small'}
                onClick={() => handleFetchMore()}
            >
                {t('filter.loadMore')}
            </Button>
        </HStack>
    );
};

export default LoadMorePagination;

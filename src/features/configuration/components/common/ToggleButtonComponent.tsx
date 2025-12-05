import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@navikt/aksel-icons';
import { Button, HelpText, HStack } from '@navikt/ds-react';

interface Props {
    order: number;
    displayName: string;
    onSelect: () => void;
    onUnselect: () => void;
    disabled?: boolean;
    description?: string;
    selected?: boolean;
}

const ToggleButtonComponent: React.FunctionComponent<Props> = (props: Props) => {
    const [selectedState, setSelectedState] = useState<boolean>(props.selected ?? false);
    const [displayName, setDisplayName] = useState(props.displayName);

    const toggleSelectedState = useCallback(
        (newValue: boolean) => {
            if (props.selected === undefined) {
                setSelectedState(newValue);
            }
        },
        [props.displayName]
    );

    useEffect(() => {
        setSelectedState(props.selected ?? false);
    }, []);

    useEffect(() => {
        if (props.displayName !== displayName) {
            setDisplayName(props.displayName);
            setSelectedState(false);
        }
    }, [props.displayName, selectedState, setSelectedState]);

    useEffect(() => {
        if (!selectedState) {
            props.onUnselect();
        }
    }, [selectedState]);

    return (
        <HStack
            id={'toggle-button-' + displayName + '-' + props.order}
            align={'center'}
            gap={'2'}
            wrap={false}
        >
            <Button
                id={'toggle-panel-button'}
                type="button"
                className={selectedState ? 'toggled' : ''}
                size={'small'}
                style={{
                    width: '100%',
                    justifyContent: 'space-between',
                }}
                icon={selectedState ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                iconPosition={'right'}
                variant={selectedState ? 'secondary' : 'primary'}
                onClick={() => {
                    if (!selectedState) {
                        props.onSelect();
                    } else {
                        props.onUnselect();
                    }
                    toggleSelectedState(!selectedState);
                }}
                disabled={props.disabled}
            >
                {displayName}
            </Button>
            {props.description && (
                <HelpText title={'Hva er dette?'} placement={'right'}>
                    {props.description}
                </HelpText>
            )}
        </HStack>
    );
};
export default ToggleButtonComponent;

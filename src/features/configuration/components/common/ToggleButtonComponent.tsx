import * as React from 'react';
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@navikt/aksel-icons';
import { Button, HelpText, HStack, VStack } from '@navikt/ds-react';

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
    const [selectedState, setSelectedState] = useState(false);
    const selected: boolean = props.selected === undefined ? selectedState : props.selected;
    const setSelected =
        props.selected === undefined
            ? setSelectedState
            : (value: boolean) => {
                  props.selected = value;
              };
    return (
        <VStack id={'toggle-button-' + props.displayName + '-' + props.order}>
            <HStack align={'center'} gap={'2'} wrap={false}>
                <Button
                    id={'toggle-panel-button'}
                    type="button"
                    size={'small'}
                    style={{
                        width: '100%',
                        justifyContent: 'space-between',
                    }}
                    icon={selected ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    iconPosition={'right'}
                    variant={selected ? 'secondary' : 'primary'}
                    onClick={() => {
                        if (!selected) {
                            props.onSelect();
                        } else {
                            props.onUnselect();
                        }
                        setSelected(!selected);
                    }}
                    disabled={props.disabled}>
                    {props.displayName}
                </Button>
                {props.description && (
                    <HelpText title={'Hva er dette?'} placement={'right'}>
                        {props.description}
                    </HelpText>
                )}
            </HStack>
        </VStack>
    );
};
export default ToggleButtonComponent;

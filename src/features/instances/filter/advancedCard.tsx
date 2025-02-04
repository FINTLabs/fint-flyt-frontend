import {
  Chips,
  ExpansionCard,
  Label,
  UNSAFE_Combobox,
  VStack,
} from "@navikt/ds-react";
import { handleToggle } from "./utils"; // Import the utility function

interface Props {
  connectedEventsOptions: string[];
  storageOptions: string[];
  selectedConnectedEvent: string[];
  selectedStorage: string[];
  onSelect: (key: string, value: string | string[] | null) => void;
}

export default function AdvancedCard({
  connectedEventsOptions,
  storageOptions,
  selectedConnectedEvent,
  selectedStorage,
  onSelect,
}: Props) {
  const getExpansionCardDescription = (): string => {
    const parts: string[] = [];

    if (selectedConnectedEvent.length > 0) {
      parts.push(
        `Sources: - ${
          selectedConnectedEvent.length
        }: ${selectedConnectedEvent.join(", ")}`
      );
    }

    if (selectedStorage.length > 0) {
      parts.push(
        `Selected Storage - ${selectedStorage.length}: ${selectedStorage.join(
          ", "
        )}`
      );
    }

    return parts.join(" | ");
  };

  return (
    <ExpansionCard size="small" aria-label="Small-variant">
      <ExpansionCard.Header>
        <ExpansionCard.Title as="h4" size="small">
          Avansert
        </ExpansionCard.Title>
        <ExpansionCard.Description>
          {getExpansionCardDescription()}
        </ExpansionCard.Description>
      </ExpansionCard.Header>
      <ExpansionCard.Content>
        <VStack gap="8">
          <UNSAFE_Combobox
            label="Tilknyttet hendelse"
            options={connectedEventsOptions}
            isMultiSelect
            selectedOptions={selectedConnectedEvent}
            onToggleSelected={(option, isSelected) =>
              handleToggle(
                "selectedConnectedEvent",
                selectedConnectedEvent,
                option,
                isSelected,
                onSelect
              )
            }
          />
          <Label>Mellomlagring</Label>
          <Chips>
            {storageOptions.map((option) => (
              <Chips.Toggle
                checkmark={true}
                key={option}
                selected={selectedStorage.includes(option)}
                onClick={() =>
                  handleToggle(
                    "selectedStorage",
                    selectedStorage,
                    option,
                    !selectedStorage.includes(option),
                    onSelect
                  )
                }
              >
                {option}
              </Chips.Toggle>
            ))}
          </Chips>
        </VStack>
      </ExpansionCard.Content>
    </ExpansionCard>
  );
}

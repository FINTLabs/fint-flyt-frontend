import {
  Chips,
  ExpansionCard,
  ToggleGroup,
  UNSAFE_Combobox,
  VStack,
} from "@navikt/ds-react";
import {handleToggle} from "./utils";



interface Props {
  eventOptions: string[];
  statusOptions: string[];
  selectedEvents: string[];
  selectedStatus: string[];
  statusType: string;
  onSelect: (key: string, value: string | string[] | null) => void;
  id: string;
  isOpen: boolean;
  toggleOpen: (cardId: string) => void;
}

export default function StatusCard({
  eventOptions,
  statusOptions,
  selectedEvents,
  selectedStatus,
  statusType,
  onSelect,
    id, isOpen, toggleOpen
}: Props) {
  const getExpansionCardDescription = (): string => {
    if (statusType === "status" && selectedStatus.length > 0) {
      return `Status: ${selectedStatus.length}: ${selectedStatus.join(", ")}`;
    }

    if (statusType === "event" && selectedEvents.length > 0) {
      console.log("HELLO");
      return `Siste hendelse:  ${selectedEvents.length}: ${selectedEvents.join(
        ", "
      )}`;
    }

    return "";
  };

  console.log("selected events: ", selectedEvents, statusType);
  return (
    <ExpansionCard size="small" aria-label="Small-variant"  open={isOpen}
                   onToggle={() => toggleOpen(id)}>
      <ExpansionCard.Header>
        <ExpansionCard.Title as="h4" size="small">
          Status
        </ExpansionCard.Title>
        <ExpansionCard.Description>
          {getExpansionCardDescription()}
        </ExpansionCard.Description>
      </ExpansionCard.Header>
      <ExpansionCard.Content>
        <VStack gap="8">
          <ToggleGroup
            defaultValue={statusType}
            onChange={(e) => onSelect("statusType", e)}
            fill
          >
            <ToggleGroup.Item value="status" label="Status" />
            <ToggleGroup.Item value="event" label="Siste hendelse" />
          </ToggleGroup>

          {statusType === "status" || statusType === "" ? (
            <Chips>
              {statusOptions.map((option, id) => (
                <Chips.Toggle
                  checkmark={true}
                  key={option}
                  selected={selectedStatus.includes(option)}
                  // onClick={() =>
                  //   onToggle("selectedStatus", selectedStatus, option, true)
                  // }
                  onClick={() =>
                    handleToggle(
                      "selectedStatus",
                      selectedStatus,
                      option,
                      !selectedStatus.includes(option),
                      onSelect
                    )
                  }
                >
                  {option}
                </Chips.Toggle>
              ))}
            </Chips>
          ) : (
            <UNSAFE_Combobox
              allowNewValues
              label="Siste hendelse"
              options={eventOptions}
              selectedOptions={selectedEvents}
              isMultiSelect
              onToggleSelected={(option, isSelected) =>
                handleToggle(
                  "selectedEvents",
                  selectedEvents,
                  option,
                  isSelected,
                  onSelect
                )
              }
            />
          )}
        </VStack>
      </ExpansionCard.Content>
    </ExpansionCard>
  );
}

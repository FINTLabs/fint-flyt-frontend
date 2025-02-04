import {
  Chips,
  DatePicker,
  ExpansionCard,
  HStack,
  TextField,
  ToggleGroup,
  useRangeDatepicker,
  VStack,
} from "@navikt/ds-react";

interface Props {
  quickOptions: string[];
  quickSelected: string | null;
  dateFrom: string | null;
  dateTo: string | null;
  // setSelected: (value: string | { from: string; to: string }) => void;
  onSelect: (key: string, value: string | string[] | null) => void;
  timeType: string;
  id: string;
  isOpen: boolean;
  toggleOpen: (cardId: string) => void;
}

export default function TimeCard({
  quickOptions,
  quickSelected,
  dateFrom,
  dateTo,
  timeType,
  onSelect,
    id, isOpen, toggleOpen,
}: Props) {
  const { datepickerProps, toInputProps, fromInputProps, selectedRange } =
    useRangeDatepicker({
      onRangeChange: (range) => {
        console.log(range);

        // if (range?.from && range?.to) {
        //   setSelected({
        //     from: range.from.toISOString().split("T")[0],
        //     to: range.to.toISOString().split("T")[0],
        //   });
        // }
      },
    });

  const getExpansionCardDescription = (): string => {
    if (timeType === "quick" && quickSelected) {
      return `Hurtigvalg: ${quickSelected}`;
    }

    if (timeType === "manual" && dateFrom && dateTo) {
      console.log("HELLO");
      return `datoer:  ${dateFrom} -  ${dateTo}`;
    }

    return "";
  };

  return (
    <ExpansionCard size="small" aria-label="Tidsperiode" open={isOpen}
                   onToggle={() => toggleOpen(id)}>
      <ExpansionCard.Header>
        <ExpansionCard.Title as="h4" size="small">
          Tidsperiode
        </ExpansionCard.Title>
        <ExpansionCard.Description>
          {getExpansionCardDescription()}
        </ExpansionCard.Description>
      </ExpansionCard.Header>

      <ExpansionCard.Content>
        <VStack gap="8">
          {/* ToggleGroup for selecting input mode */}
          <ToggleGroup
            value={timeType}
            onChange={(e) => onSelect("timeType", e)}
            fill
          >
            <ToggleGroup.Item value="quick" label="Hurtigvalg" />
            <ToggleGroup.Item value="manual" label="Manuell" />
          </ToggleGroup>

          {/* Conditional Rendering Based on Selection */}
          {timeType === "quick" ? (
            <Chips>
              {quickOptions.map((label, id) => (
                <Chips.Toggle
                  checkmark={false}
                  key={label}
                  selected={quickSelected === label}
                  onClick={() => onSelect("quickSelected", label)}
                >
                  {label}
                </Chips.Toggle>
              ))}
            </Chips>
          ) : (
            <HStack>
              <DatePicker {...datepickerProps}>
                <HStack wrap gap="4" justify="center">
                  <DatePicker.Input {...fromInputProps} label="Fra" />
                  <TextField label="Tid" size="small" type={"time"} />
                  <DatePicker.Input {...toInputProps} label="Til" />
                  <TextField label="Tid" size="small" type={"time"} />
                </HStack>
              </DatePicker>
            </HStack>
          )}
        </VStack>
      </ExpansionCard.Content>
    </ExpansionCard>
  );
}

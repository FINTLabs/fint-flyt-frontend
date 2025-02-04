import {
  ExpansionCard,
  ToggleGroup,
  UNSAFE_Combobox,
  VStack,
} from "@navikt/ds-react";
import { handleToggle } from "./utils"; // Import the utility function

interface Props {
  integrationOptions: string[];
  integrationType: string;
  sourceAppOptions: string[];
  onSelect: (key: string, value: string | string[] | null) => void;
  selectedIntegrations: string[];
  selectedSourceApps: string[];
  id: string;
  isOpen: boolean;
  toggleOpen: (cardId: string) => void;
}

export default function IntegrationCard({
  integrationOptions,
  sourceAppOptions,
  integrationType,
  onSelect,
  selectedIntegrations,
  selectedSourceApps,
    id,isOpen,toggleOpen
}: Props) {
  const getExpansionCardDescription = (): string => {
    if (integrationType === "sourceApp" && selectedSourceApps.length > 0) {
      return `Kildeapplikasjon: ${
        selectedSourceApps.length
      }: ${selectedSourceApps.join(", ")}`;
    }

    if (integrationType === "integration" && selectedIntegrations.length > 0) {
      return `Integrasjon: ${
        selectedIntegrations.length
      }: ${selectedIntegrations.join(", ")}`;
    }

    return "";
  };

  return (
    <ExpansionCard size="small" aria-label="Small-variant med description"  open={isOpen}
                   onToggle={() => toggleOpen(id)}>
      <ExpansionCard.Header>
        <ExpansionCard.Title as="h4" size="small">
          Integrasjon og kildeapplikasjon
        </ExpansionCard.Title>
        <ExpansionCard.Description>
          {getExpansionCardDescription()}
        </ExpansionCard.Description>
      </ExpansionCard.Header>
      <ExpansionCard.Content>
        <VStack gap="8">
          <ToggleGroup
            defaultValue={integrationType}
            onChange={(e) => onSelect("integrationType", e)}
            fill
          >
            <ToggleGroup.Item value="integration" label="Integrasjon" />
            <ToggleGroup.Item value="sourceApp" label="Kildeapplikasjon" />
          </ToggleGroup>

          {integrationType === "integration" || integrationType === "" ? (
            <UNSAFE_Combobox
              allowNewValues
              label="Integrasjon"
              options={integrationOptions}
              isMultiSelect
              onToggleSelected={(option, isSelected) =>
                handleToggle(
                  "selectedIntegrations",
                  selectedIntegrations,
                  option,
                  isSelected,
                  onSelect
                )
              }
              selectedOptions={selectedIntegrations}
            />
          ) : (
            <UNSAFE_Combobox
              allowNewValues
              label="Kildeapplikasjon"
              options={sourceAppOptions}
              selectedOptions={selectedSourceApps}
              isMultiSelect
              onToggleSelected={(option, isSelected) =>
                handleToggle(
                  "selectedSourceApps",
                  selectedSourceApps,
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

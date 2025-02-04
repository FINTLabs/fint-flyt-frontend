import {ExpansionCard, TextField, UNSAFE_Combobox, VStack} from "@navikt/ds-react";
import { handleToggle } from "./utils";
import React from "react"; // Import the utility function

interface Props {
  selectedInstanceSource: string[];
  selectedDestinationSource: string[];
  onSelect: (key: string, value: string | string[] | null) => void;
  id: string;
  isOpen: boolean;
  toggleOpen: (cardId: string) => void;
}

export default function InstanceCard({
  selectedDestinationSource,
  selectedInstanceSource,
  onSelect,
    id,isOpen,toggleOpen
}: Props) {
  const getExpansionCardDescription = (): string => {
    const parts: string[] = [];

    if (selectedInstanceSource.length > 0) {
      parts.push(
        `Kilde: ${selectedInstanceSource.length}: ${selectedInstanceSource.join(
          ", "
        )}`
      );
    }

    if (selectedDestinationSource.length > 0) {
      parts.push(
        `Destinasjon: ${
          selectedDestinationSource.length
        }: ${selectedDestinationSource.join(", ")}`
      );
    }

    return parts.join(" | ");
  };

  return (
    <ExpansionCard size="small" aria-label="Small-variant med description"  open={isOpen}
                   onToggle={() => toggleOpen(id)}>
      <ExpansionCard.Header>
        <ExpansionCard.Title as="h4" size="small">
          Instans
        </ExpansionCard.Title>
        <ExpansionCard.Description>
          {getExpansionCardDescription()}
        </ExpansionCard.Description>
      </ExpansionCard.Header>
      <ExpansionCard.Content>
        <VStack gap="8">
          <TextField label="Kildeapplikasjons instans-ID" size={"small"}/>
          <TextField label="Destinasjons instans-ID"size={"small"} />

          {/*<UNSAFE_Combobox*/}
          {/*  allowNewValues*/}
          {/*  label="Kildeapplikasjons instans-ID"*/}
          {/*  options={instanceSourceOptions}*/}
          {/*  isMultiSelect*/}
          {/*  selectedOptions={selectedInstanceSource}*/}
          {/*  onToggleSelected={(option, isSelected) =>*/}
          {/*    handleToggle(*/}
          {/*      "selectedInstanceSource",*/}
          {/*      selectedInstanceSource,*/}
          {/*      option,*/}
          {/*      isSelected,*/}
          {/*      onSelect*/}
          {/*    )*/}
          {/*  }*/}
          {/*/>*/}

          {/*<UNSAFE_Combobox*/}
          {/*  allowNewValues*/}
          {/*  label="Destinasjons instans-ID"*/}
          {/*  options={destinationSourceOptions}*/}
          {/*  isMultiSelect*/}
          {/*  selectedOptions={selectedDestinationSource}*/}
          {/*  onToggleSelected={(option, isSelected) =>*/}
          {/*    handleToggle(*/}
          {/*      "selectedDestinationSource",*/}
          {/*      selectedDestinationSource,*/}
          {/*      option,*/}
          {/*      isSelected,*/}
          {/*      onSelect*/}
          {/*    )*/}
          {/*  }*/}
          {/*/>*/}
        </VStack>
      </ExpansionCard.Content>
    </ExpansionCard>
  );
}

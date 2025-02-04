// src/pages/Index.tsx
import React, {useState} from "react";
import { Box, Button, HStack, VStack } from "@navikt/ds-react";
import SortSelect from "./sortSelect";
import TimeCard from "./timeCard";
import IntegrationCard from "./integrationCard";
import InstanceCard from "./instanceCard";
import StatusCard from "./statusCard";
import AdvancedCard from "./advancedCard";
import {FilterProvider, useFilters} from "./filterContext";


const apiOptions = {
  timeOptions: ["Time", "Tre timer", "Døgn", "Uke", "Måned", "År"],
  integrationOptions: [
    "Fartøyvern",
    "Arkivsak",
    "Tillatelse til inngrep i automatisk fredet kulturminne for enkelttiltak",
    "Journalpost",
    "Tilskudd til freda bygninger i privat eie",
  ],
  sourceAppOptions: ["Digisak", "eGrunnerverv"],
  instanceSourceOptions: ["208812", "GIMSE-X", "GIMSE-1337"],
  destinationSourceOptions: ["2024/77-[27]", "2024/77-[25]", "2024/77-[24]"],
  statusOptions: ["Under behandling", "Overført", "Avvist", "Feilet"],
  eventOptions: [
    "Mellomlagring av instans slettet",
    "Instans klar for sending til destinasjon",
    "Instans konvertert",
  ],
  connectedEventsOptions: ["Avansert 1", "Avansert 2", "Avansert 3"],
  storageOptions: ["Lagret", "Lagret og slettet", "Ikke lagret"],
};

const FilterContent: React.FC = () => {
  const { filters, updateFilter, clearFilters } = useFilters();
  const [openCard, setOpenCard] = useState<string | null>(null);

  const toggleCard = (cardId: string) => {
    console.log("toggling card: ")
    setOpenCard(prev => (prev === cardId ? null : cardId));
  };


  return (
      <Box minWidth={"300px"} className={"p-20"}>
        <VStack gap="4">
          <SortSelect />
          <TimeCard
              id={"timeCard"}
              isOpen={openCard === "timeCard"}
              toggleOpen={toggleCard}
              timeType={filters.timeType || "quick"}
              quickOptions={apiOptions.timeOptions}
              quickSelected={filters.quickSelected}
              dateFrom={filters.dateFrom}
              dateTo={filters.dateTo}
              onSelect={updateFilter}
          />
          <IntegrationCard
              id={"integration"}
              isOpen={openCard === "integration"}
              toggleOpen={toggleCard}
              integrationType={filters.integrationType || "integration"}
              integrationOptions={apiOptions.integrationOptions}
              sourceAppOptions={apiOptions.sourceAppOptions}
              selectedSourceApps={filters.selectedSourceApps}
              selectedIntegrations={filters.selectedIntegrations}
              onSelect={updateFilter}
          />
          <InstanceCard
              id={"instance"}
              isOpen={openCard === "instance"}
              toggleOpen={toggleCard}
              selectedInstanceSource={filters.selectedInstanceSource}
              selectedDestinationSource={filters.selectedDestinationSource}
              onSelect={updateFilter}
          />
          <StatusCard
              id={"status"}
              isOpen={openCard === "status"}
              toggleOpen={toggleCard}
              eventOptions={apiOptions.eventOptions}
              statusOptions={apiOptions.statusOptions}
              selectedEvents={filters.selectedEvents}
              selectedStatus={filters.selectedStatus}
              statusType={filters.statusType || "status"}
              onSelect={updateFilter}
          />
          <AdvancedCard
              id={"advanced"}
              isOpen={openCard === "advanced"}
              toggleOpen={toggleCard}
              connectedEventsOptions={apiOptions.connectedEventsOptions}
              storageOptions={apiOptions.storageOptions}
              selectedConnectedEvent={filters.selectedConnectedEvent}
              selectedStorage={filters.selectedStorage}
              onSelect={updateFilter}
          />
          <HStack gap={"10"}>
            <Button>Søk</Button>
            <Button variant={"tertiary"} onClick={clearFilters}>
              Tilbakestill
            </Button>
          </HStack>
        </VStack>
      </Box>
  );
};

export default function Filters() {
  return (
      <FilterProvider>
        <FilterContent />
      </FilterProvider>
  );
}

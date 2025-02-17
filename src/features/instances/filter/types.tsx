export interface Filters {
    sourceApplicationIds: string[] | null;
    sourceApplicationIntegrationIds: string[] | null;
    sourceApplicationInstanceIds: string[] | null;
    integrationIds: string[] | null;
    timeOffSetHours: string | null;
    timeOffsetMinutes: string | null;
    timeCurrentPeriod: string | null;
    timeTimestampMin: Date | null;
    timeTimestampMax: Date | null;
    statuses: string[] | null;
    storageStatuses: string[] | null;
    associatedEvents: string[] | null;
    destinationIds: string[] | null;
    sort?: string;
}

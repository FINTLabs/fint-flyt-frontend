export const USER_GUIDE_EN = [
    "Go to 'New' in the menu",
    "Select source application, integration, and destination",
    "When you press 'Create', the integration will be created in Flyt, and you'll have the option to add a configuration now or later by finding the integration you just created under 'integrations' in the menu",
    "Fill out the configuration setup according to the integration's needs. Here, you can use metadata and perform value conversions. If you're ready to finalize and activate, select that in the checkboxes at the bottom of the page. It's not possible to activate until you've chosen to complete. Activating a configuration upon completion is not mandatory, but Flyt will not receive and process instances for an integration until it has an active configuration.",
    "If you want to add, modify, or view configurations for an integration, go to 'Integrations' in the menu, select the integration you want to view, and press 'Show'. You'll then have an overview of drafts, completed configurations, and which configuration might be active." +
    "Select 'Edit' if you want to continue working on a started configuration or choose 'New' if you want to create an entirely new one. You'll be able to start with a blank configuration or base it on a previous version. Note that you cannot edit a completed configuration.",
];

export const WORD_LIST_EN = [
    "Integration - Where data to be transformed comes from, where it's going, and what it will contain.",
    "Configuration - How the data is transformed from source to destination",
    "Metadata - In Fint Flyt, metadata is information about the content of data to be transformed. Metadata describes the data coming into Flyt, while the configuration describes how outgoing data should be.",
    "Instance - Each submission of data for one integration is an instance. The content of the instance is transformed and forwarded.",
    "Value Conversion - Since Flyt is platform-independent and doesn't 'know' what's being sent in or what the destination accepts, there's sometimes a need for value conversion. In such cases, we set up a rule set that means for each occurrence of a given data/value, the value will be transformed or converted into something else. Examples include when an archive only accepts certain media types or when the destination only accepts formats such as uppercase/lowercase.",
    "Source Application - A source application is the system where data needing transformation originates.",
    "Destination - Where data should be sent after transformation in Flyt",
    "Custom Field/Value - To use metadata in the configuration, we need fields that allow both text and references to metadata. In Flyt, these are called custom fields."
];

export const STATUS_DESCRIPTIONS_EN = [
    "Instance received - Instance has entered FINT-Flyt from the case management system.",
    "Instance temporarily stored - Instance temporarily stored in file storage, memory, and in the database.",
    "Instance converted - Instance processed and data converted according to the configuration.",
    "Instance ready for sending to destination - Instance has been fully processed in FINT-Flyt and will be automatically sent to the case management system. If the instance remains in this status, an error has occurred, and you should contact Novari support <a href='https://support.jira.novari.no/servicedesk/customer/portals' target='_top'>here</a>",
    "Instance accepted by destination - Feedback from the case management system confirms that the instance has been sent and everything went well.",
    "Temporary storage of instance deleted - Cleanup according to GDPR, where files and instances are deleted after they have been successfully sent.",
    "Error while sending to destination - Error messages from the case management system often appear here. If the message is incomplete or unclear, contact Novari.",
];

import { VersionEntry } from './types';

export const ABOUT_VERSIONS_EN =
    "FLYT is under continuous development, with new functionality being added regularly and improvements to user experience based on user feedback. This page describes major changes and bug fixes in FLYT.";


export const VERSION_DATA_EN: VersionEntry[] = [
    {
        heading: "June 2025",
        updates: [
            "The form for creating a new integration has been updated so that you can no longer select an integration from a source that already exists. The integration will be visible in the dropdown, but not selectable.",
            "Additionally, the same form has been improved with several small changes to enhance usability.",
        ],
    },
    {
        heading: "May 2025",
        updates: [
            "It is now possible to log out of FLYT via a button in the menu.",
            "Small design improvements to the menu.",
            "Cleanup of version logs in various languages",
        ],
    },
    {
        heading: "April 2025",
        updates: [
            "Support for filtering in the instance overview",
            "Added more details to the dashboard for various statuses on instances",
        ],
    },
    {
        heading: "February 2025",
        updates: [
            "Converted to the new Novari theme",
            "Moved scroll bars to the window, set focus",
        ],
    },
    {
        heading: "October 2024",
        updates: [
            "Support for VIGO OT",
            "Added better and more precise error handling",
        ],
    },
    {
        heading: "September 2024",
        updates: [
            "Deletion of cached instances",
            "Added access control for source application",
        ],
    },
    {
        heading: "August 2024",
        updates: [
            "Added manual handling of instances",
        ],
    },
    {
        heading: "April 2024",
        updates: [
            "10.4 Creating a new value conversion requires unique name to make them easier to use in configurations",
        ],
    },
    {
        heading: "February 2024",
        updates: [
            "3.2 Name change in configuration view, \"dynamic value/field\" changed to \"custom value/field\"",
        ],
    },
    {
        heading: "January 2024",
        updates: [
            "20.1 Added option to choose to show multiple instances and integrations per page in the data tables",
            "11.1 Removed menu option for \"New\" and created button for new integration in the integrations page",
            "5.1 New/updated design of the new integration and configuration pages, language selection on the menu bar",
            "5.1 New look on the Dashboard - Content from the support page is now here",
        ],
    },
    {
        heading: "December 2023",
        updates: [
            "27.12 Added support for English language in Flyt",
            "12.12 New design of the integration overview",
            "11.12 Added support for Nynorsk language in Flyt",
            "8.12 Improved display of value conversion with multiple values. New design of the instance page where all information is consolidated on one surface.",
            "1.12 Added a new page displaying versions and what's new in Flyt",
        ],
    },
    {
        heading: "November 2023",
        updates: [
            "30.11 New design of the value conversion page and updated error messages for instances that failed upon submission",
            "27.11 New design of the support page",
            "23.11 Various bug fixes and some changes to the user interface",
        ],
    },
];

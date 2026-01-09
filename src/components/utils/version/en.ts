import { VersionEntry } from './types';

export const ABOUT_VERSIONS_EN =
    'FLYT is under continuous development, with new functionality being added regularly and improvements to user experience based on user feedback. This page describes major changes and bug fixes in FLYT.';

export const VERSION_DATA_EN: VersionEntry[] = [

    {
        heading: "January 2026",
        updates: [
            {
                title: "Visual changes:",
                text: "Several borders around tables and elements have been removed, and color usage has been adjusted to better align with the Novaria profile."
            },
            {
                title: "Dashboard:",
                text: "New design and optimized data retrieval for faster loading."
            },
            {
                title: "Table performance:",
                text: "Tables now load significantly faster with reduced waiting time before display."
            },
            {
                title: "Table loading design:",
                text: "A new loading indicator ensures the table is visible before all data is fully loaded."
            },
            {
                title: "Filtering in the instance table:",
                text: "The side panel has been replaced by a modal. The filter button now shows the number of active filters."
            },
            {
                title: "Configuration page:",
                text: "Minor visual adjustments for a more consistent look."
            },
            {
                title: "Layout:",
                text: "All pages now follow a unified layout for consistent element placement."
            },
            {
                title: "Comments in configuration version tables:",
                text: "Long comments are now truncated with ellipsis to prevent layout issues that previously hid the action button."
            }
        ]
    },
    {
        heading: "December 2025",
        updates: [
            {
                text: "Refactoring of packages and version updates."
            }
        ]
    },
    {
        heading: 'October 2025',
        updates: [
            { text: 'You can now see who changed a configuration and when the change was made.' },
        ],
    },
    {
        heading: 'June 2025',
        updates: [
            {
                text: 'The form for creating a new integration has been updated so that you can no longer select an integration from a source that already exists. The integration will be visible in the dropdown, but not selectable.',
            },
            {
                text: 'Additionally, the same form has been improved with several small changes to enhance usability.',
            },
        ],
    },
    {
        heading: 'May 2025',
        updates: [
            { text: 'It is now possible to log out of FLYT via a button in the menu.' },
            { text: 'Small design improvements to the menu.' },
            { text: 'Cleanup of version logs in various languages' },
        ],
    },
    {
        heading: 'April 2025',
        updates: [
            { text: 'Support for filtering in the instance overview' },
            { text: 'Added more details to the dashboard for various statuses on instances' },
        ],
    },
    {
        heading: 'February 2025',
        updates: [
            { text: 'Converted to the new Novari theme' },
            { text: 'Moved scroll bars to the window, set focus' },
        ],
    },
    {
        heading: 'October 2024',
        updates: [
            { text: 'Support for VIGO OT' },
            { text: 'Added better and more precise error handling' },
        ],
    },
    {
        heading: 'September 2024',
        updates: [
            { text: 'Deletion of cached instances' },
            { text: 'Added access control for source application' },
        ],
    },
    {
        heading: 'August 2024',
        updates: [{ text: 'Added manual handling of instances' }],
    },
    {
        heading: 'April 2024',
        updates: [
            {
                title: '10.4:',
                text: 'Creating a new value conversion requires unique name to make them easier to use in configurations',
            },
        ],
    },
    {
        heading: 'February 2024',
        updates: [
            {
                title: '3.2:',
                text: 'Name change in configuration view, "dynamic value/field" changed to "custom value/field"',
            },
        ],
    },
    {
        heading: 'January 2024',
        updates: [
            {
                title: '20.1:',
                text: 'Added option to choose to show multiple instances and integrations per page in the data tables',
            },
            {
                title: '11.1:',
                text: 'Removed menu option for "New" and created button for new integration in the integrations page',
            },
            {
                title: '5.1:',
                text: 'New/updated design of the new integration and configuration pages, language selection on the menu bar',
            },
            {
                title: '5.1:',
                text: 'New look on the Dashboard - Content from the support page is now here',
            },
        ],
    },
    {
        heading: 'December 2023',
        updates: [
            { title: '27.12:', text: 'Added support for English language in Flyt' },
            { title: '12.12:', text: 'New design of the integration overview' },
            { title: '11.12:', text: 'Added support for Nynorsk language in Flyt' },
            {
                title: '8.12:',
                text: 'Improved display of value conversion with multiple values. New design of the instance page where all information is consolidated on one surface.',
            },
            {
                title: '1.12:',
                text: "Added a new page displaying versions and what's new in Flyt",
            },
        ],
    },
    {
        heading: 'November 2023',
        updates: [
            {
                title: '30.11:',
                text: 'New design of the value conversion page and updated error messages for instances that failed upon submission',
            },
            { title: '27.11:', text: 'New design of the support page' },
            {
                title: '23.11:',
                text: 'Various bug fixes and some changes to the user interface',
            },
        ],
    },
];

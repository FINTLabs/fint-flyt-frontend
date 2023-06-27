// noinspection SpellCheckingInspection

import {GridLocaleText} from "@mui/x-data-grid";

export const gridLocaleNoNB: Partial<GridLocaleText> = {
    // Root
    noRowsLabel: 'Ingen rader',
    noResultsOverlayLabel: 'Ingen resultater',
    errorOverlayDefaultLabel: 'Det har skjedd en feil.',

    // Density selector toolbar button text
    toolbarDensity: 'Radvisning',
    toolbarDensityLabel: 'Tetthet',
    toolbarDensityCompact: 'Kompakt',
    toolbarDensityStandard: 'Standard',
    toolbarDensityComfortable: 'Luftig',

    // Columns selector toolbar button text
    toolbarColumns: 'Kolonner',
    toolbarColumnsLabel: 'Velg kolonne',

    // Filters toolbar button text
    toolbarFilters: 'Søk',
    toolbarFiltersLabel: 'Vis filtre',
    toolbarFiltersTooltipHide: 'Skjul filtre',
    toolbarFiltersTooltipShow: 'Vis filtre',
    toolbarFiltersTooltipActive: (count) =>
        count !== 1 ? `${count} aktive filtre` : `${count} aktivt filter`,

    // Export selector toolbar button text
    // toolbarExport: 'Export',
    toolbarExportLabel: 'Eksporter',
    toolbarExportCSV: 'Last ned som CSV',
    // toolbarExportPrint: 'Print',

    // Columns panel text
    columnsPanelTextFieldLabel: 'Finn kolonne',
    columnsPanelTextFieldPlaceholder: 'Kolonne titel',
    columnsPanelDragIconLabel: 'Reorder kolonne',
    columnsPanelShowAllButton: 'Vis alle',
    columnsPanelHideAllButton: 'Skjul alle',

    // Filter panel text
    filterPanelAddFilter: 'Legg til filter',
    filterPanelDeleteIconLabel: 'Slett',
    filterPanelOperators: 'Operatorer',
    // filterPanelOperatorAnd: 'And',
    // filterPanelOperatorOr: 'Or',
    filterPanelColumns: 'Kolonne',
    filterPanelInputLabel: 'Verdi',
    filterPanelInputPlaceholder: 'Søk',

    // Filter operators text
    filterOperatorContains: 'Inneholder',
    filterOperatorEquals: 'Lik som',
    filterOperatorStartsWith: 'Begynner med',
    filterOperatorEndsWith: 'Ender med',
    filterOperatorIs: 'På',
    filterOperatorNot: 'Ikke på',
    filterOperatorAfter: 'Etter',
    filterOperatorOnOrAfter: 'På eller etter',
    filterOperatorBefore: 'Før',
    filterOperatorOnOrBefore: 'På eller før',
    filterOperatorIsEmpty: 'Inneholder data',
    filterOperatorIsNotEmpty: 'Inneholder ikke data',
    // filterOperatorIsAnyOf: 'is any of',

    // Filter values text
    // filterValueAny: 'any',
    // filterValueTrue: 'true',
    // filterValueFalse: 'false',

    // Column menu text
    // columnMenuLabel: 'Menu',
    columnMenuShowColumns: 'Vis Kolonner',
    // columnMenuFilter: 'Filter',
    columnMenuHideColumn: 'Skjul',
    columnMenuUnsort: 'Fjern sortering',
    columnMenuSortAsc: 'Sorter stigende',
    columnMenuSortDesc: 'Sorter synkende',

    // Column header text
    columnHeaderFiltersTooltipActive: (count) =>
        count !== 1 ? `${count} aktive filtre` : `${count} aktivt filter`,
    columnHeaderFiltersLabel: 'Vis filtre',
    columnHeaderSortIconLabel: 'Sorter',

    // Rows selected footer text
    footerRowSelected: (count) =>
        count !== 1
            ? `${count.toLocaleString()} rader valgt`
            : `${count.toLocaleString()} rader valgt`,

    // Total rows' footer text
    footerTotalRows: 'Totalt antall rader:',

    // Total visible rows footer text
    footerTotalVisibleRows: (visibleCount, totalCount) =>
        `${visibleCount.toLocaleString()} av ${totalCount.toLocaleString()}`,

    // Checkbox selection text
    checkboxSelectionHeaderName: 'Avkryssningsvalg',
    // checkboxSelectionSelectAllRows: 'Select all rows',
    // checkboxSelectionUnselectAllRows: 'Unselect all rows',
    // checkboxSelectionSelectRow: 'Select row',
    // checkboxSelectionUnselectRow: 'Unselect row',

    // Boolean cell text
    // booleanCellTrueLabel: 'yes',
    // booleanCellFalseLabel: 'no',

    // Actions cell more text
    actionsCellMore: 'mer',

    // Column pinning text
    pinToLeft: 'Fest til venstre',
    pinToRight: 'Fest til høyre',
    unpin: 'Frigi',

    // Tree Data
    treeDataGroupingHeaderName: 'Gruppering',
    treeDataExpand: 'Vis underelementer',
    treeDataCollapse: 'Skjul underelementer',

    // Grouping columns
    // groupingColumnHeaderName: 'Group',
    // groupColumn: name => `Group by ${name}`,
    // unGroupColumn: name => `Stop grouping by ${name}`,

    // Master/detail
    // expandDetailPanel: 'Expand',
    // collapseDetailPanel: 'Collapse',
};

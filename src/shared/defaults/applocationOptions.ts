import { ISelect } from "../types/Select";

export function getSelectableDefaultByLanguage(lang: string): string {
    if (lang === "no") {
        return "- Velg kildeapplikasjon";
    } else if (lang === "en") {
        return "- Select source application";
    } else {
        return "- Velg kjeldeapplikasjon";
    }
}

export function selectableDestinations(lang: string): ISelect[] {
    return [
        {
            label: lang === "en" ? "- Select destination" : "- Velg destinasjon",
            value: "",
        },
        {label: "Arkivsystem", value: "fylkesrad"},
    ];
}
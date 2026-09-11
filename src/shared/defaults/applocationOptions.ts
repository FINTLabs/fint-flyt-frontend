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

export const defaultDestination: ISelect = {
    label: "Arkivsystem",
    value: "fylkesrad",
};

import { VersionEntry } from './types';
import { ABOUT_VERSIONS, VERSION_DATA } from './nb';
import { ABOUT_VERSIONS_EN, VERSION_DATA_EN } from './en';
import { ABOUT_VERSIONS_NN, VERSION_DATA_NN } from './nn';

export function getAboutByLanguage(lang: string): string {
	if (lang === "no") {
		return ABOUT_VERSIONS;
	} else if (lang === "en") {
		return ABOUT_VERSIONS_EN;
	} else {
		return ABOUT_VERSIONS_NN;
	}
}

export function getVersionDataByLanguage(
	lang: string
): VersionEntry[] {
	if (lang === "no") {
		return VERSION_DATA;
	} else if (lang === "en") {
		return VERSION_DATA_EN;
	} else {
		return VERSION_DATA_NN;
	}
}

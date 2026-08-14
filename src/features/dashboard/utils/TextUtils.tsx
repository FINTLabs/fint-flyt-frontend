import { FAQ_EN, FLYT_DESCRIPTION_EN } from './helperTextsEn';
import { FAQ, FLYT_DESCRIPTION } from './helperTextsNb';
import { FAQ_NN, FLYT_DESCRIPTION_NN } from './helperTextsNn';


export function getAboutFlytByLanguage(lang: string): string {
    if (lang === 'no') {
        return FLYT_DESCRIPTION;
    } else if (lang === 'en') {
        return FLYT_DESCRIPTION_EN;
    } else {
        return FLYT_DESCRIPTION_NN;
    }
}

export function getFAQByLanguage(lang: string): { header: string; content: string }[] {
    if (lang === 'no') {
        return FAQ;
    } else if (lang === 'en') {
        return FAQ_EN;
    } else {
        return FAQ_NN;
    }
}
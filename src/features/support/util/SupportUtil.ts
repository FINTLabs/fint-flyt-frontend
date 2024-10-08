import {FAQ, FLYT_DESCRIPTION, STATUS_DESCRIPTIONS, USER_GUIDE, WORD_LIST} from "./supportTexts";
import {FAQ_EN, FLYT_DESCRIPTION_EN, STATUS_DESCRIPTIONS_EN, USER_GUIDE_EN, WORD_LIST_EN} from "./supportTextsEn";
import {FAQ_NN, FLYT_DESCRIPTION_NN, STATUS_DESCRIPTIONS_NN, USER_GUIDE_NN, WORD_LIST_NN} from "./supportTextsNn";

export function getAboutFlytByLanguage(lang: string): string {
    if (lang === 'no') {
        return FLYT_DESCRIPTION;
    } else if (lang === 'en') {
        return FLYT_DESCRIPTION_EN
    } else {
        return FLYT_DESCRIPTION_NN
    }
}

export function getUserGuideByLanguage(lang: string): string[] {
    if (lang === 'no') {
        return USER_GUIDE;
    } else if (lang === 'en') {
        return USER_GUIDE_EN
    } else {
        return USER_GUIDE_NN
    }
}

export function getWordListByLanguage(lang: string): string[] {
    if (lang === 'no') {
        return WORD_LIST;
    } else if (lang === 'en') {
        return WORD_LIST_EN
    } else {
        return WORD_LIST_NN
    }
}

export function getStatusDescriptionsByLanguage(lang: string): string[] {
    if (lang === 'no') {
        return STATUS_DESCRIPTIONS;
    } else if (lang === 'en') {
        return STATUS_DESCRIPTIONS_EN
    } else {
        return STATUS_DESCRIPTIONS_NN
    }
}

export function getFAQByLanguage(lang: string): { header: string, content: string }[] {
    if (lang === 'no') {
        return FAQ;
    } else if (lang === 'en') {
        return FAQ_EN
    } else {
        return FAQ_NN
    }
}
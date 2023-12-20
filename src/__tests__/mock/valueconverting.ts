import {IValueConverting} from "../../features/valueConverting/types/ValueConverting";

export const APPLICATION_VALUE_CONVERTING: IValueConverting[] = [
    {
        id: 1,
        displayName: 'Små bokstaver',
        fromApplicationId: 1,
        fromTypeId: 'text',
        toApplicationId: 'fylkesting',
        toTypeId: 'fylkesrad',
        convertingMap: {"test": "1"}
    },
    {
        id: 2,
        displayName: 'Store bokstaver',
        fromApplicationId: 1,
        fromTypeId: 'text',
        toApplicationId: 'fylkesting',
        toTypeId: 'fylkesrad',
        convertingMap: {"test": "1"}
    },
    {
        id: 3,
        displayName: 'Stor forbokstav',
        fromApplicationId: 1,
        fromTypeId: 'text',
        toApplicationId: 'fylkesting',
        toTypeId: 'fylkesrad',
        convertingMap: {"test": "1"}
    }
]

export const DESTINATION_VALUE_CONVERTING: IValueConverting[] = [
    {
        id: 1,
        displayName: 'Epost til brukernavn',
        fromApplicationId: 1,
        fromTypeId: 'text',
        toApplicationId: 'fylkesting',
        toTypeId: 'fylkesrad',
        convertingMap: {"test": "1"}
    },
    {
        id: 2,
        displayName: 'Kommune til arkivdel',
        fromApplicationId: 1,
        fromTypeId: 'text',
        toApplicationId: 'fylkesting',
        toTypeId: 'fylkesrad',
        convertingMap: {"test": "1"}
    }
]

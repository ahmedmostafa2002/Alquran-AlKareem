export default interface AyahProp{
    number: {
        inQuran: number;
        inSurah: number;
    };
    meta: {
        juz: number;
        page: number;
        manzil: number;
        ruku: number;
        hizbQuarter: number;
        sajda: {
            recommended: boolean;
            obligatory: boolean;
        };
    };
    text: {
        arab: string;
        transliteration: {
            en: string;
        };
    };
    translation: {
        en: string;
        id: string;
    };
    audio: {
        primary: string;
        secondary: string[];
    };
    tafsir: { // Tafsir at the verse level
        id: {
            short: string;
            long: string;
        };
    };
}
// {
//     text:string,
//     number:number,
//     juz:number,
//     page:number,
//     numberInSurah:number,
//     hizbQuarter:number,
//     sajda:boolean,
//     audio:string,
//     tafsir:string
// }
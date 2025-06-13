// import AyahProp from "./ayah.interface";

// export default interface SurahProps{
//     englishName:string;
//     name:string;
//     number:number;
//     numberOfAyahs:number;
//     revelationType:string;
//     ayahs:AyahProp[];
// }

// Remove unused import if AyahProp is not used elsewhere
// import AyahProp from "./ayah.interface";

interface SurahName {
    short: string;
    long: string;
    transliteration: {
        en: string;
        id: string;
    };
    translation: {
        en: string;
        id: string;
    };
}
// Define the structure for the 'revelation' object
interface Revelation {
    arab: string;
    en: string;
    id: string;
}

interface SurahTafsir {
    id: string;
}

interface PreBismillah {
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
}

interface VerseProp {
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

export default interface SurahProps {
    number: number;
    sequence: number;
    numberOfVerses: number; 
    name: SurahName; 
    revelation: Revelation; 
    tafsir: SurahTafsir; 
    preBismillah?: PreBismillah;
    verses: VerseProp[]; 
}
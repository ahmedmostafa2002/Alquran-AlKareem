import AyahProp from "./ayah.interface";

export default interface SurahProps{
    englishName:string;
    name:string;
    number:number;
    numberOfAyahs:number;
    revelationType:string;
    ayahs:AyahProp[];
}
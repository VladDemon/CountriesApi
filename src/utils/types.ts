export interface Country {
    name: {
        common: string;
        official: string;
        nativeName?: {
            [key: string]: {
            official: string;
            common: string;
            };
        };
    };
    cca3: string; 
    capital: string[];
    region: string;
    subregion?: string;
    population: number;
    flags: {
        png: string;
        svg: string;
    };
}

export type CountryDetailsResponse = Country[];

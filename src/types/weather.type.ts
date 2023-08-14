export interface IWetherDataAPI {
    location: {
        name: string;
        region: string;
        country: string;
    };
    current: {
        last_updated: string;
        temp_c: number;
        temp_f: number;
        condition: {
            text: string;
            icon: string;
            code: number;
        };
        wind_mph: number;
        wind_kph: number;
        humidity: number;
    }
}
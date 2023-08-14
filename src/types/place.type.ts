export interface IPlaceData {
    type: string;
    id: string;
    geometry: {
        type: string,
        coordinates: [number,number]
    }
    properties: {
        xid: string,
        name: string,
        dist: number,
        rate: number | string,
        osm: string,
        kinds: string
    }
}

export interface IPlacesDataAPI {
    type: string;
    features: IPlaceData[];
}

export interface IPlaceInformationDataAPI {
    xid: string;
    name: string;
    address?: {
        city: string;
        road: string;
        house_number: string;
    }
    kinds?: string;
    image?: string;
    url?: string;
    point: {
        lon: number;
        lat: number;
    }
}
import axios, { AxiosResponse } from 'axios';
import { OpenTripMapAPIConfig } from '../config/openTripMapAPI.config';
import { ICoordinatesDataAPI } from '../types/coordinates.type';
import { IPlaceData, IPlaceInformationDataAPI, IPlacesDataAPI } from '../types/place.type';

export interface CityCoordinates {
  latitude: number;
  longitude: number;
}

export class PlacesService {
  private token: string;

  constructor() {
    this.token = OpenTripMapAPIConfig.openTripMap_TOKEN;
  }

  /**
   * The function sends a request to the API to get the coordinates of the city by its name.
   * @param cityName City name
   * @return {CityCoordinates} City coordinates
   */
  public async getGeopositionByCityName(
    cityName: string,
  ): Promise<CityCoordinates> {
    try {
      const response: AxiosResponse = await axios.get(
        `https://api.opentripmap.com/0.1/ru/places/geoname?name=${cityName}&apikey=${this.token}`,
      );

      const coordinatesData: ICoordinatesDataAPI = response.data;

      const coordinates: CityCoordinates = {
        latitude: coordinatesData.lat,
        longitude: coordinatesData.lon,
      };

      return coordinates;
    } catch (error) {
      throw new Error('Failed to fetch a city coordinates');
    }
  }

  /**
   * The function sends a request to the API to get the list of interesting places of decreed city.
   * @param coordinates City coordinates
   * @return {IPlaceData[]} Array of places
   */
  public async getPlacesByCoordinates(
    coordinates: CityCoordinates,
  ): Promise<IPlaceData[]> {
    try {
      const response: AxiosResponse = await axios.get(
        `https://api.opentripmap.com/0.1/ru/places/radius?radius=5000&lon=${coordinates.longitude}&lat=${coordinates.latitude}&kinds=bars&limit=5&apikey=${this.token}`,
      );

      const placesData: IPlacesDataAPI = response.data;

      const places: IPlaceData[] = placesData.features;

      return places;
    } catch (error) {
      throw new Error('Failed to fetch a places');
    }
  }

  /**
   * The function sends a request to the API to get more information about once place.
   * @param xid Place ID
   * @return {IPlaceData[]} Array of places
   */
  public async getInformationAboutPlace(
    xid: string,
  ): Promise<IPlaceInformationDataAPI> {
    try {
      const response: AxiosResponse = await axios.get(
        `https://api.opentripmap.com/0.1/ru/places/xid/${xid}?apikey=${this.token}`,
      );

      const placeInformationData: IPlaceInformationDataAPI = response.data;

      return placeInformationData;
    } catch (error) {
      throw new Error('Failed to fetch a information about place data');
    }
  }
}

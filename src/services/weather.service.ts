import axios, { AxiosResponse } from 'axios';
import { WeatherAPIConfig } from '../config/weatherAPI.config copy';
import { IWetherDataAPI } from '../types/weather.type';

export interface CityCoordinates {
  latitude: number;
  longitude: number;
}

export class WeatherService {
  private token: string;

  constructor() {
    this.token = WeatherAPIConfig.WEATHER_APIKEY;
  }

  /**
   * The function sends a request to the API to get the coordinates of the city by its name.
   * @param coordinates City name
   * @return {CityCoordinates} City coordinates
   */
  public async getWeatherInformation(
    coordinates: CityCoordinates
  ): Promise<IWetherDataAPI> {
    try {
      const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        params: {q: `${coordinates.latitude},${coordinates.longitude}`},
        headers: {
          'X-RapidAPI-Key': this.token,
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      };

      const response: AxiosResponse = await axios.request(options);
      const weatherData: IWetherDataAPI = response.data;

      return weatherData;
    } catch (error) {
      throw new Error('Failed to fetch a city coordinates');
    }
  }
}

import axios, { AxiosResponse } from 'axios';

export class DogService {
  /**
   * The function sends a request to the public API to get the URL of the dog image.
   * @return {String} URL of the dog image
   */
  public async getRandomDogImage(): Promise<string> {
    try {
      const response: AxiosResponse = await axios.get(
        'https://api.thedogapi.com/v1/images/search',
      );
      const dogImageUrl: string = response.data[0].url;

      return dogImageUrl;
    } catch (error) {
      throw new Error('Failed to fetch a dog image');
    }
  }
}

import axios, { AxiosResponse } from 'axios';

export class CatService {
  /**
   * The function sends a request to the public API to get the URL of the cat image.
   * @return {String} URL of the cat image
   */
  public async getRandomCatImage(): Promise<string> {
    try {
      const response: AxiosResponse = await axios.get(
        'https://api.thecatapi.com/v1/images/search',
      );
      const catImageUrl: string = response.data[0].url;

      return catImageUrl;
    } catch (error) {
      throw new Error('Failed to fetch a cat image');
    }
  }
}

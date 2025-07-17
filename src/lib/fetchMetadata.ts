import axios from 'axios';
import * as cheerio from 'cheerio';

export async function fetchMetadata(url: string) {
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    const $ = cheerio.load(data);
    const title = $('title').text() || $('meta[property="og:title"]').attr('content') || '';
    const favicon = new URL('/favicon.ico', url).href;

    return { title, favicon };
  } catch (error) {
    console.error('Metadata fetch failed for:', url);
   

    // Option 1: Return fallback values instead of throwing
    return {
      title: '',
      favicon: new URL('/favicon.ico', url).href,
    };

    // Option 2 (if you prefer to abort the POST): re-throw the error
    // throw new Error('Failed to fetch metadata');
  }
}

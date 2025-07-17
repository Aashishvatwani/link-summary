import axios from 'axios';
import * as cheerio from 'cheerio';

export async function fetchMetadata(url: string) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const title = $('title').text() || $('meta[property="og:title"]').attr('content');
  const favicon = new URL('/favicon.ico', url).href;
  return { title, favicon };
}

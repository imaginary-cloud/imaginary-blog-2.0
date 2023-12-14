import axios from 'axios';
import GhostContentAPI from '@tryghost/content-api';
import type { GhostContentAPIOptions, Params } from '@tryghost/content-api';
import { convertString } from './helpers';

/**
 * Extend the GhostContentAPIOptions interface to add makeRequest method
 *
 * As of today (13/12/2023), without this extra logic,
 * GhostContentAPI is throwing an error when combined with Next.js version 14:
 *
 * Error: There is no suitable adapter to dispatch the request since :
 * adapter xhr is not supported by the environment
 * adapter http is not available in the build
 */
interface CustomGhostContentAPIOptions extends GhostContentAPIOptions {
  makeRequest: (options: {
    url: string;
    method: string;
    params: Record<string, any>;
    headers: Record<string, string>;
  }) => Promise<any>;
}

const api = new GhostContentAPI({
  url: process.env.GHOST_URL as string,
  key: process.env.GHOST_KEY as string,
  version: 'v5.0',
  makeRequest: async ({ url, method, params, headers }) => {
    // Construct a new URL object from the provided URL
    const apiUrl = new URL(url);

    // Iterate over params and set them as search parameters in the URL
    Object.keys(params).map((key) => apiUrl.searchParams.set(key, params[key]));

    // Add basic authentication to the headers
    if (process.env.STAGING_USERNAME && process.env.STAGING_PASSWORD) {
      const auth = Buffer.from(
        `${process.env.STAGING_USERNAME}:${process.env.STAGING_PASSWORD}`
      ).toString('base64');

      headers['Authorization'] = `Basic ${auth}`;
    }

    // Make an axios request with the constructed URL, headers, and method
    return await axios({ url: apiUrl.toString(), headers, method });
  },
} as CustomGhostContentAPIOptions);

// Fetch all posts using the api instance
export const getPosts = async () =>
  await api.posts
    .browse({ include: ['tags', 'authors'] })
    .catch((err) => console.log('Error while fetching all posts: ', err));

// Fetch all posts by tag
export const getPostsByTag = async (tag?: string) => {
  const params: Params = tag
    ? { filter: `tags:${convertString(tag)}`, include: ['tags', 'authors'] }
    : { include: ['tags', 'authors'] };

  return await api.posts
    .browse(params)
    .catch((err) => console.log('Error while fetching posts by tag: ', err));
};
// Fetch post data
export const getSinglePost = async (slug: string) =>
  await api.posts.read({ slug }, { include: ['tags', 'authors'] }).catch((err) => {
    console.error('err: ', err);
  });

// Fetch all tags
export const getTags = async () => await api.tags.browse({ limit: 'all' });

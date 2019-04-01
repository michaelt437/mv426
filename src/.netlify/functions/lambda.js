import fetch from 'node-fetch';

const movieDbApiRootUrl = 'https://api.themoviedb.org/3'
const TMDBKEY = process.env.TMDBKEY; // Here we hide value in environment

exports.handler = async (event) => {
  // We can retrive type of http method in event parameter
  const { httpMethod } = event;

  if (httpMethod === 'GET') {
    const response = await fetch(`${movieDbApiRootUrl}/movie/latest?api_key=${TMDBKEY}`, { 'content-type': 'application/json' })
    const movieData = await response.text();

    return { statusCode: 200, body: movieData };
  }

  return { statusCode: 404 };
}

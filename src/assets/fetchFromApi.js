const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
  };

export const fetchFromApi = async (endpoints) => {
    const res = await fetch(`https://youtube-v31.p.rapidapi.com/${endpoints}`, options)

    return res
}
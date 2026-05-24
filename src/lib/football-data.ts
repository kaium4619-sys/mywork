const API_BASE_URL = 'https://api.football-data.org/v4';
const API_KEY = process.env.FOOTBALL_DATA_API_KEY;

export async function fetchFootballData(endpoint: string, params: Record<string, string> = {}, revalidate: number = 120) {
  const url = new URL(`${API_BASE_URL}/${endpoint}`);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'X-Auth-Token': API_KEY || '',
    },
    next: {
      revalidate, // Custom or default cache time
    },
  });

  if (!response.ok) {
    console.error(`football-data.org error: ${response.statusText}`, await response.text());
    // Return null or empty data instead of throwing to prevent bringing down the whole page
    return null;
  }

  return response.json();
}

// Common endpoints
export const endpoints = {
  standings: (competitionId: string) => `competitions/${competitionId}/standings`,
  matches: 'matches',
  competitionMatches: (competitionId: string) => `competitions/${competitionId}/matches`,
  teams: (competitionId: string) => `competitions/${competitionId}/teams`,
};


'use server';

/**
 * @fileOverview Server Action para buscar leads reais via Google Places API.
 * Refatorado para garantir que a busca funcione com qualquer configuração de ENV.
 */

export async function searchRealLeads(niche: string, city: string, state: string) {
  const apiKey = 
    process.env.GOOGLE_PLACES_API_KEY || 
    process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || 
    process.env.GEMINI_API_KEY || 
    process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('Serviço de busca temporariamente indisponível (API Key missing).');
  }

  const query = `${niche} em ${city} ${state}`;
  
  try {
    const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.rating,places.types',
      },
      body: JSON.stringify({
        textQuery: query,
        languageCode: 'pt-BR',
      }),
    });

    if (!response.ok) {
      throw new Error(`Google API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.places || data.places.length === 0) {
      return [];
    }

    return data.places.map((place: any) => ({
      id: place.id,
      name: place.displayName?.text || 'Nome indisponível',
      type: niche,
      city: city || 'Local',
      state: state,
      address: place.formattedAddress,
      phone: place.nationalPhoneNumber || 'Telefone não listado',
      rating: place.rating || 0,
      status: 'new'
    }));
  } catch (error) {
    console.error('Erro na ação de busca:', error);
    throw error;
  }
}

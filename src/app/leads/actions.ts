
'use server';

/**
 * @fileOverview Server Action para buscar leads reais via Google Places API.
 */

export async function searchRealLeads(niche: string, city: string, state: string) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
  
  if (!apiKey) {
    console.error('NEXT_PUBLIC_GOOGLE_PLACES_API_KEY não configurada no ambiente.');
    throw new Error('Configuração de busca indisponível.');
  }

  // Monta a query de busca estratégica
  const query = `${niche} em ${city} ${state}`;
  
  try {
    // Utilizamos a nova API de Places (v1) que permite obter telefone em uma única chamada
    const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        // Máscara de campos para retornar exatamente o que o FlowPro precisa
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

    // Mapeia os resultados para o formato do FlowPro
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
    console.error('Erro na busca de leads:', error);
    throw error;
  }
}

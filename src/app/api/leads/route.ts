import { NextResponse } from 'next/server';

function generateMockLeads(niche: string, city: string, state: string) {
  const cityName = city || 'São Paulo';
  const stateName = state || 'SP';
  const businessNames = [
    `${niche} Premium ${cityName}`,
    `${niche} do ${stateName} Center`,
    `${niche} Especializado ${cityName}`,
    `${niche} & Cia ${cityName}`,
    `${niche} Express`,
    `${niche} Master ${cityName}`,
    `${niche} Pro ${stateName}`,
    `${niche} Elite`,
    `${niche} Top ${cityName}`,
    `${niche} Quality ${stateName}`,
  ];
  const streets = [
    'Rua das Flores', 'Av. Principal', 'Rua Comercial', 'Av. Central',
    'Rua do Comércio', 'Av. Brasil', 'Rua São João', 'Av. Independência',
  ];
  return businessNames.map((name, i) => ({
    id: `mock-${i}-${Date.now()}`,
    name,
    type: niche,
    city: cityName,
    state: stateName,
    address: `${streets[i % streets.length]}, ${100 + i * 23} - ${cityName}, ${stateName}`,
    phone: `(${Math.floor(10 + Math.random() * 89)}) 9${Math.floor(1000 + Math.random() * 8999)}-${Math.floor(1000 + Math.random() * 8999)}`,
    website: `www.${name.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 20)}.com.br`,
    rating: (3.5 + Math.random() * 1.5).toFixed(1),
    totalRatings: Math.floor(10 + Math.random() * 490),
    status: 'OPERATIONAL',
  }));
}

export async function POST(req: Request) {
  try {
    const { niche, city, state } = await req.json();

    if (!niche) {
      return NextResponse.json({ error: 'Nicho é obrigatório.' }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    if (!apiKey || apiKey === 'SUA_CHAVE_AQUI' || apiKey === '') {
      const mockLeads = generateMockLeads(niche, city, state);
      return NextResponse.json(mockLeads);
    }

    const query = `${niche} em ${city || ''} ${state}`.trim();

    const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.rating,places.userRatingCount,places.businessStatus',
      },
      body: JSON.stringify({
        textQuery: query,
        languageCode: 'pt-BR',
      }),
    });

    if (!response.ok) {
      console.error('[GOOGLE PLACES ERROR]', response.status);
      const mockLeads = generateMockLeads(niche, city, state);
      return NextResponse.json(mockLeads);
    }

    const data = await response.json();

    if (!data.places || data.places.length === 0) {
      return NextResponse.json([]);
    }

    const leads = data.places.map((place: any) => ({
      id: place.id,
      name: place.displayName?.text || niche,
      type: niche,
      city: city || 'Local',
      state: state,
      address: place.formattedAddress || '',
      phone: place.nationalPhoneNumber || '',
      website: place.websiteUri || '',
      rating: place.rating?.toFixed(1) || '0',
      totalRatings: place.userRatingCount || 0,
      status: place.businessStatus || 'OPERATIONAL',
    }));

    return NextResponse.json(leads);
  } catch (error) {
    console.error('[LEADS API ERROR]', error);
    return NextResponse.json({ error: 'Erro interno no servidor.' }, { status: 500 });
  }
}

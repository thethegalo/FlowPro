import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { niche, city, state } = await req.json();

    if (!niche) {
      return NextResponse.json({ error: 'Nicho é obrigatório.' }, { status: 400 });
    }

    // Tenta múltiplas variáveis de ambiente para máxima compatibilidade
    const apiKey = 
      process.env.GOOGLE_PLACES_API_KEY || 
      process.env.GEMINI_API_KEY || 
      process.env.GOOGLE_API_KEY || 
      process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

    if (!apiKey || apiKey.length < 10) {
      return NextResponse.json(
        { error: 'Chave de API não configurada corretamente no ambiente.' },
        { status: 503 }
      );
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
      const errorData = await response.json().catch(() => ({}));
      console.error('[GOOGLE PLACES ERROR]', response.status, errorData);
      return NextResponse.json(
        { error: `Erro na API do Google: ${response.status}. Verifique se a API Places (New) está ativa.` },
        { status: response.status }
      );
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
    return NextResponse.json({ error: 'Erro interno no motor de busca.' }, { status: 500 });
  }
}

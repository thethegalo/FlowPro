
import { NextResponse } from 'next/server';

/**
 * @fileOverview Endpoint de backend para buscar leads reais via Google Places API.
 * Refatorado para máxima resiliência com chaves de ambiente.
 */

export async function POST(req: Request) {
  try {
    const { niche, city, state } = await req.json();
    
    // Busca exaustiva pela chave de API para garantir funcionamento
    const apiKey = 
      process.env.GOOGLE_PLACES_API_KEY || 
      process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || 
      process.env.GEMINI_API_KEY || 
      process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey || apiKey === 'sua_chave_aqui' || apiKey === '') {
      console.error('[ERRO CRÍTICO] Nenhuma API Key detectada.');
      return NextResponse.json(
        { error: 'Configuração de API pendente no servidor.' },
        { status: 500 }
      );
    }

    const query = `${niche} em ${city || ''} ${state}`.trim();
    
    const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.rating',
      },
      body: JSON.stringify({
        textQuery: query,
        languageCode: 'pt-BR',
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`[GOOGLE PLACES ERROR] Status ${response.status}:`, errorData);
      return NextResponse.json(
        { error: 'Falha na comunicação com a base do Google.' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    if (!data.places || data.places.length === 0) {
      return NextResponse.json([]);
    }

    const leads = data.places.map((place: any) => ({
      id: place.id,
      name: place.displayName?.text || 'Negócio local',
      type: niche,
      city: city || 'Local',
      state: state,
      address: place.formattedAddress || 'Endereço não disponível',
      phone: place.nationalPhoneNumber || 'Telefone não listado',
      rating: place.rating || 0,
      status: 'new'
    }));

    return NextResponse.json(leads);
  } catch (error: any) {
    console.error('[SERVER ERROR]:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar leads.' },
      { status: 500 }
    );
  }
}

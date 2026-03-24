import { NextResponse } from 'next/server';

/**
 * @fileOverview Endpoint de backend para buscar leads reais via Google Places API.
 * EXCLUSIVAMENTE SERVER-SIDE. Não use 'use client' aqui.
 */

export async function POST(req: Request) {
  try {
    const { niche, city, state } = await req.json();
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    if (!apiKey || apiKey === 'SUA_CHAVE_AQUI') {
      console.error('ERRO: GOOGLE_PLACES_API_KEY não configurada corretamente.');
      return NextResponse.json(
        { error: 'A busca real de leads requer uma Google API Key configurada no servidor.' },
        { status: 500 }
      );
    }

    // Monta a query de busca estratégica
    const query = `${niche} em ${city || ''} ${state}`.trim();
    
    console.log(`Buscando leads reais para: "${query}"`);

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
      const errorText = await response.text();
      console.error(`Google Places API Error (${response.status}):`, errorText);
      return NextResponse.json(
        { error: 'O Google recusou a conexão. Verifique se sua API Key é válida e tem a Places API ativa.' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    if (!data.places || data.places.length === 0) {
      return NextResponse.json([]);
    }

    const leads = data.places.map((place: any) => ({
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

    return NextResponse.json(leads);
  } catch (error: any) {
    console.error('Erro interno na API de Leads:', error);
    return NextResponse.json(
      { error: 'Erro de comunicação com o servidor de busca.' },
      { status: 500 }
    );
  }
}

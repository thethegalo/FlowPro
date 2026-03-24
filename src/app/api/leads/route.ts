'use client'; // This is a server file, but I need to ensure it's not imported by client components incorrectly. Actually, Next.js API routes don't need 'use client'.

import { NextResponse } from 'next/server';

/**
 * @fileOverview Endpoint de backend para buscar leads reais via Google Places API.
 * Resolve problemas de CORS e protege a API Key.
 */

export async function POST(req: Request) {
  try {
    const { niche, city, state } = await req.json();
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    if (!apiKey) {
      console.error('ERRO: GOOGLE_PLACES_API_KEY não configurada no servidor.');
      return NextResponse.json(
        { error: 'Configuração de busca indisponível no servidor.' },
        { status: 500 }
      );
    }

    // Monta a query de busca estratégica
    // Ex: "Pizzaria em São Paulo SP"
    const query = `${niche} ${city ? `em ${city}` : ''} ${state}`.trim();
    
    console.log(`Iniciando busca de leads reais para: "${query}"`);

    // Utilizamos a nova API de Places (v1) para obter dados completos em uma única chamada
    const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        // Máscara de campos necessária para a API V1 retornar os dados desejados
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
        { error: 'Falha na comunicação com o radar do Google.' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    if (!data.places || data.places.length === 0) {
      return NextResponse.json([]);
    }

    // Mapeia os resultados para o formato esperado pelo frontend do FlowPro
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
      { error: 'Erro interno ao processar a busca de leads.' },
      { status: 500 }
    );
  }
}

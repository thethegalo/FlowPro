
import { NextResponse } from 'next/server';

/**
 * @fileOverview Endpoint de backend para buscar leads reais via Google Places API.
 * Refatorado para usar o padrão NEXT_PUBLIC_ e garantir compatibilidade em produção.
 */

export async function POST(req: Request) {
  try {
    const { niche, city, state } = await req.json();
    
    // Padronizado para NEXT_PUBLIC_ para consistência em todo o projeto
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey || apiKey === 'sua_chave_aqui' || apiKey === '') {
      console.error('[ERRO CRÍTICO] API Key não detectada. Verifique o arquivo .env ou as Secret Vars do deploy.');
      return NextResponse.json(
        { error: 'Configuração de API pendente. O administrador precisa configurar a NEXT_PUBLIC_GOOGLE_PLACES_API_KEY.' },
        { status: 500 }
      );
    }

    const query = `${niche} em ${city || ''} ${state}`.trim();
    
    console.log(`[BACKEND FLOWPRO] Iniciando busca estratégica: "${query}"`);

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
      
      if (response.status === 403) {
        return NextResponse.json(
          { error: 'Acesso Negado. Verifique se a "Places API" está ativada no seu console Google Cloud.' },
          { status: 403 }
        );
      }
      
      return NextResponse.json(
        { error: 'Falha na comunicação com a base neural do Google.' },
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
      { error: 'Erro interno ao processar inteligência de leads.' },
      { status: 500 }
    );
  }
}

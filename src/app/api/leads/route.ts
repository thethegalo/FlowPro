import { NextResponse } from 'next/server';

/**
 * @fileOverview Endpoint de backend para buscar leads reais via Google Places API.
 * EXCLUSIVAMENTE SERVER-SIDE.
 */

export async function POST(req: Request) {
  try {
    const { niche, city, state } = await req.json();
    
    // Prioriza GOOGLE_PLACES_API_KEY, mas aceita GEMINI_API_KEY como fallback se for a mesma
    const apiKey = process.env.GOOGLE_PLACES_API_KEY || process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey.includes('sua_chave')) {
      console.error('ERRO: API Key não detectada no ambiente.');
      return NextResponse.json(
        { error: 'A busca requer uma Google API Key configurada no arquivo .env.' },
        { status: 500 }
      );
    }

    // Monta a query de busca estratégica
    const query = `${niche} em ${city || ''} ${state}`.trim();
    
    console.log(`[BACKEND] Iniciando busca real no Google para: "${query}"`);

    const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        // Máscara de campos para retornar exatamente o que o FlowPro precisa
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.rating',
      },
      body: JSON.stringify({
        textQuery: query,
        languageCode: 'pt-BR',
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`[GOOGLE ERROR] Status ${response.status}:`, errorData);
      
      if (response.status === 403) {
        return NextResponse.json(
          { error: 'Chave de API sem permissão para "Places API". Ative-a no Google Cloud Console.' },
          { status: 403 }
        );
      }
      
      return NextResponse.json(
        { error: 'O Google recusou a requisição. Verifique sua cota e permissões.' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    if (!data.places || data.places.length === 0) {
      console.log('[BACKEND] Nenhum local encontrado para esta busca.');
      return NextResponse.json([]);
    }

    console.log(`[BACKEND] Sucesso: ${data.places.length} leads encontrados.`);

    const leads = data.places.map((place: any) => ({
      id: place.id,
      name: place.displayName?.text || 'Negócio sem nome',
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
    console.error('[CRITICAL BACKEND ERROR]:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar busca de leads.' },
      { status: 500 }
    );
  }
}

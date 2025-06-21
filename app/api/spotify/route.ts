import { getAccessToken } from '@/lib/spotify';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks

export async function GET(request: NextRequest) {
    // We can also not .get the non-type parameters and simply have true constants for the rest but using .get for all of them is cooler.
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type');
    const time_range = searchParams.get("time_range") ?? "short_term";
    const limit = searchParams.get("limit") ?? "10";
    const offset = searchParams.get("offset") ?? "0";

    try{
        if (type !== 'tracks' && type !== 'artists') {
            return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
        }
        const accessTok = await getAccessToken();

        const response =  await fetch(
            `https://api.spotify.com/v1/me/top/${type}?time_range=${time_range}&limit=${limit}&offset=${offset}`, 
            {
                method: 'GET',
                headers:{
                    Authorization: `Bearer ${accessTok}`
                }
            }
        )

        if(!response.ok){
            throw new Error(`Spotify API returned ${response.status}`)
        }
        
        const data = await response.json();

        return NextResponse.json(data);

    }catch(error){
        console.error('Spotify API Error:', error);
        return NextResponse.json({ error: `Failed to fetch ${type}` }, { status: 500 });
    }
    
}
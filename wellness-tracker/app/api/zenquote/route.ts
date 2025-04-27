// app/api/zenquote/route.ts
export async function GET() {
    try {
      const res = await fetch('https://zenquotes.io/api/random');
      const data = await res.json();
      return Response.json(data);
    } catch (error) {
      console.error('Failed to fetch quote:', error);  // <-- this line fixes it
      return new Response(JSON.stringify({ error: 'Failed to fetch quote' }), {
        status: 500,
      });
    }
  }
  
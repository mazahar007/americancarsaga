import { getArticles } from '../lib/utils';
import { getCategory } from '../config';

export async function GET() {
  const articles = await getArticles();
  const index = articles.map((a) => ({
    u: `/articles/${a.id}`,
    t: a.data.title,
    d: a.data.description,
    c: getCategory(a.data.category)?.short ?? '',
    k: a.data.tags.join(' '),
  }));
  return new Response(JSON.stringify(index), { headers: { 'Content-Type': 'application/json' } });
}

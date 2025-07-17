export async function getSummary(url: string) {
  const res = await fetch(`https://r.jina.ai/${url}`);
  const text = await res.text();
  return text;
}

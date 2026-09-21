export type NewsCategory =
  | "Infrastructure" | "Transportation" | "Climate" | "Environment" | "Energy"
  | "Water" | "Healthcare" | "Agriculture" | "Technology" | "Public Safety"
  | "Education" | "Manufacturing" | "Urban Development" | "General";

export type NewsArticle = {
  id: string; title: string; description: string; source_name: string; source_url: string;
  published_at: string; region: string; category: NewsCategory; image_url?: string; fetched_at: string;
};
export type NewsFeed = { region: string; count: number; articles: NewsArticle[] };
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export async function getNews(region: string, signal?: AbortSignal): Promise<NewsFeed> {
  const url = new URL("/news", apiBaseUrl);
  url.searchParams.set("region", region); url.searchParams.set("limit", "20");
  const response = await fetch(url, { signal, cache: "no-store" });
  if (!response.ok) {
    const body = await response.json().catch(() => null) as { detail?: string } | null;
    throw new Error(body?.detail ?? "Unable to load live signals.");
  }
  return response.json() as Promise<NewsFeed>;
}

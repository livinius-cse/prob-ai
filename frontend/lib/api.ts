export type NewsCategory =
  | "Infrastructure" | "Transportation" | "Climate" | "Environment" | "Energy"
  | "Water" | "Healthcare" | "Agriculture" | "Technology" | "Public Safety"
  | "Education" | "Manufacturing" | "Urban Development" | "General";

export type NewsArticle = {
  id: string; title: string; description: string; source_name: string; source_url: string;
  published_at: string; region: string; category: NewsCategory; image_url?: string; fetched_at: string;
};
export type NewsFeed = { region: string; count: number; articles: NewsArticle[] };
export type EvidenceType = "source_fact" | "analysis" | "hypothesis" | "unknown";
export type EvidenceItem = { statement: string; evidence_type: EvidenceType; source_reference?: string; confidence?: number };
export type SourceArticleIdentity = { article_id: string; title: string; source: string; url: string; published_at: string; region: string; category: NewsCategory };
export type EngineeringIntelligence = {
  analysis_status: "placeholder_not_ai" | string; analysis_notice: string; source_article: SourceArticleIdentity;
  event_understanding: { what_happened: EvidenceItem; affected_area: EvidenceItem; affected_population: EvidenceItem; impact: EvidenceItem };
  engineering_problem: { problem_statement: EvidenceItem; problem_type: EvidenceItem; severity: EvidenceItem; evidence: EvidenceItem[] };
  root_cause: { root_causes: EvidenceItem[]; contributing_factors: EvidenceItem[]; uncertainty: EvidenceItem[] };
  existing_solutions: { existing_solutions: EvidenceItem[]; current_approaches: EvidenceItem[]; known_limitations: EvidenceItem[] };
  innovation_gap: { gap_statement: EvidenceItem; unmet_need: EvidenceItem; opportunity_area: EvidenceItem; evidence: EvidenceItem[] };
  engineering_opportunity: { opportunity_statement: EvidenceItem; potential_solution_directions: EvidenceItem[]; technologies: EvidenceItem[]; disciplines: EvidenceItem[]; skills: EvidenceItem[] };
  validation: { assumptions: EvidenceItem[]; validation_questions: EvidenceItem[]; data_needed: EvidenceItem[]; suggested_next_steps: EvidenceItem[] };
};
export type AnalyzeArticleRequest = { article: NewsArticle };
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

/** Future dossier API. Phase 3A returns a labelled non-AI placeholder only. */
export async function analyzeArticle(article: NewsArticle, signal?: AbortSignal): Promise<EngineeringIntelligence> {
  const response = await fetch(new URL("/intelligence/analyze", apiBaseUrl), {
    method: "POST", signal, cache: "no-store", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ article }),
  });
  if (!response.ok) {
    const body = await response.json().catch(() => null) as { detail?: string } | null;
    throw new Error(body?.detail ?? "Unable to prepare the engineering intelligence dossier.");
  }
  return response.json() as Promise<EngineeringIntelligence>;
}

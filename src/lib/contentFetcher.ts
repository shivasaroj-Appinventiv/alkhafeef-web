import { getServerBackendConfig } from "@/lib/api/config.server";
import { CONTENT_ENDPOINTS } from "@/lib/api/endpoints";
import { buildServerBackendHeaders } from "@/lib/api/server-headers";
import type {
  ContentDetailsData,
  ContentDetailsResponse,
  ContentPageApiType,
  FetchContentDetailsOptions,
} from "@/types/content";

export async function fetchContentDetails(
  type: ContentPageApiType,
  options: FetchContentDetailsOptions = {},
): Promise<ContentDetailsData> {
  const { lang = "en", revalidate = 3600 } = options;
  const { API_BASE_URL } = getServerBackendConfig();
  const url = `${API_BASE_URL}${CONTENT_ENDPOINTS.DETAILS}?type=${type}`;

  const forwardHeaders = new Headers();
  forwardHeaders.set("language", lang);
  forwardHeaders.set("platform", "3");

  const response = await fetch(url, {
    method: "GET",
    headers: buildServerBackendHeaders({ forwardHeaders }),
    next: { revalidate },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `fetchContentDetails failed [${response.status}]: ${errorBody}`,
    );
  }

  const data: ContentDetailsResponse = await response.json();

  if (!data.data) {
    throw new Error("Invalid content details response structure");
  }

  return {
    ...data.data,
    description:
      lang === "ar" ? data.data.descriptionArabic : data.data.description,
  };
}

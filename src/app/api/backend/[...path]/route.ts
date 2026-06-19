import { auth } from "@/auth";
import { getServerBackendConfig } from "@/lib/api/config.server";
import { buildServerBackendHeaders } from "@/lib/api/server-headers";

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

async function proxyToBackend(request: Request, context: RouteContext) {
  const { path } = await context.params;
  const { API_BASE_URL } = getServerBackendConfig();
  const targetPath = path.join("/");
  const { search } = new URL(request.url);
  const targetUrl = `${API_BASE_URL}/${targetPath}${search}`;

  const session = await auth();
  const headers = buildServerBackendHeaders({
    accessToken: session?.accessToken,
    forwardHeaders: request.headers,
  });

  const method = request.method.toUpperCase();
  const hasBody = !["GET", "HEAD"].includes(method);
  const body = hasBody ? await request.text() : undefined;

  const backendResponse = await fetch(targetUrl, {
    method,
    headers,
    body,
    cache: "no-store",
  });

  const responseBody = await backendResponse.text();
  const contentType =
    backendResponse.headers.get("content-type") ?? "application/json";

  return new Response(responseBody, {
    status: backendResponse.status,
    headers: { "Content-Type": contentType },
  });
}

export async function GET(request: Request, context: RouteContext) {
  return proxyToBackend(request, context);
}

export async function POST(request: Request, context: RouteContext) {
  return proxyToBackend(request, context);
}

export async function PUT(request: Request, context: RouteContext) {
  return proxyToBackend(request, context);
}

export async function PATCH(request: Request, context: RouteContext) {
  return proxyToBackend(request, context);
}

export async function DELETE(request: Request, context: RouteContext) {
  return proxyToBackend(request, context);
}

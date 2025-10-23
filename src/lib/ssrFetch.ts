interface ssrFetchProps {
  url: string;
  method?: "GET" | "POST";
  body?: any;
  headers?: HeadersInit;
}

export async function SsrFetch({
  url,
  method = "POST",
  body,
  headers,
}: ssrFetchProps) {
  try {
    const response = await fetch(url, {
      method,
      headers: headers
        ? headers
        : {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorData = await response.json();

      return {
        error: errorData || "خطا در سرور",
        status: response.status,
      };
    }
    const contentType = response.headers.get("content-type");

    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    return { data, status: response.status };
  } catch {
    return { error: "Failed to fetch data", status: 500 };
  }
}

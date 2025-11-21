import { bangs } from "./bang.js";

function doRedirect() {
  const url = new URL(window.location.href);
  const query = url.searchParams.get("q")?.trim() ?? "";
  const bang = url.searchParams.get("b")?.trim() ?? "g";
  if (!query) return;

  const match = query.match(/!(\S+)/i);
  const bangCandidate = match?.[1]?.toLowerCase() ?? bang;
  const selectedBang = bangs.find((b) => b.t === bangCandidate);
  if (!selectedBang) {
    document.body.innerHTML = `unknown bang ${bangCandidate}`;
    return;
  }

  // Remove the first bang from the query
  const cleanQuery = query.replace(/!\S+\s*/i, "").trim();

  // If the query is just `!gh`, use `github.com` instead of `github.com/search?q=`
  if (cleanQuery === "")
    return selectedBang ? `https://${selectedBang.d}` : null;

  // Format of the url is:
  // https://www.google.com/search?q={{{s}}}
  const searchUrl = selectedBang?.u.replace(
    "{{{s}}}",
    // Replace %2F with / to fix formats like "!ghr+t3dotgg/unduck"
    encodeURIComponent(cleanQuery).replace(/%2F/g, "/"),
  );
  if (!searchUrl) return;

  window.location.replace(searchUrl);
}

doRedirect();

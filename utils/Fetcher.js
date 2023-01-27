export default function Fetcher(
  url,
  options = {
    method: "GET",
    body: {},
  }
) {
  return fetch(url, {
    method: options?.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options?.body),
  }).then((res) => res.json());
}

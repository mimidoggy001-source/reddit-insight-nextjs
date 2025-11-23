export default async function handler(req, res) {
  const { keyword, limit = 1500 } = req.query;

  if (!keyword) {
    return res.status(400).json({ error: "Missing keyword" });
  }

  const results = [];
  let after = null;

  try {
    while (results.length < limit) {
      const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(
        keyword
      )}&sort=new&limit=100${after ? `&after=${after}` : ""}`;

      const response = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 RedditInsightBot"
        }
      });

      if (!response.ok) {
        console.log("Rate limited, retrying...");
        await new Promise((resolve) => setTimeout(resolve, 1500));
        continue;
      }

      const json = await response.json();

      const posts = json?.data?.children || [];
      if (posts.length === 0) break;

      results.push(...posts);

      after = json.data.after;
      if (!after) break;

      await new Promise((resolve) => setTimeout(resolve, 600)); // 避免 429
    }

    res.status(200).json({
      keyword,
      total: results.length,
      posts: results.slice(0, limit)
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Fetch failed" });
  }
}

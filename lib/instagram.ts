export interface InstagramProfile {
  username: string;
  profilePictureUrl: string | null;
  followersCount: number | null;
}

const REVALIDATE_SECONDS = 3600; // Instagram follower counts don't need to be near-real-time.

// Uses the Instagram API with Instagram Login (graph.instagram.com), which a
// Business/Creator account can set up without needing a linked Facebook Page.
// Read-only, server-side only — see README for how to obtain the credentials.
export async function fetchInstagramProfile(): Promise<InstagramProfile | null> {
  const userId = process.env.INSTAGRAM_USER_ID;
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!userId || !accessToken) {
    console.warn(
      "[instagram] INSTAGRAM_USER_ID / INSTAGRAM_ACCESS_TOKEN not set — showing icon link only."
    );
    return null;
  }

  try {
    const fields = "username,profile_picture_url,followers_count";
    const url = `https://graph.instagram.com/${encodeURIComponent(userId)}?fields=${fields}&access_token=${encodeURIComponent(accessToken)}`;
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });

    if (!res.ok) {
      throw new Error(`Instagram API responded ${res.status}`);
    }

    const data = await res.json();
    if (!data.username) {
      throw new Error("Instagram API response missing username");
    }

    return {
      username: data.username,
      profilePictureUrl: data.profile_picture_url ?? null,
      followersCount:
        typeof data.followers_count === "number" ? data.followers_count : null,
    };
  } catch (error) {
    console.warn(
      "[instagram] Failed to fetch profile — showing icon link only.",
      error
    );
    return null;
  }
}

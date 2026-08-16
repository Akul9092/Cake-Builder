import { fetchInstagramProfile } from "@/lib/instagram";
import { INSTAGRAM_URL } from "@/lib/constants";
import InstagramIcon from "./icons/InstagramIcon";

export default async function InstagramCard() {
  const profile = await fetchInstagramProfile();

  if (!profile) {
    return (
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Nurture Cakes on Instagram"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-dark bg-white text-terracotta transition hover:border-terracotta/50 hover:text-terracotta-dark"
      >
        <InstagramIcon className="h-5 w-5" />
      </a>
    );
  }

  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded-xl border border-cream-dark bg-white px-3 py-2 transition hover:border-terracotta/50"
    >
      {profile.profilePictureUrl ? (
        // eslint-disable-next-line @next/next/no-img-element -- external Instagram-hosted avatar, not a local asset
        <img
          src={profile.profilePictureUrl}
          alt=""
          className="h-9 w-9 shrink-0 rounded-full object-cover"
        />
      ) : (
        <InstagramIcon className="h-9 w-9 shrink-0 text-terracotta" />
      )}
      <span className="text-sm leading-tight">
        <span className="block font-medium text-ink">
          @{profile.username}
        </span>
        {profile.followersCount !== null && (
          <span className="block text-xs text-ink-soft">
            {profile.followersCount.toLocaleString()} followers
          </span>
        )}
      </span>
    </a>
  );
}

import Script from "next/script";
import { FACEBOOK_PAGE_URL } from "@/lib/constants";

// Official Facebook Page Plugin (XFBML) — configured compact (small header,
// no cover photo, no post timeline) rather than the full page-timeline widget.
export default function FacebookPagePlugin() {
  return (
    <>
      <div id="fb-root" />
      <Script
        src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v21.0"
        strategy="lazyOnload"
        crossOrigin="anonymous"
      />
      <div
        className="fb-page"
        data-href={FACEBOOK_PAGE_URL}
        data-tabs=""
        data-width="220"
        data-height="70"
        data-small-header="true"
        data-adapt-container-width="false"
        data-hide-cover="true"
        data-show-facepile="false"
      >
        <blockquote
          cite={FACEBOOK_PAGE_URL}
          className="fb-xfbml-parse-ignore"
        >
          <a
            href={FACEBOOK_PAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-terracotta underline underline-offset-2 hover:text-terracotta-dark"
          >
            Nurture Cakes on Facebook
          </a>
        </blockquote>
      </div>
    </>
  );
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local placeholder logos are SVGs. They are first-party assets in /public,
    // so enabling SVG here is safe and lets <Image> serve them with object-contain.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;

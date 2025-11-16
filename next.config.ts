// next.config.ts (Alternative)
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    webpack(config, { isServer , config: fullConfig,  }) {
        // The parameters are now explicitly typed by TypeScript inference 
        // from the NextConfig type definition.

        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                "buffer": require.resolve("buffer"), 
            };
        }
        return config;
    },
};

export default nextConfig;
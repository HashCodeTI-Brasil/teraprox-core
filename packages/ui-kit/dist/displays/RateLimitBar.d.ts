import React from 'react';
export interface RateLimitEntry {
    used: number;
    limit: number;
    exceeded: boolean;
    windowReset: string;
}
export interface RateLimitBarProps {
    /** Rate limit entry from CoreService.rateLimits[pathGroup] */
    entry: RateLimitEntry | undefined;
    /** Optional label shown above the bar (e.g. "Login") */
    label?: string;
    /** Additional CSS class */
    className?: string;
}
/**
 * Displays a colored progress bar with rate limit usage.
 *
 * Color thresholds:
 *   < 70% → green
 *   70–89% → yellow
 *   ≥ 90% or exceeded → red
 *
 * Hides itself when no entry is provided (tenant has no rate limit configured).
 *
 * Usage in remotes:
 *   import { RateLimitBar } from 'teraprox-ui-kit'
 *   const { rateLimits } = useCoreService()
 *   <RateLimitBar entry={rateLimits['user_auth_POST']} label="Login" />
 */
export declare const RateLimitBar: React.FC<RateLimitBarProps>;
export default RateLimitBar;

import type { AIProviderId } from '@mindwtr/core';
import { getAIKeyStorageKey, buildAIConfig, buildCopilotConfig } from '@mindwtr/core';

export function loadAIKey(provider: AIProviderId): string {
    if (typeof localStorage === 'undefined') return '';
    return localStorage.getItem(getAIKeyStorageKey(provider)) ?? '';
}

export function saveAIKey(provider: AIProviderId, value: string): void {
    if (typeof localStorage === 'undefined') return;
    const key = getAIKeyStorageKey(provider);
    if (!value) {
        localStorage.removeItem(key);
        return;
    }
    localStorage.setItem(key, value);
}

export { buildAIConfig, buildCopilotConfig };

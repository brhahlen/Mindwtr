import type { AIProviderConfig, AIProviderId, AppData } from './types';
import { DEFAULT_ANTHROPIC_THINKING_BUDGET, DEFAULT_GEMINI_THINKING_BUDGET, DEFAULT_REASONING_EFFORT, getDefaultAIConfig, getDefaultCopilotModel } from './ai/catalog';

const AI_KEY_PREFIX = 'mindwtr-ai-key';

export function getAIKeyStorageKey(provider: AIProviderId): string {
    return `${AI_KEY_PREFIX}:${provider}`;
}

export function buildAIConfig(settings: AppData['settings'], apiKey: string): AIProviderConfig {
    const provider = (settings.ai?.provider ?? 'openai') as AIProviderId;
    const defaults = getDefaultAIConfig(provider);
    return {
        provider,
        apiKey,
        model: settings.ai?.model ?? defaults.model,
        reasoningEffort: settings.ai?.reasoningEffort ?? DEFAULT_REASONING_EFFORT,
        thinkingBudget: settings.ai?.thinkingBudget ?? defaults.thinkingBudget,
    };
}

export function buildCopilotConfig(settings: AppData['settings'], apiKey: string): AIProviderConfig {
    const provider = (settings.ai?.provider ?? 'openai') as AIProviderId;
    return {
        provider,
        apiKey,
        model: settings.ai?.copilotModel ?? getDefaultCopilotModel(provider),
        reasoningEffort: DEFAULT_REASONING_EFFORT,
        ...(provider === 'gemini' ? { thinkingBudget: DEFAULT_GEMINI_THINKING_BUDGET } : {}),
        ...(provider === 'anthropic' ? { thinkingBudget: DEFAULT_ANTHROPIC_THINKING_BUDGET } : {}),
    };
}

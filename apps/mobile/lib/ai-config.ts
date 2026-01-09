import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AIProviderId } from '@mindwtr/core';
import { getAIKeyStorageKey, buildAIConfig, buildCopilotConfig } from '@mindwtr/core';

export async function loadAIKey(provider: AIProviderId): Promise<string> {
    const key = await AsyncStorage.getItem(getAIKeyStorageKey(provider));
    return key ?? '';
}

export async function saveAIKey(provider: AIProviderId, value: string): Promise<void> {
    const key = getAIKeyStorageKey(provider);
    if (!value) {
        await AsyncStorage.removeItem(key);
        return;
    }
    await AsyncStorage.setItem(key, value);
}

export { buildAIConfig, buildCopilotConfig };

import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { LanguageProvider } from './language-context';
import { KeybindingProvider } from './keybinding-context';
import { ListView } from '../components/views/ListView';
import type { Task } from '@mindwtr/core';

const tasks: Task[] = [
    {
        id: '1',
        title: 'First',
        status: 'inbox',
        tags: [],
        contexts: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '2',
        title: 'Second',
        status: 'inbox',
        tags: [],
        contexts: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

const mocks = vi.hoisted(() => ({
    addTask: vi.fn(),
    updateTask: vi.fn(),
    deleteTask: vi.fn(),
    moveTask: vi.fn(),
    updateSettings: vi.fn(),
}));

vi.mock('@mindwtr/core', async () => {
    const actual = await vi.importActual<any>('@mindwtr/core');
    return {
        ...actual,
        useTaskStore: () => ({
            tasks,
            projects: [],
            settings: {},
            addTask: mocks.addTask,
            updateTask: mocks.updateTask,
            deleteTask: mocks.deleteTask,
            moveTask: mocks.moveTask,
            updateSettings: mocks.updateSettings,
        }),
    };
});

describe('KeybindingProvider (vim)', () => {
    it('moves selection with j/k', () => {
        render(
            <LanguageProvider>
                <KeybindingProvider currentView="inbox" onNavigate={vi.fn()}>
                    <ListView title="Inbox" statusFilter="inbox" />
                </KeybindingProvider>
            </LanguageProvider>
        );

        const first = document.querySelector('[data-task-id="1"]');
        const second = document.querySelector('[data-task-id="2"]');

        expect(first?.className).toMatch(/ring-2/);
        expect(second?.className).not.toMatch(/ring-2/);

        fireEvent.keyDown(window, { key: 'j' });

        expect(second?.className).toMatch(/ring-2/);
    });
});

import { describe, it, expect } from 'vitest';
import { sortTasks, getStatusColor, getTaskAgeLabel } from './task-utils';
import { Task } from './types';

describe('task-utils', () => {
    describe('sortTasks', () => {
        it('should sort by status order', () => {
            const tasks: Partial<Task>[] = [
                { id: '1', status: 'next', title: 'Next', createdAt: '2023-01-01' },
                { id: '2', status: 'inbox', title: 'Inbox', createdAt: '2023-01-01' },
                { id: '3', status: 'done', title: 'Done', createdAt: '2023-01-01' },
            ];

            const sorted = sortTasks(tasks as Task[]);
            expect(sorted.map(t => t.status)).toEqual(['inbox', 'next', 'done']);
        });

        it('should sort by due date within status', () => {
            const tasks: Partial<Task>[] = [
                { id: '1', status: 'next', title: 'Later', dueDate: '2023-01-02', createdAt: '2023-01-01' },
                { id: '2', status: 'next', title: 'Soon', dueDate: '2023-01-01', createdAt: '2023-01-01' },
                { id: '3', status: 'next', title: 'No Date', createdAt: '2023-01-01' },
            ];

            const sorted = sortTasks(tasks as Task[]);
            expect(sorted.map(t => t.title)).toEqual(['Soon', 'Later', 'No Date']);
        });
    });

    describe('getStatusColor', () => {
        it('should return valid color object', () => {
            const color = getStatusColor('todo');
            expect(color).toHaveProperty('bg');
            expect(color).toHaveProperty('text');
            expect(color).toHaveProperty('border');
        });

        it('should default to inbox color for unknown', () => {
            // @ts-ignore
            const color = getStatusColor('unknown');
            const inboxColor = getStatusColor('inbox');
            expect(color).toEqual(inboxColor);
        });
    });

    describe('getTaskAgeLabel', () => {
        it('should return null for new tasks', () => {
            const now = new Date().toISOString();
            expect(getTaskAgeLabel(now)).toBeNull();
        });

        it('should return correct label for old tasks', () => {
            const twoWeeksAgo = new Date();
            twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
            expect(getTaskAgeLabel(twoWeeksAgo.toISOString())).toBe('2 weeks old');
        });
    });
});

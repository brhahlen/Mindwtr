import type { ChangeEvent } from 'react';
import { Check, Link2, Paperclip, Plus, Trash2 } from 'lucide-react';
import {
    buildRRuleString,
    generateUUID,
    parseRRuleString,
    type Attachment,
    type RecurrenceRule,
    type RecurrenceStrategy,
    type Task,
    type TaskEditorFieldId,
    type TaskPriority,
    type TimeEstimate,
} from '@mindwtr/core';

import { cn } from '../../lib/utils';
import { Markdown } from '../Markdown';
import { WeekdaySelector } from './TaskForm/WeekdaySelector';

export type MonthlyRecurrenceInfo = {
    pattern: 'date' | 'custom';
    interval: number;
};

type TaskItemFieldRendererProps = {
    fieldId: TaskEditorFieldId;
    t: (key: string) => string;
    task: Task;
    showDescriptionPreview: boolean;
    onToggleDescriptionPreview: () => void;
    editDescription: string;
    onEditDescription: (value: string) => void;
    attachmentError: string | null;
    visibleEditAttachments: Attachment[];
    onAddFileAttachment: () => void;
    onAddLinkAttachment: () => void;
    onOpenAttachment: (attachment: Attachment) => void;
    onRemoveAttachment: (id: string) => void;
    editStartTime: string;
    onEditStartTime: (value: string) => void;
    editReviewAt: string;
    onEditReviewAt: (value: string) => void;
    onStatusChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    editPriority: TaskPriority | '';
    onEditPriority: (value: TaskPriority | '') => void;
    editRecurrence: RecurrenceRule | '';
    onEditRecurrence: (value: RecurrenceRule | '') => void;
    editRecurrenceStrategy: RecurrenceStrategy;
    onEditRecurrenceStrategy: (value: RecurrenceStrategy) => void;
    editRecurrenceRRule: string;
    onEditRecurrenceRRule: (value: string) => void;
    onOpenCustomRecurrence: () => void;
    monthlyRecurrence: MonthlyRecurrenceInfo;
    editTimeEstimate: TimeEstimate | '';
    onEditTimeEstimate: (value: TimeEstimate | '') => void;
    editContexts: string;
    onEditContexts: (value: string) => void;
    editTags: string;
    onEditTags: (value: string) => void;
    popularTagOptions: string[];
    taskId: string;
    updateTask: (taskId: string, updates: Partial<Task>) => void;
    resetTaskChecklist: (taskId: string) => void;
};

export function TaskItemFieldRenderer({
    fieldId,
    t,
    task,
    showDescriptionPreview,
    onToggleDescriptionPreview,
    editDescription,
    onEditDescription,
    attachmentError,
    visibleEditAttachments,
    onAddFileAttachment,
    onAddLinkAttachment,
    onOpenAttachment,
    onRemoveAttachment,
    editStartTime,
    onEditStartTime,
    editReviewAt,
    onEditReviewAt,
    onStatusChange,
    editPriority,
    onEditPriority,
    editRecurrence,
    onEditRecurrence,
    editRecurrenceStrategy,
    onEditRecurrenceStrategy,
    editRecurrenceRRule,
    onEditRecurrenceRRule,
    onOpenCustomRecurrence,
    monthlyRecurrence,
    editTimeEstimate,
    onEditTimeEstimate,
    editContexts,
    onEditContexts,
    editTags,
    onEditTags,
    popularTagOptions,
    taskId,
    updateTask,
    resetTaskChecklist,
}: TaskItemFieldRendererProps) {
    switch (fieldId) {
        case 'description':
            return (
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <label className="text-xs text-muted-foreground font-medium">{t('taskEdit.descriptionLabel')}</label>
                        <button
                            type="button"
                            onClick={onToggleDescriptionPreview}
                            className="text-xs px-2 py-1 rounded bg-muted/50 hover:bg-muted transition-colors text-muted-foreground"
                        >
                            {showDescriptionPreview ? t('markdown.edit') : t('markdown.preview')}
                        </button>
                    </div>
                    {showDescriptionPreview ? (
                        <div className="text-xs bg-muted/30 border border-border rounded px-2 py-2">
                            <Markdown markdown={editDescription || ''} />
                        </div>
                    ) : (
                        <textarea
                            aria-label="Task description"
                            value={editDescription}
                            onChange={(e) => onEditDescription(e.target.value)}
                            className="text-xs bg-muted/50 border border-border rounded px-2 py-1 min-h-[60px] resize-y"
                            placeholder={t('taskEdit.descriptionPlaceholder')}
                        />
                    )}
                </div>
            );
        case 'attachments':
            return (
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <label className="text-xs text-muted-foreground font-medium">{t('attachments.title')}</label>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={onAddFileAttachment}
                                className="text-xs px-2 py-1 rounded bg-muted/50 hover:bg-muted transition-colors flex items-center gap-1"
                            >
                                <Paperclip className="w-3 h-3" />
                                {t('attachments.addFile')}
                            </button>
                            <button
                                type="button"
                                onClick={onAddLinkAttachment}
                                className="text-xs px-2 py-1 rounded bg-muted/50 hover:bg-muted transition-colors flex items-center gap-1"
                            >
                                <Link2 className="w-3 h-3" />
                                {t('attachments.addLink')}
                            </button>
                        </div>
                    </div>
                    {attachmentError && (
                        <div className="text-xs text-red-400">{attachmentError}</div>
                    )}
                    {visibleEditAttachments.length === 0 ? (
                        <p className="text-xs text-muted-foreground">{t('common.none')}</p>
                    ) : (
                        <div className="space-y-1">
                            {visibleEditAttachments.map((attachment) => (
                                <div key={attachment.id} className="flex items-center justify-between gap-2 text-xs">
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            onOpenAttachment(attachment);
                                        }}
                                        className="truncate text-primary hover:underline"
                                        title={attachment.title}
                                    >
                                        {attachment.title}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => onRemoveAttachment(attachment.id)}
                                        className="text-muted-foreground hover:text-foreground"
                                    >
                                        {t('attachments.remove')}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );
        case 'startTime':
            return (
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-muted-foreground font-medium">{t('taskEdit.startDateLabel')}</label>
                    <input
                        type="datetime-local"
                        aria-label="Start time"
                        value={editStartTime}
                        onChange={(e) => onEditStartTime(e.target.value)}
                        className="text-xs bg-muted/50 border border-border rounded px-2 py-1 text-foreground"
                    />
                </div>
            );
        case 'reviewAt':
            return (
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-muted-foreground font-medium">{t('taskEdit.reviewDateLabel')}</label>
                    <input
                        type="datetime-local"
                        aria-label="Review date"
                        value={editReviewAt}
                        onChange={(e) => onEditReviewAt(e.target.value)}
                        className="text-xs bg-muted/50 border border-border rounded px-2 py-1 text-foreground"
                    />
                </div>
            );
        case 'status':
            return (
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-muted-foreground font-medium">{t('taskEdit.statusLabel')}</label>
                    <select
                        value={task.status}
                        aria-label="Status"
                        onChange={onStatusChange}
                        className="text-xs bg-muted/50 border border-border rounded px-2 py-1 text-foreground"
                    >
                        <option value="inbox">{t('status.inbox')}</option>
                        <option value="next">{t('status.next')}</option>
                        <option value="waiting">{t('status.waiting')}</option>
                        <option value="someday">{t('status.someday')}</option>
                        <option value="done">{t('status.done')}</option>
                    </select>
                </div>
            );
        case 'priority':
            return (
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-muted-foreground font-medium">{t('taskEdit.priorityLabel')}</label>
                    <select
                        value={editPriority}
                        aria-label={t('taskEdit.priorityLabel')}
                        onChange={(e) => onEditPriority(e.target.value as TaskPriority | '')}
                        className="text-xs bg-muted/50 border border-border rounded px-2 py-1 text-foreground"
                    >
                        <option value="">{t('common.none')}</option>
                        <option value="low">{t('priority.low')}</option>
                        <option value="medium">{t('priority.medium')}</option>
                        <option value="high">{t('priority.high')}</option>
                        <option value="urgent">{t('priority.urgent')}</option>
                    </select>
                </div>
            );
        case 'recurrence':
            return (
                <div className="flex flex-col gap-1 w-full">
                    <label className="text-xs text-muted-foreground font-medium">{t('taskEdit.recurrenceLabel')}</label>
                    <select
                        value={editRecurrence}
                        aria-label="Recurrence"
                        onChange={(e) => {
                            const value = e.target.value as RecurrenceRule | '';
                            onEditRecurrence(value);
                            if (value === 'weekly') {
                                const parsed = parseRRuleString(editRecurrenceRRule);
                                if (!editRecurrenceRRule || parsed.rule !== 'weekly') {
                                    onEditRecurrenceRRule(buildRRuleString('weekly'));
                                }
                            }
                            if (value === 'monthly') {
                                const parsed = parseRRuleString(editRecurrenceRRule);
                                if (!editRecurrenceRRule || parsed.rule !== 'monthly') {
                                    onEditRecurrenceRRule(buildRRuleString('monthly'));
                                }
                            }
                            if (!value) {
                                onEditRecurrenceRRule('');
                            }
                        }}
                        className="text-xs bg-muted/50 border border-border rounded px-2 py-1 w-full text-foreground"
                    >
                        <option value="">{t('recurrence.none')}</option>
                        <option value="daily">{t('recurrence.daily')}</option>
                        <option value="weekly">{t('recurrence.weekly')}</option>
                        <option value="monthly">{t('recurrence.monthly')}</option>
                        <option value="yearly">{t('recurrence.yearly')}</option>
                    </select>
                    {editRecurrence && (
                        <label className="flex items-center gap-2 pt-1 text-[10px] text-muted-foreground">
                            <input
                                type="checkbox"
                                checked={editRecurrenceStrategy === 'fluid'}
                                onChange={(e) => onEditRecurrenceStrategy(e.target.checked ? 'fluid' : 'strict')}
                                className="accent-primary"
                            />
                            {t('recurrence.afterCompletion')}
                        </label>
                    )}
                    {editRecurrence === 'weekly' && (
                        <div className="pt-1">
                            <span className="text-[10px] text-muted-foreground">Repeat on</span>
                            <WeekdaySelector
                                value={editRecurrenceRRule || buildRRuleString('weekly')}
                                onChange={(rrule) => onEditRecurrenceRRule(rrule)}
                                className="pt-1"
                            />
                        </div>
                    )}
                    {editRecurrence === 'monthly' && (
                        <div className="pt-1 space-y-2">
                            <span className="text-[10px] text-muted-foreground">Repeat on</span>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    onClick={() => onEditRecurrenceRRule(buildRRuleString('monthly'))}
                                    className={cn(
                                        'text-[10px] px-2 py-1 rounded border transition-colors',
                                        monthlyRecurrence.pattern === 'date'
                                            ? 'bg-primary text-primary-foreground border-primary'
                                            : 'bg-transparent text-muted-foreground border-border hover:bg-accent'
                                    )}
                                >
                                    {t('recurrence.monthlyOnDay')}
                                </button>
                                <button
                                    type="button"
                                    onClick={onOpenCustomRecurrence}
                                    className={cn(
                                        'text-[10px] px-2 py-1 rounded border transition-colors',
                                        monthlyRecurrence.pattern === 'custom'
                                            ? 'bg-primary text-primary-foreground border-primary'
                                            : 'bg-transparent text-muted-foreground border-border hover:bg-accent'
                                    )}
                                >
                                    {t('recurrence.custom')}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            );
        case 'timeEstimate':
            return (
                <div className="flex flex-col gap-1 w-full">
                    <label className="text-xs text-muted-foreground font-medium">{t('taskEdit.timeEstimateLabel')}</label>
                    <select
                        value={editTimeEstimate}
                        aria-label="Time estimate"
                        onChange={(e) => onEditTimeEstimate(e.target.value as TimeEstimate | '')}
                        className="text-xs bg-muted/50 border border-border rounded px-2 py-1 w-full text-foreground"
                    >
                        <option value="">{t('common.none')}</option>
                        <option value="5min">5m</option>
                        <option value="10min">10m</option>
                        <option value="15min">15m</option>
                        <option value="30min">30m</option>
                        <option value="1hr">1h</option>
                        <option value="2hr">2h</option>
                        <option value="3hr">3h</option>
                        <option value="4hr">4h</option>
                        <option value="4hr+">4h+</option>
                    </select>
                </div>
            );
        case 'contexts':
            return (
                <div className="flex flex-col gap-1 w-full">
                    <label className="text-xs text-muted-foreground font-medium">{t('taskEdit.contextsLabel')}</label>
                    <input
                        type="text"
                        aria-label="Contexts"
                        value={editContexts}
                        onChange={(e) => onEditContexts(e.target.value)}
                        placeholder="@home, @work"
                        className="text-xs bg-muted/50 border border-border rounded px-2 py-1 w-full text-foreground placeholder:text-muted-foreground"
                    />
                    <div className="flex flex-wrap gap-2 pt-1">
                        {['@home', '@work', '@errands', '@computer', '@phone'].map(tag => {
                            const currentTags = editContexts.split(',').map(t => t.trim()).filter(Boolean);
                            const isActive = currentTags.includes(tag);
                            return (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => {
                                        let newTags;
                                        if (isActive) {
                                            newTags = currentTags.filter(t => t !== tag);
                                        } else {
                                            newTags = [...currentTags, tag];
                                        }
                                        onEditContexts(newTags.join(', '));
                                    }}
                                    className={cn(
                                        "text-[10px] px-2 py-0.5 rounded-full border transition-colors",
                                        isActive
                                            ? "bg-primary/10 border-primary text-primary"
                                            : "bg-transparent border-border text-muted-foreground hover:border-primary/50"
                                    )}
                                >
                                    {tag}
                                </button>
                            );
                        })}
                    </div>
                </div>
            );
        case 'tags':
            return (
                <div className="flex flex-col gap-1 w-full">
                    <label className="text-xs text-muted-foreground font-medium">{t('taskEdit.tagsLabel')}</label>
                    <input
                        type="text"
                        aria-label="Tags"
                        value={editTags}
                        onChange={(e) => onEditTags(e.target.value)}
                        placeholder="#urgent, #idea"
                        className="text-xs bg-muted/50 border border-border rounded px-2 py-1 w-full text-foreground placeholder:text-muted-foreground"
                    />
                    <div className="flex flex-wrap gap-2 pt-1">
                        {popularTagOptions.map(tag => {
                            const currentTags = editTags.split(',').map(t => t.trim()).filter(Boolean);
                            const isActive = currentTags.includes(tag);
                            return (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => {
                                        let newTags;
                                        if (isActive) {
                                            newTags = currentTags.filter(t => t !== tag);
                                        } else {
                                            newTags = [...currentTags, tag];
                                        }
                                        onEditTags(newTags.join(', '));
                                    }}
                                    className={cn(
                                        "text-[10px] px-2 py-0.5 rounded-full border transition-colors",
                                        isActive
                                            ? "bg-primary/10 border-primary text-primary"
                                            : "bg-transparent border-border text-muted-foreground hover:border-primary/50"
                                    )}
                                >
                                    {tag}
                                </button>
                            );
                        })}
                    </div>
                </div>
            );
        case 'checklist':
            return (
                <div className="flex flex-col gap-2 w-full pt-2 border-t border-border/50">
                    <label className="text-xs text-muted-foreground font-medium">{t('taskEdit.checklist')}</label>
                    <div className="space-y-2">
                        {(task.checklist || []).map((item, index) => (
                            <div key={item.id || index} className="flex items-center gap-2 group/item">
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newList = (task.checklist || []).map((entry, i) =>
                                            i === index ? { ...entry, isCompleted: !entry.isCompleted } : entry
                                        );
                                        updateTask(taskId, { checklist: newList });
                                    }}
                                    className={cn(
                                        "w-4 h-4 border rounded flex items-center justify-center transition-colors",
                                        item.isCompleted
                                            ? "bg-primary border-primary text-primary-foreground"
                                            : "border-muted-foreground hover:border-primary"
                                    )}
                                >
                                    {item.isCompleted && <Check className="w-3 h-3" />}
                                </button>
                                <input
                                    type="text"
                                    value={item.title}
                                    onChange={(e) => {
                                        const newList = (task.checklist || []).map((entry, i) =>
                                            i === index ? { ...entry, title: e.target.value } : entry
                                        );
                                        updateTask(taskId, { checklist: newList });
                                    }}
                                    className={cn(
                                        "flex-1 bg-transparent text-sm focus:outline-none border-b border-transparent focus:border-primary/50 px-1",
                                        item.isCompleted && "text-muted-foreground line-through"
                                    )}
                                    placeholder={t('taskEdit.itemNamePlaceholder')}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newList = (task.checklist || []).filter((_, i) => i !== index);
                                        updateTask(taskId, { checklist: newList });
                                    }}
                                    className="opacity-0 group-hover/item:opacity-100 text-muted-foreground hover:text-destructive p-1"
                                >
                                    <Trash2 className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => {
                                const newItem = {
                                    id: generateUUID(),
                                    title: '',
                                    isCompleted: false,
                                };
                                updateTask(taskId, {
                                    checklist: [...(task.checklist || []), newItem],
                                });
                            }}
                            className="text-xs text-blue-500 hover:text-blue-600 font-medium flex items-center gap-1"
                        >
                            <Plus className="w-3 h-3" />
                            {t('taskEdit.addItem')}
                        </button>
                        {(task.checklist || []).length > 0 && (
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => resetTaskChecklist(taskId)}
                                    className="text-xs px-2 py-1 rounded bg-muted/50 hover:bg-muted transition-colors text-muted-foreground"
                                >
                                    {t('taskEdit.resetChecklist')}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            );
        default:
            return null;
    }
}

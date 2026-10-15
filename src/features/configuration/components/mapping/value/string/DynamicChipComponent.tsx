import { ErrorMessage, Label } from '@navikt/ds-react';
import * as React from 'react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { ControllerFieldState } from 'react-hook-form';
import { Noop } from 'react-hook-form/dist/types';
import { useTranslation } from 'react-i18next';

import { ValueType } from '../../../../types/Metadata/IntegrationMetadata';
import { ITag } from '../../../../types/Metadata/Tag';
import { Search } from '../../../../util/urlUtils';
import {
    getTagStyles,
    isReferenceTag,
    mappingStringToValueArray,
    valueArrayToMappingString,
} from '../../../../util/valueFieldUtils';
import configurationStyles from '../../../styles/configuration.module.css';

export interface Props {
    displayName?: string;
    search?: Search;
    accept: ValueType[];
    disabled?: boolean;
    onChange?: (value: string) => void;
    onBlur?: Noop;
    name: string;
    value: string | null;
    fieldState: ControllerFieldState | undefined;
}

function isChipElement(node: Node | null | undefined): node is HTMLElement {
    return Boolean(
        node && node.nodeType === Node.ELEMENT_NODE && (node as HTMLElement).dataset.referenceTag
    );
}

function createChipElement(token: string, disabled?: boolean): HTMLSpanElement {
    const chip = document.createElement('span');
    chip.contentEditable = 'false';
    chip.dataset.referenceTag = token;
    chip.className = 'chipTag';
    chip.title = token;
    chip.textContent = token;
    Object.assign(chip.style, getTagStyles(token, disabled));
    return chip;
}

function serializeEditor(editor: HTMLElement): string[] {
    const tokens: string[] = [];

    const appendText = (text: string) => {
        if (!text) {
            return;
        }
        const last = tokens[tokens.length - 1];
        if (last && !isReferenceTag(last)) {
            tokens[tokens.length - 1] = last + text;
        } else {
            tokens.push(text);
        }
    };

    const walk = (node: Node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            appendText(node.textContent ?? '');
            return;
        }
        if (node.nodeType !== Node.ELEMENT_NODE) {
            return;
        }
        const element = node as HTMLElement;
        if (element.dataset.referenceTag) {
            tokens.push(element.dataset.referenceTag);
            return;
        }
        if (element.tagName === 'BR') {
            appendText('\n');
            return;
        }
        if (element.tagName === 'DIV' || element.tagName === 'P') {
            if (tokens.length > 0) {
                appendText('\n');
            }
            element.childNodes.forEach(walk);
            return;
        }
        element.childNodes.forEach(walk);
    };

    editor.childNodes.forEach(walk);
    return tokens;
}

function isEditorVisuallyEmpty(editor: HTMLElement): boolean {
    return (
        !editor.querySelector('[data-reference-tag]') &&
        (editor.textContent ?? '').replace(/\u200B/g, '').length === 0
    );
}

function writeTokensToEditor(editor: HTMLElement, tokens: string[], disabled?: boolean) {
    editor.replaceChildren();
    tokens.forEach((token) => {
        if (isReferenceTag(token)) {
            editor.appendChild(createChipElement(token, disabled));
        } else {
            editor.appendChild(document.createTextNode(token));
        }
    });
}

function placeCaret(node: Node, offset: number) {
    const selection = window.getSelection();
    if (!selection) {
        return;
    }
    const range = document.createRange();
    range.setStart(node, offset);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
}

function placeCaretAfter(node: Node) {
    const selection = window.getSelection();
    if (!selection) {
        return;
    }
    const range = document.createRange();
    range.setStartAfter(node);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
}

function placeCaretBefore(node: Node) {
    const selection = window.getSelection();
    if (!selection) {
        return;
    }
    const range = document.createRange();
    range.setStartBefore(node);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
}

/** Turn any typed/pasted `$if`/`$vc`/`$icf` substrings in text nodes into chip elements. */
function convertTypedTagsToChips(editor: HTMLElement, disabled?: boolean): boolean {
    const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT);
    const textNodes: Text[] = [];
    while (walker.nextNode()) {
        textNodes.push(walker.currentNode as Text);
    }

    let changed = false;
    for (const textNode of textNodes) {
        if (isChipElement(textNode.parentElement)) {
            continue;
        }
        const text = textNode.textContent ?? '';
        const tokens = mappingStringToValueArray(text);
        if (!tokens.some(isReferenceTag)) {
            continue;
        }

        const fragment = document.createDocumentFragment();
        let lastNode: Node | null = null;
        tokens.forEach((token) => {
            const node = isReferenceTag(token)
                ? createChipElement(token, disabled)
                : document.createTextNode(token);
            fragment.appendChild(node);
            lastNode = node;
        });
        textNode.parentNode?.replaceChild(fragment, textNode);
        if (lastNode) {
            placeCaretAfter(lastNode);
        }
        changed = true;
    }
    return changed;
}

function getCollapsedSelection(): { node: Node; offset: number } | null {
    const selection = window.getSelection();
    if (!selection || !selection.isCollapsed || !selection.anchorNode) {
        return null;
    }
    return { node: selection.anchorNode, offset: selection.anchorOffset };
}

/** Chip immediately before the caret (atomic unit to the left). */
function getChipBeforeCaret(editor: HTMLElement): HTMLElement | null {
    const caret = getCollapsedSelection();
    if (!caret || !editor.contains(caret.node)) {
        return null;
    }
    const { node, offset } = caret;

    if (node === editor) {
        const child = editor.childNodes[offset - 1];
        return isChipElement(child) ? child : null;
    }
    if (node.nodeType === Node.TEXT_NODE && offset === 0) {
        return isChipElement(node.previousSibling) ? (node.previousSibling as HTMLElement) : null;
    }
    if (isChipElement(node)) {
        return node;
    }
    return null;
}

/** Chip immediately after the caret (atomic unit to the right). */
function getChipAfterCaret(editor: HTMLElement): HTMLElement | null {
    const caret = getCollapsedSelection();
    if (!caret || !editor.contains(caret.node)) {
        return null;
    }
    const { node, offset } = caret;

    if (node === editor) {
        const child = editor.childNodes[offset];
        return isChipElement(child) ? child : null;
    }
    if (node.nodeType === Node.TEXT_NODE && offset === (node.textContent?.length ?? 0)) {
        return isChipElement(node.nextSibling) ? (node.nextSibling as HTMLElement) : null;
    }
    if (isChipElement(node)) {
        return node;
    }
    return null;
}

const DynamicChipComponent: React.FunctionComponent<Props> = forwardRef<HTMLDivElement, Props>(
    (props: Props, ref) => {
        const absoluteKey: string = props.name;
        const { t } = useTranslation('translations', { keyPrefix: 'pages.configuration' });
        const editorRef = useRef<HTMLDivElement | null>(null);
        const lastEmittedValue = useRef(props.value ?? '');
        const [isEmpty, setIsEmpty] = useState(!(props.value && props.value.length > 0));

        const setEditorRef = (node: HTMLDivElement | null) => {
            editorRef.current = node;
            if (typeof ref === 'function') {
                ref(node);
            } else if (ref) {
                ref.current = node;
            }
        };

        const emitFromEditor = () => {
            const editor = editorRef.current;
            if (!editor) {
                return;
            }
            const tokens = serializeEditor(editor);
            const mappingString = valueArrayToMappingString(tokens);
            lastEmittedValue.current = mappingString;
            setIsEmpty(isEditorVisuallyEmpty(editor));
            props.onChange?.(mappingString);
        };

        useEffect(() => {
            const editor = editorRef.current;
            if (!editor) {
                return;
            }
            const nextValue = props.value ?? '';
            if (nextValue === lastEmittedValue.current) {
                if (nextValue === '' && isEditorVisuallyEmpty(editor)) {
                    return;
                }
                if (editor.childNodes.length > 0) {
                    return;
                }
            }
            writeTokensToEditor(
                editor,
                nextValue ? mappingStringToValueArray(nextValue) : [],
                props.disabled
            );
            lastEmittedValue.current = nextValue;
            setIsEmpty(isEditorVisuallyEmpty(editor));
        }, [props.value, props.disabled]);

        const [{ canDrop, isOver }, dropRef] = useDrop({
            accept: props.accept,
            drop: (tag: ITag) => {
                if (props.disabled) {
                    return;
                }
                const editor = editorRef.current;
                if (!editor) {
                    return;
                }
                const chip = createChipElement(tag.value, props.disabled);
                editor.appendChild(chip);
                editor.focus();
                placeCaretAfter(chip);
                emitFromEditor();
            },
            collect: (monitor) => ({
                canDrop: monitor.canDrop(),
                isOver: monitor.isOver(),
            }),
        });

        let dropClassName = '';
        if (canDrop && isOver && !props.disabled) {
            dropClassName = configurationStyles.chipInputActive;
        } else if (canDrop && !props.disabled) {
            dropClassName = configurationStyles.chipInputCanDrop;
        }

        const hasError = Boolean(props.fieldState?.error);
        const errorId = `error-message-${absoluteKey}`;

        return (
            <div
                id={'dnd-value-component-' + absoluteKey}
                key={absoluteKey}
                ref={dropRef as unknown as React.Ref<HTMLDivElement>}
                className={`${configurationStyles.inputFullWidth} ${configurationStyles.input}`}
            >
                <div
                    className={`navds-form-field navds-form-field--small${hasError ? ' navds-form-field--error' : ''}`}
                >
                    {props.displayName ? (
                        <Label htmlFor={absoluteKey} size="small">
                            {props.displayName}
                        </Label>
                    ) : null}
                    <div className={configurationStyles.chipInputShell}>
                        <div
                            id={absoluteKey}
                            ref={setEditorRef}
                            className={[
                                configurationStyles.chipInputBox,
                                dropClassName,
                                hasError ? configurationStyles.chipInputError : '',
                                isEmpty ? configurationStyles.chipInputEmpty : '',
                            ]
                                .filter(Boolean)
                                .join(' ')}
                            role="textbox"
                            contentEditable={!props.disabled}
                            suppressContentEditableWarning
                            aria-multiline="true"
                            aria-invalid={hasError}
                            aria-describedby={hasError ? errorId : undefined}
                            data-placeholder={t('label.placeholder')}
                            onInput={() => {
                                const editor = editorRef.current;
                                if (!editor) {
                                    return;
                                }
                                convertTypedTagsToChips(editor, props.disabled);
                                emitFromEditor();
                            }}
                            onKeyDown={(e) => {
                                if (props.disabled) {
                                    return;
                                }
                                const editor = editorRef.current;
                                if (!editor) {
                                    return;
                                }

                                if (e.key === 'Backspace') {
                                    const chip = getChipBeforeCaret(editor);
                                    if (chip) {
                                        e.preventDefault();
                                        const previous = chip.previousSibling;
                                        chip.remove();
                                        if (previous) {
                                            if (previous.nodeType === Node.TEXT_NODE) {
                                                placeCaret(
                                                    previous,
                                                    previous.textContent?.length ?? 0
                                                );
                                            } else {
                                                placeCaretAfter(previous);
                                            }
                                        } else {
                                            placeCaret(editor, 0);
                                        }
                                        emitFromEditor();
                                    }
                                    return;
                                }

                                if (e.key === 'Delete') {
                                    const chip = getChipAfterCaret(editor);
                                    if (chip) {
                                        e.preventDefault();
                                        const next = chip.nextSibling;
                                        chip.remove();
                                        if (next) {
                                            if (next.nodeType === Node.TEXT_NODE) {
                                                placeCaret(next, 0);
                                            } else {
                                                placeCaretBefore(next);
                                            }
                                        }
                                        emitFromEditor();
                                    }
                                    return;
                                }

                                if (
                                    e.key === 'ArrowLeft' &&
                                    !e.shiftKey &&
                                    !e.altKey &&
                                    !e.metaKey
                                ) {
                                    const chip = getChipBeforeCaret(editor);
                                    if (chip) {
                                        e.preventDefault();
                                        placeCaretBefore(chip);
                                    }
                                    return;
                                }

                                if (
                                    e.key === 'ArrowRight' &&
                                    !e.shiftKey &&
                                    !e.altKey &&
                                    !e.metaKey
                                ) {
                                    const chip = getChipAfterCaret(editor);
                                    if (chip) {
                                        e.preventDefault();
                                        placeCaretAfter(chip);
                                    }
                                }
                            }}
                            onBlur={() => {
                                const editor = editorRef.current;
                                if (editor) {
                                    convertTypedTagsToChips(editor, props.disabled);
                                    const tokens = serializeEditor(editor);
                                    const normalized = mappingStringToValueArray(
                                        valueArrayToMappingString(tokens)
                                    );
                                    const current = valueArrayToMappingString(tokens);
                                    const next = valueArrayToMappingString(normalized);
                                    if (current !== next) {
                                        writeTokensToEditor(editor, normalized, props.disabled);
                                    }
                                    lastEmittedValue.current = next;
                                    setIsEmpty(isEditorVisuallyEmpty(editor));
                                    props.onChange?.(next);
                                }
                                if (props.onBlur) {
                                    props.onBlur();
                                }
                            }}
                            onPaste={(e) => {
                                e.preventDefault();
                                const text = e.clipboardData.getData('text/plain');
                                const selection = window.getSelection();
                                if (!selection || selection.rangeCount === 0) {
                                    return;
                                }
                                const range = selection.getRangeAt(0);
                                range.deleteContents();
                                const tokens = mappingStringToValueArray(text);
                                const fragment = document.createDocumentFragment();
                                let lastNode: Node | null = null;
                                tokens.forEach((token) => {
                                    const node = isReferenceTag(token)
                                        ? createChipElement(token, props.disabled)
                                        : document.createTextNode(token);
                                    fragment.appendChild(node);
                                    lastNode = node;
                                });
                                range.insertNode(fragment);
                                if (lastNode) {
                                    placeCaretAfter(lastNode);
                                }
                                emitFromEditor();
                            }}
                        />
                    </div>
                    {hasError && (
                        <ErrorMessage id={errorId} size="small" data-testid="error-message">
                            {t('label.formatError')}
                        </ErrorMessage>
                    )}
                </div>
            </div>
        );
    }
);

DynamicChipComponent.displayName = 'DynamicChipComponent';
export default DynamicChipComponent;

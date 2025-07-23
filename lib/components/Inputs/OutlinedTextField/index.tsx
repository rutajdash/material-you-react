/* eslint-disable @typescript-eslint/prefer-for-of */
/**
 * @license
 * Material You React Package
 * Copyright (C) 2024  Rutaj Dash
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, only version 3 of the License.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * The contact information of the author and copyright owner of this
 * program can be found at <https://github.com/rutajdash>
 */

'use client';

import React, {
  ChangeEvent,
  HTMLAttributes,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './OutlinedTextField.module.css';

// TODO: Add error message display and styling
// TODO: Add tap to focus on root for input
export default function OutlinedTextField({
  name,
  type = 'text',
  label,
  placeholder,
  className,
  leadingIcon,
  trailingIcon,
  onClickTrailingIcon,
  onEnterKey,
  enterKeyHint,
  handleInputChange,
  containerProps,
  inputProps,
}: {
  name: string;
  type: 'email' | 'number' | 'password' | 'text' | 'search' | 'tel' | 'url';
  label?: string;
  placeholder?: string;
  className?: string;
  leadingIcon?: string;
  trailingIcon?: string;
  onClickTrailingIcon?: MouseEventHandler<HTMLSpanElement>;
  onEnterKey?: (value: string) => void;
  enterKeyHint?: HTMLAttributes<HTMLInputElement>['enterKeyHint'];
  handleInputChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}): React.JSX.Element {
  const rootElement = useRef<HTMLDivElement>(null);
  const [backgroundColor, setBackgroundColor] = useState<string>('transparent');

  useEffect(() => {
    const bgColor = getUnderlyingBgColor(rootElement.current);
    setBackgroundColor(bgColor);
  }, [rootElement]);

  return (
    <div
      className={`${styles.root} ${!label ? styles.noLabel : ''} ${className}`}
      {...containerProps}
      ref={rootElement}
    >
      {leadingIcon && (
        <span className={`${styles.leadingIcon} material-symbols-outlined`}>
          {leadingIcon}
        </span>
      )}
      <div className={styles.inputContainer}>
        {label && (
          <label className={styles.label}>
            <span style={{ backgroundColor }}>{label}</span>
          </label>
        )}
        <input
          name={name}
          type={type}
          aria-label={label}
          title={label}
          placeholder={!label && placeholder ? placeholder : ''}
          className={styles.input}
          enterKeyHint={enterKeyHint}
          onKeyUpCapture={(e) => {
            if (e.key === 'Enter' && onEnterKey) {
              onEnterKey(e.currentTarget.value);
            }
          }}
          onChange={(e) => handleInputChange?.(e)}
          {...inputProps}
        />
      </div>
      {trailingIcon && (
        <span
          className={`${styles.trailingIcon} material-symbols-outlined`}
          onClick={onClickTrailingIcon}
        >
          {trailingIcon}
        </span>
      )}
    </div>
  );
}

function getUnderlyingBgColor(element: Element | null): string {
  if (!element?.tagName) {
    return 'transparent';
  }

  const classData = element.classList
    .values()
    .toArray()
    .map((cls) => cls.trim())
    .map((cls) => getCSSProperties(cls))
    .reduce(
      (acc, properties) => {
        for (const [key, value] of Object.entries(properties)) {
          if (!acc[key]) {
            acc[key] = value;
          }
        }
        return acc;
      },
      {} as Record<string, string>,
    );

  const bgColor =
    Object.keys(classData).includes('background-color') &&
    classData['background-color'] &&
    classData['background-color'] !== 'transparent' &&
    classData['background-color'];

  if (bgColor) {
    return classData['background-color'];
  }

  return getUnderlyingBgColor(element.parentNode as Element | null);
}

function getCSSProperties(className: string) {
  const properties: Record<string, string> = {};
  const targetSelector = `.${className}`;

  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        if (rule instanceof CSSStyleRule) {
          if (rule.selectorText === targetSelector) {
            const style = rule.style;

            for (let i = 0; i < style.length; i++) {
              const propName: string = style[i];
              const propValue = style.getPropertyValue(propName);
              properties[propName] = propValue;
            }
          }
        } else if (rule instanceof CSSMediaRule) {
          for (const mediaRule of rule.cssRules) {
            if (
              mediaRule instanceof CSSStyleRule &&
              mediaRule.selectorText === targetSelector
            ) {
              const style = mediaRule.style;
              for (let i = 0; i < style.length; i++) {
                const propName: string = style[i];
                const propValue = style.getPropertyValue(propName);
                properties[propName] = propValue;
              }
            }
          }
        }
      }
    } catch (e) {
      if ((e as Error).name === 'SecurityError') {
        console.warn(
          `SecurityError: Cannot access rules from cross-origin stylesheet: ${sheet.href}`,
        );
      } else {
        console.error(
          `Error processing stylesheet ${sheet.href || 'inline'}:`,
          e,
        );
      }
    }
  }

  return properties;
}

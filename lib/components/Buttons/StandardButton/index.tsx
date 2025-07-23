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

import { useMemo } from 'react';
import { InkWell } from '../../Interactions';
import styles from './StandardButton.module.css';

export default function StandardButton({
  ref,
  mode,
  label,
  leadingIcon,
  onTap,
  isDisabled,
  className,
}: {
  ref?: React.Ref<HTMLDivElement>;
  mode: 'elevated' | 'filled' | 'filled-tonal' | 'outlined' | 'text';
  label: string;
  leadingIcon?: string;
  onTap?: () => void;
  isDisabled?: boolean;
  className?: string;
}) {
  const inkWellProps = useMemo<{
    boxShadow?: string;
    outline?: string;
    foregroundColor: string;
    backgroundColor: string;
    overlayColor: string;
    disabledColor: string;
  }>(() => {
    switch (mode) {
      case 'elevated':
        return {
          boxShadow: '0px 1px 1px 0px var(--md-sys-color-shadow)',
          foregroundColor: 'var(--md-sys-color-primary)',
          backgroundColor: 'var(--md-sys-color-surface-container-low)',
          overlayColor: 'var(--md-sys-color-primary)',
          disabledColor: 'var(--md-sys-color-on-surface)',
        };
      case 'filled':
        return {
          boxShadow: '0px 0px 0px 0px var(--md-sys-color-shadow)',
          foregroundColor: 'var(--md-sys-color-on-primary)',
          backgroundColor: 'var(--md-sys-color-primary)',
          overlayColor: 'var(--md-sys-color-on-primary)',
          disabledColor: 'var(--md-sys-color-on-surface)',
        };
      case 'filled-tonal':
        return {
          boxShadow: '0px 0px 0px 0px var(--md-sys-color-shadow)',
          foregroundColor: 'var(--md-sys-color-on-secondary-container)',
          backgroundColor: 'var(--md-sys-color-secondary-container)',
          overlayColor: 'var(--md-sys-color-on-secondary-container)',
          disabledColor: 'var(--md-sys-color-on-surface)',
        };
      case 'outlined':
        return {
          outline: '1px solid var(--md-sys-color-outline)',
          foregroundColor: 'var(--md-sys-color-primary)',
          backgroundColor: 'transparent',
          overlayColor: 'var(--md-sys-color-primary)',
          disabledColor: 'var(--md-sys-color-on-surface)',
        };
      case 'text':
        return {
          foregroundColor: 'var(--md-sys-color-primary)',
          backgroundColor: 'transparent',
          overlayColor: 'var(--md-sys-color-primary)',
          disabledColor: 'var(--md-sys-color-on-surface)',
        };
    }
  }, [mode]);

  return (
    <InkWell
      ref={ref}
      onTap={onTap}
      isDisabled={isDisabled}
      height='40px'
      borderRadius='20px'
      {...inkWellProps}
      className={className}
    >
      <div className={styles.root}>
        {leadingIcon && (
          <span className={`${styles.leadingIcon} material-symbols-outlined`}>
            {leadingIcon}
          </span>
        )}
        <span className={styles.label}>{label}</span>
      </div>
    </InkWell>
  );
}

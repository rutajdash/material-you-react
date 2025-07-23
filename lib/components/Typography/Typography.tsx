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

import clsx from 'clsx';
import { HtmlHTMLAttributes } from 'react';
import convertPropertyToCSSVariableName from '../../utils/theme/convertPropertyToCSSVariableName';
import MaterialPaletteType from '../../utils/theme/palette/MaterialPalette.type';
import styles from './Typography.module.css';

export default function Typography({
  variant,
  subVariant = 'medium',
  color = 'onBackground',
  bold,
  extrabold,
  italic,
  underline,
  lineThrough,
  uppercase,
  lowercase,
  capitalize,
  noWrap,
  breakWord,
  overflow,
  children,
  ...props
}: {
  variant: 'display' | 'headline' | 'title' | 'body' | 'label';
  subVariant: 'small' | 'medium' | 'large';
  color?: keyof MaterialPaletteType;
  bold?: boolean;
  extrabold?: boolean;
  italic?: boolean;
  underline?: boolean;
  lineThrough?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;
  capitalize?: boolean;
  noWrap?: boolean;
  breakWord?: boolean;
  overflow?: 'ellipsis' | 'wrap';
  children: React.ReactNode;
} & HtmlHTMLAttributes<HTMLSpanElement>) {
  const spanClass = clsx([
    styles[`typography--${variant}-${subVariant}`],
    bold && styles['typography--bold'],
    extrabold && styles['typography--extra-bold'],
    italic && styles['typography--italic'],
    underline && styles['typography--underline'],
    lineThrough && styles['typography--line-through'],
    uppercase && styles['typography--uppercase'],
    lowercase && styles['typography--lowercase'],
    capitalize && styles['typography--capitalize'],
    noWrap && styles['typography--no-wrap'],
    breakWord && styles['typography--break-word'],
    overflow === 'ellipsis' && styles['typography--overflow-ellipsis'],
    overflow === 'wrap' && styles['typography--overflow-wrap'],
  ]);

  return (
    <span
      className={spanClass}
      style={{
        ...props.style,
        color: `var(--md-sys-color-${convertPropertyToCSSVariableName(color)})`,
      }}
      {...props}
    >
      {children}
    </span>
  );
}

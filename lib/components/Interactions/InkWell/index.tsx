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

import { CSSProperties, HtmlHTMLAttributes, ReactNode, useMemo } from 'react';
import styles from './InkWell.module.css';

export default function InkWell({
  ref,
  children,

  onTap,
  isDisabled,

  height,
  width,
  borderRadius,
  boxShadow,
  outline,

  foregroundColor,
  backgroundColor,
  overlayColor,
  disabledColor,

  className,
  props,
}: {
  ref?: React.Ref<HTMLDivElement>;
  children: ReactNode;

  onTap?: () => void;
  isDisabled?: boolean;

  height?: CSSProperties['height'];
  width?: CSSProperties['width'];
  borderRadius?: CSSProperties['borderRadius'];
  boxShadow?: CSSProperties['boxShadow'];
  outline?: CSSProperties['outline'];

  foregroundColor?: CSSProperties['color'];
  backgroundColor?: CSSProperties['color'];
  overlayColor?: CSSProperties['color'];
  disabledColor?: CSSProperties['color'];

  className?: string;
  props?: HtmlHTMLAttributes<HTMLDivElement>;
}) {
  const noBoundary = useMemo(
    () => !boxShadow && !outline,
    [boxShadow, outline],
  );

  const inkWellStyles = useMemo(
    () => `
    @scope {
      :scope {
        --md-comp-inkwell-height: ${height ?? '100%'};\n
        --md-comp-inkwell-width: ${width ?? 'fit-content'};\n
        --md-comp-inkwell-border-radius: ${borderRadius ?? 'calc(var(--md-comp-inkwell-height) / 2)'};\n
        --md-comp-inkwell-box-shadow: ${boxShadow ?? 'none'};\n
        --md-comp-inkwell-outline: ${outline ?? 'none'};\n

        --md-comp-inkwell-foreground-color: ${foregroundColor ?? 'var(--md-sys-color-on-primary)'};\n
        --md-comp-inkwell-background-color: ${backgroundColor ?? 'transparent'};\n
        --md-comp-inkwell-overlay-color: ${overlayColor ?? 'var(--md-sys-color-on-primary)'};\n
        --md-comp-inkwell-disabled-color: ${disabledColor ?? 'var(--md-sys-color-on-surface)'};\n
      }
    }
  `,
    [
      height,
      width,
      borderRadius,
      boxShadow,
      outline,
      foregroundColor,
      backgroundColor,
      overlayColor,
      disabledColor,
    ],
  );

  return (
    <div
      ref={ref}
      className={`${styles.empty} ${className ?? ''}`}
    >
      <style>{inkWellStyles}</style>
      <div
        className={`${styles.root} ${isDisabled ? styles.disabled : ''} ${noBoundary ? styles.noBoundary : ''}`}
        onMouseDown={
          !isDisabled
            ? (e) => {
                const ripple = e.currentTarget.querySelector(
                  `.${styles.ripple}`,
                );
                const mouseX =
                  e.clientX -
                  e.currentTarget.getBoundingClientRect().left -
                  e.currentTarget.getBoundingClientRect().width / 2;
                const mouseY =
                  e.clientY -
                  e.currentTarget.getBoundingClientRect().top -
                  e.currentTarget.getBoundingClientRect().height / 2;

                if (ripple) {
                  const boxDimension = e.currentTarget.clientWidth * 2.5;

                  ripple.setAttribute(
                    'style',
                    `transform: translate(${mouseX}px, ${mouseY}px); transition: opacity 250ms, width 500ms, height 500ms; opacity: 0.2; width: ${boxDimension}px; height: ${boxDimension}px;`,
                  );
                }
              }
            : undefined
        }
        onClick={
          !isDisabled
            ? (e) => {
                const ripple = e.currentTarget.querySelector(
                  `.${styles.ripple}`,
                );
                const mouseX =
                  e.clientX -
                  e.currentTarget.getBoundingClientRect().left -
                  e.currentTarget.getBoundingClientRect().width / 2;
                const mouseY =
                  e.clientY -
                  e.currentTarget.getBoundingClientRect().top -
                  e.currentTarget.getBoundingClientRect().height / 2;

                if (ripple) {
                  const boxDimension = e.currentTarget.clientWidth * 2.5;

                  setTimeout(() => {
                    ripple.setAttribute(
                      'style',
                      `transform: translate(${mouseX}px, ${mouseY}px); transition: opacity 350ms, width 500ms, height 500ms; opacity: 0; width: ${boxDimension}px; height: ${boxDimension}px;`,
                    );
                  }, 300);

                  setTimeout(() => {
                    ripple.setAttribute(
                      'style',
                      `transform: translate(${mouseX}px, ${mouseY}px); transition: opacity 200ms, width 0ms, height 0ms; opacity: 0; width: 0px; height: 0px;`,
                    );
                  }, 300 + 350);
                }
                onTap?.();
              }
            : undefined
        }
        {...props}
      >
        {backgroundColor && <div className={styles.background}></div>}
        <div className={styles.overlay}></div>
        <div className={styles.ripple}></div>
        <div className={styles.foreground}>{children}</div>
      </div>
    </div>
  );
}

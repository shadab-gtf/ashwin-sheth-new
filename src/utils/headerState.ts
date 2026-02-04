// utils/headerState.ts
export type HeaderTheme = 'light' | 'dark';

export const setHeaderTheme = (theme: HeaderTheme) => {
    window.dispatchEvent(
        new CustomEvent('header-theme', { detail: theme })
    );
};

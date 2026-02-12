// utils/headerState.ts
// export type HeaderTheme = 'light' | 'dark';

// export const setHeaderTheme = (theme: HeaderTheme) => {
//     window.dispatchEvent(
//         new CustomEvent('header-theme', { detail: theme })
//     );
// };

// utils/headerState.ts

export type HeaderTheme = "light" | "dark";

export interface HeaderState {
    theme?: HeaderTheme;
    visible?: boolean;
}

export const setHeaderState = (state: HeaderState) => {
    if (typeof window === "undefined") return;

    window.dispatchEvent(
        new CustomEvent<HeaderState>("header-state", {
            detail: state,
        })
    );
};

// Convenience helpers
export const setHeaderTheme = (theme: HeaderTheme) => {
    setHeaderState({ theme, visible: true });
};

export const showHeader = () => {
    setHeaderState({ visible: true });
};

export const hideHeader = () => {
    setHeaderState({ visible: false });
};

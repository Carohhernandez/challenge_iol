const sizes = {
    mobileS: '320px',
    tablet: '768px',
    laptop: '1024px',
};

export const devices = {
    mobileS: `(min-width: ${sizes.mobileS})`,
    tablet: `(min-width: ${sizes.tablet})`,
    laptop: `(min-width: ${sizes.laptop})`,
    desktop: `(min-width: ${sizes.desktop})`,
};
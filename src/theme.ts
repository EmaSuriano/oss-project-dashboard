import { grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';

export const theme = deepMerge(grommet, {
  global: {
    colors: {
      active: 'light-5',
      placeholder: 'dark-1',
    },
    elevation: {
      light: {
        small: '0 0 1px 0 rgba(0, 0, 0, 0.40), 0 1px 2px 0 rgba(0,0,0,0.40)',
        medium: '0 0 2px 0 rgba(0,0,0,0.40), 0 2px 4px 0 rgba(0,0,0,0.40)',
        large: '0 0 1px 0 rgba(0,0,0,0.40), 0 4px 8px 0 rgba(0,0,0,0.40)',
        xlarge: '0 0 1px 0 rgba(0,0,0,0.40), 0 8px 16px 0 rgba(0,0,0,0.40)',
      },
    },
    font: {
      family: "'Metric', Arial, sans-serif",
      face: `
        @font-face {
          font-family: "Metric";
          src: url("https://hpefonts.s3.amazonaws.com/web/MetricHPE-Web-Regular.woff") format('woff');
        }
        @font-face {
          font-family: "Metric";
          src: url("https://hpefonts.s3.amazonaws.com/web/MetricHPE-Web-Bold.woff") format('woff');
          font-weight: 700;
        }
        @font-face {
          font-family: "Metric";
          src: url("https://hpefonts.s3.amazonaws.com/web/MetricHPE-Web-Semibold.woff") format('woff');
          font-weight: 600;
        }
        @font-face {
          font-family: "Metric";
          src: url("https://hpefonts.s3.amazonaws.com/web/MetricHPE-Web-Light.woff") format('woff');
          font-weight: 100;
        }
      `,
    },
    input: {
      weight: 100,
    },
    size: { avatar: '40px', sidebar: '90px' },
  },
  icon: {
    size: {
      medium: '18px',
      large: '24px',
    },
  },
  paragraph: {
    medium: {
      size: '16px',
      height: '20px',
    },
    large: {
      size: '20px',
      height: '24px',
    },
  },
  button: {
    color: 'white',
  },
});

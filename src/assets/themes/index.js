const THEME = 'black';

export const BlackTheme = {
  colors: {
    theme: 'black',
    statusbar: '#000',
    chatbadge: 'seagreen',
    chatbadgetxt: 'black',
    chattext: 'silver',
    statusbartext: 'white',
    background: 'rgb(1, 1, 1)',
    border: 'rgb(39, 39, 41)',
    card: 'rgb(18, 18, 18)',
    primary: 'rgb(10, 132, 255)',
    blue: '#2196F3',
    lightgray: '#F8F8F8',
    placeholder: '#606060',
    statusbar: '#000',
    statusbartext: 'light',
    text: 'rgb(229, 229, 231)',
    iconcolor: 'dimgray',
    tabiconcolor: '#E0E0E0',
  },
};

export const WhiteTheme = {
  colors: {
    theme: 'white',
    statusbar: '#E8E8E8',
    chatbadge: 'limegreen',
    chatbadgetxt: 'white',
    statusbartext: 'dark',
    lightgray: '#F8F8F8',
    background: 'rgb(245, 245, 245)',
    border: 'rgb(199, 199, 204)',
    blue: '#2196F3',
    placeholder: '#606060',
    card: 'rgb(245, 245, 245)',
    primary: 'rgb(0, 122, 255)',
    statusbartext: 'dark',
    text: 'rgb(28, 28, 30)',
    iconcolor: 'dimgray',
    tabiconcolor: 'rgb(2,2,2)',
  },
};

export const useTheme = () => {
  switch (THEME) {
    case 'white':
      return WhiteTheme;
      break;
    case 'black':
      return BlackTheme;
      break;
    default:
      return WhiteTheme;
      break;
  }
};

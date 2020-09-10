const THEME = 'black';
export const BlackTheme = {
    colors: {
        theme: 'rgb(1, 1, 1)',
        statusbar: '#000',
        statusbartext: 'white',
        background: "rgb(1, 1, 1)",
        border: "rgb(39, 39, 41)",
        card: "rgb(18, 18, 18)",
        primary: "rgb(10, 132, 255)",
        blue: "#2196F3",
        placeholder: '#606060',
        statusbar: "#000",
        statusbartext: "light",
        text: "rgb(229, 229, 231)",
        iconcolor: 'dimgray',
        tabiconcolor: '#E0E0E0'

    }
};

export const WhiteTheme = {
    colors: {
        theme: 'white',
        statusbar: '#f1f1f1',
        statusbartext: 'dark',
        background: 'white',
        border: "rgb(199, 199, 204)",
        blue: "#2196F3",
        placeholder: '#606060',
        card: "rgb(255, 255, 255)",
        primary: "rgb(0, 122, 255)",
        statusbartext: "dark",
        text: "rgb(28, 28, 30)",
        iconcolor: 'dimgray',
        tabiconcolor: 'rgb(2,2,2)'
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
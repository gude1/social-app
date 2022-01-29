import {useTheme} from '../assets/themes';

const {colors} = useTheme();

export const DEFAULT_NAV_OPTIONS = {
  layout: {
    fitSystemWindows: false,
    // topMargin: 0,
    componentBackgroundColor: colors.background,
    //orientation: ['portrait']
  },
  navigationBar: {
    visible: true,
    backgroundColor: 'black',
  },
  statusBar: {
    animate: false,
  },
  topBar: {
    visible: false,
  },
  content: {
    background: {
      color: colors.background,
    },
  },
  bottomTab: {
    fontSize: 14,
    textColor: colors.text,
    selectedFontSize: 15,
    iconColor: colors.tabiconcolor,
    fontWeight: '200',
    selectedTextColor: '#2196F3',
    selectedIconColor: '#2196F3',
  },
  bottomTabs: {
    animate: true,
    animateTabSelection: true,
    elevation: 2,
    //translucent: true,
    drawBehind: true,
    visible: false, //only set to true on mainpage screens
    titleDisplayMode: 'alwaysShow',
    tabsAttachMode: 'onSwitchToTab',
    backgroundColor: colors.card,
  },
  statusBar: {
    backgroundColor: colors.statusbar,
    style: colors.statusbartext,
  },
  animations: {
    setRoot: {
      waitForRender: true,
      alpha: {
        from: 0,
        to: 1,
        duration: 0,
      },
    },
    push: {
      waitForRender: true,
      content: {
        alpha: {
          from: 0,
          to: 1,
          duration: 100,
        },
      },
    },
    showModal: {
      waitForRender: true,
      alpha: {
        from: 0,
        to: 1,
        duration: 100,
      },
    },
    /*dismissModal: {
          waitForRender: true,
          alpha: {
              from: 1,
              to: 0,
              duration: 100
          }
      }*/
  },
};

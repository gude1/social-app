export const AUTHROUTE = {
  root: {
    stack: {
      children: [
        {
          component: {
            name: 'Signup',
          },
        },
      ],
    },
  },
};

export const SETUPPROFILEROUTE = {
  root: {
    stack: {
      children: [
        {
          component: {
            name: 'EditProfile',
          },
        },
      ],
    },
  },
};
export const SETUPPOSTROUTE = {
  root: {
    stack: {
      children: [
        {
          component: {
            name: 'CreatePost',
          },
        },
      ],
    },
  },
};

export const MAINTABSROUTE = {
  root: {
    bottomTabs: {
      id: 'MAIN_BOTTOM_TABS_LAYOUT',
      children: [
        {
          stack: {
            children: [
              {
                component: {
                  id: 'POST_HOME_SCREEN',
                  name: 'Home',
                },
              },
            ],
          },
        },
        {
          stack: {
            children: [
              {
                component: {
                  id: 'MEETUP_SCREEN',
                  name: 'Meetup',
                },
              },
            ],
          },
        },
        {
          stack: {
            children: [
              {
                component: {
                  id: 'CHAT_SCREEN',
                  name: 'Chat',
                },
              },
            ],
          },
        },
        {
          stack: {
            children: [
              {
                component: {
                  id: 'VIEW_PROFILE_SCREEN',
                  name: 'ViewProfile',
                  passProps: {
                    tabcalled: true,
                  },
                },
              },
            ],
          },
        },
      ],
    },
  },
};

/*export const MAINTABSROUTE = {
    root: {
        stack: {
            children: [
                {
                    component: {
                        id: "POST_HOME_SCREEN",
                        name: 'Yo'
                    }
                },
            ]
        }
    }
};*/

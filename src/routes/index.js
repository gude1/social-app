export const AUTHROUTE = {
    root: {
        stack: {
            children: [
                {
                    component: {
                        name: 'Signup'
                    }
                }
            ]
        }
    }
};

export const SETUPPROFILEROUTE = {
    root: {
        stack: {
            children: [
                {
                    component: {
                        name: 'EditProfile'
                    }
                }
            ]
        }
    }
};
export const SETUPPOSTROUTE = {
    root: {
        stack: {
            children: [
                {
                    component: {
                        name: 'CreatePost'
                    }
                }
            ]
        }
    }
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
                                    id: "POST_HOME_SCREEN",
                                    name: 'Home'
                                }
                            },
                        ]
                    }
                },
                {
                    stack: {
                        children: [
                            {
                                component: {
                                    id: 'GIST_SCREEN',
                                    name: 'Gist'
                                }
                            }
                        ]
                    }
                },
                {
                    stack: {
                        children: [
                            {
                                component: {
                                    id: 'CHAT_SCREEN',
                                    name: 'Chat'
                                }
                            }
                        ]
                    }
                },
                {
                    stack: {
                        children: [

                            {
                                component: {
                                    id: 'PROFILE_SCREEN',
                                    name: 'Profile'
                                }
                            }
                        ]
                    }
                },
            ]
        }
    }
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
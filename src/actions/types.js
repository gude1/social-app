export const SET_ERRORS = 'set_errors';

/**
 * TYPE CONSTANT FOR AUTHREDUCER
 */
export const PROCESSING = 'processing';
export const SINGUP = 'signup';
export const LOGIN = 'login';
export const EMAIL_CHANGED = 'email_changed';
export const PASSWORD_CHANGED = 'password_changed';
export const NAME_CHANGED = 'name_changed';
export const PHONE_CHANGED = 'phone_changed';
export const USERNAME_CHANGED = 'username_changed';
export const SET_MSGS = 'set_msgs';
export const RESET = 'reset';

/**
 * TYPE CONSTANT FOR USERREDUCER
 */
export const SAVE_USER = 'save_user';
export const UPDATE_USER = 'update_user';

/**
 * TYPE CONSTANT FOR PROFILEFORM REDUCER
 */
export const UPDATE_USERNAME_CHANGED = 'update_username_changed';
export const UPDATE_BIO_CHANGED = 'update_bio_changed';
export const UPDATE_PROFILE_CHANGED = 'update_profile_changed';
export const UPDATE_CAMPUS_CHANGED = 'update_campus_changed';
export const UPDATE_PASSWORD_CHANGED = 'update_password_changed';
export const UPDATE_GENDER_CHANGED = 'update_gender_changed';
export const SET_UPDATE_PROFILE_ERRORS = 'set_update_profile_errors';
export const SET_IMAGE_TRY = 'set_image_try';

/**
 * TYPE CONSTANT FOR PROFILE REDUCER
 */
export const NEW_PROFILE_PIC = 'new_profile_pic';
export const SET_PROFILE_DATA = 'set_profile_data';

/**
 * TYPE CONSTANT FOR MAKEPOSTFORM REDUCER
 */
export const UPDATE_POST = 'update_post';
export const REMOVE_POST = 'remove_post';
export const UPDATE_POST_FORM_TEXT_CHANGED = 'update_post_text_changed';
export const UPDATE_POST_FORM_IMAGE_CHANGED = 'update_post_image_changed';

/**
 * TYPE CONSTANT FOR TIMELINEPOSTFORM REDUCER
 */
export const ADD_TIMELINE_POST_FORM = 'add_timeline_form_post';
export const UPDATE_TIMELINE_POST_FORM = 'update_timeline_form_post';
export const SET_TIMELINE_POST_FORM_LINKS = 'set_timeline_post_form_links';
export const SET_TIMELINE_POST_FORM = 'set_timeline_post_form';
export const TIMELINE_POST_FORM_REFRESH = 'timeline_post_refresh';
export const DELETE_TIMELINE_POST_FORM = 'delete_timeline_post_form';
export const REMOVE_PROFILE_TIMELINE_POST_FORM =
  'remove_profile_timeline_post_form';
export const PREPEND_TIMELINE_POST_FORM = 'prepend_timeline_form_post';
export const UPDATE_TIMELINE_POST_FORM_PROFILE_CHANGES =
  'update_timeline_post_form_profile_changes';
export const SET_TIMELINE_POST_FORM_PROFILE_CHANGES =
  'set_timeline_post_form_profile_changes';

/**
 * TYPE CONSTANT FOR POSTCOMMENTFORM REDUCER
 */
export const ADD_POST_COMMENT_FORM = 'add_post_comment_form';
export const UPDATE_POST_COMMENT_FORM = 'update_post_comment_form';
export const UPDATE_POST_COMMENT_ARRAY_FORM = 'update_post_comment_array_form';
export const SET_POST_COMMENT_FORM_OWNER_POST =
  'set_post_comment_form_owner_post';
export const UPDATE_POST_COMMENT_FORM_OWNER_POST =
  'update_post_comment_form_owner_post';
export const SET_POST_COMMENT_FORM = 'set_post_comment_form';
export const POST_COMMENT_FORM_REFRESH = 'post_comment_form_refresh';
export const POST_COMMENT_FORM_DELETE = 'post_comment_form_delete';
export const SET_POST_COMMENT_FORM_LINK = 'set_post_comment_form_link';
export const PREPEND_POST_COMMENT_FORM = 'prepend_post_comment_form';
export const REMOVE_POST_COMMENT_FORM = 'remove_post_comment_form';
export const UPDATE_POST_COMMENT_FORM_PROFILE_CHANGES =
  'update_post_comment_form_profile_changes';
export const UPDATE_PENDING_POST_COMMENT = 'update_pending_post_comment';
export const REMOVE_PENDING_POST_COMMENT = 'remove_pending_post_comment';

/**
 * TYPE CONSTANT FOR POSTCOMMENTREPLYFORM REDUCER
 */
export const ADD_POST_COMMENT_REPLY_FORM = 'add_post_comment_reply_form';
export const UPDATE_POST_COMMENT_REPLY_FORM = 'update_post_comment_reply_form';
export const POST_COMMENT_REPLY_FORM_REFRESH =
  'post_comment_reply_form_refresh';
export const SET_POST_COMMENT_REPLY_FORM_OWNER_COMMENT =
  'set_post_comment_reply_form_owner_comment';
export const UPDATE_POST_COMMENT_REPLY_FORM_OWNER_COMMENT =
  'update_post_comment_reply_form_owner_comment';
export const POST_COMMENT_REPLY_FORM_DELETE = 'post_comment_reply_form_delete';
export const SET_POST_COMMENT_REPLY_FORM = 'set_post_comment_reply_form';
export const SET_POST_COMMENT_REPLY_FORM_LINK =
  'set_post_comment_reply_form_link';
export const PREPEND_POST_COMMENT_REPLY_FORM =
  'prepend_post_comment_reply_form';
export const REMOVE_POST_COMMENT_REPLY_FORM = 'remove_post_comment_reply_form';
export const UPDATE_POST_COMMENT_REPLY_FORM_PROFILE_CHANGES =
  'update_post_comment_form_reply_profile_changes';
export const UPDATE_PENDING_POST_COMMENT_REPLY_FORM =
  'update_pending_post_comment_reply_form';
export const REMOVE_PENDING_POST_COMMENT_REPLY_FORM =
  'remove_pending_post_comment_reply_form';

/**
 * TYPE CONSTANT FOR LikesListReducer
 */
export const ADD_LIKES_LIST_FORM = 'add_likes_list_form';
export const PREPEND_LIKES_LIST_FORM = 'prepend_likes_list_form';
export const UPDATE_LIKES_LIST_FORM = 'update_likes_list_form';
export const SET_LIKES_LIST_FORM_LINK = 'set_likes_list_form_link';

/**
 * TYPE CONSTANT FOR SharesListReducer
 */
export const ADD_SHARES_LIST_FORM = 'add_shares_list_form';
export const PREPEND_SHARES_LIST_FORM = 'prepend_shares_list_form';
export const UPDATE_SHARES_LIST_FORM = 'update_shares_list_form';
export const SET_SHARES_LIST_FORM_LINK = 'set_shares_list_form_link';

/**
 * TYPE CONSTANT FOR POSTSETTING REDUCER
 */
export const UPDATE_POST_SETTINGS = 'update_post_settings';

/**
 * TYPE CONSTANT FOR USERVIEWPROFILEFORM REDUCER
 */
export const ADD_USER_VIEWPROFILEFORM_POSTS = 'add_user_viewprofileform_posts';
export const PREPEND_USER_VIEWPROFILEFORM_POSTS =
  'prepend_user_viewprofileform_posts';
export const UPDATE_USER_VIEWPROFILEFORM_POSTS =
  'update_user_viewprofileform_posts';
export const UPDATE_USER_VIEWPROFILEFORM_POSTS_ARRAY =
  'update_user_viewprofileform_posts_array';
export const SET_USER_VIEWPROFILEFORM_POSTS = 'set_user_viewprofileform_posts';
export const SET_USER_VIEWPROFILEFORM = 'set_user_viewprofileform';
export const SET_USER_VIEWPROFILEFORM_PROFILE_STATUS =
  'set_user_viewprofileform_profile_status';
export const SET_USER_VIEWPROFILEFORM_LINK = 'set_user_viewprofileform_link';

/**
 * TYPE CONSTANT FOR OTHERSVIEWPROFILEFORM REDUCER
 */
export const ADD_OTHERS_VIEWPROFILEFORM_POSTS =
  'add_others_viewprofileform_posts';
export const PREPEND_OTHERS_VIEWPROFILEFORM_POSTS =
  'prepend_others_viewprofileform_posts';
export const UPDATE_OTHERS_VIEWPROFILEFORM_POSTS =
  'update_others_viewprofileform_posts';
export const UPDATE_OTHERS_VIEWPROFILEFORM_POSTS_ARRAY =
  'update_others_viewprofileform_posts_array';
export const SET_OTHERS_VIEWPROFILEFORM_POSTS =
  'set_others_viewprofileform_posts';
export const SET_OTHERS_VIEWPROFILEFORM = 'set_others_viewprofileform';
export const SET_OTHERS_VIEWPROFILEFORM_PROFILE_STATUS =
  'set_others_viewprofileform_profile_status';
export const SET_OTHERS_VIEWPROFILEFORM_LINK =
  'set_others_viewprofileform_link';

/**
 * TYPE CONSTANT FOR SEARCHLIST REDUCER
 */
export const SET_PROFILES_LIST = 'set_profiles_list';
export const ADD_PROFILES_LIST = 'add_profiles_list';
export const UPDATE_PROFILES_LIST = 'update_profiles_list';
export const PREPEND_PROFILES_LIST = 'prepend_profiles_list';
export const SET_PROFILES_LIST_NEXT_URL = 'set_profiles_list_next_url';
export const SET_SEARCH_LIST = 'set_search_list';
export const ADD_SEARCH_LIST = 'add_search_list';
export const UPDATE_SEARCH_LIST = 'update_search_list';
export const PREPEND_SEARCH_LIST = 'prepend_search_list';
export const SET_SEARCH_LIST_NEXT_URL = 'set_search_list_next_url';
export const SET_PROFILES_LIST_RESET = 'set_profiles_list_reset';
export const SET_SEARCH_LIST_RESET = 'set_search_list_reset';

/**
 * TYPE CONSTANT FOR PRIVATECHATLIST REDUCER
 */
export const PREPEND_PRIVATECHATLIST = 'prepend_privatachatlist';
export const ADD_PRIVATECHATLIST = 'add_privatechatlist';
export const UPDATE_PRIVATECHATLIST = 'update_privatechatlist';
export const UPDATE_PRIVATECHATLIST_ARR = 'update_privatechatlist_arr';
export const SET_PRIVATE_CHAT_READ_STATUS = 'SET_PRIVATECHAT_READ_STATUS';
export const UPDATE_PRIVATECHATLIST_CHATS = 'update_privatechatlist_chats';
export const REMOVE_PRIVATECHATLIST_CHATS = 'remove_privatechatlist_chats';
export const UPDATE_ARRAY_PRIVATECHATLIST = 'update_array_privatechatlist';
export const ADD_PRIVATECHATLIST_TOSETREADARR =
  'add_privatechatlist_tosetreadarr';
export const REMOVE_PRIVATECHATLIST_TOSETREADARR =
  'remove_privatechatlist_tosetreadarr';
export const DELETE_PRIVATECHATLIST = 'delete_privatechatlist';
export const PIN_PRIVATECHATLIST = 'pin_privatechatlist';
export const UNPIN_PRIVATECHATLIST = 'unpin_privatechatlist';
export const ADD_PRIVATECHATLIST_EACH_CHAT_ARR =
  'add_privatechatlist_each_chat_arr';
export const SET_PRIVATE_CHATLIST_NEXTURL = 'set_private_chatlist_nexturl';

/**
 * TYPE CONSTANT FOR SEARCHPRIVATECHATLIST REDUCER
 */
export const UPDATE_SEARCH_PRIVATE_CHATLIST = 'update_search_private_chatlist';
export const SET_SEARCH_PRIVATE_CHATLIST_NEXTURL =
  'set_search_private_chatlist_nexturl';
export const SET_SEARCH_PRIVATE_CHATLIST_SEARCHWORD =
  'set_search_private_chatlist_searchword';

/**
 * TYPE CONSTANT FOR PRIVATECHAT REDUCER
 */
export const ADD_PRIVATECHAT = 'add_privatechat';
export const REMOVE_PRIVATECHAT = 'remove_privatechat';
export const SET_PRIVATECHATFORM = 'set_privatechatform';
export const SET_PRIVATECHAT_PARTNER_PROFILE =
  'set_privatechat_partner_profile';
export const SET_PRIVATE_CHAT_CREATE_CHATID = 'set_private_chat_create_chatid';
export const SET_PRIVATECHAT = 'set_privatechat';
export const SET_PRIVATECHAT_INFO = 'set_privatechat_info';
export const UPDATE_PRIVATECHATFORM_CHATS = 'update_privatechatform_chats';
export const SET_PRIVATECHAT_LAST_FETCH_ARR = 'set_privatechat_last_fetch_arr';
export const ADD_PRIVATECHAT_LAST_FETCH_ARR = 'add_privatechat_last_fetch_arr';
export const REMOVE_PRIVATECHAT_LAST_FETCH_ARR =
  'remove_privatechat_last_fetch_arr';

/**
 * TYPE CONSTANT FOR OFFLINEACTIONS REDUCER
 */
export const ADD_OFFLINE_ACTION = 'add_offline_action';
export const DELETE_OFFLINE_ACTION = 'delete_offline_action';
export const DELETE_OFFLINE_ACTIONS = 'delete_offline_actions';

/**
 * TYPE CONSTANT FOR FOLLOWINFO REDUCER
 */
export const ADD_FOLLOWINFO_LIST = 'add_followinfo_list';
export const UPDATE_FOLLOWINFO_LIST = 'update_followinfo_list';
export const ADD_FOLLOWINFO_URL = 'add_followinfo_url';

/**
 * TYPE CONSTANT FOR MEETUPFORM REDUCER
 */
export const UPDATE_MEETUP_FORM = 'update_meetup_form';
export const UPDATE_MEETUP_FORM_ERRORS = 'update_meetup_form_errors';

/**
 * TYPE CONSTANT FOR MEETUPMAIN REDUCER
 */
export const SET_MEETUPMAIN = 'set_meetupmain';
export const ADD_MEETUPMAIN_REQUESTS = 'add_meetupmain_requests';
export const UPDATE_MEETUPMAIN_REQUEST = 'update_meetupmain_request';
export const UPDATE_MEETUPMAIN_MY_REQUEST_ARR =
  'update_meetupmain_my_request_arr';
export const UPDATE_MEETUPMAIN_REQUEST_ARR = 'update_meetupmain_request_arr';
export const SET_MEETUPMAIN_URL = 'set_meetupmain_url';
export const ADD_MEETUPMAIN_MY_REQUESTS = 'add_meetupmain_myrequests';
export const UPDATE_MEETUPMAIN_MY_REQUESTS = 'update_meetupmain_myrequests';
export const SET_MEETUPMAIN_ERRORS = 'set_meetup_errors';
export const REMOVE_MEETUPMAIN_REQUESTS = 'remove_meetupmain_requests';
export const REMOVE_MEETUPMAIN_REQUESTS_ARR = 'remove_meetupmain_requests_arr';
export const REMOVE_MEETUPMAIN_MY_REQUESTS = 'remove_meetupmain_my_requests';
export const REMOVE_MEETUPMAIN_MY_REQUESTS_ARR =
  'remove_meetupmain_my_requests_arr';
export const REMOVE_PROFILE_MEETUPMAIN = 'remove_profile_meetupmain';

/**
 *TYPE CONSTANT FOR MEETUPCONVLIST REDUCER
 */
export const UPDATE_MEETCONVLIST = 'update_meetconvlist';
export const UPDATE_MEETCONVLIST_CONVS_ARR = 'update_meetconvlist_convs_arr';
export const REMOVE_MEETCONVLIST_CONVS = 'remove_meetconvlist_convs';
export const REMOVE_MEETCONVLIST = 'remove_meetconvlist';
export const SET_MEETCONVLIST = 'set_meetconvlist';

/***
 * TYPE CONSTANT FOR FCM
 */
export const SET_FCM_MEET_CONV_TO_DELIVERED = 'SET_FCM_MEET_CONV_TO_DELIVERED';
export const SET_FCM_MEET_CONV_TO_READ = 'SET_FCM_MEET_CONV_TO_READ';
export const ADD_FCM_MEET_CONV = 'ADD_FCM_MEET_CONV';

/***
 * TYPE CONSTANT FOR NOTIFICATION REDUCER
 */
export const UPDATE_NOTIFICATIONS = 'update_notifications';
export const SET_NOTIFICATIONS = 'set_notifications';
export const SET_MENTIONS = 'set_mentions';
export const UPDATE_MENTIONS = 'update_mentions';

/**
 * TYPE CONSTANT FOR GIPHYGALLERY REDUCER
 */
export const APPEND_GIPHY_GALLERY_RESULTS = 'append_giphy_gallery_results';
export const PREPEND_GIPHY_GALLERY_RESULTS = 'prepend_giphy_gallery_results';
export const SET_GIPHY_GALLERY = 'set_giphy_gallery';
export const UPDATE_GIPHY_GALLERY = 'update_giphy_gallery';

/**
 * TYPE CONSTANT FOR BOOKMARKS REDUCER
 */
export const BOOKMARK = 'bookmark';

/**
 * TYPE CONSTANT FOR PHOTOGALLERY REDUCER
 */
export const SET_GALLERY_PHOTOS = 'set_gallery_photos';
export const GET_GALLERY_PHOTOS = 'get_gallery_photos';
export const SET_SELECTED_LIST = 'set_selected_list';
export const UNSET_SELECTED_LIST = 'unset_selected_list';
export const SET_GALLERY_PHOTOS_NUM = 'set_gallery_photos_num';

/**
 * TYPE CONSTANT FOR APPINFO REDUCER
 */
export const SET_APP_INFO = 'set_app_info';

import {AndroidStyle} from '@notifee/react-native';
import {REMOVE_FCM_NOTES, UPDATE_FCM_NOTES} from '../actions/types';
import {isEmpty} from '../utilities';
import {sortAndDisplayNote} from '../utilities/notificationhandler';

const INITIAL_STATE = {
  lists: [],
};

const arrayReduce = data => {
  if (!Array.isArray(data) || data.length < 1) {
    return data;
  }
  data = [...data];
  if (data.length > 10) {
    for (i = data.length; i > 10; i--) {
      data.pop();
    }
    return data;
  }
  return data;
};

const arrangeNotes = (data = []) => {
  if (!Array.isArray(data) || data.length < 1) {
    return data;
  }
  data = [...data];
  return data.sort((item1, item2) => item2?.id - item1?.id);
};

const arrangeNoteList = (data = []) => {
  if (!Array.isArray(data) || data.length < 1) {
    return data;
  }
  data = [...data];
  data = data.map(notelistitem => {
    return {
      ...notelistitem,
      notes: arrayReduce(arrangeNotes(notelistitem.notes)),
    };
  });
  return data.sort((item1, item2) => item2?.notes[0]?.id - item1?.notes[0]?.id);
};

const showNotes = (data = [], names = []) => {
  if (!Array.isArray(data) || !Array.isArray(names) || names.length < 1) {
    return;
  }
  data
    .filter(notelistitem => names.includes(notelistitem?.name))
    .forEach(notelistitem => {
      sortAndDisplayNote({
        name: notelistitem?.name,
        id: notelistitem?.identity,
        data: {
          id: notelistitem?.identity,
          sender: JSON.stringify(notelistitem?.sender),
          name: notelistitem?.name,
        },
        android: {
          style: {
            type: AndroidStyle.MESSAGING,
            person: {
              name:
                notelistitem.name == 'PrivateChat'
                  ? notelistitem?.sender?.profile_name
                  : notelistitem?.sender?.meetup_name,
              icon:
                notelistitem.name == 'PrivateChat'
                  ? notelistitem?.sender?.avatar[1]
                  : notelistitem?.sender?.meetup_avatar,
            },
            messages: [...notelistitem.notes].reverse().map(noteitem => {
              return {text: noteitem?.body, timestamp: Date.now()};
            }),
          },
        },
      });
    });
};

const FcmNotificationReducer = (state = INITIAL_STATE, action) => {
  let reducerdata = null;
  try {
    switch (action.type) {
      case UPDATE_FCM_NOTES:
        let excluded_notelistitems = [];
        let to_show_chn = [];
        reducerdata = state.lists.map(notelistitem => {
          let foundnotelistitem = action.payload.find(
            newnotelistitem =>
              newnotelistitem?.identity == notelistitem?.identity,
          );
          if (foundnotelistitem) {
            excluded_notelistitems.push(foundnotelistitem?.identity);
            to_show_chn.push(foundnotelistitem?.name);
            let excluded_noteitems = [];
            let notes = notelistitem.notes.map(noteitem => {
              let foundnoteitem = foundnotelistitem.notes.find(
                newnoteitem => newnoteitem.note_id == noteitem.note_id,
              );
              if (foundnoteitem) {
                excluded_noteitems.push(foundnoteitem.note_id);
                return {...noteitem, ...foundnoteitem};
              } else {
                return noteitem;
              }
            });
            let to_add_notes = foundnotelistitem.notes.filter(
              noteitem => !excluded_noteitems.includes(noteitem.note_id),
            );
            notes = [...notes, ...to_add_notes];
            return {...notelistitem, ...foundnotelistitem, notes};
          } else {
            return notelistitem;
          }
        });

        let to_add_notelist = action.payload.filter(notelistitem => {
          if (!excluded_notelistitems.includes(notelistitem.identity)) {
            to_show_chn.push(notelistitem.name);
            return true;
          }
          return false;
        });
        //console.warn('reducer', to_add_notelist, action.payload);
        reducerdata = arrangeNoteList([...reducerdata, ...to_add_notelist]);
        action.shownote == true && showNotes(reducerdata, to_show_chn);
        return {...state, lists: reducerdata};
        break;
      case REMOVE_FCM_NOTES:
        reducerdata = state.lists.filter(
          notelistitem => !action.payload.includes(notelistitem.identity),
        );
        return {...state, lists: arrangeNoteList(reducerdata)};
        break;

      default:
        return state;
        break;
    }
  } catch (err) {
    console.warn('FcmNotificationReducer', String(err));
  }
};
export default FcmNotificationReducer;

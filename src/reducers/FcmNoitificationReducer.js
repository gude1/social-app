import {AndroidStyle} from '@notifee/react-native';
import {REMOVE_FCM_NOTES, RESET, UPDATE_FCM_NOTES} from '../actions/types';
import {isEmpty} from '../utilities';
import {sortAndDisplayNote} from '../utilities/notificationhandler';

const INITIAL_STATE = {
  list: [],
};

const arrayReduce = data => {
  if (!Array.isArray(data) || data.length < 1) {
    return data;
  }
  data = [...data];
  if (data.length > 10) {
    for (i = data.length; i > 5; i--) {
      data.pop();
    }
    return data;
  }
  return data;
};

const arrangeNotes = data => {
  if (!Array.isArray(data) || data.length < 1) {
    return data;
  }
  return data.sort((item1, item2) => item2?.id - item1?.id);
};

const arrangeNoteList = data => {
  if (!Array.isArray(data) || data.length < 1) {
    return data;
  }
  data = [...data].map(notelistitem => {
    return {
      ...notelistitem,
      notes: arrayReduce(arrangeNotes(notelistitem.notes)),
    };
  });
  return data.sort((notelistitem1, notelistitem2) => {
    return notelistitem2?.notes[0]?.id - notelistitem1?.notes[0]?.id;
  });
};

const showNotes = (data = [], names = []) => {
  if (!Array.isArray(data) || !Array.isArray(names)) {
    return [];
  }
  console.warn('showNotes');
  data
    .filter(notelistitem => names.includes(notelistitem?.name))
    .forEach(notelistitem => {
      sortAndDisplayNote({
        name: notelistitem?.name,
        id: notelistitem?.identity,
        android: {
          style: {
            type: AndroidStyle.MESSAGING,
            person: {
              name: notelistitem?.sender?.profile_name,
              icon: notelistitem?.sender?.avatar[1],
            },
            messages: notelistitem?.notes?.reverse()?.map(noteitem => {
              return {
                text: noteitem?.body,
                timestamp: Date.now(),
              };
            }),
          },
        },
      });
    });
};

const FcmNotificationReducer = (state = INITIAL_STATE, action) => {
  let reducerdata = [];
  try {
    switch (action.type) {
      case UPDATE_FCM_NOTES:
        let to_show_notes = [];
        let excluded_ids = [];
        reducerdata = state.list.map(notelistitem => {
          let foundnotelistitem = action.payload.find(
            newnotelistitem =>
              newnotelistitem.identity == notelistitem.identity,
          );
          if (foundnotelistitem) {
            excluded_ids.push(foundnotelistitem.identity);
            !to_show_notes.includes(foundnotelistitem.name) &&
              to_show_notes.push(foundnotelistitem.name);
            let excluded_note_ids = [];
            let notes = notelistitem.notes.map(noteitem => {
              let foundnoteitem = foundnotelistitem.notes.find(
                newnoteitem => noteitem.note_id == newnoteitem.note_id,
              );
              if (foundnoteitem) {
                excluded_note_ids.push(foundnoteitem.note_id);
                return {...noteitem, ...foundnoteitem};
              } else {
                return noteitem;
              }
            });

            let to_add_notes = foundnotelistitem.notes.filter(
              item => !excluded_note_ids.includes(item.note_id),
            );
            notes = [...notes, ...to_add_notes];
            return {...notelistitem, ...foundnotelistitem, notes};
          } else {
            return notelistitem;
          }
        });
        let to_add_notelists = action.payload.filter(notelistitem => {
          if (excluded_ids.includes(notelistitem.identity)) return false;
          else
            !to_show_notes.includes(notelistitem.name) &&
              to_show_notes.push(notelistitem.name);
          return true;
        });
        reducerdata = arrangeNoteList([...reducerdata, ...to_add_notelists]);
        showNotes(reducerdata, to_show_notes);
        return {...state, list: reducerdata};
        break;
      case REMOVE_FCM_NOTES:
        reducerdata = state.list.filter(
          notelistitem => notelistitem.identity != action.payload,
        );
        return {...state, list: arrangeNoteList(reducerdata)};
        break;
      case RESET:
        return action.payload.key == 'fcmnotereducer' ? INITIAL_STATE : state;
        break;
      default:
        return state;
    }
  } catch (error) {
    console.warn('FCMNotesReducer', String(error));
  }
};

export default FcmNotificationReducer;

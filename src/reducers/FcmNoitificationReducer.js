import {REMOVE_FCM_NOTES, RESET, UPDATE_FCM_NOTES} from '../actions/types';

const INITIAL_STATE = {
  list: [],
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

const FcmNotificationReducer = (state = INITIAL_STATE, action) => {
  let reducerdata = [];
  switch (action.type) {
    case UPDATE_FCM_NOTES:
      let excluded_ids = [];
      reducerdata = state.list.map(notelistitem => {
        let foundnotelistitem = action.payload.find(
          newnotelistitem => newnotelistitem.identity == notelistitem.identity,
        );
        if (foundnotelistitem) {
          excluded_ids.push(foundnotelistitem.identity);
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
      return {...state, list: arrangeNoteList(reducerdata)};
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
};

export default FcmNotificationReducer;

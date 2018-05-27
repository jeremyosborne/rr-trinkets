// Actions
//
// Add a new notification to the end of the notification queue.
const ENQUEUE = 'rrnotify/ENQUEUE';
// Pop a notification from the head of the queue.
const DEQUEUE = 'rrnotify/DEQUEUE';

export default function reducer (state = [], action = {}) {
  switch (action.type) {
    case ENQUEUE:
      return state.concat(action.payload)
    case DEQUEUE:
      state.shift()
      return [...state]
    default:
      return state;
  }
}

export function enqueue (payload) {
  return {
    type: ENQUEUE,
    payload,
  }
}

export function dequeue (payload) {
  return {type: DEQUEUE}
}

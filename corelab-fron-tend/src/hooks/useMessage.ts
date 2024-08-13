import bus from '../utils/bus';

export default function useMessage() {
  function setMessage(msg: string, type: string) {
    bus.emit('message', {
      message: msg,
      type: type,
    });
  }
  return { setMessage };
}

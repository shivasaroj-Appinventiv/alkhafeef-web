  export const attachDeviceID = () => {
    return Date.now() + Math.floor(Math.random() * 1000000) + 1;
  }
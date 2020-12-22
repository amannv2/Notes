addEventListener('message', ({ data }) => {
  const response = `worker response to ${data}`;
  // setInterval(() => {
  //   console.log('Here');
  //   postMessage(response);
  // }, 10000);
});

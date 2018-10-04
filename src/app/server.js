function server() {
  const express = require('express');
  const app = express();
  const port = process.env.PORT || 9595;

  return {
    route: (router) => {
      app.use('/', router);
    },

    start: () => {
      app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
    }
  }

}

module.exports = new server();

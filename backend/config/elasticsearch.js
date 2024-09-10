module.exports = {
  node: process.env.ELASTICSEARCH_HOST,
  auth: {
    username: process.env.ELASTICSEARCH_USER,
    password: process.env.ELASTICSEARCH_PASSWORD
  }
};

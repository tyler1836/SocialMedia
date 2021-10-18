const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

const { User, Thought, Reaction } = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes/index'))

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialmedia', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('useCreateIndex', true);
mongoose.set('debug', true)

app.listen(PORT, () => console.log(`Connected on ${PORT}`))
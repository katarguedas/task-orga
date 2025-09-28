const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  id: String,
  name: String,
  status: String,
  progress: Number,
});

const topicSchema = new Schema({
  id: String,
  name: String,
  tasks: [taskSchema],
  isCompleted: Boolean,
});

const dataSchema = new Schema({
  id: String,
  userId: String,
  topics: [topicSchema],
});

const Task = mongoose.model('Task', taskSchema);
const Topic = mongoose.model('Topic', topicSchema);
const Data = mongoose.model('Data', dataSchema);

module.exports = { Topic, Data, Task };

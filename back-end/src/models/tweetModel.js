import mongoose from 'mongoose';

const tweetSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  date: String,
});

const TweetModel = mongoose.model('tweet', tweetSchema);

export default TweetModel;

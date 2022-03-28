import TweetModel from '../models/tweetModel.js';

class Controller {
  async index(req, res) {
    const { all } = req.query;

    // using populate to include user reference informations
    // second parameter of populate is selected field, by doing -password, I'm excluding it.
    if (all === 'true') {
      const tweets = await TweetModel.find()
        .populate('user', '-password')
        .sort({ _id: -1 })
        .lean();

      return res.json({ tweets });
    }
    // using populate to include user reference informations
    // sorting by id, descending order based on the date of insertion
    // doc: https://mongoosejs.com/docs/populate.html
    const tweets = await TweetModel.find({ user: req.loggedUser._id })
      .populate('user', '-password')
      .sort({ _id: -1 })
      .lean();

    res.json({ tweets });
  }

  async getOne(req, res) {
    const id = req.params.id;

    try {
      const tweet = await TweetModel.findById(id);
      if (tweet) return res.json({ tweet });

      res.status(404).json({ message: 'Tweet not found' });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Unexpected error' });
    }
  }
  async store(req, res) {
    const { text, date } = req.body;
    const user = req.loggedUser;

    try {
      const tweetFind = await TweetModel.create({
        text,
        user: user._id,
        date,
      });

      // since it's just one, getting name o the user without populated
      // i'm doing all of this, because before of this code, it was being returned from api,
      // an object in this way

      /* 
        $__: {activePaths: {…}, strictMode: true, _id: '624207690c8d2c64ca7e590c', op: null, validating: null, …}
        $isNew: false
        name: "Anne Livia"
        _doc: {text: 'ewewewew', user: '6240d344fa02abc0c31b6c8a', date: '28/03/2022 16:07:20', _id: '624207690c8d2c64ca7e590c', __v: 0}
        [[Prototype]]: Object

      */

      // and this was generating an error in react, where the id of the object was undefined and it wasnot loaded on map
      // and it could not being removed.
      const tweet = {
        _id: tweetFind.id,
        text: tweetFind.text,
        user: tweetFind.user,
        date: tweetFind.date,
        name: user.name,
        email: user.email,
      };

      res.json({ tweet });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Unexpected error' });
    }
  }

  async delete(req, res) {
    const id = req.params.id;
    try {
      const tweet = await TweetModel.findById(id);

      if (!tweet.user.equals(req.loggedUser._id)) {
        return res
          .status(403)
          .json({ message: 'You are not allowed to remove this tweet' });
      }

      if (!tweet) {
        return res.status(404).json({ message: 'tweet not found' });
      }

      await tweet.remove();

      res.json({ message: 'deleted succesfully' });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Unexpected error' });
    }
  }
}

export default Controller;

const Post = require('../models/post');
const User = require('../models/user');
const slugify = require('slugify');

exports.create = (req, res) => {
    // console.log(req.body);
    const { title, content, user, email } = req.body;
    const slug = slugify(title);
    // validate
    switch (true) {
        case !title:
            return res.status(400).json({ error: 'Title is required' });
            break;
        case !content:
            return res.status(400).json({ error: 'Content is required' });
            break;
    }
    // create post
    Post.create({ title, content, user, slug, email }, (err, post) => {
        if (err) {
            console.log(err);
            res.status(400).json({ error: 'Duplicate post. Try another title' });
        }
        res.json(post);
    });
};

exports.list = (req, res ) => {
    const { email } = req.params;
    Post.find({email : email})
        .limit(10)
        .sort({ createdAt: -1 })
        .exec((err, posts) => {
            if (err) console.log(err);
            res.json(posts);
        });
};

exports.read = (req, res) => {
    // console.log(req.pramas.slug)
    const { slug } = req.params;
    Post.findOne({ slug }).exec((err, post) => {
        if (err) console.log(err);
        res.json(post);
    });
};

exports.update = (req, res) => {
    const { slug } = req.params;
    const { title, content, user } = req.body;
    Post.findOneAndUpdate({ slug }, { title, content, user }, { new: true }).exec((err, post) => {
        if (err) console.log(err);
        res.json(post);
    });
};

exports.remove = (req, res) => {
    // console.log(req.pramas.slug)
    const { slug } = req.params;
    Post.findOneAndRemove({ slug }).exec((err, post) => {
        if (err) console.log(err);
        res.json({
            message: 'Post deleted'
        });
    });
};
{/*const { slug , _id } = req.params;
Post.findOne({_id:req.params.postId})
.populate("slug","_id")
.exec((err,post) => {
    if(err || !post){
        return res.status(422).json({error:err})
    }
    if(post._id.toString() === req._id.toString()){
        post.remove()
        .then(result => {
            res.json({message:"successfully deleted"})
        }).catch(err=> {
            consle.log(err)
        })
    }
})*/}





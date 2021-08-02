const Post = require('../models/post');
const slugify = require('slugify');


exports.create = (req, res) => {
    // console.log(req.body);

    const {title, content, user} = req.body
    const slug = slugify(title)

    // validate
    // if(!title || !content) {
    //     return res.status(400).json({
    //         error: 'Title and Content is required'
    //     });
    // }

    switch(true) {
        case !title:
            return res.status(400).json({
                error: 'Title is required'
            });
        case !content:
            return res.status(400).json({
                error: 'Content is required'
            });
            break;
    }

    Post.create({title, content, user, slug}, (err, post) => {
        if(err) {
            console.log(err)
            res.status(400).json({
                error: 'Duplicate post. Try another title'
            })
        }
        res.json(post);
    })

    // Local Message
    // res.json({
    //     message: 'See your server console'
    // });
};

const AvatarService = require('../avatar/avatar-service');

const CommentService = {
    async getCommentsForPost(db, post_id) {
        try {
            const comments = await db
                .from('init_comments')
                .select('id', 'text', 'user_id', 'date_created')
                .where({ post_id })
                .orderBy('date_created', 'desc')

            const fullComments = await Promise.all(
                comments.map(async c => {
                    try {
                        const [user] = await db
                            .select('username')
                            .from('user_information')
                            .where({ id: c.user_id })

                        return {
                            username: user.username,
                            id: c.id,
                            text: c.text,
                            user_id: c.user_id,
                            date_created: c.date_created
                        }

                    }

                    catch (error) {
                        return console.log(error)
                    }
                }))

            return fullComments;

        }
        catch (error) {
            return console.log(error)
        }

    },
    insertComment(db, user_id, post_id, text) {
        return db
            .insert({ post_id, user_id, text })
            .into('init_comments')
            .catch(err => console.log(err))
    }






}


module.exports = CommentService;
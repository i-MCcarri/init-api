CREATE TABLE init_comments (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    text TEXT NOT NULL,
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL,
    post_id INTEGER
        REFERENCES init_posts(id) ON DELETE CASCADE NOT NULL,
    user_id INTEGER
        REFERENCES user_information(id) ON DELETE CASCADE NOT NULL,
    unread BOOLEAN DEFAULT true NOT NULL
);

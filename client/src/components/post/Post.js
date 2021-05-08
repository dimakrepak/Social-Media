import './post.css'
import { useEffect, useState } from 'react';
import { DeleteOutline, ThumbUp } from "@material-ui/icons"
import { format } from "timeago.js"
import { Link } from "react-router-dom"
import axios from 'axios'

export default function Post({ post }) {
    const [user, setUser] = useState({})

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`/api/user?id=${post.owner}`);
            console.log(res.data);
            setUser(res.data)
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchUsers();
    }, [post.owner])
    return (
        <div className="post">
            <div className="post-wrapper">
                <div className="post__top">
                    <div className="post__top-left">
                        <Link className="router-link" to={`profile/${user._id}`}>
                            <img className="post-profile-picture"
                                src={user.profilePicture || '/assets/profile/noavatar.png'}
                                alt=''
                            />
                        </Link>
                        <span className="post-username">{post.username}</span>
                        <span className="post-date">{format(post.createdAt)}</span>
                    </div>
                    <div className="post__top-right">
                        <DeleteOutline className="post-icon" />
                    </div>
                </div>
                <div className="post__center">
                    <span className="post-text">{post.body}</span>
                    <img className="post-image"
                        src={"assets/post.jpg"}
                        alt=""
                    />
                </div>
                <div className="post__bottom">
                    <div className="post__bottom-left">
                        <ThumbUp style={{ fill: '#068bff' }} className="post-icon" />
                        <span className="post-like-counter">{post.likes.length} likes</span>
                    </div>
                    <div className="post__bottom-right">
                        <span className="post-comment-text">{post.comments.length} Comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
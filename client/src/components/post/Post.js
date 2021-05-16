import './post.css';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { DeleteOutline, ThumbUp } from "@material-ui/icons";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function Post({ post }) {
    const { currentUser } = useContext(AuthContext);
    const [user, setUser] = useState({});
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(post.likes.length)
    // const [currentPost, setCurrentPost] = useState(post)

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`/api/user?id=${post.owner}`);
            setUser(res.data)
        } catch (err) {
            console.log(err);
        }
    }
    // const fetchPost = async () => {
    //     try {
    //         const res = await axios.get(`/api/post/${post._id}`);
    //         setCurrentPost(res.data);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }
    useEffect(() => {
        fetchUsers();
    }, [post.owner])

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser.user._id))
    }, [post.likes, currentUser._id])

    const handleLikeClick = async () => {
        setLikes(isLiked ? likes - 1 : likes + 1);
        setIsLiked(!isLiked);
        try {
            await axios.put(`/api/posts/${post._id}/like`, {}, {
                headers: {
                    'Auth': `Bearer ${currentUser.token}`
                }
            })
            console.log(`${post._id} liked`);
        } catch (err) {
            console.log(err)
        }
    }
    const handleDeletePostClick = async () => {
        try {
            await axios.delete(`/api/posts/${post._id}/delete`, {
                headers: {
                    'Auth': `Bearer ${currentUser.token}`
                }
            })
            console.log(`${post._id} deleted`);
            window.location.reload()
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="post">
            <div className="post-wrapper">
                <div className="post__top">
                    <div className="post__top-left">
                        <Link className="router-link" to={currentUser.user._id === post.owner ? `/profile/me` : `/profile/${post.owner}`}>
                            <img className="post-profile-picture"
                                src={user.profilePicture || 'https://i.pinimg.com/originals/fc/04/73/fc047347b17f7df7ff288d78c8c281cf.png'}
                                alt=''
                            />
                        </Link>
                        <Link className="router-link" to={currentUser.user._id === post.owner ? `/profile/me` : `/profile/${post.owner}`}>
                            <span className={`post-username ${currentUser.user._id === post.owner && 'post-username_user'}`}>{post.username}</span>
                        </Link>
                        <span className="post-date">{format(post.createdAt)}</span>
                    </div>
                    <div className="post__top-right">
                        {currentUser.user._id === post.owner ?
                            <DeleteOutline className="post-icon" onClick={handleDeletePostClick} />
                            :
                            ''
                        }
                    </div>
                </div>
                <div className="post__center">
                    <span className="post-text">{post.body}</span>
                    {post.img &&
                        <div className="post__center-container">
                            <img className="post-image"
                                src={post.img}
                                alt=""
                            />
                        </div>
                    }
                </div>
                <div className="post__bottom">
                    <div className="post__bottom-left">
                        <ThumbUp style={{ fill: '#068bff' }} className="post-icon" onClick={handleLikeClick} />
                        <span className="post-like-counter"> {isLiked ? `You and ${likes - 1} others` : likes} </span>
                    </div>
                    <div className="post__bottom-right">
                        <span className="post-comment-text">{post.comments.length} Comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
import { useEffect, useState, useContext } from 'react';
import { CircularProgress } from '@material-ui/core';
import { AuthContext } from '../../context/AuthContext';
import Post from '../post/Post';
import Share from '../share/Share';
import './feed.css';
import axios from 'axios'

export default function Feed({ id }) {
    const [posts, setPosts] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const res = !id ? await axios.get(`/api/posts/timeline/me`, {
                headers: {
                    'Auth': `Bearer ${currentUser.token}`
                }
            })
                : id === 'me' ?
                    await axios.get(`/api/posts/${id}`, {
                        headers: {
                            'Auth': `Bearer ${currentUser.token}`
                        }
                    })
                    :
                    await axios.get(`/api/posts/user/${id}`);
            console.log(res.data);
            setLoading(false);
            setPosts(res.data)
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchPosts();
    }, [id, currentUser])
    return (
        <div className="feed-container">
            {(id === currentUser.user._id || id === 'me' || !id) &&
                < Share />
            }
            {loading ?
                <CircularProgress />
                : posts.length === 0 ?
                    <span className="empty-feed">No Posts Yet</span>
                    :
                    posts.map((p) => {
                        return (
                            <Post
                                key={p._id}
                                post={p}
                            />
                        )
                    })
            }
        </div>
    )
}

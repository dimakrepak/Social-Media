import { useEffect, useState } from 'react';
import Post from '../post/Post';
import Share from '../share/Share';
import './feed.css';
import axios from 'axios'

export default function Feed() {
    const [posts, setPosts] = useState([])

    const fetchPosts = async () => {
        try {
            const res = await axios.get(`/api/posts/timeline/all`, {
                headers: {
                    'Auth': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDkwMzkxMWQ5NzQ0YWQxM2M1NTEwZTciLCJpYXQiOjE2MjAwNjQ1Mjl9.foE4UJf9wfNlTrUpRrkX8erczdyxygHj4dJ2u7ifca4`
                }
            });
            console.log(res.data);
            setPosts(res.data)
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchPosts();
    }, [])
    return (
        <div className="feed-container">
            <Share />
            {posts.map((p) => {
                return (
                    <Post
                        key={p._id}
                        post={p}
                    />
                )
            })}
        </div>
    )
}

import Feed from '../../components/feed/Feed';
import './profile.css';
import { useEffect, useState } from 'react';
import { useParams } from "react-router";

export default function Profile() {
    const [user, setUser] = useState({});
    const id = useParams().id;
    console.log(id);
    return (
        <div>
            {console.log('id', id)}
            <Feed id={id} />
        </div>
    )
}

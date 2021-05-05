import './home.css'
import Feed from "../../components/feed/Feed";
import Leftbar from "../../components/leftbar/Leftbar";
import Navbar from "../../components/navbar/Navbar";
import Rightbar from "../../components/rightbar/Rightbar";

export default function Home() {

    return (
        <>
            <Navbar />
            <div className="home-container">
                <Leftbar />
                <Feed />
                <Rightbar />
            </div>
        </>
    )
}

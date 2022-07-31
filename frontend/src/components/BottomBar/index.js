import React from "react";
import { Link } from 'react-router-dom'
export default function BottomBar() {
    return (
        <div className="bottom-bar">
            Create your own group.
            <button className="button" id="get-started-btn"><Link to='/groups/start'>Get Started</Link></button>
        </div>
    )
}
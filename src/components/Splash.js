import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';

function Splash() {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");

    const handleChange = e => {
        setSearchValue(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        navigate("/lobby", {state:{playername: searchValue}});
    }


    return (
        <div className="fullPageWrapper">
            <div className="flexContainer">
                <form type="submit" onSubmit={handleSubmit}>
                    <input
                        className="playerSearch"
                        value={searchValue}
                        onChange={handleChange}
                        type="text"
                        name="player"
                        id="player"
                        placeholder="Enter FACEIT username..."
                    />
                    <button><CiSearch />SEARCH</button>
                </form>
            </div>
            <div className="splashText">
                <h1>The easy way to gain Elo</h1>
                <p>Stay one step ahead of your opponents, find the most profitable map and gain extended stats of the teams.
                Just start a FACEIT match, search for your username and enjoy your increased WIN chance.</p>
            </div>
        </div>
    );
}

export default Splash;

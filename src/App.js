import './App.scss';
import { useEffect, useState } from "react";
import matchesData from "./matchData.json";
import defaultImg from "./img/default.jpg";

function App() {
    const [searchValue, setSearchValue] = useState("");
    const [matchData, setMatchData] = useState(matchesData);

    let mapsAvgWeightFaction1 = {};

    let mapsAvgWeightFaction2 = {};

    let fullElo = {
        faction1: 0,
        faction2: 0
    }

    let left;

    matchData.faction1.map(obj => {
            fullElo.faction1 += parseFloat(obj.elo);
    })

    matchData.faction2.map(obj => {
            fullElo.faction2 += parseFloat(obj.elo);
    })

    matchData.voteable_maps.map(label => {
        matchData.faction1.map(obj => {
            obj.maps.map(map => {
                if (!(label in mapsAvgWeightFaction1)) {
                    if (map.map === label) {
                        mapsAvgWeightFaction1[label] = {};
                        mapsAvgWeightFaction1[label]["weight"] = [map.weight * (obj.elo / fullElo.faction1 + 1)];
                        mapsAvgWeightFaction1[label]["games"] = 1;
                    }
                } else {
                    if (map.map === label) {
                        mapsAvgWeightFaction1[label]["weight"].push(map.weight * (obj.elo / fullElo.faction1 + 1));
                        mapsAvgWeightFaction1[label]["games"] += 1;
                    }
                }
            })
        })
    })

    matchData.voteable_maps.map(label => {
        matchData.faction2.map(obj => {
            obj.maps.map(map => {
                if (!(label in mapsAvgWeightFaction2)) {
                    if (map.map === label) {
                        mapsAvgWeightFaction2[label] = {};
                        mapsAvgWeightFaction2[label]["weight"] = [map.weight * (obj.elo / fullElo.faction1 + 1)];
                        mapsAvgWeightFaction2[label]["games"] = 1;
                    }
                } else {
                    if (map.map === label) {
                        mapsAvgWeightFaction2[label]["weight"].push(map.weight * (obj.elo / fullElo.faction1 + 1));
                        mapsAvgWeightFaction2[label]["games"] += 1;
                    }
                }
            })
        })
    })

    matchData.voteable_maps.map(label => {
        if (label in mapsAvgWeightFaction1) {
            let avgWeight = mapsAvgWeightFaction1[label].weight.reduce((a, b) => a+b) / mapsAvgWeightFaction1[label].games;
            mapsAvgWeightFaction1[label].weight = avgWeight
        }
    })

    matchData.voteable_maps.map(label => {
        if (label in mapsAvgWeightFaction2) {
            let avgWeight = mapsAvgWeightFaction2[label].weight.reduce((a, b) => a+b) / mapsAvgWeightFaction2[label].games;
            mapsAvgWeightFaction2[label].weight = avgWeight
        }
    })

    let mapDiff = {}

    matchData.voteable_maps.map(label => {
        mapDiff[label] = mapsAvgWeightFaction1[label].weight - mapsAvgWeightFaction2[label].weight;
    })

    const handleChange = e => {
        setSearchValue(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://127.0.0.1:8000/get_stats_for_game/" + searchValue, {
            method: "GET",
        })

        const data = await response.json();
        console.log(data);
        setMatchData(data);
    }

    const getLevel = (elo) => {
        if (elo < 801) {
            return 1;
        } else if (elo < 951) {
            return 2;
        } else if (elo < 1101) {
            return 3;
        } else if (elo < 1251) {
            return 4;
        } else if (elo < 1401) {
            return 5;
        } else if (elo < 1551) {
            return 6;
        } else if (elo < 1701) {
            return 7;
        } else if (elo < 1851) {
            return 8;
        } else if (elo < 2000) {
            return 9;
        } else if (elo > 2000 ) {
            return 10;
        }
    }

    return (
        <div className="fullPageWrapper">
            <div className="gameInfoWrapper">
                <div className="panel teamOne">
                    <p id="teamName">team_{matchData.faction1[0].nickname}</p>
                    <div className="playerCards">
                        {matchData.faction1.map(obj => {
                            return <div className="playerCard">
                                <div className="playerNameElo">
                                    <div className="avatarName">
                                        <img src={obj.avatar === "default" ? defaultImg : obj.avatar}></img>
                                        <span>{obj.nickname}</span>
                                    </div>
                                    <div className="eloPicture">
                                        <span>{obj.elo}</span>
                                        <img src={`https://cdn-frontend.faceit.com/web/960/src/app/assets/images-compress/skill-icons/skill_level_${getLevel(obj.elo)}_svg.svg`}></img>
                                    </div>
                                </div>
                                <hr></hr>
                                <div className="stat">
                                    <div className="singleStat">
                                        <p>{Math.round((obj.elo / fullElo.faction2) * 100)}%</p>
                                        <p>Elo weight</p>
                                    </div>
                                    <div className="singleStat">
                                        <p>{Math.round(obj.winrate * 100)}%</p>
                                        <p>Win rate</p>
                                    </div>
                                    <div className="singleStat">
                                        <p>{Math.round(obj.avg_kills)} / {Math.round(obj.avg_hs * 100)}%</p>
                                        <p>Avg / HS</p>
                                    </div>
                                    <div className="singleStat">
                                        <p>{Math.round(obj.kd * 100) / 100} / {Math.round(obj.kr * 100) / 100}</p>
                                        <p>KD / KR</p>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
                <div className="mapPanel">
                    <div className="mapCard">
                        {matchData.voteable_maps.map(label => {
                            return <div className="mapSection">
                                <p>{label}</p>
                                <div className="winPercentage">
                                    <span>{50 + Math.round(mapDiff[label] * 100)}%</span>
                                    <div className="bar">
                                        <div style={{"width": Math.abs(mapDiff[label] * 100) + "%", "left": 50 - (Math.sign(mapDiff[label]) === 1 ? mapDiff[label] * 100 : 0) + "%"}} className="middleBar">
                                        </div>
                                    </div>
                                    <span>{50 - Math.round(mapDiff[label] * 100)}%</span>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
                <div className="panel teamTwo">
                    <p id="teamName">team_{matchData.faction2[0].nickname}</p>
                    <div className="playerCards">
                        {matchData.faction2.map(obj => {
                            return <div className="playerCard">
                                <div className="playerNameElo">
                                    <div className="avatarName">
                                        <img src={obj.avatar === "default" ? defaultImg : obj.avatar}></img>
                                        <span>{obj.nickname}</span>
                                    </div>
                                    <div className="eloPicture">
                                        <span>{obj.elo}</span>
                                        <img src={`https://cdn-frontend.faceit.com/web/960/src/app/assets/images-compress/skill-icons/skill_level_${getLevel(obj.elo)}_svg.svg`}></img>
                                    </div>
                                </div>
                                <hr></hr>
                                <div className="stat">
                                    <div className="singleStat">
                                        <p>{Math.round((obj.elo / fullElo.faction2) * 100)}%</p>
                                        <p>Elo weight</p>
                                    </div>
                                    <div className="singleStat">
                                        <p>{Math.round(obj.winrate * 100)}%</p>
                                        <p>Win rate</p>
                                    </div>
                                    <div className="singleStat">
                                        <p>{Math.round(obj.avg_kills)} / {Math.round(obj.avg_hs * 100)}%</p>
                                        <p>Avg / HS</p>
                                    </div>
                                    <div className="singleStat">
                                        <p>{Math.round(obj.kd * 100) / 100} / {Math.round(obj.kr * 100) / 100}</p>
                                        <p>KD / KR</p>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

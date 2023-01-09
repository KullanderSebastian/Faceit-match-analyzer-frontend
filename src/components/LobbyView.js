import '.././App.scss';
import ".././skeleton.scss";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SkeletonLobby from "./SkeletonLobby";
import PlayerCard from "./PlayerCard";
import matchesData from ".././matchData.json";

function LobbyView() {
    const location = useLocation();
    const [matchData, setMatchData] = useState();
    const [dataIsLoaded, isLoaded] = useState(false);

    let mapsAvgWeightFaction1 = {};

    let mapsAvgWeightFaction2 = {};

    let fullElo = {
        faction1: 0,
        faction2: 0
    }

    let left;

    let mapDiff = {};

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://127.0.0.1:8000/get_stats_for_game/" + location.state.playername, {
                method: "GET",
            });

            const data = await response.json();
            setMatchData(data);
            isLoaded(true);
        }

        fetchData();
    }, []);

    if (!dataIsLoaded) {
        return (
            <SkeletonLobby />
        );
    } else {
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

                matchData.voteable_maps.map(label => {
                    console.log(label);
                    mapDiff[label] = mapsAvgWeightFaction1[label].weight - mapsAvgWeightFaction2[label].weight;
                })
    }

    return (
        <div className="fullPageWrapperLobby">
            <div className="gameInfoWrapper">
                <div className="panel teamOne">
                    <p id="teamName">team_{matchData.faction1[0].nickname}</p>
                    <div className="playerCards">
                        {matchData.faction1.map(obj => {
                            return <PlayerCard
                                        avatar={obj.avatar}
                                        nickname={obj.nickname}
                                        elo={obj.elo}
                                        winrate={obj.winrate}
                                        avg_kills={obj.avg_kills}
                                        avg_hs={obj.avg_hs}
                                        kd={obj.kd}
                                        kr={obj.kr}
                                        fullElo = {fullElo.faction1}
                                    />;
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
                            return <PlayerCard
                                        avatar={obj.avatar}
                                        nickname={obj.nickname}
                                        elo={obj.elo}
                                        winrate={obj.winrate}
                                        avg_kills={obj.avg_kills}
                                        avg_hs={obj.avg_hs}
                                        kd={obj.kd}
                                        kr={obj.kr}
                                        fullElo = {fullElo.faction2}
                                    />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LobbyView;

import defaultImg from ".././img/default.jpg";

function PlayerCard(props) {
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
        <div className="playerCard">
            <div className="playerNameElo">
                <div className="avatarName">
                    <img src={props.avatar === "default" ? defaultImg : props.avatar}></img>
                    <span>{props.nickname}</span>
                </div>
                <div className="eloPicture">
                    <span>{props.elo}</span>
                    <img src={`https://cdn-frontend.faceit.com/web/960/src/app/assets/images-compress/skill-icons/skill_level_${getLevel(props.elo)}_svg.svg`}></img>
                </div>
            </div>
            <hr></hr>
            <div className="stat">
                <div className="singleStat">
                    <p>{Math.round((props.elo / props.fullElo) * 100)}%</p>
                    <p>Elo weight</p>
                </div>
                <div className="singleStat">
                    <p>{Math.round(props.winrate * 100)}%</p>
                    <p>Win rate</p>
                </div>
                <div className="singleStat">
                    <p>{Math.round(props.avg_kills)} / {Math.round(props.avg_hs * 100)}%</p>
                    <p>Avg / HS</p>
                </div>
                <div className="singleStat">
                    <p>{Math.round(props.kd * 100) / 100} / {Math.round(props.kr * 100) / 100}</p>
                    <p>KD / KR</p>
                </div>
            </div>
        </div>
    );
}

export default PlayerCard;

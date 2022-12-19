import { Skeleton } from '@mui/material';

function SkeletonLobby() {
    return (
        <div className="fullPageWrapperLobby">
            <div className="gameInfoWrapper">
                <div className="panel teamOne">
                    <div className="skeleTeamName"><Skeleton variant="rectangular" animation="wave" /></div>
                    <div className="playerCards">
                        <div className="skelePlayerCard"><Skeleton variant="rectangular" animation="wave" /></div>
                        <div className="skelePlayerCard"><Skeleton variant="rectangular" animation="wave" /></div>
                        <div className="skelePlayerCard"><Skeleton variant="rectangular" animation="wave" /></div>
                        <div className="skelePlayerCard"><Skeleton variant="rectangular" animation="wave" /></div>
                        <div className="skelePlayerCard"><Skeleton variant="rectangular" animation="wave" /></div>
                    </div>
                </div>
                <div className="mapPanel">
                    <div className="mapCard">
                            <div className="skeleMapCard"><Skeleton variant="rectangular" animation="wave" /></div>
                            <div className="skeleMapCard"><Skeleton variant="rectangular" animation="wave" /></div>
                            <div className="skeleMapCard"><Skeleton variant="rectangular" animation="wave" /></div>
                            <div className="skeleMapCard"><Skeleton variant="rectangular" animation="wave" /></div>
                            <div className="skeleMapCard"><Skeleton variant="rectangular" animation="wave" /></div>
                    </div>
                </div>
                <div className="panel teamTwo">
                <div className="skeleTeamName"><Skeleton variant="rectangular" /></div>
                <div className="playerCards">
                    <div className="skelePlayerCard"><Skeleton variant="rectangular" animation="wave" /></div>
                    <div className="skelePlayerCard"><Skeleton variant="rectangular" animation="wave" /></div>
                    <div className="skelePlayerCard"><Skeleton variant="rectangular" animation="wave" /></div>
                    <div className="skelePlayerCard"><Skeleton variant="rectangular" animation="wave" /></div>
                    <div className="skelePlayerCard"><Skeleton variant="rectangular" animation="wave" /></div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default SkeletonLobby;

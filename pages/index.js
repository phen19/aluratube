import React from "react"
import config from "../config.json"
import styled from "styled-components"
import Menu from "../src/components/Menu"
import { StyledTimeline } from "../src/components/Timeline"
import { videoService } from "../src/components/services/videoService"


function HomePage() {
    const service = videoService
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");
    const [playlists, setPlaylists] = React.useState({jogos : []});

    React.useEffect(() => {
            service
                .then((dados) => {
                    console.log(dados.data);
                    // Forma imutavel
                    const novasPlaylists = {};
                    dados.data.forEach((video) => {
                        if (!novasPlaylists[video.playlist]) novasPlaylists[video.playlist] = [];
                        novasPlaylists[video.playlist] = [
                            video,
                            ...novasPlaylists[video.playlist],
                        ];
                    });
    
                    setPlaylists(novasPlaylists);
                });
        }, []);

    console.log(playlists)
    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                // backgroundColor: "red",
            }}>
                {/* Prop Drilling */}
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro}/>
                <Header />
                <Timeline searchValue={valorDoFiltro} playlists={playlists} />
            </div>
        </>
    )
}

export default HomePage


const StyledHeader = styled.div`
background-color: ${({theme})=> theme.backgroundLevel1};
img{
    width:80px;
    height:88px;
    border-radius: 50%;
}
.user-info{
    display: flex;
    align-items:center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
    margin-top: 50px;
}
`

const StyledBanner = styled.div`
    background-color: blue;
    background-image: url(${({ bg }) => bg});
    /* background-image: url(${config.bg}); */
    height: 230px;
`;

function Header() {
    return (
        <StyledHeader>
            <StyledBanner bg={config.bg} />
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timeline({searchValue, ...props}) {
    const playlistsNames = Object.keys(props.playlists);

    return (
        <StyledTimeline>
            {playlistsNames.map((playlistName) => {
                const videos = props.playlists[playlistName]
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                    <div>
                    {videos.filter((video) => {
                        const titleNormalized = video.title.toLowerCase();
                        const searchValueNormalized = searchValue.toLowerCase();
                        return titleNormalized.includes(searchValueNormalized)
                    }).map((video) => {
                        return (
                            <a href={video.url}>
                                <img src={video.thumb} />
                                <span>
                                    {video.title}
                                </span>
                            </a>
                        )
                    })}
                    </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}
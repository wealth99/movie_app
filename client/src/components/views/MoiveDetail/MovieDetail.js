import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from '../MoiveDetail/Sections/MovieInfo';
import GridCard from '../commons/GridCards';
import Favorite from './Sections/Favorite';
import { Row } from 'antd';

function MovieDetail(props) {

    let movieId = props.match.params.movieId;
    const [Movie, setMovie] = useState([]);
    const [Casts, setCasts] = useState([]);
    const [ActoeToggle, setActoeToggle] = useState(false);

    useEffect(() => {
        let endPointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        let endPointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

        fetch(endPointInfo)
            .then(res => res.json())
            .then(res=> {
                setMovie(res);
            });
        
        fetch(endPointCrew)
            .then(res => res.json())
            .then(res => {
                setCasts(res.cast);
            });

    }, []);

    const toggleActorView = () => {
        setActoeToggle(!ActoeToggle);
    }

    return (
        <div>
            {/* header */}
            <MainImage 
                image={`${IMAGE_BASE_URL}/w1280${Movie.backdrop_path}`} 
                title={Movie.original_title}
                text={Movie.overview}
            />

            {/* body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>

                <div style={{  display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite  movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
                </div>

                {/* Movie Info */}
                <MovieInfo movie={Movie} />
                <br />

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <button onClick={toggleActorView}>Toggle Acotr View</button>
                </div>

                {ActoeToggle && 
                    <Row gutter={[12, 12]}>
                        {Casts && Casts.map((cast, index) => (
                            <React.Fragment key={index}>
                                <GridCard 
                                    image={ cast.profile_path ? `${IMAGE_BASE_URL}/w500${cast.profile_path}` : null }
                                    characterName={cast.name}
                                />
                            </React.Fragment> 
                        ))}
                    </Row>
                }

            </div>
        </div>
    )
}

export default MovieDetail

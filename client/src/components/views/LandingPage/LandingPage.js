import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import MainImage from './Sections/MainImage';
import GridCard from '../commons/GridCards';
import { Row } from 'antd';

function LandingPage() {

    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null);
    const [CurrentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMoives(endpoint);
    }, []);

    const fetchMoives = (endpoint) => {
        fetch(endpoint)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setMovies([...Movies, ...res.results]); // 리스트 목록 
            if(res.page == 1) {
                setMainMovieImage(res.results[0]); // 상단 배너에 처음꺼 부려줌
            }
            setCurrentPage(res.page); // 페이지 순서뿌려줌 처음엔 1 
        });
    }

    // more 버튼 클릭
    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMoives(endpoint)
    }

    return (
        <div style={{ width: '100%', margin: '0' }}>

            {/*  MAin Image */}
            {MainMovieImage && 
                <MainImage 
                    image={`${IMAGE_BASE_URL}/w1280${MainMovieImage.backdrop_path}`} 
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}
                />
            }

            <div style={{ width: '85%', margin: '1rem auto' }}>
                <h2>Movies by latest</h2>
                <hr />

                {/* Movie grid Cards */}
                <Row gutter={[12, 12]}>
                    {Movies && Movies.map((movie, index) => (
                       <React.Fragment key={index}>
                           <GridCard
                                landingPage
                                image={ movie.poster_path ? `${IMAGE_BASE_URL}/w500${movie.poster_path}` : null }
                                movieId={movie.id}
                                moviedName={movie.original_title}
                           />
                       </React.Fragment> 
                    ))}
                </Row>
               
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={loadMoreItems}>Load More</button>
            </div>
        </div>
    )
}

export default LandingPage

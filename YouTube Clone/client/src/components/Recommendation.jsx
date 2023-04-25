import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Card from './Card';

const Container = styled.div`
flex:2;
`;

function Recommendation({ tags }) {

    const [videos, setVideos] = useState([])

    const fetchVideos = async () => {
        const res = await axios.get(`/videos/tags?tags=${tags}`);
        console.log(res.data)
        setVideos(res.data)
    };

    useEffect(() => {
        fetchVideos()
    }, [tags])


    return (
        <Container>
            {
                videos.map((video) => (
                    <Card key={video._id} video={video} type='sm' />
                ))
            }
        </Container>
    )
}

export default Recommendation
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import ImageCard from '../components/ImageCard';
import Welcome from '../components/Welcome';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/custom.scss';

import Header from '../components/Header';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5050';
const savedImgInDbEndpoint = `${API_URL}/images`;

const Wishboard = ({ token, setToken }) => {
  const [profileData, setProfileData] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function getSavedImages() {
      try {
        const res = await axios.get(savedImgInDbEndpoint);
        setImages(res.data.reverse() || []);
      } catch (error) {
        console.log(error);
      }
    }
    getSavedImages();
  }, []);

  const getData = async () => {
    try {
      await axios({
        method: 'GET',
        url: `${API_URL}/profile`,
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      const res = response.data;
      res.access_token && setToken(res.access_token);
      setProfileData({
        profile_name: res.name,
        about_me: res.about,
      });
    } catch {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    }
  };

  const handleDeleteImage = (id) => {
    const removeImage = async () => {
      try {
        const res = await axios.delete(`${API_URL}/images`, {
          data: { id: id },
        });
      } catch (error) {
        console.log(error);
      }
    };
    removeImage();
    setImages(images.filter((image) => image.id !== id));
  };
  return (
    <div>
      <Container className="mt-5">
        {images.length ? (
          <Row xs={1} md={2} lg={3}>
            {images.map((image, i) => (
              <Col key={i} className="pb-4">
                <ImageCard image={image} deleteImage={handleDeleteImage} />
              </Col>
            ))}
          </Row>
        ) : (
          <Welcome />
        )}
      </Container>
    </div>
  );
};

export default Wishboard;
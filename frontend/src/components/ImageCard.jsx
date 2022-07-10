import { Card, Container } from 'react-bootstrap';
import '../css/custom.css';
import LoadingButton from '@mui/lab/LoadingButton';
import { Snackbar, Alert } from '@mui/material';
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { alreadySaved } from '../redux/alreadySavedSlice';

const ImageCard = ({ image, deleteImage, saveImageToDb, token }) => {
  const [saveBtn, setSaveBtn] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alreadySavedState = useSelector(
    (state) => state.alreadySaved.alreadySaved
  );

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    dispatch(alreadySaved(false));
  };

  useEffect(() => {
    function imgCheck() {
      if (image.check == 'true') {
        setSaveBtn(true);
      }
      if (image.check == 'false') {
        setSaveBtn(false);
      }
    }
    imgCheck();
  }, [setSaveBtn]);

  useEffect(() => {
    function alreadySavedSnackbar() {
      if (alreadySavedState == true) {
        setOpen(true);
        console.log(open);
      } else {
        setOpen(false);
      }
    }
    alreadySavedSnackbar();
  }, [alreadySavedState]);

  const checkForTokenAndSave = () => {
    if (token) {
      saveImageToDb(image.id);
      setSaveBtn(image.check);
    } else {
      return navigate('/profile', { replace: true });
    }
  };

  return (
    <div>
      <Card>
        <Card.Img className="card-image d-flex" src={image.urls.small} />
        <Card.Body className="card-img-overlay d-flex align-items-end">
          <Container>
            <Card.Title className="image-card-text">
              {image.title?.toUpperCase()}
            </Card.Title>
            <Card.Text className="image-card-text">
              {image.description || image.alt_description}
            </Card.Text>

            <LoadingButton
              variant="contained"
              sx={{ mr: 2 }}
              size="small"
              onClick={() => deleteImage(image.id)}
            >
              Delete
            </LoadingButton>

            <LoadingButton
              onClick={() => {
                checkForTokenAndSave();
              }}
              size="small"
              disabled={image.check == 'true' ? true : false}
              variant="contained"
            >
              {image.check == 'true' ? 'Saved' : 'Save'}
            </LoadingButton>
          </Container>
        </Card.Body>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert variant="filled" severity="info">
            This image is already saved in your Wishboard
          </Alert>
        </Snackbar>
      </Card>
    </div>
  );
};

export default ImageCard;

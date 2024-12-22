import { Modal, Box, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'primary.light',
  color: 'primary.dark',
  border: 0,
  boxShadow: 24,
  p: 4,
};

function App(props: any) {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          {props.item.name}
        </Typography>
        <img src={props.item.imageUrl} />
        <Typography sx={{ mt: 2 }}>Participated in TV shows: {props.item.tvShows}</Typography>

        <Typography sx={{ mt: 2 }}>Participated in Video games: {props.item.videoGames}</Typography>
      </Box>
    </Modal>
  );
}

export default App;

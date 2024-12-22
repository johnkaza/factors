import { useState, useEffect } from 'react';
import Table from '../atoms/Table.tsx';
import Modal from '../atoms/CharacterModal.tsx';
import Pie from '../atoms/PieChart.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { getCharacters } from '../store/character.tsx';
import { stateTypes, paramsTypes, characterTypes } from './types/disneyCharactersTypes.tsx';
import { Grid2, CircularProgress, TextField, Container, Typography } from '@mui/material';

import { AppDispatch } from '../store/indexStore.tsx';

import { useDebouncedCallback } from 'use-debounce';

const headers = [
  {
    name: 'name',
    value: 'name',
  },
  {
    name: 'Participated TV shows',
    value: 'tvShows',
  },
  {
    name: 'Participated Video Games',
    value: 'videoGames',
  },
  {
    name: 'Allies',
    value: 'allies',
  },
  {
    name: 'Enemies',
    value: 'enemies',
  },
];

const rowsPerPageOptions = [10, 20, 50, 100, 200, 500];

function DisneyCharacters() {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [perPage, setPerPage] = useState(50);
  const [name, setName] = useState('');

  const [character, setCharacter] = useState({
    name: '',
    imageUrl: '',
    tvShows: [''],
    videoGames: [''],
  });

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const params = { page: 1, pageSize: perPage };

    fetchCharacters(params);
  }, []);

  const content = useSelector((state: stateTypes) => state.characters.contents);
  const contentData = useSelector((state: stateTypes) => {
    if (Array.isArray(state.characters.contents.data)) return state.characters.contents.data;

    return [state.characters.contents.data];
  });
  const contentChart = useSelector((state: stateTypes) => {
    if (!state.characters?.contents?.data) return [];

    let newList = Array.from(state.characters.contents.data);

    let totalFilms = 0;

    newList.map((val: any) => {
      if (val.films.length > 0) {
        totalFilms += val.films.length;
      }

      return val;
    });

    const listData = newList.map((value: any) => {
      const characterObj = Object.assign(
        {},
        {
          name: value.name,
          y: (value.films.length / totalFilms) * 100,
        }
      );

      return characterObj;
    });

    return listData;
  });

  //   console.log(contentChart, 'contentChart');

  const isLoading = useSelector((state: stateTypes) => state.characters.isLoading);

  const handleChangeRowsPerPage = (event: any) => {
    const pageSize = event.target.value;
    setPerPage(pageSize);
  };

  const buildParams = (newParams: paramsTypes) => {
    let params: paramsTypes = {
      page: newParams?.page || 1,
      pageSize: newParams?.pageSize || perPage,
      name: Boolean(newParams?.name) ? newParams.name : name,
    };

    if (params?.name === '') {
      delete params.name;
    }

    return params;
  };

  useEffect(() => {
    const newParams: paramsTypes = { page: 1, name };

    const params = buildParams(newParams);

    fetchCharacters(params);
  }, [name]);

  useEffect(() => {
    const newParams: paramsTypes = { page };

    const params = buildParams(newParams);

    fetchCharacters(params);
  }, [page]);

  useEffect(() => {
    const params = buildParams({ pageSize: perPage, page });

    fetchCharacters(params);
  }, [perPage]);

  const onPageChange = (_: any, page: number) => {
    const newPage = page + 1;
    setPage(newPage);
  };

  const fetchCharacters = (params: paramsTypes) => {
    dispatch(getCharacters(params));
  };

  const onChangeSearch = useDebouncedCallback((event: any) => {
    const text = event.target.value;

    setName(text);
  }, 250);

  const handleSort = (event: any, property: any) => {
    console.log(event, event.target.value, property);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openCharacterModal = (character: characterTypes) => {
    setCharacter(character);

    setOpen(true);
  };

  return (
    <Container maxWidth={false} disableGutters sx={{ bgcolor: 'primary.light', px: 4, pb: 10 }}>
      <Grid2 container justifyContent="center">
        <Typography variant="h3" sx={{ color: 'primary.dark', my: 4 }}>
          Disney Characters
        </Typography>
      </Grid2>

      {contentChart && <Pie data={contentChart} />}

      <TextField sx={{ mb: 2, mt: 6 }} label="Search characters" onChange={onChangeSearch} />
      <div className="d-flex">
        {isLoading && (
          <div className="d-flex">
            <CircularProgress />
          </div>
        )}
        {!isLoading && content?.data && (
          <Table
            list={contentData}
            headers={headers}
            pagination={content.info}
            perPage={perPage}
            page={page - 1}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={rowsPerPageOptions}
            handleChangePage={onPageChange}
            handleSort={() => handleSort}
            clickRow={openCharacterModal}
          ></Table>
        )}
      </div>
      <Modal open={open} handleClose={handleClose} item={character} />
    </Container>
  );
}

export default DisneyCharacters;

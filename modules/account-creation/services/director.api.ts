import axios from '../../../shared/helpers/onboarding/axios';

export async function create() {
  const {data} = await axios.post('/director');
  return data;
}

export async function getAll() {
  const id = new Date().toString();
  const {data} = await axios.get('/director/all/' + id);
  return data;
}

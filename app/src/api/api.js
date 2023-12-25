import axios from 'axios';

export const compileCode = async (url, currentInput, language) => {
  try {
    const { data: { id } } = await axios.post(
      url,
      { currentInput, language },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return id;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
};

export const fetchData = async (url, id, setData, setIsFetching, setId, setTime) => {
    try {
      const { data } = await axios.get(`${url}/${id}`);
      const { result, compiled_in } = data;
  
      if (result && compiled_in) {
        setIsFetching(false);
        setId(null);
        setTime(compiled_in);
        setData(result);
      } else {
        setData('Hm... what\'s taking so long!?');
      }
    } catch (error) {
      setData('Something went wrong, please try again.');
    }
  };
  


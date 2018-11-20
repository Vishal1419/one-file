import * as Toast from '../components/Toaster/Toaster';

const createAsyncAction = ({
  asyncRequest, types, loadingPayload = null, showToastOnError = true,
}) => async (dispatch) => {
  dispatch({
    type: types.loading,
    payload: loadingPayload,
  });

  try {
    const response = await asyncRequest();
    if (response.isMock) { // if mock request
      dispatch({
        type: types.success,
        payload: response.payload,
      });
      return;
    }

    console.log(response);
    if (['2', '3'].includes(String(response.status).substring(0, 1))) { // if request succeeds
      try {
        const jsonResponse = await response.json();
        if (jsonResponse.statusCode === 1000) {
          dispatch({
            type: types.success,
            payload: jsonResponse.data,
          });
          return;
        }
        dispatch({ // if its a known error by server
          type: types.failure,
          payload: {
            code: jsonResponse.statusCode,
            message: jsonResponse.error,
          },
        });
        if (showToastOnError) {
          console.log(jsonResponse);
          Toast.error(`${jsonResponse.statusCode}: ${jsonResponse.error}`);
        }
      } catch (error) {
        dispatch({
          type: types.failure,
          payload: {
            code: response.status,
            message: error.message,
          },
        });
        if (showToastOnError) {
          console.log(error);
          Toast.error(`${response.status}: ${error.message}`);
        }
      }
      return;
    }

    dispatch((error) => { // if request fails with some status codes like 404, 500...
      dispatch({
        type: types.failure,
        payload: {
          code: response.status,
          message: error.message,
        },
      });
      if (showToastOnError) {
        console.log(error);
        Toast.error(`${response.status}: ${error.message}`);
      }
    });
  } catch (_) {
    dispatch({
      type: types.failure,
      payload: {
        code: 0,
        message: 'Connection issue. Make sure you are connected to the internet and that your API is working',
      },
    });
    if (showToastOnError) {
      Toast.error('Connection issue. Make sure your are connected to the internet and that your API is working');
    }
  }
};

export default createAsyncAction;

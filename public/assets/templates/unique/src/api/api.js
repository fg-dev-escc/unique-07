import axios from "axios";

export async function fetch(method, url, body) {

  const token = localStorage.getItem("token");
  
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios.defaults.headers.common = {
      Authorization: `Bearer ${token}`,
    };

    const { data } = await axios({
      method,
      url,
      config,
      data: body,
    });
    return { ok: true, data };
  } catch (e) {
    console.log(e);
    return { ok: false, response:e.response };
  }
}

export async function fetchSinToken(method, url, body) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = await axios({
      method,
      url,
      config,
      data: body,
    });
    return { ok: true, data };
  } catch (e) {
    console.log({ e });
    if (e.response) return { ok: false, response: e.response };
    else return { ok: false };
  }
}

export const postFile = async (url, formData) => {
  const token = localStorage.getItem("token");

  try {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${token}`,
    };

    const { data } = await axios({
      method: "post",
      url,
      data: formData,
      headers: {
        "Content-Type": `multipart/form-data;`,
      },
    });
    return { ok: true, data };
  } catch (e) {
    console.log({ e });
    if (e.response) return { ok: false, response: e.response };
    else return { ok: false };
  }
};

export async function getFile(url, name) {
  let salida;
  const token = localStorage.getItem("token");

  axios.defaults.headers.common = {
    Authorization: `Bearer ${token}`,
  };

  await axios({
    url,
    method: "GET",
    responseType: "blob", // Important
  })
    .then((response) => {
      fileDownload(response.data, name);
      return (salida = { ok: true });
    })
    .catch((e) => {
      if (e.response) return (salida = { ok: false, response: e.response });
      else return (salida = { ok: false });
    });

  return salida;
}
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000'
});

export const getUser = username => {
  return instance.get(`/users/${username}`).then(response => {
    const { data } = response;
    return {
      user_id: data.user.user_id,
      ...data.user.data
    };
  });
};

export const getProducts = () => {
  return instance.get(`/products`).then(response => {
    const { data } = response;
    return data.products;
  });
};

export const placeOrder = (order, username) => {
  console.log(order.map(item => item.id));
  console.log(username);
  return instance
    .post(`/orders`, {
      order: {
        items: order.map(item => item.id),
        user_id: username
      }
    })
    .then(response => {
      const { data } = response;
      return data;
    });
};

import { useQuery, useQueryClient } from "react-query";

const getUser = async (_, userId) => {
  if (!userId) {
    return null;
  }
  const doc = await db.collection("users").doc(userId).get();

  return doc.data();
};

export default function useUser(userId) {
  const cache = useQueryClient();

  return useQuery(["users", userId], (users) => getUser(users, userId), {
    initialData: (userId) => {
      return cache
        .getQueryData(["users", userId])
        ?.find((user) => user.id === userId);
    }
  });
}


import { useQuery } from "react-query";


const createBalance = async (balance) => {
  const { data } = await axiosAuth.post('/balance/create', {
    data: balance
  });
  return data;
};

export default function useCreateBalance(balance) {
  return useQuery(["post", postId], () => createBalance(balance));
}

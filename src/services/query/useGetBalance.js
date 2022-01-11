import Image from 'next/image';
import { useQuery } from 'react-query';
// utils
import axiosInstance from 'Utils/axios';
// config
import { AWS_PACKET_API } from 'Config/index';
// routes
import { PATH_DASHBOARD } from 'Routes/paths';

export const getBalances = async () => {
  const { data } = await axiosInstance.get('/balances');
  return data;
};

export default function useGetBalances(active) {
  return useQuery(['balances'], () => getBalances(), {
    active,
    staleTime: 5000 * 60,
    onSuccess(data) {
      const subMenus = data.map(({ amount, currencyCode, balanceId }) => ({
        title: `${amount} ${currencyCode}`,
        path: `${PATH_DASHBOARD.user.balances}/${balanceId}`,
        icon: (
          <Image
            src={`${AWS_PACKET_API}/currencies/${currencyCode.toLowerCase()}.png`}
            alt={currencyCode}
            width={36}
            height={28}
          />
        ),
      }));
    },
  });
}

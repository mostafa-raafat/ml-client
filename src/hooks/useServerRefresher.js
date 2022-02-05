import { useRouter } from 'next/router';

export default function useServerRefresher() {
  const router = useRouter();

  return () => router.replace(router.asPath);
}

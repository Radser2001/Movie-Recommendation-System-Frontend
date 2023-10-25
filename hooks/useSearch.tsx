import useSwr from 'swr'
import fetcher from '@/libs/fetcher';

const useSearch = (searchQuery?: string) => {
  const { data, error, isLoading } = useSwr(searchQuery ? `/api/search/${searchQuery}` : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading
  }
};

export default useSearch;
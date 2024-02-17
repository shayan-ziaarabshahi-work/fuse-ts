import { useLocation } from 'react-router-dom';
import queryString, { ParsedQuery } from 'query-string';

const useQueryParams = (): ParsedQuery<string> => {
  const location = useLocation();
  return queryString.parse(location.search);
};

export default useQueryParams;

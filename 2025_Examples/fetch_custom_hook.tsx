const App = () => {
    const [search, setSearch] = useState("");
    const [activeSearch, setActiveSearch] = useState("react");
  
    const { data, isLoading, isError } = useQuery<Story[]>({
      queryKey: [activeSearch],
      queryFn: async () => {
        const result = await axios(`${API}?query=${activeSearch}`);
  
        return result.data.hits;
      },
      initialData: [],
    });
  
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    };
  
    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      setActiveSearch(search);
      setSearch("");
  
      event.preventDefault();
    };
  
    return ( <>
        <form onSubmit={handleSearchSubmit}>
          <input type="text" value={search} onChange={handleSearchChange} />
          <button type="submit">Search</button>
        </form>
  
        {isError && <div>Something went wrong ...</div>}
  
        <ul>...</ul>
      </> );
  };

  type UseQueryArgs<T> = {
    queryKey: string[];
    queryFn: () => Promise<T>;
    initialData: T;
  };
  
  const useQuery = <T>({ queryFn, queryKey, initialData }: UseQueryArgs<T>) => {
    const [data, setData] = useState<T>(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
  
    useEffect(() => {
      let didCancel = false;

      const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);
  
        try {
          const result = await queryFn();
  
          if (!didCancel) setData(result);
        } catch (error) {
          if (!didCancel) setIsError(true);
        }
  
        setIsLoading(false);
      };
  
      fetchData();
      return () => {
        didCancel = true;
      };
    }, [...queryKey]);
  
    return { data, isLoading, isError };
  };
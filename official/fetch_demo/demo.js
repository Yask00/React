function ShippingForm({ country }) {
    const [cities, setCities] = useState(null);
    const [city, setCity] = useState(null);
  
    useEffect(() => {
      let ignore = false;
      fetch(`/api/cities?country=${country}`)
        .then(response => response.json())
        .then(json => {
          if (!ignore) {
            setCities(json);
          }
        });
      return () => {
        ignore = true;
      };
    }, [country]); // ✅ All dependencies declared
}
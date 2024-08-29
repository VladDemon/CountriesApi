import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Country, CountryDetailsResponse } from '../utils/types';
import { Spinner } from './Spinner';

function CountryList() {
    const [countries, setCountries] = useState<CountryDetailsResponse>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get<Array<Country>>('https://restcountries.com/v3.1/all');
                setCountries(response.data);
            } catch (err) {
                setError('Error fetching countries');
                throw new Error(`Error fetching countries, ${err}`);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        };

        fetchCountries();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Spinner />
                <span className="ml-2 text-gray-500">Loading...</span>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-600">{error}</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 flex justify-center">World Countries</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {countries.map((country: Country) => (
                    <Link
                        to={`/country/${country.name.common}`}
                        key={country.cca3}
                        className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                    >
                        <div className="flex flex-col items-center">
                            <img
                                src={country.flags.png}
                                alt={`${country.name.common} flag`}
                                className="w-20 h-12 object-cover mb-2 rounded"
                            />
                            <h2 className="text-lg font-semibold">{country.name.common}</h2>
                            <p className="text-sm text-gray-600 mt-2">Population: {country.population.toLocaleString()}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default CountryList;

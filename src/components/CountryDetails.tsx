import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Country, CountryDetailsResponse } from '../utils/types';
import { Spinner } from './Spinner';

function CountryDetails() {
    const { name } = useParams<{ name: string }>();
    const [country, setCountry] = useState<Country | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCountryDetails = async () => {
            try {
                const response = await axios.get<CountryDetailsResponse>(
                    `https://restcountries.com/v3.1/name/${name}`
                );
                if (response.data) {
                    setCountry(response.data[0]);
                } else {
                    setError('Country not found');
                    throw new Error(`Country not found`);
                }
            } catch (err) {
                setError('Error fetching country details');
                throw new Error(`Error fetching country details ${err}`)
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        };

        fetchCountryDetails();
    }, [name]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Spinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-600">
                <p>Oops! Something went wrong:</p>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className='flex justify-center items-center h-[100vh]'>
            <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md w-[50%]">
                <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
                    &larr; Back to Countries
                </Link>
                <h1 className="text-3xl font-bold mb-6 text-center">{country?.name.common}</h1>
                <img
                    src={country?.flags.png}
                    alt={`${country?.name.common} flag`}
                    className="w-full h-48 object-cover rounded-md mb-6 shadow"
                />
                <div className="space-y-4">
                    <p className="text-lg">
                        <strong>Capital:</strong> {country?.capital[0]}
                    </p>
                    <p className="text-lg">
                        <strong>Region:</strong> {country?.region}
                    </p>
                    <p className="text-lg">
                        <strong>Subregion:</strong> {country?.subregion?.toLocaleString()}
                    </p>
                    <p className="text-lg">
                        <strong>Population:</strong> {country?.population.toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CountryDetails;

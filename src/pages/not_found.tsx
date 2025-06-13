import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Adjust the path to your store if necessary
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; // Example icon

function NotFoundPage() {
  const currentTheme = useSelector((state: RootState) => state.Theme.theme); // Assuming 'Theme' is the key for your themeReducer

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen px-4 text-center ${currentTheme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} transition-colors duration-300`}>
      <ErrorOutlineIcon style={{ fontSize: '6rem' }} className={`${currentTheme === 'dark' ? 'text-red-400' : 'text-red-500'} mb-6`} />
      <h1 className={`text-6xl font-bold mb-4 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        404
      </h1>
      <p className={`text-2xl font-light mb-6 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        Oops! Page Not Found.
      </p>
      <p className={`mb-8 ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className={`px-8 py-3 font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out
                    ${currentTheme === 'dark'
                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white focus:ring-indigo-400'
                        : 'bg-indigo-500 hover:bg-indigo-600 text-white focus:ring-indigo-300'
                    } 
                    focus:outline-none focus:ring-2 focus:ring-opacity-75`}
      >
        Go to Homepage
      </Link>
    </div>
  );
}

export default NotFoundPage;
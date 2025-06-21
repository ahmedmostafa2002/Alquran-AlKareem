import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store'; // Adjust path if necessary
import ImportContactsIcon from '@mui/icons-material/ImportContacts'; // Example icon
import { useEffect } from 'react';
import { getSurahsDetails } from '../redux/slices/surahs_slice';
import { setCurrentSurah } from '../redux/slices/current_surah_slice';
import CircularProgress from '@mui/material/CircularProgress'; // For loading state
import SurahDetailsProps from '../utils/interfaces/surah_details.interface';
import { setCurrentPath } from '../redux/slices/current_path_slice';

function HomePage() {
  const currentTheme = useSelector((state: RootState) => state.Theme.theme);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const surahsDetails:SurahDetailsProps[] = useSelector((state: RootState) => state.Surah.surahsDetails);
  const { status: surahsStatus, error: surahsError } = useSelector((state: RootState) => state.Surah);

  useEffect(() => {
    if (surahsStatus === 'idle') {
      dispatch(getSurahsDetails());
    }
    dispatch(setCurrentSurah(0));
  }, [surahsStatus, dispatch]);

  const handleSurahSelect = (surah: SurahDetailsProps) => {
    dispatch(setCurrentSurah(surah.number));
    dispatch(setCurrentPath("/surahs"));
    navigate('/surahs'); 
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    }); 
  };

  return (
    <div className={`flex flex-col items-center min-h-screen px-4 pt-30  ${currentTheme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      <header className="my-8 text-center w-full max-w-3xl">
        <ImportContactsIcon
          style={{ fontSize: '5rem' }}
          className={`mb-6 ${currentTheme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}
        />
        <div className="mb-4">
          <h1 className={`text-5xl font-bold ${currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            Welcome to AlQuran
          </h1>
          <h2 className={`text-4xl font-semibold mt-2 ${currentTheme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'}`}>
            مرحباً بك في القرآن الكريم
          </h2>
        </div>
        <div>
          <p className={`text-xl font-light ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Your digital companion for reading and exploring the Holy Quran.
          </p>
          <p className={`text-lg font-light mt-1 ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            رفيقك الرقمي لقراءة واستكشاف القرآن الكريم.
          </p>
        </div>
      </header>

      <main className="w-full max-w-7xl mb-12 flex-grow">
        <h2 className={`text-3xl font-semibold mb-6 text-center ${currentTheme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>
          Select a Surah to Read
        </h2>
        <h2 className={`text-3xl font-semibold mb-6 text-center ${currentTheme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>
          اختار سوره للقراءة
        </h2>
        {surahsStatus === 'loading' && (
          <div className="flex justify-center items-center py-10">
            <CircularProgress color={currentTheme === 'dark' ? 'secondary' : 'primary'} />
            <p className={`ml-4 text-lg ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Loading Surahs...</p>
          </div>
        )}
        {surahsStatus === 'failed' && (
          <div className="text-center py-10">
            <p className={`text-lg text-red-500 ${currentTheme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
              Error loading Surahs: {surahsError || 'Please try again later.'}
            </p>
          </div>
        )}
        {surahsStatus === 'succeeded' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
            {surahsDetails.map((surah) => (
              <button
                key={surah.number}
                onClick={() => handleSurahSelect(surah)}
                className={`p-4 rounded-lg shadow-md cursor-pointer text-left transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-75
                            ${currentTheme === 'dark'
                                ? 'bg-gray-800 hover:bg-gray-700 text-gray-200 focus:ring-indigo-500'
                                : 'bg-white hover:bg-gray-100 text-gray-700 focus:ring-indigo-500'
                            }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm font-semibold ${currentTheme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>
                    {surah.number}.
                  </span>
                  <span className={`text-sm ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'} flex flex-col items-center`}>
                    <span>{surah.revelationType}</span>
                    <span>{surah.revelationType === "Meccan"?"مكيه":"مدنيه"}</span>
                  </span>
                </div>
                <h3 className={`text-lg font-bold ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {surah.englishName}
                </h3>
                <p className={`text-md text-right ${currentTheme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'}`}>
                  {surah.name}
                </p>
                <p className={`text-xs mt-1 ${currentTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                  {surah.numberOfAyahs} Ayahs
                </p>
              </button>
            ))}
          </div>
        )}
        {surahsStatus === 'succeeded' && surahsDetails.length === 0 && (
            <p className={`text-center py-10 text-lg ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                No Surahs found.
            </p>
        )}
      </main>

      <footer className={`mt-auto py-6 text-sm ${currentTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
        <p>&copy; {new Date().getFullYear()} AlQuran AlKareem Project. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
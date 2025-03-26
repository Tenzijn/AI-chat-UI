'use client';
import { useState } from 'react';
import SearchBox from '@/components/SearchBox/SearchBox';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <div className='flex min-h-screen bg-gray-100 dark:bg-gray-900'>
      {/* Sidebar */}
      <aside className='w-64 bg-blue-600 dark:bg-gray-800 text-white flex flex-col'>
        <div className='p-6'>
          <h1 className='text-2xl font-bold'>HR Management</h1>
        </div>
        <nav className='flex-1'>
          <ul className='space-y-2 px-4'>
            <li>
              <a
                href='#'
                className='block py-2 px-4 rounded hover:bg-blue-700 dark:hover:bg-gray-700'
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href='#'
                className='block py-2 px-4 rounded hover:bg-blue-700 dark:hover:bg-gray-700'
              >
                Employee Management
              </a>
            </li>
            <li>
              <a
                href='#'
                className='block py-2 px-4 rounded hover:bg-blue-700 dark:hover:bg-gray-700'
              >
                Payroll
              </a>
            </li>
            <li>
              <a
                href='#'
                className='block py-2 px-4 rounded hover:bg-blue-700 dark:hover:bg-gray-700'
              >
                Performance Reviews
              </a>
            </li>
            <li>
              <a
                href='#'
                className='block py-2 px-4 rounded hover:bg-blue-700 dark:hover:bg-gray-700'
              >
                Settings
              </a>
            </li>
          </ul>
        </nav>
        <div className='p-4'>
          <button className='w-full bg-red-500 py-2 px-4 rounded hover:bg-red-600'>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className='flex-1 flex flex-col'>
        {/* Header */}
        <header className='bg-white dark:bg-gray-800 shadow-md py-4 px-6 flex justify-between items-center'>
          <h2 className='text-xl font-bold text-gray-800 dark:text-gray-100'>
            Dashboard
          </h2>
          <div className='flex items-center space-x-4'>
            <button
              onClick={toggleDarkMode}
              className='bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600'
            >
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <button className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>
              Add Employee
            </button>
          </div>
        </header>

        {/* Content */}
        <main className='flex-1 p-6'>
          {/* Overview Section */}
          <section className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
            <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md'>
              <h3 className='text-lg font-bold text-gray-800 dark:text-gray-100'>
                Total Employees
              </h3>
              <p className='text-3xl font-bold text-blue-600 dark:text-blue-400'>
                120
              </p>
            </div>
            <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md'>
              <h3 className='text-lg font-bold text-gray-800 dark:text-gray-100'>
                Pending Payrolls
              </h3>
              <p className='text-3xl font-bold text-blue-600 dark:text-blue-400'>
                5
              </p>
            </div>
            <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md'>
              <h3 className='text-lg font-bold text-gray-800 dark:text-gray-100'>
                Upcoming Reviews
              </h3>
              <p className='text-3xl font-bold text-blue-600 dark:text-blue-400'>
                8
              </p>
            </div>
          </section>

          {/* Employee Search Section */}
          <section className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6'>
            <h3 className='text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4'>
              Search Employee Records
            </h3>
            <SearchBox />
          </section>

          {/* Employee List Section */}
          <section className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md'>
            <h3 className='text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4'>
              Employee List
            </h3>
            <table className='w-full border-collapse border border-gray-200 dark:border-gray-700'>
              <thead>
                <tr className='bg-gray-100 dark:bg-gray-700'>
                  <th className='border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-800 dark:text-gray-100'>
                    Name
                  </th>
                  <th className='border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-800 dark:text-gray-100'>
                    Role
                  </th>
                  <th className='border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-800 dark:text-gray-100'>
                    Department
                  </th>
                  <th className='border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-800 dark:text-gray-100'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-800 dark:text-gray-100'>
                    John Doe
                  </td>
                  <td className='border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-800 dark:text-gray-100'>
                    Software Engineer
                  </td>
                  <td className='border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-800 dark:text-gray-100'>
                    IT
                  </td>
                  <td className='border border-gray-200 dark:border-gray-700 px-4 py-2'>
                    <button className='text-blue-600 dark:text-blue-400 hover:underline'>
                      View
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className='border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-800 dark:text-gray-100'>
                    Jane Smith
                  </td>
                  <td className='border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-800 dark:text-gray-100'>
                    HR Manager
                  </td>
                  <td className='border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-800 dark:text-gray-100'>
                    HR
                  </td>
                  <td className='border border-gray-200 dark:border-gray-700 px-4 py-2'>
                    <button className='text-blue-600 dark:text-blue-400 hover:underline'>
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </main>

        {/* Footer */}
        <footer className='bg-white dark:bg-gray-800 text-center py-4 border-t dark:border-gray-700'>
          <p className='text-gray-600 dark:text-gray-400'>
            &copy; 2025 HR Management System. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

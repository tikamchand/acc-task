import { useCallback, useEffect, useState } from "react";
import ProfileCard from "../../common/card/ProfileCard";

const users = [
  { id: 1, name: "Alice", role: "Frontend Developer", location: "Delhi" },
  { id: 2, name: "Bob", role: "Backend Developer", location: "Mumbai" },
  { id: 3, name: "Carol", role: "Full Stack Developer", location: "Remote" },
];
const ProfilePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debounce = <T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleSearch = useCallback(
    debounce((term: string) => {
      const lowercasedTerm = term.toLowerCase();
      const results = users.filter(
        (user) =>
          user.name.toLowerCase().includes(lowercasedTerm) ||
          user.role.toLowerCase().includes(lowercasedTerm) ||
          user.location.toLowerCase().includes(lowercasedTerm)
      );
      setFilteredUsers(results);
    }, 300), // 300ms debounce delay
    []
  );

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, handleSearch]);
  return (
    <>
      <div>
        <form className="max-w-md mx-auto pt-4">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search by name, role or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </form>
      </div>
      <div className="flex gap-4 w-full justify-center items-center mt-4">
        {filteredUsers.length > 0 ? (
          filteredUsers?.map((user) => (
            <ProfileCard
              key={user.id}
              role={user.role}
              location={user.location}
              name={user.name}
            />
          ))
        ) : (
          <h1 className="text-white font-semibold text-3xl text-center">
            No users to display
          </h1>
        )}
      </div>
    </>
  );
};

export default ProfilePage;

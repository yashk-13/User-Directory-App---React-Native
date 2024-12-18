import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

export function useFetchUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers(searchQuery);
  }, [searchQuery, users]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();

      // Create multiple pages of data by duplicating and modifying IDs
      const multipliedData = Array.from({ length: 5 }, (_, pageIndex) =>
        data.map((user: User) => ({
          ...user,
          id: user.id + pageIndex * 10,
          name: `${user.name} ${pageIndex + 1}`,
        }))
      ).flat();

      setUsers(multipliedData);
      setFilteredUsers(multipliedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const loadMoreUsers = async () => {
    if (loadingMore) return;

    setLoadingMore(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const newData = await response.json();

      // Modify the new data to have unique IDs and names
      const modifiedData = newData.map((user: User) => ({
        ...user,
        id: user.id + page * 50,
        name: `${user.name} ${page + 5}`,
      }));

      setUsers((prevUsers) => [...prevUsers, ...modifiedData]);
      setFilteredUsers((prevUsers) => [...prevUsers, ...modifiedData]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error loading more users:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const filterUsers = (query: string) => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  return {
    loading,
    loadingMore,
    filteredUsers,
    searchQuery,
    handleSearch,
    loadMoreUsers,
  };
}

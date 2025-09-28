import React, { useEffect, useState } from "react";
import axios from "axios";
import UserList from "./components/UserList";

const App = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then((res) => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, []);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <h1>User Explorer</h1>
            <input
                type="text"
                placeholder="Search by name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {loading && <p>Loading users...</p>}
            {error && <p>Failed to load users. Try again later.</p>}
            {!loading && !error && (
                <UserList users={filteredUsers} />
            )}
            {!loading && !error && filteredUsers.length === 0 && (
                <p>No users match your search.</p>
            )}
        </div>
    );
};

export default App;
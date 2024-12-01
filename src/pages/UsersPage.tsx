import React, { useState, useEffect } from "react";
import "../styles/users-page.scss";
import { API_URL, logout } from "../utils/constants";
import useAuthRedirect from "../utils/useAuthRedirect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel, faTachometerAlt, faCalendarCheck, faUsers, faGlobe, faSignOutAlt, faEdit, faTrash, faChevronLeft, faChevronRight, faArrowUp, faArrowDown, faUserPlus, faUserCheck, faUserClock, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from 'react-router-dom';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roles: { name: string }[];
  phoneNumber: string;
  dateOfBirth: string;
  profilePicture?: string;
}

interface UserStats {
  totalUsers: number;
  newUsers: number;
  activeUsers: number;
  avgSessionTime: number;
}

const UsersPage: React.FC = () => {
  useAuthRedirect(true);

  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [size] = useState<number>(10);
  const [sortField, setSortField] = useState<string>("firstName");
  const [sortDir, setSortDir] = useState<string>("asc");
  const [messageError, setMessageError] = useState<string | null>(null);
  const [messageSuccess, setMessageSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userStats, setUserStats] = useState<UserStats>({
    totalUsers: 0,
    newUsers: 0,
    activeUsers: 0,
    avgSessionTime: 0
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setMessageError(null);
      try {
        const response = await fetch(
          `${API_URL}/users?page=${currentPage}&size=${size}&sort=${sortField}&dir=${sortDir}&search=${searchTerm}`
        );
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data.users || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        setMessageError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [searchTerm, currentPage, size, sortField, sortDir]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (field: string) => {
    setSortDir(sortField === field && sortDir === 'asc' ? 'desc' : 'asc');
    setSortField(field);
  };

  const handlePagination = (direction: "prev" | "next") => {
    if (direction === "prev" && currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    } else if (direction === "next" && currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleDelete = async (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`${API_URL}/users/${userId}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          setMessageSuccess('User deleted successfully');
          setUsers(users.filter(user => user.id !== userId));
        } else {
          setMessageError('Failed to delete user');
        }
      } catch (error) {
        setMessageError('Error deleting user');
      }
    }
  };
const StatsSection = () => (
  <div className="user-stats row mb-4">
    <div className="col-md-3 stat-item">
      <div className="stat-card">
        <FontAwesomeIcon icon={faUsers} className="mb-2 stat-icon" />
        <h4>Total Users</h4>
        <p className="h2 stat-value">{users.length}</p>
        <div className="stat-trend positive">
          <FontAwesomeIcon icon={faArrowUp} />
          <span>Active</span>
        </div>
      </div>
    </div>

    <div className="col-md-3 stat-item">
      <div className="stat-card">
        <FontAwesomeIcon icon={faUserPlus} className="mb-2 stat-icon" />
        <h4>New Users</h4>
        <p className="h2 stat-value">
          {users.filter(user => {
            const createdDate = new Date(user.dateOfBirth);
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            return createdDate > oneWeekAgo;
          }).length}
        </p>
        <div className="stat-trend positive">
          <FontAwesomeIcon icon={faChartLine} />
          <span>Page {currentPage + 1}</span>
        </div>
      </div>
    </div>

    <div className="col-md-3 stat-item">
      <div className="stat-card">
        <FontAwesomeIcon icon={faUserCheck} className="mb-2 stat-icon" />
        <h4>Active Users</h4>
        <p className="h2 stat-value">
          {users.filter(user => user.roles.some(role => role.name !== 'ROLE_INACTIVE')).length}
        </p>
        <span className="stat-subtitle">of {totalPages}</span>
      </div>
    </div>

    <div className="col-md-3 stat-item">
      <div className="stat-card">
        <FontAwesomeIcon icon={faUserClock} className="mb-2 stat-icon" />
        <h4>Avg. Session</h4>
        <p className="h2 stat-value">{Math.floor(Math.random() * 30) + 30}</p>
        <span className="stat-subtitle">minutes</span>
      </div>
    </div>
  </div>
);
  const UserRow = ({ user }: { user: User }) => (
    <tr>
      <td>
        <div className="d-flex align-items-center">
          {user.profilePicture ? (
            <img 
              src={`${API_URL}/download-profile?fileName=${user.profilePicture.replace(/\\/g, '/')}`}
              alt="User Avatar"
              className="rounded-circle me-2"
              style={{ width: '40px', height: '40px', objectFit: 'cover' }}
            />
          ) : (
            <div 
              className="rounded-circle me-2 d-flex align-items-center justify-content-center"
              style={{ width: '40px', height: '40px', backgroundColor: '#e9ecef', color: '#495057' }}
            >
              <span>{`${user.firstName[0]}${user.lastName[0]}`}</span>
            </div>
          )}
          <span>{`${user.firstName} ${user.lastName}`}</span>
        </div>
      </td>
      <td>{user.email}</td>
      <td>{user.phoneNumber}</td>
      <td>{new Date(user.dateOfBirth).toLocaleDateString()}</td>
      <td>
        <Link to={`/users/edit/${user.id}`} className="btn btn-sm btn-primary me-2">
          <FontAwesomeIcon icon={faEdit} />
        </Link>
        <button 
          className="btn btn-sm btn-danger"
          onClick={() => handleDelete(user.id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  );
  return (
    <div className="users-page">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <a className="navbar-brand" href="#"><FontAwesomeIcon icon={faHotel} className="me-2" />Luxe Stays</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item"><a className="nav-link" href="/dashboard"><FontAwesomeIcon icon={faTachometerAlt} className="me-1" />Dashboard</a></li>
              <li className="nav-item"><a className="nav-link" href="/bookings"><FontAwesomeIcon icon={faCalendarCheck} className="me-1" />Bookings</a></li>
              <li className="nav-item"><a className="nav-link" href="/users"><FontAwesomeIcon icon={faUsers} className="me-1" />Users</a></li>
            </ul>
            <div className="d-flex align-items-center">
              <div className="language-selector me-3">
                <a className="nav-link dropdown-toggle" href="#" id="languageDropdown" data-bs-toggle="dropdown"><FontAwesomeIcon icon={faGlobe} className="me-1" />English</a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><a className="dropdown-item" href="/?lang=en">English</a></li>
                  <li><a className="dropdown-item" href="/?lang=fr">Français</a></li>
                  <li><a className="dropdown-item" href="/?lang=rw">Kinyarwanda</a></li>
                </ul>
              </div>
              <a className="nav-link" href="/login"><FontAwesomeIcon icon={faSignOutAlt} className="me-1" />Logout</a>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="container mt-5">
        <StatsSection />
        
        <div className="card">
          <div className="card-header">
            <h3 className="mb-0">Hotel Guests</h3>
          </div>
          <div className="card-body">
            <div className="search-container mb-4">
              <input
                type="text"
                className="search-input"
                placeholder="Search users..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th onClick={() => handleSort('firstName')}>
                      Name {sortField === 'firstName' && <FontAwesomeIcon icon={sortDir === 'asc' ? faArrowUp : faArrowDown} />}
                    </th>
                    <th onClick={() => handleSort('email')}>
                      Email {sortField === 'email' && <FontAwesomeIcon icon={sortDir === 'asc' ? faArrowUp : faArrowDown} />}
                    </th>
                    <th onClick={() => handleSort('phoneNumber')}>
                      Phone {sortField === 'phoneNumber' && <FontAwesomeIcon icon={sortDir === 'asc' ? faArrowUp : faArrowDown} />}
                    </th>
                    <th onClick={() => handleSort('dateOfBirth')}>
                      Date of Birth {sortField === 'dateOfBirth' && <FontAwesomeIcon icon={sortDir === 'asc' ? faArrowUp : faArrowDown} />}
                    </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <UserRow key={user.id} user={user} />
                  ))}
                </tbody>
              </table>
            </div>

            <nav>
              <ul className="pagination">
                <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`} onClick={() => handlePagination('prev')}>
                  <a className="page-link"><FontAwesomeIcon icon={faChevronLeft} /></a>
                </li>
                {[...Array(totalPages)].map((_, i) => (
                  <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`} onClick={() => setCurrentPage(i)}>
                    <a className="page-link">{i + 1}</a>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`} onClick={() => handlePagination('next')}>
                  <a className="page-link"><FontAwesomeIcon icon={faChevronRight} /></a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import UserService from '../Services/UserService';

// const UserDetails = () => {
//   const location = useLocation();
//   const { uId } = location.state ||{};
//   console.log(uId);

//   const [userDetails, setUserDetails] = useState({});
//   const [userTransactions, setUserTransactions] = useState({});

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         // Fetch user details
//         const userResponse = await UserService.getUserById(uId);
//         setUserDetails(userResponse.data);
//         console.log('User Details:', userResponse.data);
//       } catch (error) {
//         console.error('Error fetching user details:', error);
//       }
//     };

//     const fetchUserTransactions = async () => {
//       try {
//         const transactionsResponse = await UserService.getUserTransactionsByuId(uId);
//         setUserTransactions(transactionsResponse.data);
//         console.log('User Transactions:', transactionsResponse.data);
//       } catch (error) {
//         console.error('Error fetching user transactions:', error);
//       }
//     };

//     fetchUserDetails();
//     fetchUserTransactions();
//   }, [uId]);

//   return (
//     <div>
//       User details page
//       {/* You can render userDetails and userTransactions here */}
//     </div>
//   );
// };

// export default UserDetails;
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import UserService from '../Services/UserService';

const UserDetails = () => {
  const location = useLocation();
  const { uId } = location.state ||{};
  console.log(uId);

  const [userDetails, setUserDetails] = useState({});
  const [userTransactions, setUserTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userResponse = await UserService.getUserById(uId);
        setUserDetails(userResponse.data);
        console.log('User Details:', userResponse.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    const fetchUserTransactions = async () => {
      try {
        const transactionResponse = await UserService.getUserTransactionsByuId(uId);
        setUserTransactions(transactionResponse.data);
        console.log('User Transactions:', transactionResponse.data);
      } catch (error) {
        console.error('Error fetching user transactions:', error);
      }
    };

    fetchUserDetails();
    fetchUserTransactions();
  }, [uId]);

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = userTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>User Details</h1>
      <div>
        <label>User ID: </label>
        <span>{userDetails.userId}</span>
      </div>
      <div>
        <label>User Name: </label>
        <span>{userDetails.quitQResponseDto.user_name}</span>
      </div>
      <div>
        <label>Email: </label>
        <span>{userDetails.quitQResponseDto.email}</span>
      </div>
      <div>
        <label>Phone Number: </label>
        <span>{userDetails.quitQResponseDto.phone_number}</span>
      </div>
      <div>
        <label>Address: </label>
        <span>{userDetails.quitQResponseDto.address}</span>
      </div>
      <div>
        <label>Total Points: </label>
        <span>{userDetails.totalPoints}</span>
      </div>
      <div>
        <label>Tiers: </label>
        <span>{userDetails.tiers?.tierName}</span>
      </div>

      <h2>User Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Payment ID</th>
            <th>Coupon ID</th>
            <th>Transaction Type</th>
            <th>Points Gained</th>
            <th>Points Spent</th>
            <th>Amount</th>
            <th>Creation Date</th>
          </tr>
        </thead>
        <tbody>
          {currentTransactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.transId}</td>
              <td>{transaction.paymentId}</td>
              <td>{transaction.coupons?.couponId}</td>
              <td>{transaction.transactionType}</td>
              <td>{transaction.pointsGained}</td>
              <td>{transaction.pointsSpent}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.creationDate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {Array.from({ length: Math.ceil(userTransactions.length / transactionsPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserDetails;

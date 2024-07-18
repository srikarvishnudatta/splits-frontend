import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import UserContextProvider from "./context/UserContext";
import HomePage from "./Pages/HomePage";
import GroupContextProvider from "./context/GroupContext";
import ExpensePage from "./Pages/ExpensePage";
import ExpenseContextProvider from "./context/ExpenseContext";
import AddTransactionPage from "./Pages/AddTransactionPage";
const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/home", element: <HomePage /> },
  { path: "/:groupId/expenses", element: <ExpensePage /> },
  {path : "/:groupId/expenses/new", element: <AddTransactionPage />}
]);
function App() {
  return (
    <UserContextProvider>
      <GroupContextProvider>
        <ExpenseContextProvider>
          <RouterProvider router={router} />
        </ExpenseContextProvider>
      </GroupContextProvider>
    </UserContextProvider>
  );
}

export default App;

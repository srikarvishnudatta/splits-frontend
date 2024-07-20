import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import UserContextProvider from "./context/UserGroupContext.tsx";
import HomePage from "./Pages/HomePage";
import ExpensePage from "./Pages/ExpensePage";
import ExpenseContextProvider from "./context/ExpenseContext";
import AddTransactionPage from "./Pages/AddTransactionPage";
const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/home", element: <HomePage /> },
  { path: "/:name/expenses", element: <ExpensePage /> },
  {path : "/:name/expenses/new", element: <AddTransactionPage />}
]);
function App() {
  return (
    <UserContextProvider>
        <ExpenseContextProvider>
          <RouterProvider router={router} />
        </ExpenseContextProvider>
    </UserContextProvider>
  );
}

export default App;

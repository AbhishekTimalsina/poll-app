import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import PollResult from "./components/Poll/PollResult";
import RootLayout from "./layout/RootLayout";
import NewPollPage from "./pages/NewPollPage";
import Poll from "./pages/Poll";
import Browse from "./pages/Browse";
import NotFound from "./pages/NotFound";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorPage from "./ErrorPage";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Home />} />
        <Route path="/poll/:pollId/result" element={<PollResult />} />
        <Route path="/poll/new" element={<NewPollPage />} />
        <Route path="/poll/:pollId" element={<Poll />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;

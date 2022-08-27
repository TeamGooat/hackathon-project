import { BrowserRouter, Route, Routes } from "react-router-dom";
import CollabPage from "./pages/CollabPage";
import ForumPage from "./pages/ForumPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { trpc } from "./utils/trpc";
import { useState } from "react";
import { getFetch } from "@trpc/client";

<<<<<<< HEAD
function AppContent() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/collab" element={<CollabPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
=======
function App() {
  const [queryClient] = useState(() => new QueryClient({}));
>>>>>>> d9df837ed13c6814e495f48cc7ad9de072ae7e35
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: "http://localhost:4000/trpc",
      fetch: async (input, init?) => {
        const fetch = getFetch();
<<<<<<< HEAD
        return fetch(input, {...init, credentials: "include"});
      }
=======
        return fetch(input, {
          ...init,
          credentials: "include",
        });
      },
>>>>>>> d9df837ed13c6814e495f48cc7ad9de072ae7e35
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AppContent></AppContent>
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default App;

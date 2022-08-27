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

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: "http://localhost:4000/trpc",
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/collab" element={<CollabPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default App;

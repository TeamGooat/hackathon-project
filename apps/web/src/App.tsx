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
import { CollabStateProvider } from "./components/Collab/collabState";
import AddQuestionPage from "./pages/AddQuestionPage";
import OtpPage from "./pages/OtpPage";

function AppContent() {
  return (
    <CollabStateProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/verify' element={<OtpPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/forum' element={<ForumPage />} />
          <Route path='/question' element={<AddQuestionPage />} />
          <Route path='/collab' element={<CollabPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </CollabStateProvider>
  );
}

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: "http://localhost:4000/trpc",
      fetch: async (input, init?) => {
        const fetch = getFetch();
        return fetch(input, {
          ...init,
          credentials: "include",
        });
      },
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

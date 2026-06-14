import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ClassSelection from "./pages/ClassSelection";
import NextStep from "./pages/NextStep";
import LanguageSelection from "./pages/LanguageSelection";
import StreamSelection from "./pages/StreamSelection";
import CombinationSelection from "./pages/CombinationSelection";
import OptionalSubjectSelection from "./pages/OptionalSubjectSelection";
import SubjectReview from "./pages/SubjectReview";
import Dashboard from "./pages/Dashboard";
import NcertLibrary from "./pages/NcertLibrary";
import SubjectHub from "./pages/SubjectHub";
import QuizCenter from "./pages/QuizCenter";
import QuizPage from "./pages/QuizPage";
import { OnboardingProvider } from "./context/OnboardingContext";

function App() {
  return (
    <OnboardingProvider>

      <Toaster position="top-right" />

      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route
            path="/class-selection"
            element={<ClassSelection />}
          />

          <Route
            path="/next-step"
            element={<NextStep />}
          />

          <Route
  path="/language-selection"
  element={<LanguageSelection />}
/>

<Route
  path="/stream-selection"
  element={<StreamSelection />}
/>
<Route
  path="/combination-selection"
  element={<CombinationSelection />}
/>
<Route
  path="/optional-subject"
  element={<OptionalSubjectSelection />}
/>

<Route
  path="/subject-review"
  element={<SubjectReview />}
/>

<Route
  path="/dashboard"
  element={<Dashboard />}
/>

<Route
  path="/ncert-library"
  element={<NcertLibrary />}
/>

<Route
  path="/subject/:subjectName"
  element={<SubjectHub />}
/>

<Route
  path="/quiz-center"
  element={<QuizCenter />}
/>
<Route
  path="/quiz/:chapterId"
  element={<QuizPage />}
/>

        </Routes>
      </BrowserRouter>

    </OnboardingProvider>
  );
}

export default App;
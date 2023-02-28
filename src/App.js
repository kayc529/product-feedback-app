import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  SharedLayout,
  HomePage,
  EditFeedbackPage,
  NewFeedbackPage,
  SuggestionDetailPage,
  RoadmapPage,
  LoginRegisterPage,
} from './pages';
//Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SharedLayout />}>
            <Route index element={<HomePage />} />
            <Route path='/suggestion/:id' element={<SuggestionDetailPage />} />
            <Route path='/editfeedback/:id' element={<EditFeedbackPage />} />
            <Route path='/newfeedback' element={<NewFeedbackPage />} />
            <Route path='/roadmap' element={<RoadmapPage />} />
          </Route>
          <Route path='/login' element={<LoginRegisterPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

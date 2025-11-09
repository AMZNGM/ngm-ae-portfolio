import { lazy, useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import LoadingScreen from '@/components/app-components/LoadingScreen.jsx'
import ErrorBoundary from '@/components/app-components/ErrorBoundary.jsx'
import AppWrapper from '@/components/app-components/AppWrapper.jsx'

const Home = lazy(() => import('@/pages/Home.jsx'))
const NotFound = lazy(() => import('@/pages/NotFound.jsx'))

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
  }

  return (
    <Router>
      <ErrorBoundary>
        <AppWrapper>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </AppWrapper>
      </ErrorBoundary>
    </Router>
  )
}

export default App

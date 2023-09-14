import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { App } from './App'
import { PatientForm } from './routes/patient-form'
import { PatientsList } from './routes/patients-list'
import { theme } from './theme'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // One minute
    }
  }
})
const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: '/',
        element: <PatientsList />
      }, {
        path: '/patient/invite',
        element: <PatientForm />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
)

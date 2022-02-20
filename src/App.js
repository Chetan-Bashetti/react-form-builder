import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//PAGES
import { FormBuilder, FormsList, SurveyTaker, NoMatch } from 'pages';

// ERROR BOUNDARY
import { ErrorBoundary } from 'containers';

function App() {
	return (
		<div className='App'>
			<Router>
				<Routes>
					<Route
						exact
						path='/'
						element={
							<ErrorBoundary>
								<FormBuilder />
							</ErrorBoundary>
						}
					/>
					<Route
						path='/forms-list'
						element={
							<ErrorBoundary>
								<FormsList />
							</ErrorBoundary>
						}
					/>
					<Route
						path='/forms/:formId'
						element={
							<ErrorBoundary>
								<SurveyTaker />
							</ErrorBoundary>
						}
					/>
					<Route path='*' element={<NoMatch />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
